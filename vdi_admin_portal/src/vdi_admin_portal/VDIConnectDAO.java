package vdi_admin_portal;

import java.sql.Connection;

import javax.naming.*;
import javax.sql.DataSource;

public class VDIConnectDAO {

	private static DataSource ds = null;
	private static Context ctx = null;

	public static DataSource VdiDataSource() {  
		if (ds != null) {  
			return ds;
		}  

		try {
			if (ctx == null) {
				ctx = new InitialContext();
			}
			ds = (DataSource) ctx.lookup("vdi_launcher_connection_pool");
		} catch (Exception e) {
			System.out.println(e.getMessage());  
		}

		return ds;
	}

	protected static Connection MssConnection() {
		Connection conn = null;
		try { 
			conn = ds.getConnection();
			return conn;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;
	}
}
