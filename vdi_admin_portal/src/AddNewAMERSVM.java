import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import vdi_admin_portal.ResultSetConverter;
import vdi_admin_portal.VDIConnectDAO;
/**
 * Servlet implementation class AddNewAMERSVM
 */
@WebServlet("/AddNewAMERSVM")
public class AddNewAMERSVM extends HttpServlet {
	private static final long serialVersionUID = 1L;

	Connection con = null;
	public AddNewAMERSVM() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
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

			// String userDate = ((request.getParameter("userDate") == null) ?
			// ConvertToFormatString(now.toString()) :
			// request.getParameter("userDate"));
			con = null;

			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");
			JSONObject jsonObj = new JSONObject(jsonParameters);

			String vmref = (jsonObj.getString("vmref") == null) ? "" : jsonObj
					.getString("vmref");
			
			String os = (jsonObj.getString("os") == null) ? "" : jsonObj
					.getString("os");
			
			String language = (jsonObj.getString("language") == null) ? "" : jsonObj
					.getString("language");
			
			String office = (jsonObj.getString("language") == null) ? "" : jsonObj
					.getString("office");
			
			String enabled = (jsonObj.getString("enabled") == null) ? "" : jsonObj
					.getString("enabled");
			String uriLink = (jsonObj.getString("uriLink") == null) ? "" : jsonObj
					.getString("uriLink");
			
			uriLink = uriLink.replace(" ", "%20").replace("(","%28").replace(")","%29")
					.replace(",","%2C").replace("-","%2D").replace("/","%2F");
			
			String ieId = (jsonObj.getString("ieId") == null) ? "" : jsonObj
					.getString("ieId");
			
			String product = (jsonObj.getString("product") == null) ? "" : jsonObj
					.getString("product");
			
			
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

			ResultSet helpDeskScore;

			CallableStatement cs = con.prepareCall("EXEC [spAddAmersVirtualMachine] "
					+ "'" + vmref + "'" 
					+ ", ' ','" 
					+ ieId 
					+ "','" + enabled +"'"
					+ ",'" + os +"'"
					+ ",'" + language +"'"
					+ ",'" + office +"'"
					+ ",'" + product +"'"
					+ ",N'" + uriLink.replace("*****","&") +"'"
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
			response.getWriter().write("JSON: " + error);
		} catch (NullPointerException g) {
			String errnull = g.getMessage();
			response.getWriter().write(errnull);
		}finally {
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
