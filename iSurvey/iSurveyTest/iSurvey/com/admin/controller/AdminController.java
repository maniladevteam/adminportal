package iSurvey.com.admin.controller;

import java.sql.SQLException;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONObject;

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
}
