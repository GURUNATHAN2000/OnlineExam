package com.vastpro.ofbizdemo.services;

import java.util.Map;

import org.apache.ofbiz.base.util.Debug;
import org.apache.ofbiz.service.DispatchContext;
import org.apache.ofbiz.service.ServiceUtil;

public class ScheduleService {
	
	public static final String module = ScheduleService.class.getName(); 
	private static Integer count = 0;
	
	public static Map<String, Object> mySchedule(DispatchContext dctx, Map<String, Object> context){
		Map<String, Object> result = ServiceUtil.returnSuccess();
		System.out.println("Schedule Service :: " + ++count +" time" +context.get("message") + "==="+  module);
		Debug.logInfo("Schedule Service :: " + ++count +" time" +context.get("message"), module);
		return result;
	}

}
