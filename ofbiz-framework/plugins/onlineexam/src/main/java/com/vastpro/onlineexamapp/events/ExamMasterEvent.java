package com.vastpro.onlineexamapp.events;

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

import com.vastpro.onlineexamapp.forms.ExamMasterValidator;
import com.vastpro.onlineexamapp.forms.checks.ExamMasterFormCheck;
import com.vastpro.onlineexamapp.helper.HibernateValidatorHelper;
import com.vastpro.onlineexamapp.util.CommonConstants;
import com.vastpro.onlineexamapp.util.EntityConstants;
import com.vastpro.onlineexamapp.util.ExamConstants;

/**
 * Handles ExamMaster event.
 * @author Sreelash
 */
public class ExamMasterEvent {

	// Logging module name
	public static final String module = ExamMasterEvent.class.getName();

	// Resource bundle for error messages
	public static String resource_error = "OnlineexamUiLabels";

	/**
	 * This method will inserts a new exam from ExamMaster entity.
	 * 
	 * @param request  HttpServletRequest object
	 * @param response HttpServletResponse object
	 * @return Result status (SUCCESS or ERROR)
	 */
	public static String insertExam(HttpServletRequest request, HttpServletResponse response) {

		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(CommonConstants.DISPATCHER);
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute(CommonConstants.USERLOGIN);
		Delegator delegator = (Delegator) request.getAttribute(CommonConstants.DELEGATOR);
		Locale locale = UtilHttp.getLocale(request);

		Map<String, Object> combinedMap = UtilHttp.getCombinedMap(request);
		String examName = (String) combinedMap.get(ExamConstants.EXAM_NAME);
		String description = (String) combinedMap.get(ExamConstants.DESCRIPTION);
		String creationDate = (String) combinedMap.get(ExamConstants.CREATION_DATE);
		String expirationDate = (String) combinedMap.get(ExamConstants.EXPIRATION_DATE);
		String noOfQuestions = (String) combinedMap.get(ExamConstants.NO_OF_QUESTIONS);
		String durationMinutes = (String) combinedMap.get(ExamConstants.DURATION_MINUTES);
		String passPercentage = (String) combinedMap.get(ExamConstants.PASS_PERCENTAGE);
		String questionsRandomized = (String) combinedMap.get(ExamConstants.QUESTIONS_RANDOMIZED);
		String answersMust = (String) combinedMap.get(ExamConstants.ANSWER_MUST);
		String enableNegativeMark = (String) combinedMap.get(ExamConstants.ENABLE_NEGATIVE_MARK);
		String negativeMarkValue = (String) combinedMap.get(ExamConstants.NEGATIVE_MARK_VALUE);

		try {

			Map<String, Object> result = dispatcher.runSync("insertExam",
					UtilMisc.toMap(CommonConstants.USERLOGIN, userLogin, ExamConstants.EXAM_NAME, examName,
							ExamConstants.DESCRIPTION, description, ExamConstants.CREATION_DATE, creationDate,
							ExamConstants.EXPIRATION_DATE, expirationDate, ExamConstants.NO_OF_QUESTIONS, noOfQuestions,
							ExamConstants.DURATION_MINUTES, durationMinutes, ExamConstants.PASS_PERCENTAGE,
							passPercentage, ExamConstants.QUESTIONS_RANDOMIZED, questionsRandomized,
							ExamConstants.ANSWER_MUST, answersMust, ExamConstants.ENABLE_NEGATIVE_MARK,
							enableNegativeMark, ExamConstants.NEGATIVE_MARK_VALUE, negativeMarkValue));

			// Hibernate validation with the help of Hibernate Validator Helper class
			ExamMasterValidator examMasterForm = HibernateValidatorHelper.populateBeanFromMap(combinedMap,
					ExamMasterValidator.class);

			Set<ConstraintViolation<ExamMasterValidator>> errors = HibernateValidatorHelper
					.checkValidationErrors(examMasterForm, ExamMasterFormCheck.class);

			boolean hasFormErrors = HibernateValidatorHelper.validateFormSubmission(delegator, errors, request, locale,
					"MandatoryFieldErrMsgRegisterForm", resource_error, false);
			request.setAttribute("hasFormErrors", hasFormErrors);

			if (ServiceUtil.isSuccess(result)) {
				displayAllExam(request, response);
			}

		} catch (GenericServiceException e) {
//			Map<String, String> messageMap = UtilMisc.toMap("errorMessage", e.getMessage());
//            String errMsg = UtilProperties.getMessage(RESOURCE, "loginevents.following_error_occurred_during_login",
//                    messageMap, UtilHttp.getLocale(request));
//            request.setAttribute(CommonConstants.EVENT_MESSAGE, errMsg);
//            return CommonConstants.ERROR;
			String errMsg = "Unable to create new records in ExamMaster entity: " + e.toString();
			request.setAttribute(CommonConstants.EVENT_MESSAGE, errMsg);
			request.setAttribute(CommonConstants.EVENT_ERROR_MESSAGE, "error");
			return CommonConstants.ERROR;
		}

		request.setAttribute(CommonConstants.EVENT_MESSAGE, "ExamMaster details created successfully.");
		request.setAttribute(CommonConstants.EVENT_SUCCESS_MESSAGE, "success");
		return CommonConstants.SUCCESS;
	}

