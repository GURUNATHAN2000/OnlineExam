package com.vastpro.onlineexamapp.events;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ofbiz.base.util.UtilValidate;
import org.apache.ofbiz.entity.Delegator;
import org.apache.ofbiz.entity.GenericEntityException;
import org.apache.ofbiz.entity.GenericValue;
import org.apache.ofbiz.entity.condition.EntityCondition;
import org.apache.ofbiz.entity.condition.EntityOperator;
import org.apache.ofbiz.entity.util.EntityQuery;

import com.vastpro.onlineexamapp.util.CommonConstants;
import com.vastpro.onlineexamapp.util.EntityConstants;

public class GetUserNameEvent {

	public static String getUserName(HttpServletRequest request, HttpServletResponse response) {
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute(CommonConstants.USERLOGIN);
		Delegator delegator = (Delegator) request.getAttribute(CommonConstants.DELEGATOR);
		String result = CommonConstants.SUCCESS;
		try {
			if (UtilValidate.isNotEmpty(userLogin)) {
				GenericValue party = EntityQuery.use(delegator).from(EntityConstants.PERSON)
						.where(CommonConstants.PARTY_ID, userLogin.get(CommonConstants.PARTY_ID)).cache().queryOne();
				String userNameLogin = party.get(CommonConstants.FIRST_NAME) + " "
						+ party.get(CommonConstants.LAST_NAME);
				request.setAttribute(CommonConstants.USER_NAME_LOGIN, userNameLogin);
				request.setAttribute(CommonConstants.EVENT_SUCCESS_MESSAGE, "username rendered successfully");
				
				
				// Define the conditions
				EntityCondition partyIdCondition = EntityCondition.makeCondition(CommonConstants.PARTY_ID,
						userLogin.get(CommonConstants.PARTY_ID));

				request.setAttribute(CommonConstants.PARTY_ID, userLogin.get(CommonConstants.PARTY_ID));

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
					request.setAttribute(CommonConstants.EVENT_SUCCESS_MESSAGE,"PARTYROLE FETCHED SUCCESSFULLY");
				} else {
					request.setAttribute(CommonConstants.EVENT_ERROR_MESSAGE, "PARTYROLE IS NULL");
					result = CommonConstants.ERROR;
				}
			} else {
				request.setAttribute(CommonConstants.ERROR, "userlogin is null");
			}

		} catch (GenericEntityException e) {
			e.printStackTrace();
			request.setAttribute(CommonConstants.EVENT_ERROR_MESSAGE, "failed in rendering username");
			return CommonConstants.ERROR;
		}

		return result;

	}

}
