
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
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
 * Servlet implementation class AddComment
 */
@WebServlet("/AddComment")
public class AddComment extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AddComment() {
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
		Connection con = null;
		String email = null;
		try {

			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");
			JSONObject jsonObj = new JSONObject(jsonParameters);
 
			email = (jsonObj.optString("osId","")); 
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver"); 
			String connectionUrl = "jdbc:sqlserver://10.4.10.137:1433;"
					+ "databaseName=GVDI;user=WebDev;password=Manila1;";

			con = VDIConnectDAO.VdiDataSource().getConnection();

			// java.sql.Driver d = new com.mysql.jdbc.Driver();

			ResultSet helpDeskScore;
			email = (email).replace("style:", "style=").replace("'","\\\"").replace("~", "\"").replace("$","=");
			CallableStatement cs = con.prepareCall("EXEC [UpdateComment] " + "'" + email + "'");

			helpDeskScore = cs.executeQuery();
			
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(
					ResultSetConverter.convert(helpDeskScore).toString());

		} catch (SQLException e) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String exceptionAsString = sw.toString();
			
			response.getWriter().write(exceptionAsString + " SQL error");
		} catch (JSONException f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			String error = f.getMessage();
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((email).replace("\\~", "\"").replace("style:", "style=") + "'");
			response.getWriter().write("JSON: " + error);
		} catch (ClassNotFoundException f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			String error = f.getMessage();
			response.getWriter().write("JSON: " + error);
		} catch (NoClassDefFoundError f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			String error = f.getMessage();
			response.getWriter().write("JSON: " + error);
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((email).replace("\\~", "\"").replace("style:", "style=") + "'");
		} catch (NullPointerException g) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			
			String errnull = g.getMessage();
			//response.getWriter().write(errnull);
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((email).replace("\\~", "\"").replace("style:", "style=") + "'");
		} catch (Exception e) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			String errnull = e.getMessage();
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((email).replace("\\~", "\"").replace("style:", "style=") + "'");
		}finally{
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				response.setContentType("application/json");
				response.setCharacterEncoding("utf-8");
				response.getWriter().write((email).replace("\\~", "\"").replace("style:", "style=") + "'");
			}
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((email).replace("\\~", "\"").replace("style:", "style=") + "'");
			
		}
	}

}
