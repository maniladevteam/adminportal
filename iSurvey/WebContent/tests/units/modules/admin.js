var adminObj = adminObj || {};

adminObj.adminObj = function() {
	var userId;
	var surveyUUID;
};

adminObj.adminObj.prototype = {
		
	CreateNewSurvey : function(surveyName, surveyDescription, surveyCreator) {
		$("#page_header").hide();
		globalObj.ShowPreLoader();
		$.ajax({
			type : "POST",
			url : "../../../test-admin/action/addnewsurvey",
			data : "{\"surveyName\":\"" + surveyName + "\""
					+ ",\"surveyDesc\":\"" + surveyDescription + "\","
					+ "\"surveyCreator\":\"" + surveyCreator + "\"" + "}",
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;

				globalObj.SetSurveyUUID(response.surveyId);
				console.log(globalObj.GetSurveyUUID());
				alert("sucess");
				globalObj.ShowCreateSurveyPage();
				//globalObj.ReadActiveSurvey();
			},
			complete : function(e) {
				$('#myModal').modal('toggle');
				globalObj.HidePreLoader();
			},
			error : function(xhr) {
				var jsonResponse = JSON.parse(xhr.responseText);
				alert(jsonResponse.error);
			}
		});

	},
	ArchiveSurvey : function(surveyUuId) {

	},
	SaveSurvey : function(surveyUUID) {
		$("#active_reports_display").hide();
		var questions = this.GetAllQuestionForSurveySave();
		var answers = this.GetAnswerType();
		var questionUUID = this.GetAllQuestionUUIDforSave();
		for (var i = 0; i < questions.length; i++) {
			globalObj.ShowPreLoader();
			this.SendSaveSurveyAllDetails(globalObj.GetSurveyUUID(),
					questions[i], answers[i], questionUUID[i]);

		}
		globalObj.HidePreLoader();
		alert("success");
		globalObj.ReadActiveSurvey();
	},
	GetAnswerType : function() {
		var answerType = [];
		$("." + globalObj.GetSurveyUUID()).each(function() {
			answerType.push(this.value);
		});

		return answerType;
	},
	GetAllQuestionForSurveySave : function() {
		var question = [];
		$("input[question-survey-id='" + globalObj.GetSurveyUUID() + "'").each(
				function() {
					question.push(this.value);
				});

		return question;
	},

	GetAllQuestionUUIDforSave : function() {
		var questionUUID = [];
		$("input[question-survey-id='" + globalObj.GetSurveyUUID() + "'").each(
				function() {
					questionUUID.push($(this).attr("question-id"));
				});

		return questionUUID;
	},
	SendSaveSurveyAllDetails : function(surveyId, quesetionName, answerTypeId,
			questionUUid) {
		
		$.ajax({
			type : "POST",
			url : "../../../test-admin/action/addnewquesetion",
			data : "{\"surveyId\":\"" + surveyId + "\""
					+ ",\"quesetionName\":\"" + quesetionName + "\","
					+ "\"answerTypeId\":\"" + answerTypeId
					+ "\",\"questionUUid\":\"" + questionUUid +"\"}",
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;
			},
			complete : function(e) {
				globalObj.HidePreLoader();
				
			},
			error : function(xhr) {
				var jsonResponse = JSON.parse(xhr.responseText);
				alert(jsonResponse.error);
			}
		});
	
		
		
	}

};