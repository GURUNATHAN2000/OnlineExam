package com.vastpro.onlineexamapp.forms;

import org.hibernate.validator.constraints.NotEmpty;

import com.vastpro.onlineexamapp.forms.checks.QuestionFormCheck;

public class QuestionValidator {
	// checking field is questionDetail is empty
	@NotEmpty(message = "QUESTION DETAIL IS EMPTY", groups = { QuestionFormCheck.class })
	private String questionDetail;

	@NotEmpty(message = "OPTION-A IS EMPTY", groups = { QuestionFormCheck.class })
	private String optionA;

	@NotEmpty(message = "OPTION-B IS EMPTY", groups = { QuestionFormCheck.class })
	private String optionB;

	@NotEmpty(message = "OPTION-C IS EMPTY", groups = { QuestionFormCheck.class })
	private String optionC;

	@NotEmpty(message = "OPTION-D IS EMPTY", groups = { QuestionFormCheck.class })
	private String optionD;

	@NotEmpty(message = "OPTION-E IS EMPTY", groups = { QuestionFormCheck.class })
	private String optionE;

	@NotEmpty(message = "ANSWER IS EMPTY", groups = { QuestionFormCheck.class })
	private String answer;

	@NotEmpty(message = "NUM ANSWERS IS EMPTY", groups = { QuestionFormCheck.class })
	private String numAnswers;

	@NotEmpty(message = "QUESTION TYPE IS EMPTY", groups = { QuestionFormCheck.class })
	private String questionType;

//@NotEmpty(message="DIFFICULTY LEVEL IS EMPTY",groups= {QuestionFormCheck.class})
//private String difficultyLevel;

//@NotEmpty(message="ANSWER VALUE IS EMPTY",groups= {QuestionFormCheck.class})
//private String answerValue;

	@NotEmpty(message = "TOPIC ID IS EMPTY", groups = { QuestionFormCheck.class })
	private String topicId;

	@NotEmpty(message = "NEGATIVE MARK VALUE IS EMPTY", groups = { QuestionFormCheck.class })
	private String negativeMarkValue;

	public String getQuestionDetail() {
		return questionDetail;
	}

	public void setQuestionDetail(String questionDetail) {
		this.questionDetail = questionDetail;
	}

	public String getOptionA() {
		return optionA;
	}

	public void setOptionA(String optionA) {
		this.optionA = optionA;
	}

	public String getOptionB() {
		return optionB;
	}

	public void setOptionB(String optionB) {
		this.optionB = optionB;
	}

	public String getOptionC() {
		return optionC;
	}

	public void setOptionC(String optionC) {
		this.optionC = optionC;
	}

	public String getOptionD() {
		return optionD;
	}

	public void setOptionE(String optionE) {
		this.optionE = optionE;
	}

	public String getAnswer() {
		return answer;

	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getNumAnswers() {
		return numAnswers;
	}

	public void setNumAnswers(String numAnswers) {
		this.numAnswers = numAnswers;
	}
}