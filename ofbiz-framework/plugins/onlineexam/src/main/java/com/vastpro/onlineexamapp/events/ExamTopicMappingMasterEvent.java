package com.vastpro.onlineexamapp.events;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ofbiz.base.util.UtilHttp;
import org.apache.ofbiz.base.util.UtilMisc;
import org.apache.ofbiz.entity.Delegator;
import org.apache.ofbiz.entity.GenericValue;
import org.apache.ofbiz.service.LocalDispatcher;

import com.vastpro.onlineexamapp.util.CommonConstants;
import com.vastpro.onlineexamapp.util.ExamConstants;
import com.vastpro.onlineexamapp.util.ExamTopicMappingConstants;
import com.vastpro.onlineexamapp.util.TopicConstants;
//import com.vastpro.onlineexamapp.util.TopicConstants;

public class ExamTopicMappingMasterEvent {
	public static String editTopicMapping(HttpServletRequest request, HttpServletResponse response) {
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(CommonConstants.DISPATCHER);
		Delegator delegator = (Delegator) request.getAttribute(CommonConstants.DELEGATOR);
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute(CommonConstants.USERLOGIN);
		Map<String, Object> combinedMap = UtilHttp.getCombinedMap(request);

		String examId = (String) combinedMap.get(ExamConstants.EXAM_ID);
		String topicId = (String) combinedMap.get(TopicConstants.TOPIC_ID);
		String percentage = (String) combinedMap.get(ExamTopicMappingConstants.PERCENTAGE);
		String topicPassPercentage = (String) combinedMap.get(ExamTopicMappingConstants.TOPIC_PASS_PERCENTAGE);
		String questionsPerExam = (String) combinedMap.get(ExamTopicMappingConstants.QUESTIONS_PER_EXAM);
		try {

			Map<String, Object> runSync = dispatcher.runSync("ExamTopicMapping",
					UtilMisc.toMap(CommonConstants.USERLOGIN, userLogin, ExamConstants.EXAM_ID, examId, TopicConstants.TOPIC_ID, topicId,
							ExamTopicMappingConstants.PERCENTAGE, percentage,
							ExamTopicMappingConstants.TOPIC_PASS_PERCENTAGE, topicPassPercentage,
							ExamTopicMappingConstants.QUESTIONS_PER_EXAM, questionsPerExam));

		} catch (Exception e) {
			String errMsg = "Unable to create new records in ExamTopicMappingMaster entity: " + e.toString();
			request.setAttribute(CommonConstants.EVENT_MESSAGE, errMsg);
			request.setAttribute(CommonConstants.EVENT_ERROR_MESSAGE, CommonConstants.ERROR);
			return CommonConstants.ERROR;
		}
		request.setAttribute(CommonConstants.EVENT_SUCCESS_MESSAGE, CommonConstants.SUCCESS);
		request.setAttribute(CommonConstants.EVENT_MESSAGE, "ExamTopicMappingMaster details created successfully.");
		return CommonConstants.SUCCESS;

	}
}