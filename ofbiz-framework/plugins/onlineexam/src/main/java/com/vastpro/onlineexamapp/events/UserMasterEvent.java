package com.vastpro.onlineexamapp.events;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ofbiz.base.util.Debug;
import org.apache.ofbiz.base.util.UtilValidate;
import org.apache.ofbiz.entity.Delegator;
import org.apache.ofbiz.entity.GenericEntityException;
import org.apache.ofbiz.entity.GenericValue;
import org.apache.ofbiz.entity.util.EntityQuery;
import org.apache.ofbiz.service.LocalDispatcher;

import com.vastpro.onlineexamapp.util.CommonConstants;
import com.vastpro.onlineexamapp.util.EntityConstants;

/**
 * Handles UserMaster event.
 * 
 * @author Gurunathan
 */
public class UserMasterEvent {

	// Logging module name
	public static final String module = UserMasterEvent.class.getName();

	/**
	 * This method used to get all the user details
	 * @param request
	 * @param response
	 * @return
	 */
	public static String getUsers(HttpServletRequest request, HttpServletResponse response) {
		Debug.logInfo("=========getUsers EVENT STARTED SUCCESSFULLY======", module);
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(CommonConstants.DISPATCHER);
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute(CommonConstants.USERLOGIN);
		Delegator delegator = (Delegator) request.getAttribute(CommonConstants.DELEGATOR);

		List<GenericValue> listOfUsers = new ArrayList<GenericValue>();
		try {
			List<GenericValue> partyRoleList = EntityQuery.use(delegator).from(EntityConstants.PARTY_ROLE)
					.where(CommonConstants.ROLE_TYPE_ID, "PERSON_ROLE").cache().queryList();
			if(UtilValidate.isNotEmpty(partyRoleList)) {
				for(GenericValue partyRole:partyRoleList) {
					GenericValue party = EntityQuery.use(delegator).from(EntityConstants.PERSON).where(CommonConstants.PARTY_ID, partyRole.get(CommonConstants.PARTY_ID)).cache().queryOne();
					if(UtilValidate.isNotEmpty(party)) {
						listOfUsers.add(party);
					}
				}
			}
			request.setAttribute("ListOfUsers", listOfUsers);
		} catch (GenericEntityException e) {
			String errMsg = "Unable to create new records in ExamMaster entity: " + e.toString();
			request.setAttribute(CommonConstants.EVENT_ERROR_MESSAGE, errMsg);
			e.printStackTrace();
			return CommonConstants.ERROR;
		}

		request.setAttribute(CommonConstants.EVENT_MESSAGE, "User details created successfully.");
		Debug.logInfo("=========getUsers EVENT STARTED SUCCESSFULLY======", module);
		return CommonConstants.SUCCESS;
	}
}
