package com.vastpro.onlineexamapp.events;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ofbiz.base.util.Debug;
import org.apache.ofbiz.webapp.control.LoginWorker;

public class LogoutEvent {

	public static final String module = LogoutEvent.class.getName();

	public static String doLogout(HttpServletRequest request, HttpServletResponse response) {

		Debug.logInfo("=========LOGOUT EVENT STARTED SUCCESSFULLY======", module);
		String result = LoginWorker.logout(request, response);
		request.setAttribute("result", result);
		Debug.logInfo("=========LOGOUT EVENT ENDED   SUCCESSFULLY======", module);
		return result;
	}
	
}
