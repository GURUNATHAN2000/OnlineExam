package com.vastpro.onlineexamapp.events;

import java.util.Locale;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;

import org.apache.ofbiz.base.util.Debug;
import org.apache.ofbiz.base.util.UtilHttp;
import org.apache.ofbiz.base.util.UtilMisc;
import org.apache.ofbiz.base.util.UtilValidate;
import org.apache.ofbiz.entity.Delegator;
import org.apache.ofbiz.entity.GenericEntityException;
import org.apache.ofbiz.entity.GenericValue;
import org.apache.ofbiz.entity.condition.EntityCondition;
import org.apache.ofbiz.entity.condition.EntityOperator;
import org.apache.ofbiz.entity.util.EntityQuery;
import org.apache.ofbiz.webapp.control.LoginWorker;

import com.vastpro.onlineexamapp.forms.LoginValidator;
import com.vastpro.onlineexamapp.forms.checks.LoginFormCheck;
import com.vastpro.onlineexamapp.helper.HibernateValidatorHelper;
import com.vastpro.onlineexamapp.util.CommonConstants;
import com.vastpro.onlineexamapp.util.EntityConstants;

/**
 * 
 * @author Gurunathan
 *
 */
public class LoginEvent {

	public static final String module = LoginEvent.class.getName();
	public static String resource_error = "OnlineexamUiLabels";

	public static String doLogin(HttpServletRequest request, HttpServletResponse response) {

		Debug.logInfo("=========LOGIN EVENT STARTED SUCCESSFULLY======", module);
		// GenericValue userLogin = (GenericValue)
		// request.getSession().getAttribute("userLogin");

		// passing request & response to the LoginWorker.login event to handle the login
		String result =  LoginWorker.login(request, response);;

		Delegator delegator = (Delegator) request.getAttribute(CommonConstants.DELEGATOR);
		Locale locale = UtilHttp.getLocale(request);

		Map<String, Object> combinedMap = UtilHttp.getCombinedMap(request);
		String usernameDummy = (String) combinedMap.get("USERNAME");
		String username = usernameDummy.toLowerCase();
		String password = (String) combinedMap.get("PASSWORD");
		Map<String, Object> userLoginMap = UtilMisc.toMap(CommonConstants.USERNAME, username, CommonConstants.PASSWORD, password);

		// doing hibernate validation with the help of hibernate helper class
		LoginValidator loginForm = HibernateValidatorHelper.populateBeanFromMap(userLoginMap, LoginValidator.class);
		Set<ConstraintViolation<LoginValidator>> errors = HibernateValidatorHelper.checkValidationErrors(loginForm,
				LoginFormCheck.class);

		boolean hasFormErrors = HibernateValidatorHelper.validateFormSubmission(delegator, errors, request, locale,
				"MandatoryFieldErrMsgLoginForm", resource_error, false);
		request.setAttribute("hasFormErrors", hasFormErrors);
		

		// check whether requesting person is ADMIN or USER
		try {
			GenericValue userLogin = EntityQuery.use(delegator).from(EntityConstants.USER_LOGIN).where(CommonConstants.USER_LOGIN_ID, username).cache()
					.queryFirst();
			if (UtilValidate.isNotEmpty(userLogin)) {

				// Define the conditions
				EntityCondition partyIdCondition = EntityCondition.makeCondition(CommonConstants.PARTY_ID,
						userLogin.get(CommonConstants.PARTY_ID));
				
				request.setAttribute(CommonConstants.PARTY_ID, userLogin.get(CommonConstants.PARTY_ID));
				
				GenericValue party = EntityQuery.use(delegator).from(EntityConstants.PERSON)
						.where(CommonConstants.PARTY_ID, userLogin.get(CommonConstants.PARTY_ID)).cache().queryOne();
				String userNameLogin = party.get(CommonConstants.FIRST_NAME) + " " + party.get(CommonConstants.LAST_NAME);

				request.setAttribute(CommonConstants.USER_NAME_LOGIN, userNameLogin);

				EntityCondition adminCondition = EntityCondition.makeCondition(CommonConstants.ROLE_TYPE_ID, "ADMIN");
				EntityCondition userCondition = EntityCondition.makeCondition(CommonConstants.ROLE_TYPE_ID,
						"PERSON_ROLE");

				// Create the OR condition
				EntityCondition orCondition = EntityCondition.makeCondition(adminCondition, EntityOperator.OR,
						userCondition);

				GenericValue partyRole = EntityQuery.use(delegator).from(EntityConstants.PARTY_ROLE)
						.where(partyIdCondition, orCondition).cache().queryOne();

				if (UtilValidate.isNotEmpty(partyRole)) {
					request.setAttribute(CommonConstants.ROLE_TYPE_ID, partyRole.get(CommonConstants.ROLE_TYPE_ID));
				}
			}
		} catch (GenericEntityException e) {
			e.printStackTrace();
			return CommonConstants.ERROR;
		}

		Debug.logInfo("=========LOGIN EVENT END SUCCESSFULLY======", module);
		return result;
	}
}
