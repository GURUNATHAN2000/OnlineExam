package com.vastpro.ofbizdemo.events;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ofbiz.base.util.UtilMisc;
import org.apache.ofbiz.service.GenericServiceException;
import org.apache.ofbiz.service.LocalDispatcher;
import org.apache.ofbiz.service.calendar.RecurrenceRule;

public class ScheduleEvent {
	public static final String module = ScheduleEvent.class.getName();
	private static final Integer count = 0;
	
	public static String callEvent(HttpServletRequest request, HttpServletResponse response) {
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute("dispatcher");
		
		// This example will schedule a service to run now and repeat once every 5 seconds a total of 10 times.
		Map<String, Object> context = UtilMisc.toMap("message","This is a test.");
		try {
		    long startTime = (new Date()).getTime();
		    int frequency = RecurrenceRule.SECONDLY;
		    int interval = 5;
		    int count = 10;
		    dispatcher.schedule("ScheduleService", context, startTime, frequency, interval, count);
		} catch (GenericServiceException e) {
			String errMsg = "Unable to invoke Schedule Service : " + e.toString();
			request.setAttribute("_ERROR_MESSAGE_", errMsg);
			return "error";
		}
		return "success";
	}
}