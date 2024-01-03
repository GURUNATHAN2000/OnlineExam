package com.vastpro.onlineexamapp.forms;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotEmpty;


import com.vastpro.onlineexamapp.forms.checks.LoginFormCheck;

public class LoginValidator {
	
	@NotEmpty(message = "USERNAME EMPTY", groups = { LoginFormCheck.class })
	@Pattern(regexp = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$", message = "invalidEmailFormat.errorMsg", groups = {
			LoginFormCheck.class })
	private String USERNAME;

	@NotEmpty(message = "PASSWORD EMPTY", groups = { LoginFormCheck.class })
	@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", message = "strongPasswordMsg.errorMsg", groups = {
			LoginFormCheck.class })
	private String PASSWORD;

	/**
	 * @return the uSERNAME
	 */
	public String getUSERNAME() {
		return USERNAME;
	}

	/**
	 * @param uSERNAME the uSERNAME to set
	 */
	public void setUSERNAME(String uSERNAME) {
		USERNAME = uSERNAME;
	}

	/**
	 * @return the pASSWORD
	 */
	public String getPASSWORD() {
		return PASSWORD;
	}

	/**
	 * @param pASSWORD the pASSWORD to set
	 */
	public void setPASSWORD(String pASSWORD) {
		PASSWORD = pASSWORD;
	}

	
}
