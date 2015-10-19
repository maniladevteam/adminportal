package iSurvey.com.admin.beans;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.*;
import javax.json.JsonArray;
import javax.ws.rs.core.Response;

import org.json.*;

import iSurvey.com.dao.ConnectionDAO;
import iSurvey.com.helper.json.*;

public class AdminBean {

	public JSONArray GetAllActiveSurveys() throws SQLException, Exception {

		PreparedStatement query = null;
		Connection connection = null;
		ResultSet rs = null;
		org.json.JSONArray jason = new org.json.JSONArray();

		try {

			connection = ConnectionDAO.iSurveyConn().getConnection();
			query = connection.prepareStatement("call ");
			rs = query.executeQuery();

			jason = ResultSetConverter.convert(rs);
			return jason;

		} catch (SQLException e) {
			e.getStackTrace();
		} catch (Exception e) {
			e.getMessage();
		} finally {
			try {
				if (rs != null)
					rs.close();
			} catch (Exception e) {
				
			}

			try {
				if (query != null)
					query.close();
			} catch (Exception e) {
			}

			try {
				if (connection != null)
					connection.close();
			} catch (Exception e) {

			}

		}

		return null;
	}
	
	public JSONArray CreateNewSurvey(
				String surveyName,
				String test
			) throws SQLException, Exception {

		PreparedStatement query = null;
		Connection connection = null;
		ResultSet rs = null;
		org.json.JSONArray jason = new org.json.JSONArray();

		try {

			connection = ConnectionDAO.iSurveyConn().getConnection();
			query = connection.prepareStatement("call ");
			rs = query.executeQuery();

			jason = ResultSetConverter.convert(rs);
			return jason;

		} catch (SQLException e) {
			e.getStackTrace();
		} catch (Exception e) {
			e.getMessage();
		} finally {
			try {
				if (rs != null)
					rs.close();
			} catch (Exception e) {
				
			}

			try {
				if (query != null)
					query.close();
			} catch (Exception e) {
			}

			try {
				if (connection != null)
					connection.close();
			} catch (Exception e) {

			}

		}

		return null;
	}
}
