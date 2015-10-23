package iSurvey.com.admin.beans;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.*;
import javax.json.JsonArray;
import javax.ws.rs.core.Response;

import org.json.*;

import com.sun.xml.rpc.processor.modeler.j2ee.xml.exceptionMappingType;

import org.codehaus.jettison.json.JSONObject;
import iSurvey.com.dao.ConnectionDAO;
import iSurvey.com.helper.json.*;

public class AdminBean {

	public JSONArray GetAllActiveSurveys() throws SQLException, Exception {

		PreparedStatement query = null;
		Connection connection = null;
		ResultSet rs = null;
		org.json.JSONArray json = new org.json.JSONArray();

		try {

			connection = ConnectionDAO.iSurveyConntest().getConnection();
			query = connection.prepareStatement("call iperform_survey_db_test.`sp_get_all_active_surveys`()");
			rs = query.executeQuery();

			json = ResultSetConverter.convert(rs);
			return json;

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

	public JSONArray GetSurveyDetail(String surveyUuId) throws SQLException, Exception {

		PreparedStatement query = null;
		Connection connection = null;
		ResultSet rs = null;
		org.json.JSONArray json = new org.json.JSONArray();

		try {

			connection = ConnectionDAO.iSurveyConntest().getConnection();
			query = connection.prepareStatement("call iperform_survey_db_test.`sp_get_survey_detail`(?)");

			query.setString(1, surveyUuId);
			rs = query.executeQuery();

			json = ResultSetConverter.convert(rs);

			return json;

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

	public JSONObject CreateNewSurvey(String surveyName, String surveyDescription, String surveyCreator)
			throws SQLException, Exception {

		CallableStatement query = null;
		Connection connection = null;
		ResultSet rs = null;
		org.json.JSONArray jason = new org.json.JSONArray();
		JSONObject success = null;
		try {

			connection = ConnectionDAO.iSurveyConntest().getConnection();
			String sql = "call iperform_survey_db_test.sp_add_admin_survey(?,?,?,?)";
			query = connection.prepareCall(sql);

			query.setString(1, surveyName);
			query.setString(2, surveyDescription);
			query.setString(3, surveyCreator);
			query.registerOutParameter(4, Types.INTEGER);

			rs = query.executeQuery();
			int surveyId = query.getInt(4);
			if (surveyId == 0) {
				success = new JSONObject("{\"error\":\"Name Already exists\"}");

			} else {
				success = new JSONObject("{\"success\":\"success\",\"surveyId\":\"" + surveyId + "\"}");
			}

			return success;

		} catch (SQLException e) {
			success = new JSONObject("{\"error\":\"error\",\"errorReport\":" + e.getMessage() + "\"");
		} catch (NullPointerException ne) {
			success = new JSONObject("{\"error\":\"error\",\"errorReport\":" + ne.getMessage() + "\"");
		} catch (Exception ex) {
			success = new JSONObject("{\"error\":\"error\",\"errorReport\":" + ex.getMessage() + "\"");

		} finally {

			try {
				if (query != null)
					query.close();
			} catch (Exception e) {
				e.getMessage();
			}

			try {
				if (connection != null)
					connection.close();
			} catch (Exception e) {
				e.getMessage();
			}

		}
		return success;
	}

	public void AddNewQuesetion(String surveyId, String quesetionName, String questionUUid, String answerTypeId)
			throws SQLException, Exception {

		CallableStatement query = null;
		Connection connection = null;
		ResultSet rs = null;
		org.json.JSONArray jason = new org.json.JSONArray();
		JSONObject success = null;
		Integer questionId = 0;
		try {

			connection = ConnectionDAO.iSurveyConntest().getConnection();
			String sql = "call iperform_survey_db_test.sp_add_question(?,?,?)";
			query = connection.prepareCall(sql);

			query.setString(1, questionUUid);
			query.setString(2, quesetionName);
			query.registerOutParameter(3, Types.INTEGER);
			rs = query.executeQuery();

			questionId = query.getInt(3);

			this.SaveToSurveyQuestions(Integer.parseInt(surveyId), questionId);
			this.SaveToQuestionAnswerType(questionId,Integer.parseInt(answerTypeId));

		} catch (SQLException e) {
			success = new JSONObject("{\"error\":\"error\",\"errorReport\":" + e.getMessage() + "\"");
		} catch (NullPointerException ne) {
			success = new JSONObject("{\"error\":\"error\",\"errorReport\":" + ne.getMessage() + "\"");
		} catch (Exception ex) {
			success = new JSONObject("{\"error\":\"error\",\"errorReport\":" + ex.getMessage() + "\"");

		} finally {

			try {
				if (query != null)
					query.close();
			} catch (Exception e) {
				e.getMessage();
			}

			try {
				if (connection != null)
					connection.close();
			} catch (Exception e) {
				e.getMessage();
			}

		}
	}

	private void SaveToSurveyQuestions(Integer surveyId, Integer questionId) {
		CallableStatement query = null;
		Connection connection = null;
		ResultSet rs = null;
		try {

			connection = ConnectionDAO.iSurveyConntest().getConnection();
			String sql = "call iperform_survey_db_test.sp_add_survey_question_mapping(?,?)";
			query = connection.prepareCall(sql);

			query.setInt(1, surveyId);
			query.setInt(2, questionId);
			rs = query.executeQuery();
		} catch (SQLException sqlEx) {
			sqlEx.getMessage();
		} catch (Exception ex) {
			ex.getMessage();
		} finally {
			try {
				if (query != null)
					query.close();
			} catch (Exception e) {
				e.getMessage();
			}

			try {
				if (connection != null)
					connection.close();
			} catch (Exception e) {
				e.getMessage();
			}
		}
	}

	private void SaveToQuestionAnswerType( Integer questionId,Integer answerTypeId) {
		CallableStatement query = null;
		Connection connection = null;
		ResultSet rs = null;
		try {

			connection = ConnectionDAO.iSurveyConntest().getConnection();
			String sql = "call iperform_survey_db_test.sp_add_question_answertype_mapping(?,?)";
			query = connection.prepareCall(sql);

			query.setInt(1, questionId);
			query.setInt(2, answerTypeId);
			
			rs = query.executeQuery();
		} catch (SQLException sqlEx) {
			sqlEx.getMessage();
		} catch (Exception ex) {
			ex.getMessage();
		} finally {
			try {
				if (query != null)
					query.close();
			} catch (Exception e) {
				e.getMessage();
			}

			try {
				if (connection != null)
					connection.close();
			} catch (Exception e) {
				e.getMessage();
			}
		}
	}

}
