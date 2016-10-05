
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableCell;
import jxl.write.WritableCellFormat;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import vdi_admin_portal.VDIConnectDAO;

/**
 * Servlet implementation class DownloadActivity
 */
@WebServlet("/DownloadActivity") 
public class DownloadActivity extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DownloadActivity() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		WritableCell cell = null;;
		WritableCellFormat cf = null;
		Connection con = null;
		try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			try {
				con = VDIConnectDAO.VdiDataSource().getConnection();
			} catch (Exception e) {
				String myError = e.getMessage();
				response.setContentType("text/html");
				response.getWriter().write(myError);
			}
			
			Statement st = con.createStatement();  
			
			st.executeUpdate("EXEC [GetAllVmAndProd]");
			ResultSet VDI = st.executeQuery("exec [dbo].[GetVerbs]");
			/* VDI = cs.executeQuery(); */

			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition", "attachment; filename=VDI Activity.xls");
			WritableWorkbook w = Workbook.createWorkbook(response.getOutputStream());
			WritableSheet s = w.createSheet("VDI Data", 0);
			WritableCellFormat cellFormat = new jxl.write.WritableCellFormat(
					new jxl.write.DateFormat("MM/dd/yyyy hh:mm"));

			int counter = 1;
			s.addCell(new Label(0, 0, "Field Name"));
			s.addCell(new Label(1, 0, "Category"));
			s.addCell(new Label(2, 0, "Region"));
			s.addCell(new Label(3, 0, "Count"));  
			s.addCell(new Label(4, 0, "userId"));
			s.addCell(new Label(5, 0, "Date"));
			s.addCell(new Label(6, 0, "Time"));
			

			while (VDI.next()) {
				s.addCell(new Label(0, counter, VDI.getString("field_name")));
				s.addCell(new Label(1, counter, VDI.getString("category")));
				s.addCell(new Label(2, counter, VDI.getString("region")));
				s.addCell(new Label(3, counter, VDI.getString("count")));
				s.addCell(new Label(4, counter, VDI.getString("user_id")));
				s.addCell(new Label(5, counter, VDI.getString("activity_date")));
				s.addCell(new Label(6, counter, VDI.getString("activity_time")));
			
				counter++;
			}

			w.write();
			w.close();
		} catch (SQLException e) {
			String message = e.getMessage();

			response.setContentType("text/plain");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(message);

		} catch (NullPointerException g) {
		} catch (ClassNotFoundException h) {

		} catch (WriteException ex) {
			Logger.getLogger(DownloadExcel.class.getName()).log(Level.SEVERE, null, ex);
		} finally {
			try {
				if (con != null) {
					con.close();
				}
			} catch (SQLException ex) {
				Logger.getLogger(DownloadExcel.class.getName()).log(Level.SEVERE, null, ex);
			}
		}
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		WritableCell cell = null;;
		WritableCellFormat cf = null;
		Connection con = null;
		try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			try {
				con = VDIConnectDAO.VdiDataSource().getConnection();
			} catch (Exception e) {
				String myError = e.getMessage();
				response.setContentType("text/html");
				response.getWriter().write(myError);
			}
			
			Statement st = con.createStatement();
			
			st.executeUpdate("EXEC [GetAllVmAndProd]");
			ResultSet VDI = st.executeQuery("exec [dbo].[GetVerbs]");
			/* VDI = cs.executeQuery(); */

			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition", "attachment; filename=VDI Activity.xls");
			WritableWorkbook w = Workbook.createWorkbook(response.getOutputStream());
			WritableSheet s = w.createSheet("VDI Data", 0);
			WritableCellFormat cellFormat = new jxl.write.WritableCellFormat(
					new jxl.write.DateFormat("MM/dd/yyyy hh:mm"));

			int counter = 1;
			s.addCell(new Label(0, 0, "Field Name"));
			s.addCell(new Label(1, 0, "Category"));
			s.addCell(new Label(2, 0, "Region"));
			s.addCell(new Label(3, 0, "Count"));  
			s.addCell(new Label(4, 0, "userId"));
			s.addCell(new Label(5, 0, "Date"));
			s.addCell(new Label(6, 0, "Time"));
			

			while (VDI.next()) {
				s.addCell(new Label(0, counter, VDI.getString("field_name")));
				s.addCell(new Label(1, counter, VDI.getString("category")));
				s.addCell(new Label(2, counter, VDI.getString("region")));
				s.addCell(new Label(3, counter, VDI.getString("count")));
				s.addCell(new Label(4, counter, VDI.getString("user_id")));
				s.addCell(new Label(5, counter, VDI.getString("activity_date")));
				s.addCell(new Label(6, counter, VDI.getString("activity_time")));
			
				counter++;
			}

			w.write();
			w.close();
		} catch (SQLException e) {
			String message = e.getMessage();

			response.setContentType("text/plain");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(message);

		} catch (NullPointerException g) {
		} catch (ClassNotFoundException h) {

		} catch (WriteException ex) {
			Logger.getLogger(DownloadExcel.class.getName()).log(Level.SEVERE, null, ex);
		} finally {
			try {
				if (con != null) {
					con.close();
				}
			} catch (SQLException ex) {
				Logger.getLogger(DownloadExcel.class.getName()).log(Level.SEVERE, null, ex);
			}
		}
	}


}
