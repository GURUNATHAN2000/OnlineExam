package com.vastpro.onlineexamapp.events;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

//import java.util.List;

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
import org.apache.ofbiz.entity.util.EntityQuery;
import org.apache.ofbiz.service.GenericServiceException;
import org.apache.ofbiz.service.LocalDispatcher;
import org.apache.ofbiz.service.ServiceUtil;

import com.vastpro.onlineexamapp.forms.TopicValidator;
import com.vastpro.onlineexamapp.forms.checks.TopicFormCheck;
import com.vastpro.onlineexamapp.helper.HibernateHelper;
import com.vastpro.onlineexamapp.util.CommonConstants;
import com.vastpro.onlineexamapp.util.TopicConstants;

public class TopicMasterEvent {

	public static final String module = TopicMasterEvent.class.getName();
	public static String resource_error = "OnlineexamUiLabels";

	public static String enterTopic(HttpServletRequest request, HttpServletResponse response) {

		Delegator delegator = (Delegator) request.getAttribute("delegator");
		Locale locale = UtilHttp.getLocale(request);
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute("dispatcher");

		GenericValue userLogin = (GenericValue) request.getSession().getAttribute("userLogin");
		Map<String, Object> combinedMap = UtilHttp.getCombinedMap(request);

		String topicName = (String) combinedMap.get(TopicConstants.TOPIC_NAME);
		Map<String, Object> result = null;

		try {
			Debug.logInfo("=======Creating topic master event using service createTopicMaster=========", module);
			result = dispatcher.runSync("createTopicMaster",
					UtilMisc.toMap("userLogin", userLogin, TopicConstants.TOPIC_NAME, topicName));

			// doing hibernate validtion
			TopicValidator topicForm = HibernateHelper.populateBeanFromMap(combinedMap, TopicValidator.class);
			Debug.log("===================TOPICFORM =======================", topicForm);
			Set<ConstraintViolation<TopicValidator>> errors = HibernateHelper.checkValidationErrors(topicForm,
					TopicFormCheck.class);
			Debug.log("=================ERRORS=========", errors);
			boolean hasFormErrors = HibernateHelper.validateFormSubmission(delegator, errors, request, locale,
					"MandatoryFieldErrMsgTopicForm", resource_error, false);
			request.setAttribute("hasFormErrors", hasFormErrors);

			if (ServiceUtil.isSuccess(result)) {
				findAllTopics(request, response);
			}

		} catch (GenericServiceException e) {
			String errMsg = "unable to create topic master: " + e.toString();
			request.setAttribute(CommonConstants.EVENT_MESSAGE, errMsg);
			request.setAttribute(CommonConstants.EVENT_ERROR_MESSAGE, "error");
			return CommonConstants.ERROR;
		}

		request.setAttribute(CommonConstants.EVENT_MESSAGE, "topic created succesfully.");
		request.setAttribute(CommonConstants.EVENT_SUCCESS_MESSAGE, "success");
		return CommonConstants.SUCCESS;
	}

	public static String deleteTopic(HttpServletRequest request, HttpServletResponse response) {

		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute("dispatcher");
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute("userLogin");
		// Delegator delegator = (Delegator) request.getAttribute("delegator");
		
		Map<String, Object> combinedMap = UtilHttp.getCombinedMap(request);
		
		String topicId = (String) combinedMap.get(TopicConstants.TOPIC_ID);

		try {
			Map<String, Object> result = dispatcher.runSync("deleteTopic",
					UtilMisc.toMap("userLogin", userLogin, TopicConstants.TOPIC_ID, topicId));
			if (ServiceUtil.isSuccess(result)) {
				findAllTopics(request, response);
			}

		} catch (GenericServiceException e) {
			String errMsg = "Unable to delete the records in TopicMaster entity: " + e.toString();
			request.setAttribute(CommonConstants.EVENT_MESSAGE, errMsg);
			request.setAttribute(CommonConstants.EVENT_ERROR_MESSAGE, "error");
			return CommonConstants.ERROR;
		}
		request.setAttribute(CommonConstants.EVENT_MESSAGE, "TopicMaster record deleted successfully.");
		request.setAttribute(CommonConstants.EVENT_SUCCESS_MESSAGE, "success");
		return CommonConstants.SUCCESS;
	}

	// findAll
	public static String findAllTopics(HttpServletRequest request, HttpServletResponse response) {

		Delegator delegator = (Delegator) request.getAttribute("delegator");
		// LocalDispatcher dispatcher = (LocalDispatcher)
		// request.getAttribute("dispatcher");
		// GenericValue userLogin = (GenericValue) request.getAttribute("userlogin");

		try {
			List<GenericValue> topicList = EntityQuery.use(delegator).from("TopicMaster").queryList();

			if (UtilValidate.isNotEmpty(topicList)) {
				request.setAttribute("listTopics", topicList);
			}

		} catch (GenericEntityException e) {
			String errMsg = "===========Unable  to findAll topic master: " + e.toString();
			request.setAttribute("_ERROR_MESSAGE", errMsg);
			return CommonConstants.ERROR;
		}
		request.setAttribute("EVENT_MESSAGE", " created succesfully.");
		return CommonConstants.SUCCESS;

	}

}