package com.vastpro.onlineexamapp.events;

import java.util.ArrayList;
import java.util.List;
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
import org.apache.ofbiz.entity.util.EntityQuery;
import org.apache.ofbiz.service.GenericServiceException;
import org.apache.ofbiz.service.LocalDispatcher;
import org.apache.ofbiz.service.ServiceUtil;

import com.vastpro.onlineexamapp.forms.QuestionValidator;
import com.vastpro.onlineexamapp.forms.checks.QuestionFormCheck;
import com.vastpro.onlineexamapp.helper.HibernateValidatorHelper;
import com.vastpro.onlineexamapp.util.CommonConstants;
import com.vastpro.onlineexamapp.util.EntityConstants;
import com.vastpro.onlineexamapp.util.QuestionConstants;
import com.vastpro.onlineexamapp.util.TopicConstants;

public class QuestionMasterEvent {

	public static final String module = QuestionMasterEvent.class.getName();
	public static String resource_error = "OnlineexamUiLabels";

	public static String createQuestion(HttpServletRequest request, HttpServletResponse response) {
		Delegator delegator = (Delegator) request.getAttribute(CommonConstants.DELEGATOR);
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(CommonConstants.DISPATCHER);
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute(CommonConstants.USERLOGIN);
		Locale locale = UtilHttp.getLocale(request);

		Map<String, Object> combinedMap = UtilHttp.getCombinedMap(request);
		String questionDetail = (String) combinedMap.get(QuestionConstants.QUESTION_DETAIL);
		String optionA = (String) combinedMap.get(QuestionConstants.OPTION_A);
		String optionB = (String) combinedMap.get(QuestionConstants.OPTION_B);
		String optionC = (String) combinedMap.get(QuestionConstants.OPTION_C);
		String optionD = (String) combinedMap.get(QuestionConstants.OPTION_D);
		String optionE = (String) combinedMap.get(QuestionConstants.OPTION_E);
		String answer = (String) combinedMap.get(QuestionConstants.ANSWER);
		String numAnswers = (String) combinedMap.get(QuestionConstants.NUM_ANSWERS);
		String questionType = (String) combinedMap.get(QuestionConstants.QUESTION_TYPE);
		String difficultyLevel = (String) combinedMap.get(QuestionConstants.DIFFICULTY_LEVEL);
		String answerValue = (String) combinedMap.get(QuestionConstants.ANSWER_VALUE);
		String topicId = (String) combinedMap.get(TopicConstants.TOPIC_ID);
		String negativeMarkValue = (String) combinedMap.get(QuestionConstants.NEGATIVE_MARK_VALUE);

		try {
			Map<String, Object> result = dispatcher.runSync("createQuestionMaster", UtilMisc.toMap(CommonConstants.USERLOGIN,
					userLogin, QuestionConstants.QUESTION_DETAIL, questionDetail, QuestionConstants.OPTION_A, optionA,
					QuestionConstants.OPTION_B, optionB, QuestionConstants.OPTION_C, optionC,
					QuestionConstants.OPTION_D, optionD, QuestionConstants.OPTION_E, optionE, QuestionConstants.ANSWER,
					answer, QuestionConstants.NUM_ANSWERS, numAnswers, QuestionConstants.QUESTION_TYPE, questionType,
					QuestionConstants.DIFFICULTY_LEVEL, difficultyLevel, QuestionConstants.ANSWER_VALUE, answerValue,
					TopicConstants.TOPIC_ID, topicId, QuestionConstants.NEGATIVE_MARK_VALUE, negativeMarkValue));

			// hibernate validation
			QuestionValidator questionForm = HibernateValidatorHelper.populateBeanFromMap(combinedMap, QuestionValidator.class);
			// Debug.log("===================QUESTIONFORM =======================",
			// questionForm);
			Set<ConstraintViolation<QuestionValidator>> errors = HibernateValidatorHelper.checkValidationErrors(questionForm,
					QuestionFormCheck.class);
			// Debug.log("=============ERRORS=================", errors);
			boolean hasFormErrors = HibernateValidatorHelper.validateFormSubmission(delegator, errors, request, locale,
					"MandatoryFieldsAreEmpty", resource_error, false);

			request.setAttribute("hasFormErrors", hasFormErrors);

			if (ServiceUtil.isSuccess(result)) {
				findAllQuestions(request, response);
			}

		} catch (GenericServiceException e) {
			String errMsg = "unable to create question master: " + e.toString();
			request.setAttribute(CommonConstants.EVENT_MESSAGE, errMsg);
			request.setAttribute(CommonConstants.EVENT_ERROR_MESSAGE, CommonConstants.ERROR);
			return CommonConstants.ERROR;
		}

		request.setAttribute(CommonConstants.EVENT_MESSAGE, " question created succesfully.");
		request.setAttribute(CommonConstants.EVENT_SUCCESS_MESSAGE, CommonConstants.SUCCESS);
		return CommonConstants.SUCCESS;

	}

