import java.io.IOException;
import java.sql.*;
import java.text.ParseException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.logging.*;

import jxl.Workbook;
import jxl.write.*;
import vdi_admin_portal.VDIConnectDAO;

/**
 * Servlet implementation class DownloadExcel
 */
@WebServlet("/DownloadExcel")
public class DownloadExcel extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DownloadExcel() {
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
	
	WritableCell cell = null;
	WritableCellFormat cf = null;
	private Connection con;
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		{
			
			try {
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
				
				Statement st = con.createStatement();
				
				st.executeUpdate("EXEC [GetAllVmAndProd]");
				ResultSet VDI = st.executeQuery("SELECT * FROM ExcelVDITemtable");
				/*VDI = cs.executeQuery(); */  
				
				response.setContentType("application/vnd.ms-excel");
				response.setHeader("Content-Disposition",
						"attachment; filename=VDI VM Pools.xls");
				WritableWorkbook w = Workbook.createWorkbook(response
						.getOutputStream());
				WritableSheet s = w.createSheet("VDI Data", 0);
				WritableCellFormat cellFormat = new jxl.write.WritableCellFormat(
						new jxl.write.DateFormat("MM/dd/yyyy hh:mm"));

				int counter = 1;
				s.addCell(new Label(0, 0, "VM Reference"));
				s.addCell(new Label(1, 0, "VM Product Name"));
				s.addCell(new Label(2, 0, "Operating System"));
				s.addCell(new Label(3, 0, "IE Version"));
				s.addCell(new Label(4, 0, "Language"));
				s.addCell(new Label(5, 0, "Office"));
				
				s.addCell(new Label(6, 0, "Region"));
				s.addCell(new Label(7, 0, "URI LINK"));

				while (VDI.next()) {
					s.addCell(new Label(0, counter, VDI.getString("vmRef")));
					s.addCell(new Label(1, counter, VDI.getString("vmRefProd")));
					s.addCell(new Label(2, counter, VDI.getString("vmRefOs")));
					s.addCell(new Label(3, counter, VDI.getString("vmIE")));
					s.addCell(new Label(4, counter, VDI.getString("vmLanguage")));
					s.addCell(new Label(5, counter, VDI.getString("vmOffice")));
					
					s.addCell(new Label(6, counter, VDI.getString("vmRegion")));
					s.addCell(new Label(7, counter, VDI.getString("vmLink")));
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
				Logger.getLogger(DownloadExcel.class.getName()).log(
						Level.SEVERE, null, ex);
			} finally {
				try {
					if (con != null) {
						con.close();
					}
				} catch (SQLException ex) {
					Logger.getLogger(DownloadExcel.class.getName()).log(
							Level.SEVERE, null, ex);
				}
			}
		}
	}
}
