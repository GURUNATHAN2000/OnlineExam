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
import org.apache.ofbiz.entity.Delegator;
import org.apache.ofbiz.entity.GenericEntityException;
import org.apache.ofbiz.entity.GenericValue;
import org.apache.ofbiz.entity.util.EntityQuery;
import org.apache.ofbiz.service.GenericServiceException;
import org.apache.ofbiz.service.LocalDispatcher;
import org.apache.ofbiz.service.ServiceUtil;

import com.vastpro.onlineexamapp.forms.RegisterValidator;
import com.vastpro.onlineexamapp.forms.checks.RegisterFormCheck;
import com.vastpro.onlineexamapp.helper.HibernateValidatorHelper;
import com.vastpro.onlineexamapp.util.CommonConstants;
import com.vastpro.onlineexamapp.util.EntityConstants;

public class RegisterEvent {

	public static final String module = RegisterEvent.class.getName();
	public static String resource_error = "OnlineexamUiLabels";

	public static String doRegister(HttpServletRequest request, HttpServletResponse response) {
		Debug.logInfo("=========================doRegister EVENT STARTED===================================", module);

		GenericValue userLogin = (GenericValue) request.getSession().getAttribute(CommonConstants.USERLOGIN);
		Delegator delegator = (Delegator) request.getAttribute(CommonConstants.DELEGATOR);
		Locale locale = UtilHttp.getLocale(request);
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(CommonConstants.DISPATCHER);

		Map<String, Object> combinedMap = UtilHttp.getCombinedMap(request);
		String firstName = (String) combinedMap.get(CommonConstants.FIRST_NAME);
		String lastName = (String) combinedMap.get(CommonConstants.LAST_NAME);
		String userLoginIdDummy = (String) combinedMap.get(CommonConstants.USER_LOGIN_ID);
		String userLoginId = userLoginIdDummy.toLowerCase();
		String currentPassword = (String) combinedMap.get(CommonConstants.CURRENT_PASSWORD);
		String currentPasswordVerify = (String) combinedMap.get(CommonConstants.CURRENT_PASSWORD_VERIFY);

		String roleTypeId = (String) combinedMap.get(CommonConstants.ROLE_TYPE_ID);

		// doing hibernate validation with the help of hibernate helper class
		RegisterValidator registerForm = HibernateValidatorHelper.populateBeanFromMap(combinedMap, RegisterValidator.class);
		Set<ConstraintViolation<RegisterValidator>> errors = HibernateValidatorHelper.checkValidationErrors(registerForm,
				RegisterFormCheck.class);
		boolean hasFormErrors = HibernateValidatorHelper.validateFormSubmission(delegator, errors, request, locale,
				"MandatoryFieldErrMsgRegisterForm", resource_error, false);
		request.setAttribute("hasFormErrors", hasFormErrors);

		// createPersonAndUserLogin service used to create a entry in person and
		// userlogin entity
		try {
			GenericValue queryFirst = EntityQuery.use(delegator).from(EntityConstants.USER_LOGIN)
					.where(CommonConstants.USER_LOGIN_ID, userLoginId).cache().queryFirst();

			if (queryFirst == null) {
				Map<String, Object> registerResult = dispatcher.runSync("createPersonAndUserLogin",
						UtilMisc.toMap(CommonConstants.USERLOGIN, userLogin, CommonConstants.FIRST_NAME, firstName,
								CommonConstants.LAST_NAME, lastName, CommonConstants.USER_LOGIN_ID, userLoginId,
								CommonConstants.CURRENT_PASSWORD, currentPassword,
								CommonConstants.CURRENT_PASSWORD_VERIFY, currentPasswordVerify));

				if (ServiceUtil.isSuccess(registerResult)) {
					request.setAttribute(CommonConstants.SERVICE_SUCCESS_MESSAGE,
							"PERSON AND USER-LOGIN CREATED SUCCESSFULLY...");
					String partyId = (String) registerResult.get(CommonConstants.PARTY_ID);

					// addParty role service which is used to create a onemore entry by adding
					// partyRole
					Map<String, Object> addRoleResult = dispatcher.runSync("addPartyRole",
							UtilMisc.toMap(CommonConstants.PARTY_ID, partyId, CommonConstants.USERLOGIN, userLogin,
									CommonConstants.ROLE_TYPE_ID, roleTypeId));

					if (ServiceUtil.isSuccess(addRoleResult)) {
						UserMasterEvent.getUsers(request, response);
						request.setAttribute(CommonConstants.SERVICE_SUCCESS_MESSAGE, CommonConstants.SUCCESS);
					}
				}

			} else {
				request.setAttribute(CommonConstants.SERVICE_ERROR_MESSAGE, "USER-ID ALREADY EXIST");
			}
		} catch (GenericServiceException | GenericEntityException e) {
			e.printStackTrace();
			return CommonConstants.ERROR;
		}
		Debug.logInfo("=========================doRegister EVENT ENDED===================================", module);
		return CommonConstants.SUCCESS;
	}

}
