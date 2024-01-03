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
import com.vastpro.onlineexamapp.helper.HibernateValidatorHelper;
import com.vastpro.onlineexamapp.util.CommonConstants;
import com.vastpro.onlineexamapp.util.EntityConstants;
import com.vastpro.onlineexamapp.util.TopicConstants;

/**
 * Handles TopicMaster event.
 * 
 * @author Gokul
 */
public class TopicMasterEvent {

	// Logging module name
	public static final String module = TopicMasterEvent.class.getName();

	// Resource bundle for error messages
	public static String resource_error = "OnlineexamUiLabels";

	/**
	 * This method will creates a topic name from TopicMaster entity.
	 * 
	 * @param request  HttpServletRequest object
	 * @param response HttpServletResponse object
	 * @return Result status (SUCCESS or ERROR)
	 */
	public static String enterTopic(HttpServletRequest request, HttpServletResponse response) {

		Delegator delegator = (Delegator) request.getAttribute(CommonConstants.DELEGATOR);
		Locale locale = UtilHttp.getLocale(request);
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(CommonConstants.DISPATCHER);

		GenericValue userLogin = (GenericValue) request.getSession().getAttribute(CommonConstants.USERLOGIN);
		Map<String, Object> combinedMap = UtilHttp.getCombinedMap(request);

		String topicName = (String) combinedMap.get(TopicConstants.TOPIC_NAME);
		Map<String, Object> result = null;

		try {
			Debug.logInfo("=======Creating topic master event using service createTopicMaster=========", module);
			result = dispatcher.runSync("createTopicMaster",
					UtilMisc.toMap(CommonConstants.USERLOGIN, userLogin, TopicConstants.TOPIC_NAME, topicName));

			// doing hibernate validtion
			TopicValidator topicForm = HibernateValidatorHelper.populateBeanFromMap(combinedMap, TopicValidator.class);
			Debug.log("===================TOPICFORM =======================", topicForm);
			Set<ConstraintViolation<TopicValidator>> errors = HibernateValidatorHelper.checkValidationErrors(topicForm,
					TopicFormCheck.class);
			Debug.log("=================ERRORS=========", errors);
			boolean hasFormErrors = HibernateValidatorHelper.validateFormSubmission(delegator, errors, request, locale,
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

	/**
	 * This method will deletes an topic name for that related topicId from
	 * TopicMaster entity.
	 * 
	 * @param request  HttpServletRequest object
	 * @param response HttpServletResponse object
	 * @return Result status (SUCCESS or ERROR)
	 */
	public static String deleteTopic(HttpServletRequest request, HttpServletResponse response) {

		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(CommonConstants.DISPATCHER);
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute(CommonConstants.USERLOGIN);
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

	/**
	 * This method will displays all the topic listing from TopicMaster entity.
	 * 
	 * @param request  HttpServletRequest object
	 * @param response HttpServletResponse object
	 * @return Result status (SUCCESS or ERROR)
	 */
	public static String findAllTopics(HttpServletRequest request, HttpServletResponse response) {

		Delegator delegator = (Delegator) request.getAttribute(CommonConstants.DELEGATOR);
		// LocalDispatcher dispatcher = (LocalDispatcher)
		// request.getAttribute("dispatcher");
		// GenericValue userLogin = (GenericValue) request.getAttribute("userlogin");

		try {
			List<GenericValue> topicList = EntityQuery.use(delegator).from(EntityConstants.TOPIC_MASTER).cache()
					.queryList();

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