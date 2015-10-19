package iSurvey.com.dao;

import javax.naming.*;
import javax.sql.*;
import java.sql.*;

public class ConnectionDAO {
	private static DataSource surveyDS = null;
	private static Context surveyContext = null;

	public static DataSource iSurveyConn() throws Exception {
		if (surveyDS != null) {
			return surveyDS;
		}

		try {
			if (surveyContext == null) {
				surveyContext = new InitialContext();
			}

			surveyDS = (DataSource) surveyContext.lookup("iSurveyconnectionpool");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return surveyDS;
	}

	protected static Connection MssConnection() {
		Connection conn = null;
		try {
			conn = iSurveyConn().getConnection();
			return conn;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;
	}
}
