package com.vastpro.onlineexamapp.events;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ofbiz.base.util.UtilHttp;
import org.apache.ofbiz.base.util.UtilMisc;
import org.apache.ofbiz.base.util.UtilValidate;
import org.apache.ofbiz.entity.Delegator;
import org.apache.ofbiz.entity.GenericValue;
import org.apache.ofbiz.entity.util.EntityQuery;
import org.apache.ofbiz.service.LocalDispatcher;

import com.vastpro.onlineexamapp.util.CommonConstants;
import com.vastpro.onlineexamapp.util.ExamConstants;
import com.vastpro.onlineexamapp.util.UserExamMappingConstants;

public class UserExamMappingMasterEvent {
	
	public static String insertUserExamMapping(HttpServletRequest request, HttpServletResponse response) {
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(CommonConstants.DISPATCHER);
		Delegator delegator = (Delegator) request.getAttribute(CommonConstants.DELEGATOR);
		
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute(CommonConstants.USERLOGIN);
		
		Map<String, Object> combinedMap = UtilHttp.getCombinedMap(request);

		String partyId = (String) combinedMap.get(CommonConstants.PARTY_ID);
		String examId=(String) combinedMap.get(ExamConstants.EXAM_ID);
		String allowedAttempts=(String) combinedMap.get(UserExamMappingConstants.ALLOWED_ATTEMPTS);
		String noOfAttempts=(String) combinedMap.get(UserExamMappingConstants.NO_OF_ATTEMPTS);
		String lastPerformanceDate=(String) combinedMap.get(UserExamMappingConstants.LAST_PERFORMANCE_DATE);
		String timeoutDays=(String) combinedMap.get(UserExamMappingConstants.TIMED_OUT_DAYS);
		String passwordChangesAuto=(String) combinedMap.get(UserExamMappingConstants.PASSWORD_CHANGES_AUTO);
		String canSplitExams=(String) combinedMap.get(UserExamMappingConstants.CAN_SPLIT_EXAMS);
		String canSeeDetailedResults=(String) combinedMap.get(UserExamMappingConstants.CAN_SEE_DETAILED_RESULTS);
		String maxSplitAttempts=(String) combinedMap.get(UserExamMappingConstants.MAX_SPLIT_ATTEMPTS);
		try {

			Map<String, Object> runSync = dispatcher.runSync("UserExamMapping", 
					UtilMisc.toMap(CommonConstants.USERLOGIN, userLogin, CommonConstants.PARTY_ID, partyId, ExamConstants.EXAM_ID, examId, UserExamMappingConstants.ALLOWED_ATTEMPTS, allowedAttempts,
							UserExamMappingConstants.NO_OF_ATTEMPTS, noOfAttempts,
							UserExamMappingConstants.LAST_PERFORMANCE_DATE, lastPerformanceDate,
							UserExamMappingConstants.TIMED_OUT_DAYS, timeoutDays,
							UserExamMappingConstants.PASSWORD_CHANGES_AUTO, passwordChangesAuto,
							UserExamMappingConstants.CAN_SPLIT_EXAMS, canSplitExams,
							UserExamMappingConstants.CAN_SEE_DETAILED_RESULTS, canSeeDetailedResults,
							UserExamMappingConstants.MAX_SPLIT_ATTEMPTS, maxSplitAttempts
							));

		} catch (Exception e) {
			String errMsg = "Unable to create new records in UserExamMappingMaster entity: " + e.toString();
			request.setAttribute(CommonConstants.EVENT_MESSAGE, errMsg);
			request.setAttribute(CommonConstants.EVENT_ERROR_MESSAGE, CommonConstants.ERROR);
			return CommonConstants.ERROR;
		}
		request.setAttribute(CommonConstants.EVENT_SUCCESS_MESSAGE, CommonConstants.SUCCESS);
		request.setAttribute(CommonConstants.EVENT_MESSAGE, "UserExamMappingMaster details created successfully.");
		return CommonConstants.SUCCESS;

	}
	public static String getAssignedExams(HttpServletRequest request, HttpServletResponse response) {
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(CommonConstants.DISPATCHER);
		Delegator delegator = (Delegator) request.getAttribute(CommonConstants.DELEGATOR);
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute(CommonConstants.USERLOGIN);
		
		Map<String, Object> combinedMap = UtilHttp.getCombinedMap(request);
		
		String partyId = (String) combinedMap.get(CommonConstants.PARTY_ID);
		
		try {
			List<GenericValue> mappingList = EntityQuery.use(delegator).from("UserExamMappingMaster").where(CommonConstants.PARTY_ID, partyId).queryList();
			List<GenericValue> ListOfExamDetails= new ArrayList<GenericValue>();
			if (UtilValidate.isNotEmpty(mappingList)) {
				for(GenericValue exam:mappingList) {
					GenericValue examDetails = EntityQuery.use(delegator).from("ExamMaster").where(ExamConstants.EXAM_ID, exam.get(ExamConstants.EXAM_ID)).queryFirst();
					ListOfExamDetails.add(examDetails);
				}
				request.setAttribute("ListOfExamDetails", ListOfExamDetails);				
			}
		} catch (Exception e) {
			String errMsg = "Unable to create new records in UserExamMappingMaster entity: " + e.toString();
			request.setAttribute(CommonConstants.EVENT_MESSAGE, errMsg);
			request.setAttribute(CommonConstants.EVENT_ERROR_MESSAGE, CommonConstants.ERROR);
			return CommonConstants.ERROR;
		}
		request.setAttribute(CommonConstants.EVENT_SUCCESS_MESSAGE, CommonConstants.SUCCESS);
		request.setAttribute(CommonConstants.EVENT_MESSAGE, "UserExamMappingMaster details created successfully.");
		return CommonConstants.SUCCESS;
		
	}
}
