package com.vastpro.ofbizdemo.events;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DemoEvents {
	
	public static final String module = DemoEvents.class.getName(); 

	public static String callDemoEvent(HttpServletRequest request, HttpServletResponse response) {
		Map<String, String> demoMap = new HashMap<String, String>();
		demoMap.put("FirstName", "GURU");
		demoMap.put("LastName", "NATHAN");
		request.setAttribute("demoMap", demoMap);
		return "success";
	}

}
