package com.vastpro.onlineexamapp.forms;

import org.hibernate.validator.constraints.NotEmpty;

import com.vastpro.onlineexamapp.forms.checks.LoginFormCheck;
import com.vastpro.onlineexamapp.forms.checks.RegisterFormCheck;

public class RegisterValidator {
	
	@NotEmpty(message = "firstName EMPTY", groups = { RegisterFormCheck.class })
	@javax.validation.constraints.Pattern(regexp = "[A-Z][a-zA-Z]*", message = "invalidEmailFormat.errorMsg", groups = {
			RegisterFormCheck.class })
	private String firstName;
	
	@NotEmpty(message = "lastName EMPTY", groups = { RegisterFormCheck.class })
	@javax.validation.constraints.Pattern(regexp = "(^\\w+)|(\\w+$)", message = "invalidEmailFormat.errorMsg", groups = {
			RegisterFormCheck.class })
	private String lastName;
	
	@NotEmpty(message = "userLoginId EMPTY", groups = { RegisterFormCheck.class })
	@javax.validation.constraints.Pattern(regexp = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$", message = "invalidEmailFormat.errorMsg", groups = {
			RegisterFormCheck.class })
	private String userLoginId;
	
	@NotEmpty(message = "currentPassword EMPTY", groups = { RegisterFormCheck.class })
	@javax.validation.constraints.Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", message = "strongPasswordMsg.errorMsg", groups = {
			RegisterFormCheck.class })
	private String currentPassword;
	
	@NotEmpty(message = "currentPasswordVerify EMPTY", groups = { RegisterFormCheck.class })
	@javax.validation.constraints.Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", message = "strongPasswordMsg.errorMsg", groups = {
			RegisterFormCheck.class })
	private String currentPasswordVerify;
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getUserLoginId() {
		return userLoginId;
	}
	public void setUserLoginId(String userLoginId) {
		this.userLoginId = userLoginId;
	}
	public String getCurrentPassword() {
		return currentPassword;
	}
	public void setCurrentPassword(String currentPassword) {
		this.currentPassword = currentPassword;
	}
	public String getCurrentPasswordVerify() {
		return currentPasswordVerify;
	}
	public void setCurrentPasswordVerify(String currentPasswordVerify) {
		this.currentPasswordVerify = currentPasswordVerify;
	}
}
