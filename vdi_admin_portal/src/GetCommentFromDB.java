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
 * Servlet implementation class GetCommentFromDB
 */
@WebServlet("/GetCommentFromDB")
public class GetCommentFromDB extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public GetCommentFromDB() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		Connection con = null;
		try {

			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");
			JSONObject jsonObj = new JSONObject(jsonParameters);

			
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			String connectionUrl = "jdbc:sqlserver://10.4.10.137:1433;"
					+ "databaseName=GVDI;user=WebDev;password=Manila1;";

			con = VDIConnectDAO.VdiDataSource().getConnection();

			// java.sql.Driver d = new com.mysql.jdbc.Driver();

			ResultSet helpDeskScore;

			CallableStatement cs = con.prepareCall("EXEC [spGetComments] ");

			helpDeskScore = cs.executeQuery();

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(
					ResultSetConverter.convert(helpDeskScore).toString());

		} catch (SQLException e) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			String message = e.getMessage();
			response.getWriter().write(message + " SQL error");
		} catch (JSONException f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			String error = f.getMessage();
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
		} catch (NullPointerException g) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			String errnull = g.getMessage();
			response.getWriter().write(errnull);
		} catch (Exception e) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			String errnull = e.getMessage();
		}finally{
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

	}
}
