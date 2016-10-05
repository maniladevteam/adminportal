
import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import java.sql.*;

import vdi_admin_portal.ResultSetConverter;
import vdi_admin_portal.VDIConnectDAO;

/**
 * Servlet implementation class LogActivity
 */
@WebServlet("/LogActivity")
public class LogActivity extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LogActivity() {
		super();
		// TODO Auto-generated constructor stub
	}

	Connection con = null;
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		try {
			String driver = "org.postgresql.Driver";
			SimpleDateFormat now = new SimpleDateFormat("yyyy-MM-dd");
			// String userDate = ((request.getParameter("userDate") == null) ?
			// ConvertToFormatString(now.toString()) :
			// request.getParameter("userDate"));
			con = null;

			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");
			JSONObject jsonObj = new JSONObject(jsonParameters);
			
			
			
			String activity = (jsonObj.getString("activity") == null) ? ""
					: jsonObj.getString("activity");
			String module = (jsonObj.getString("module") == null) ? "" : jsonObj
					.getString("module");
			
			String moduleId = (jsonObj.getString("moduleId") == null) ? "" : jsonObj
					.getString("moduleId");
			
			String userId = (jsonObj.getString("userId") == null) ? "" : jsonObj
					.getString("userId");
			
			
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			try {
				String connectionUrl = "jdbc:sqlserver://10.4.10.137:1433;"
						+ "databaseName=GVDI;user=WebDev;password=Manila1;";
				con = VDIConnectDAO.VdiDataSource().getConnection();
			} catch (Exception e) {
				String myError = e.getMessage();
				response.setContentType("text/html");
				response.getWriter().write(myError);
			}
			// java.sql.Driver d = new com.mysql.jdbc.Driver();

			/*
			 * con = DriverManager.getConnection(
			 * "jdbc:postgresql://localhost:5432/ServicePulseDB", "postgres",
			 * "password");
			 */
			Statement st = con.createStatement();
			ResultSet helpDeskScore;

			CallableStatement cs = con.prepareCall("EXEC [AddActivity] "
					+ "'" + activity + "'" 
					+ ",'" 
					+ module.replace("*****", "&") 
					+ "','" + moduleId +"'"
					+ ",'" + userId +"'"
					);
			helpDeskScore = cs.executeQuery();

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(
					ResultSetConverter.convert(helpDeskScore).toString());

		} catch (SQLException e) {
			String message = e.getMessage();
			response.getWriter().write(message + " SQL error");
		} catch (JSONException f) {
			String error = f.getMessage();
			response.getWriter().write(error);
		} catch (NullPointerException g) {
			String errnull = g.getMessage();
			response.getWriter().write(errnull);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			response.getWriter().write(e.getMessage());
		} finally {
			try {
				if (con != null) {
					con.close();
				}
			} catch (SQLException ex) {
				String nextSQLerr = ex.getMessage();
				response.getWriter().write(nextSQLerr);
			}
		}
	}

}