	/**
	 * This method will updates an existing exam for that related examId from
	 * ExamMaster entity.
	 * 
	 * @param request  HttpServletRequest object
	 * @param response HttpServletResponse object
	 * @return Result status (SUCCESS or ERROR)
	 */
	public static String updateExam(HttpServletRequest request, HttpServletResponse response) {

		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(CommonConstants.DISPATCHER);
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute(CommonConstants.USERLOGIN);

		String examId = (String) request.getAttribute(ExamConstants.EXAM_ID);
		String examName = (String) request.getAttribute(ExamConstants.EXAM_NAME);
		String description = (String) request.getAttribute(ExamConstants.DESCRIPTION);
		String creationDate = (String) request.getAttribute(ExamConstants.CREATION_DATE);
		String expirationDate = (String) request.getAttribute(ExamConstants.EXPIRATION_DATE);
		String noOfQuestions = (String) request.getAttribute(ExamConstants.NO_OF_QUESTIONS);
		String durationMinutes = (String) request.getAttribute(ExamConstants.DURATION_MINUTES);
		String passPercentage = (String) request.getAttribute(ExamConstants.PASS_PERCENTAGE);
		String questionsRandomized = (String) request.getAttribute(ExamConstants.QUESTIONS_RANDOMIZED);
		String answersMust = (String) request.getAttribute(ExamConstants.ANSWER_MUST);
		String enableNegativeMark = (String) request.getAttribute(ExamConstants.ENABLE_NEGATIVE_MARK);
		String negativeMarkValue = (String) request.getAttribute(ExamConstants.NEGATIVE_MARK_VALUE);

		try {

			dispatcher.runSync("updateExam", UtilMisc.toMap(CommonConstants.USERLOGIN, userLogin, ExamConstants.EXAM_ID,
					examId, ExamConstants.EXAM_NAME, examName, ExamConstants.DESCRIPTION, description,
					ExamConstants.CREATION_DATE, creationDate, ExamConstants.EXPIRATION_DATE, expirationDate,
					ExamConstants.NO_OF_QUESTIONS, noOfQuestions, ExamConstants.DURATION_MINUTES, durationMinutes,
					ExamConstants.PASS_PERCENTAGE, passPercentage, ExamConstants.QUESTIONS_RANDOMIZED,
					questionsRandomized, ExamConstants.ANSWER_MUST, answersMust, ExamConstants.ENABLE_NEGATIVE_MARK,
					enableNegativeMark, ExamConstants.NEGATIVE_MARK_VALUE, negativeMarkValue));

		} catch (GenericServiceException e) {
			String errMsg = "Unable to update the records in ExamMaster entity: " + e.toString();
			request.setAttribute(CommonConstants.EVENT_MESSAGE, errMsg);
			request.setAttribute(CommonConstants.EVENT_ERROR_MESSAGE, "error");
			return CommonConstants.ERROR;
		}

		request.setAttribute(CommonConstants.EVENT_MESSAGE, "ExamMaster details updated successfully.");
		request.setAttribute(CommonConstants.EVENT_SUCCESS_MESSAGE, "success");
		return CommonConstants.SUCCESS;
	}

