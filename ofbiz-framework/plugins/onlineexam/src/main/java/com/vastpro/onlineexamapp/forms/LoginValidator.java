package com.vastpro.onlineexamapp.forms;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotEmpty;


import com.vastpro.onlineexamapp.forms.checks.LoginFormCheck;

public class LoginValidator {
	
	@NotEmpty(message = "USERNAME EMPTY", groups = { LoginFormCheck.class })
	@Pattern(regexp = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$", message = "invalidEmailFormat.errorMsg", groups = {
			LoginFormCheck.class })
	private String username;

	@NotEmpty(message = "PASSWORD EMPTY", groups = { LoginFormCheck.class })
	@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", message = "strongPasswordMsg.errorMsg", groups = {
			LoginFormCheck.class })
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
