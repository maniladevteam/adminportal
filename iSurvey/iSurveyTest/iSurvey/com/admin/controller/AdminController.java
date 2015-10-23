package iSurvey.com.admin.controller;

import java.sql.SQLException;

import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONObject;

import iSurvey.com.admin.beans.AdminBean;

@Path("/action")

public class AdminController {
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String Status() {
		return "You are running the ";
	}

	@Path("/getadminreports")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String GetReAllReports() {

		return "this is a string";

	}

	@Path("/getallactivesurvey")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Response GetAllSurvey() {
		Response rb = null;
		try {
			/* JSONObject json = new JSONObject(DATA); */
			/* String empId = json.optString("empId", ""); */
			AdminBean adminbean = new AdminBean();

			rb = Response.ok(adminbean.GetAllActiveSurveys().toString()).build();

			if (rb.getEntity().toString().equals("[]")) {
				return Response.status(500)
						.entity("There was an error on the code kindly contact marangelo.delatorre@thomsonreuters.com")
						.build();
			}

			return rb;
		} catch (NullPointerException h) {

			return Response.status(400).entity("You have empty parameter").build();

		} catch (Exception e) {
			e.getMessage();
		}

		return Response.status(500)
				.entity("{\"error\":\"There was an error on the code kindly contact marangelo.delatorre@thomsonreuters.com\"}")
				.build();

	}

	@Path("/addnewsurvey")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Response CreateNewSurvey(String DATA) {
		boolean success = false;
		try {
			Response rb = null;
			JSONObject json = new JSONObject(DATA);
			String surveyName = json.optString("surveyName", "");
			String surveyDesc = json.optString("surveyDesc", "");
			String surveyCreator = json.optString("surveyCreator", "");
			
			AdminBean adminbean = new AdminBean();

			JSONObject JSONreturn = adminbean.CreateNewSurvey(surveyName, surveyDesc, surveyCreator);
			String surveyId = JSONreturn.optString("surveyId", "");
			StringBuilder sb = new StringBuilder();
			
			if(JSONreturn.optString("error","").equals("")){
				sb.append("{\"success\":\"success\",\"surveyId\":\"");
				sb.append(surveyId + "\"}");
				rb = Response.ok(sb.toString()).build();
			}else{
				sb.append("{\"error\":\"" + JSONreturn.optString("error") + "\"}");
				rb = Response.status(500).entity("{\"error\":\"Name already exists\"}").build();
			}  
				
				return rb;

		} catch (NullPointerException h) {
			
			return Response.status(400).entity("You have empty parameter").build();

		} catch (Exception e) {
			Response.ok("{\"error\":\"" + e.getMessage() + "\"}").build();
		} finally {
			success = false;
		}

		return Response.status(500)
				.entity("{\"error\":\"There was an error on the code kindly contact marangelo.delatorre@thomsonreuters.com\"}")
				.build();

	}

	@Path("/getsurveydetail")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Response GetSurveyDetail(String DATA) {
		Response rb = null;
		try {
			JSONObject json = new JSONObject(DATA);
			String surveyUuId = json.optString("surveyUuId", "");
			AdminBean adminbean = new AdminBean();

			rb = Response.ok(adminbean.GetSurveyDetail(surveyUuId).toString()).build();

			if (rb.getEntity().toString().equals("[]")) {
				return Response.status(500)
						.entity("There was an error on the code kindly contact marangelo.delatorre@thomsonreuters.com")
						.build();
			}

			return rb;
		} catch (NullPointerException h) {

			return Response.status(400).entity("You have empty parameter").build();

		} catch (Exception e) {
			e.getMessage();
		}

		return Response.status(500)
				.entity("{\"error\":\"There was an error on the code kindly contact marangelo.delatorre@thomsonreuters.com\"}")
				.build();

	}
	
	@Path("/addnewquesetion")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Response AddNewQuestion(String DATA) {
		boolean success = false;
		try {
			Response rb = null;
			JSONObject json = new JSONObject(DATA);
			String surveyId = json.optString("surveyId", "");
			String quesetionName = json.optString("quesetionName", "");
			String questionUUid = json.optString("questionUUid", "");
			String answerTypeId = json.optString("answerTypeId", "");
			
			AdminBean adminbean = new AdminBean();

			adminbean.AddNewQuesetion(surveyId, quesetionName, questionUUid, answerTypeId);
			
			Response.ok("{\"success\":\"success\",\"surveyId\":\"}").build();
			return rb;

		} catch (NullPointerException h) {
			
			return Response.status(400).entity("You have empty parameter").build();

		} catch (Exception e) {
			Response.ok("{\"error\":\"" + e.getMessage() + "\"}").build();
		} finally {
			success = false;
		}

		return Response.status(500)
				.entity("{\"error\":\"There was an error on the code kindly contact marangelo.delatorre@thomsonreuters.com\"}")
				.build();

	}
}