	/**
	 * This method will deletes an exam for that related examId from ExamMaster
	 * entity.
	 * 
	 * @param request  HttpServletRequest object
	 * @param response HttpServletResponse object
	 * @return Result status (SUCCESS or ERROR)
	 */
	public static String deleteExam(HttpServletRequest request, HttpServletResponse response) {

		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(CommonConstants.DISPATCHER);
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute(CommonConstants.USERLOGIN);
		Delegator delegator = (Delegator) request.getAttribute("delegator");

		Map<String, Object> combinedMap = UtilHttp.getCombinedMap(request);
		String examId = (String) combinedMap.get(ExamConstants.EXAM_ID);

		try {

			List<GenericValue> listOfExams = EntityQuery.use(delegator).from(EntityConstants.USER_EXAM_MAPPING_MASTER)
					.where(ExamConstants.EXAM_ID, examId).cache().queryList();

			Map<String, Object> result = ServiceUtil.returnSuccess();
			for (GenericValue exam : listOfExams) {
				if (ServiceUtil.isSuccess(result)) {
					result = dispatcher.runSync("deleteExamFromUserExamMappingMaster",
							UtilMisc.toMap(CommonConstants.USERLOGIN, userLogin, ExamConstants.EXAM_ID, examId,
									CommonConstants.PARTY_ID, exam.get(CommonConstants.PARTY_ID)));
				}
			}

			if (ServiceUtil.isSuccess(result)) {
				result = dispatcher.runSync("deleteExam",
						UtilMisc.toMap(CommonConstants.USERLOGIN, userLogin, ExamConstants.EXAM_ID, examId));
			}
			if (ServiceUtil.isSuccess(result)) {
				displayAllExam(request, response);
			}

		} catch (GenericServiceException | GenericEntityException e) {
			String errMsg = "Unable to delete the records in ExamMaster entity: " + e.toString();
			request.setAttribute(CommonConstants.EVENT_MESSAGE, errMsg);
			request.setAttribute(CommonConstants.EVENT_ERROR_MESSAGE, "error");
			return CommonConstants.ERROR;
		}
		request.setAttribute(CommonConstants.EVENT_MESSAGE, "ExamMaster record deleted successfully.");
		request.setAttribute(CommonConstants.EVENT_SUCCESS_MESSAGE, "success");
		return CommonConstants.SUCCESS;
	}

	/**
	 * This method will displays a list of all exams in the ExamMaster entity.
	 * 
	 * @param request  HttpServletRequest object
	 * @param response HttpServletResponse object
	 * @return Result status (SUCCESS or ERROR)
	 */
	public static String displayAllExam(HttpServletRequest request, HttpServletResponse response) {
		Debug.logInfo("=========displayAllExam EVENT STARTED SUCCESSFULLY======", module);
		Delegator delegator = (Delegator) request.getAttribute(CommonConstants.DELEGATOR);
		// GenericValue userLogin = (GenericValue)
		// request.getSession().getAttribute("userLogin");

		try {
			List<GenericValue> listOfExam = EntityQuery.use(delegator).from(EntityConstants.EXAM_MASTER).cache()
					.queryList();
			if (UtilValidate.isNotEmpty(listOfExam)) {
				request.setAttribute("listExam", listOfExam);
			}

		} catch (GenericEntityException e) {
			String errMsg = "Unable to display all the records in ExamMaster entity: " + e.toString();
			request.setAttribute(CommonConstants.EVENT_MESSAGE, errMsg);
			request.setAttribute(CommonConstants.EVENT_ERROR_MESSAGE, "error");
			return CommonConstants.ERROR;
		}

		Debug.logInfo("=========displayAllExam EVENT END SUCCESSFULLY======", module);
		request.setAttribute(CommonConstants.EVENT_MESSAGE,
				"List of Exams is successfully displaying from ExamMaster entity!");
		request.setAttribute(CommonConstants.EVENT_SUCCESS_MESSAGE, "success");
		return CommonConstants.SUCCESS;
	}

}
