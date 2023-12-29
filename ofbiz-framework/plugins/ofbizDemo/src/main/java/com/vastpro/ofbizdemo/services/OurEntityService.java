package com.vastpro.ofbizdemo.services;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.ofbiz.base.util.Debug;
import org.apache.ofbiz.base.util.UtilMisc;
import org.apache.ofbiz.entity.Delegator;
import org.apache.ofbiz.entity.GenericEntityException;
import org.apache.ofbiz.entity.GenericValue;
import org.apache.ofbiz.entity.condition.EntityCondition;
import org.apache.ofbiz.entity.condition.EntityExpr;
import org.apache.ofbiz.entity.condition.EntityOperator;
import org.apache.ofbiz.entity.util.EntityListIterator;
import org.apache.ofbiz.entity.util.EntityQuery;
import org.apache.ofbiz.service.DispatchContext;
import org.apache.ofbiz.service.ServiceUtil;

public class OurEntityService {
	
	public static final String module = OurEntityService.class.getName();
	
	public static Map<String, Object> selectAll (DispatchContext dctx, Map<String, ? extends Object> context) {
		String entityName = "OfbizDemo";
		List<GenericValue> ofbizDemoList = null;
		Map<String, Object> result = ServiceUtil.returnSuccess();
		Delegator delegator = dctx.getDelegator();
		
		//Using Entity engine
/**		try {
			ofbizDemoList = delegator.findList(entityName, null, null, null, null, false);
		} catch (GenericEntityException e) {
			Debug.logError(e, module);
            return ServiceUtil.returnError("Error in creating record in OfbizDemo entity ........" +module);
		} 	
		Debug.logInfo("====================USING ENITTY ENGINE" + ofbizDemoList + "==============", module);
		
		//Using Entity Query API
		try {
			ofbizDemoList = EntityQuery.use(delegator).from("OfbizDemo").queryList();
		} catch (GenericEntityException e) {
			Debug.logError(e, module);
            return ServiceUtil.returnError("Error in creating record in OfbizDemo entity ........" +module);
		}
		Debug.logInfo("====================USING ENITTY API" + ofbizDemoList + "==============", module);
 **/
		//Using Entity engine
		Set<String> fieldTOSelect = UtilMisc.toSet("firstName","lastName");
		List<String> orderBy = UtilMisc.toList("firstName");
		try {
			ofbizDemoList = delegator.findList(entityName, null, fieldTOSelect, orderBy, null, false);
			Debug.logInfo("====================USING ENITTY ENGINE" + ofbizDemoList + "==============", module);
		} catch (GenericEntityException e) {
			Debug.logError(e, module);
            return ServiceUtil.returnError("Error in creating record in OfbizDemo entity ........" +module);
		}
		
		
		//Using Entity Query API
		try {
			ofbizDemoList = EntityQuery.use(delegator).select("firstName", "lastName").from("OfbizDemo").orderBy("firstName").queryList();
			Debug.logInfo("====================USING ENITTY API" + ofbizDemoList + "==============", module);
		} catch (GenericEntityException e) {
			Debug.logError(e, module);
		    return ServiceUtil.returnError("Error in creating record in OfbizDemo entity ........" +module);
		}
		
		//Conditional Record Fetching
		//Using Entity Engine
		EntityListIterator eli = null;
		List<EntityExpr> expr = UtilMisc.toList(EntityCondition.makeCondition("firstName","GURUNATHAN"),EntityCondition.makeCondition("lastName","PREMKUMAR"));
		EntityCondition cond = EntityCondition.makeCondition(expr,EntityOperator.AND);
		orderBy = UtilMisc.toList("firstName");
		try {
			eli = delegator.find(entityName, cond, null, null, orderBy, null);
			GenericValue nextValue = null;
			while((nextValue = eli.next())!=null) {
				Debug.logInfo("CONDITION FECTCHING====================USING ENITTY ENGINE"+nextValue+"=============="+System.lineSeparator() ,module );
			}
		} catch (GenericEntityException e) {
			Debug.logError(e, module);
		    return ServiceUtil.returnError("Error in creating record in OfbizDemo entity ........" +module);
		}
		
		//Using Entity API
		try {
			eli = EntityQuery.use(delegator).from(entityName).where("firstName","GURUNATHAN","lastName","PREMKUMAR").orderBy("firstName").queryIterator();
			GenericValue nextValue = null;
			while((nextValue = eli.next())!=null) {
				Debug.logInfo("CONDITION FECTCHING====================USING ENITTY ENGINE"+nextValue+"=============="+System.lineSeparator() ,module);
			}
		} catch (GenericEntityException e) {
			Debug.logError(e, module);
		    return ServiceUtil.returnError("Error in creating record in OfbizDemo entity ........" +module);
		}
		
		return result;
	}
		
}
