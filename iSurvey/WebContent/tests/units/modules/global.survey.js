var global = global || {};

global.globalObj = function() {
	var userId;
	var surveyUUID;
};

global.globalObj.prototype = {

	SetSurveyUUID : function(uuid) {
		this.surveyUUID = uuid;
	},
	GetSurveyUUID : function() {
		return this.surveyUUID;
	},

	AppendNewQuestionType : function(tableId, surveyId) {
		var uuid = this.generateUUID();
		var element = "";

		element = element + "<tr><td>Question</td>";
		element = element
				+ "<td><input class='form-control' question-survey-id='"
				+ ((surveyId == undefined) ? "Empty" : surveyId)
				+ "' type='text' value='' question-id='" + uuid + "'";
		element = element + " class='" + surveyId + "' /></td>";
		element = element + " <td><select class='" + surveyId
				+ "' answer-survey-id='"
				+ ((surveyId == "undefined") ? "Empty" : surveyId) + "' id='"
				+ ((surveyId == "undefined") ? "Empty" : surveyId) + "_" + uuid
				+ "'>";

		element = element + "<option value='0'>--</option>";
		element = element + "<option value='1'>Score</option>";
		element = element + "<option value='2'>Rating</option>";
		element = element + "<option value='3'>Verbatim</option>";
		element = element + "</select></td></tr>";

		$("#" + tableId).append(element);
		console.log(uuid);
	},

	generateUUID : function() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
				function(c) {
					var r = (d + Math.random() * 16) % 16 | 0;
					d = Math.floor(d / 16);
					return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
				});
		return uuid;
	},
	ShowPreLoader : function() {
		$.LoadingOverlay("show");
	},
	HidePreLoader : function() {
		$.LoadingOverlay("hide");
	},
	ReadActiveSurvey : function() {
		$("#sample_wat_test").hide();
		$("#page_header").show();
		$("#active_reports_display").show();
		$("#active_reports_display").html("");
		var data = "";
		$
				.ajax({
					type : "POST",
					url : "../../../test-admin/action/getallactivesurvey",
					data : "{}",
					contentType : "application/x-www-form-urlencoded",
					dataType : "json",
					success : function(response) {
						var resultsArray = (typeof response) == 'string' ? eval('('
								+ response + ')')
								: response;
						data = data
								+ "<table width='100%' class='table-hover' align='left' style='text-align:left; padding : 15px; spacing : 10px;>";
						data = data + "<tbody  class='form-control'>"
						for (var i = 0; i < resultsArray.length; i++) {
							data = data
									+ "<tr><td><img src='../../common/lib/images/survey_icon.png'></td>";
							data = data
									+ "<td><span><a href='javascript:void(0)' onclick='globalObj.GetSurveyDetails(\""
									+ resultsArray[i].survey_uu_id + "\")'>"
									+ resultsArray[i].survey_name
									+ "</a></span></td>";
							data = data
							+ "<td><a href='javascript:void(0)' onclick='globalObj.LoadUpdateSurvey(\"" +resultsArray[i].survey_uu_id +"\")'>Archive</a></td>";
							data = data
									+ "<td><a href='javascript:void(0)' onclick='globalObj.LoadUpdateSurvey(\"" +resultsArray[i].survey_uu_id +"\")'>Update</a></td>";
							data = data
									+ "<td><a href='javascript:void(0)' onclick='globalObj.LoadUpdateSurvey()'>Email</a></td>";
						}
						data = data + "</tr></tbody></table>";

					},
					complete : function(e) {
						$("#active_reports_display").append(data);
						
					},
					error : function(a, b, c) {
						alert(c
								+ " Please send an email to marangelo.delatorre@thomsonreuters.com ");
					}
				});
	},
	ReadArchiveSurvey : function() {

	},
	test : function() {
		alert(argument[0]);
	},
	ShowCreateSurveyPage : function() {
		$("#sample_wat_test").show();
		$("#sample_wat_test").load("activesurvey.jsp");
		$("#active_reports_display").hide();
		
	},
	GetSurveyDetails : function(surveyId,tableId) {
		var data = "";
		$
				.ajax({
					type : "POST",
					url : "../../../test-admin/action/getallactivesurvey",
					data : "{}",
					contentType : "application/x-www-form-urlencoded",
					dataType : "json",
					success : function(response) {
						var resutsArray = (typeof response) == 'string' ? eval('('
								+ response + ')')
								: response;
						for (var i = 0; i < resultsArray.length; i++) {
							data += this.BuidlQuestionType(
									resultsArray[i].answer_type,
									resultsArray[i].question_name);
						}

					},
					complete : function() {
						$("#" + tableId).append(data);
					},
					error : function(a, b, c) {
						alert(c
								+ " Please send an email to marangelo.delatorre@thomsonreuters.com ");
					}
				});
	},
	LoadUpdateSurvey : function(surveyUUID){
		globalObj.SetSurveyUUID(LoadUpdateSurvey);
		$("#").load("adminupdatepaage.jsp");
	},
	BuidlQuestionType : function(answerType, value) {
		var element = "";
		
		element = element + "<tr><td>Question</td>";
		element = element
				+ "<td><input class='form-control' type='text' value='" + value
				+ "' question-id='" + surveyId + uuid + "'";
		element = element + " class='" + surveyId + "' /></td>";
		element = element + " <td><select id='" + surveyId + uuid + "'> ";
		if (questionType == "1") {
			element = element
					+ "<option selected='selected' value='1'>Score</option>";
			element = element + "<option value='2'>Rating</option>";
			element = element + "<option value='3'>Verbatim</option>";
			element = element + "</select>";
		} else if (questionType == "2") {
			element = element + "<option value='1'>Score</option>";
			element = element
					+ "<option selected='selected'  value='2'>Rating</option>";
			element = element + "<option value='3'>Verbatim</option>";
			element = element + "</select>";
		} else {
			element = element + "<option value='1'>Score</option>";
			element = element + "<option value='2'>Rating</option>";
			element = element
					+ "<option selected='selected' value='3'>Verbatim</option>";
			element = element + "</select>";
		}
		element += "</td></tr>";

	}

};