	// UPDATING QUESTION MASTER
	public static String updateQuestion(HttpServletRequest request, HttpServletResponse response) {

		Delegator delegator = (Delegator) request.getAttribute(CommonConstants.DELEGATOR);
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(CommonConstants.DISPATCHER);
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute(CommonConstants.USERLOGIN);

		String questionId = (String) request.getAttribute((QuestionConstants.QUESTION_ID));
		String questionDetail = (String) request.getAttribute(QuestionConstants.QUESTION_DETAIL);
		String optionA = (String) request.getAttribute(QuestionConstants.OPTION_A);
		String optionB = (String) request.getAttribute(QuestionConstants.OPTION_B);
		String optionC = (String) request.getAttribute(QuestionConstants.OPTION_C);
		String optionD = (String) request.getAttribute(QuestionConstants.OPTION_D);
		String optionE = (String) request.getAttribute(QuestionConstants.OPTION_E);
		String answer = (String) request.getAttribute(QuestionConstants.ANSWER);
		String numAnswers = (String) request.getAttribute(QuestionConstants.NUM_ANSWERS);
		String questionType = (String) request.getAttribute(QuestionConstants.QUESTION_TYPE);
		String difficultyLevel = (String) request.getAttribute(QuestionConstants.DIFFICULTY_LEVEL);
		String answerValue = (String) request.getAttribute(QuestionConstants.ANSWER_VALUE);
		String topicId = (String) request.getAttribute(TopicConstants.TOPIC_ID);
		String negativeMarkValue = (String) request.getAttribute(QuestionConstants.NEGATIVE_MARK_VALUE);

		try {
			Debug.logInfo("=======updating question master event using service updateQuestionMaster=========", module);

			dispatcher.runSync("updateQuestionMaster", UtilMisc.toMap(QuestionConstants.QUESTION_ID, questionId,
					QuestionConstants.QUESTION_DETAIL, questionDetail, QuestionConstants.OPTION_A, optionA,
					QuestionConstants.OPTION_B, optionB, QuestionConstants.OPTION_C, optionC,
					QuestionConstants.OPTION_D, optionD, QuestionConstants.OPTION_E, optionE, QuestionConstants.ANSWER,
					answer, QuestionConstants.NUM_ANSWERS, numAnswers, QuestionConstants.QUESTION_TYPE, questionType,
					QuestionConstants.DIFFICULTY_LEVEL, difficultyLevel, QuestionConstants.ANSWER_VALUE, answerValue,
					TopicConstants.TOPIC_ID, topicId, QuestionConstants.NEGATIVE_MARK_VALUE, negativeMarkValue));

		} catch (GenericServiceException e) {
			String errMsg = "===========Unable  to update question master: " + e.toString();
			request.setAttribute("_ERROR_MESSAGE", errMsg);
			return CommonConstants.ERROR;
		}
		return CommonConstants.SUCCESS;

	}

	public static String deleteQuestion(HttpServletRequest request, HttpServletResponse response) {
		Delegator delegator = (Delegator) request.getAttribute(CommonConstants.DELEGATOR);
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(CommonConstants.DISPATCHER);
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute(CommonConstants.USERLOGIN);
		
		Map<String, Object> combinedMap = UtilHttp.getCombinedMap(request);
		String questionId = (String) combinedMap.get(QuestionConstants.QUESTION_ID);
		System.out.println("=========================="+ questionId);

		try {
			Debug.logInfo("=======delete question master event using service deleteQuestionMaster=========", module);
			Map<String, Object> result = dispatcher.runSync("deleteQuestionMaster",
					UtilMisc.toMap(CommonConstants.USERLOGIN, userLogin, QuestionConstants.QUESTION_ID, questionId));
			if (ServiceUtil.isSuccess(result)) {
				findAllQuestions(request, response);
			}

		} catch (GenericServiceException e) {
			String errMsg = "===========Unable  to delete question master: " + e.toString();
			request.setAttribute("_ERROR_MESSAGE", errMsg);
			return CommonConstants.ERROR;
		}
		return CommonConstants.SUCCESS;
	}

	public static String findAllQuestions(HttpServletRequest request, HttpServletResponse response) {
		Delegator delegator = (Delegator) request.getAttribute(CommonConstants.DELEGATOR);
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(CommonConstants.DISPATCHER);
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute(CommonConstants.USERLOGIN);

		try {
			List<GenericValue> questionList = EntityQuery.use(delegator).from(EntityConstants.QUESTION_MASTER).cache().queryList();
			if (UtilValidate.isNotEmpty(questionList)) {
				request.setAttribute("listQuestions", questionList);
			}

		} catch (GenericEntityException e) {
			String errMsg = "===========Unable  to findAll question master: " + e.toString();
			request.setAttribute(CommonConstants.EVENT_MESSAGE, errMsg);
			request.setAttribute(CommonConstants.EVENT_ERROR_MESSAGE, CommonConstants.ERROR);
			return CommonConstants.ERROR;
		}
		request.setAttribute(CommonConstants.EVENT_SUCCESS_MESSAGE, CommonConstants.SUCCESS);
		return CommonConstants.SUCCESS;

	}
}