package com.vastpro.onlineexamapp.forms;

import org.hibernate.validator.constraints.NotEmpty;

import com.vastpro.onlineexamapp.forms.checks.ExamMasterFormCheck;

public class ExamMasterValidator {
	@NotEmpty(message = "examName EMPTY", groups = { ExamMasterFormCheck.class })
	private String examName;

	@NotEmpty(message = "noOfQuestions EMPTY", groups = { ExamMasterFormCheck.class })
	private String noOfQuestions;

	@NotEmpty(message = "durationMinutes EMPTY", groups = { ExamMasterFormCheck.class })
	private String durationMinutes;

	@NotEmpty(message = "passPercentage EMPTY", groups = { ExamMasterFormCheck.class })
	private String passPercentage;

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