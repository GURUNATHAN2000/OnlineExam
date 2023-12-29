package com.vastpro.onlineexamapp.forms;

import org.hibernate.validator.constraints.NotEmpty;

import com.vastpro.onlineexamapp.forms.checks.ExamMasterFormCheck;

public class ExamMasterValidator {
	@NotEmpty(message = "examName EMPTY", groups = { ExamMasterFormCheck.class })
	private String examName;

//	@NotEmpty(message = "creationDate EMPTY", groups = { ExamMasterFormCheck.class })
//	@javax.validation.constraints.Pattern(regexp = "^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$\r\n"
//			+ "", message = "invalidDateFormat.errorMsg", groups = { ExamMasterFormCheck.class })
//	private String creationDate;
//	
//	@NotEmpty(message = "expirationDate EMPTY", groups = { ExamMasterFormCheck.class })
//	@javax.validation.constraints.Pattern(regexp = "^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$\r\n"
//			+ "", message = "invalidDateFormat.errorMsg", groups = { ExamMasterFormCheck.class })
//	private String expirationDate;

	@NotEmpty(message = "noOfQuestions EMPTY", groups = { ExamMasterFormCheck.class })
	private String noOfQuestions;

	@NotEmpty(message = "durationMinutes EMPTY", groups = { ExamMasterFormCheck.class })
	private String durationMinutes;

	@NotEmpty(message = "passPercentage EMPTY", groups = { ExamMasterFormCheck.class })
	private String passPercentage;

//	/**
//	 * @return the examName
//	 */
//	public String getExamName() {
//		return examName;
//	}
//
//	/**
//	 * @param examName the examName to set
//	 */
//	public void setExamName(String examName) {
//		this.examName = examName;
//	}

	/**
	 * @return the noOfQuestions
	 */
	public String getNoOfQuestions() {
		return noOfQuestions;
	}

	/**
	 * @param noOfQuestions the noOfQuestions to set
	 */
	public void setNoOfQuestions(String noOfQuestions) {
		this.noOfQuestions = noOfQuestions;
	}

	/**
	 * @return the durationMinutes
	 */
	public String getDurationMinutes() {
		return durationMinutes;
	}

	/**
	 * @param durationMinutes the durationMinutes to set
	 */
	public void setDurationMinutes(String durationMinutes) {
		this.durationMinutes = durationMinutes;
	}

	/**
	 * @return the passPercentage
	 */
	public String getPassPercentage() {
		return passPercentage;
	}

	/**
	 * @param passPercentage the passPercentage to set
	 */
	public void setPassPercentage(String passPercentage) {
		this.passPercentage = passPercentage;
	}

}