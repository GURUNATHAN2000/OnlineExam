package com.vastpro.onlineexamapp.forms;


import org.hibernate.validator.constraints.NotEmpty;

import com.vastpro.onlineexamapp.forms.checks.TopicFormCheck;

public class TopicValidator {
	@NotEmpty(message = "TOPIC NAME EMPTY", groups = {TopicFormCheck.class })
	private String topicName;
    
	public String getTopicName() {
		return topicName;
	}
	public void setTopicName(String topicName) {
		this.topicName=topicName;
	}
}