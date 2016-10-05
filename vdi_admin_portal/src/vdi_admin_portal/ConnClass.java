package vdi_admin_portal;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class ConnClass {



	private static DataSource MysqlDS = null;
	private static Context context = null;

	public static DataSource MysqlDSConn() throws Exception {

		if (MysqlDS != null) {
			return MysqlDS;
		}

		try {
			if (context == null) {
				context = new InitialContext();
			}
			MysqlDS = (DataSource) context.lookup("vdiconn");

		} catch (Exception e) {
			e.printStackTrace();

		}
		return MysqlDS;
	}
}

