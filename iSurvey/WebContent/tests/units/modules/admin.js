var adminObj = adminObj || {};

adminObj.adminObj = function() {
	var userId;
	var surveyUUID;
};

adminObj.adminObj.prototype = {

	CreateNewSurvey : function(surveyName, surveyDescription, surveyCreator,
			isAnonymous, surveyType, startDate, endDate) {
		$("#page_header").hide();
		globalObj.ShowPreLoader();
		$.ajax({
			type : "POST",
			url : "../../../test-admin/action/addnewsurvey",
			data : "{\"surveyName\":\"" + surveyName + "\""
					+ ",\"surveyDesc\":\"" + adminObj.ReplaceCaharacters(surveyDescription) + "\","
					+ "\"surveyCreator\":\"" + surveyCreator + "\","
					+ "\"isAnonymous\":\"" + ((isAnonymous) ? "0" : "1")
					+ "\"," + "\"surveyType\":\"" + surveyType + "\","
					+ "\"startDate\":\"" + startDate + "\"," + "\"endDate\":\""
					+ endDate + "\"" + "}",
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;

				globalObj.SetSurveyUUID(response.surveyId);
				adminObj.SaveSurveyRecepientType(response.surveyId, globalObj
						.GetSurveyType());
				adminObj.AddRecepienTypeListEmails(response.surveyId);
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
		var isRequired = this.GetAllRequiredQuestion();
		var sequence = this.GetAllQuestionForSurveySaveSequence();
		
		for (var i = 0; i < questions.length; i++) {

			globalObj.ShowPreLoader();
			
			this.SendSaveSurveyAllDetails(globalObj.GetSurveyUUID(),
					questions[i], answers[i], questionUUID[i], isRequired[i],sequence[i]);
		}
		globalObj.HidePreLoader();
		alert("success");
		globalObj.ReadActiveSurvey();
		questions = [];
		
	},
	
	UpdateSurvey : function(surveyUUID) {
		$("#active_reports_display").hide();
		var questions = this.GetAllQuestionForSurveySaveUpdate();
		var answers = this.GetAnswerTypeUpdate();
		var questionUUID = this.GetAllQuestionUUIDforSaveUpdate();
		var isRequired = this.GetAllRequiredQuestionUpdate();
		var sequence = this.GetAllQuestionForSurveySaveSequenceUpdate();
		
		for (var i = 0; i < questions.length; i++) {

			globalObj.ShowPreLoader();
			
			this.SendSaveSurveyAllDetails(globalObj.GetSurveyUUID(),
					questions[i], answers[i], questionUUID[i], isRequired[i],sequence[i]);
		}
		globalObj.HidePreLoader();
		alert("success");
		globalObj.ReadActiveSurvey();
		questions = [];
		
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
					
					if (this.value != "")
						question.push(adminObj.ReplaceCaharacters(this.value));
				});
		
		return question;
		
	},
	GetAllQuestionForSurveySaveSequence : function() {
		var sequence = [];
		$("input[question-survey-id='" + globalObj.GetSurveyUUID() + "'").each(
				function() {
					sequence.push($(this).attr("question-sequence"));
				});

		return sequence;   
	},
	GetAllRequiredQuestion : function() {
		var is_required = [];
		$("input[option-type='is-required'").each(function() {
			is_required.push(($(this).is(":checked") == true ? "1" : "0"));
		});

		return is_required;
	},
	GetAllQuestionUUIDforSave : function() {
		var questionUUID = [];
		$("input[question-survey-id='" + globalObj.GetSurveyUUID() + "'").each(
				function() {
					questionUUID.push($(this).attr("question-id"));
				});

		return questionUUID;
	},
	
	
	
	 
	 GetAnswerTypeUpdate : function() {
		var answerType = [];
		$("." + globalObj.GetSurveyUUID() + "-update").each(function() {
			answerType.push(this.value);
		});

		return answerType;
	},
	GetAllQuestionForSurveySaveUpdate : function() {
		
		var question = [];
		$("input[question-survey-id-update='" + globalObj.GetSurveyUUID() + "'").each(
				function() {
					
					if (this.value != "")
						question.push(adminObj.ReplaceCaharacters(this.value));
				});
		
		return question;
		
	},
	GetAllQuestionForSurveySaveSequenceUpdate : function() {
		var sequence = [];
		$("input[question-survey-id-update='" + globalObj.GetSurveyUUID() + "'").each(
				function() {
					sequence.push($(this).attr("question-sequence-update"));
				});

		return sequence;   
	},
	GetAllRequiredQuestionUpdate : function() {
		var is_required = [];
		$("input[option-type='is-required-update'").each(function() {
			is_required.push(($(this).is(":checked") == true ? "1" : "0"));
		});

		return is_required;
	},
	GetAllQuestionUUIDforSaveUpdate : function() {
		var questionUUID = [];
		$("input[question-survey-id-update='" + globalObj.GetSurveyUUID() + "'").each(
				function() {
					questionUUID.push($(this).attr("question-id-update"));
				});

		return questionUUID;
	},
	 
	 
	 
	
	
	SendSaveSurveyAllDetails : function(surveyId, quesetionName, answerTypeId,
			questionUUid, isRequired,sequence) {

		$.ajax({
			type : "POST",
			url : "../../../test-admin/action/addnewquesetion",
			data : "{\"surveyId\":\"" + surveyId + "\""
					+ ",\"quesetionName\":\"" + quesetionName + "\","
					+ "\"answerTypeId\":\"" + answerTypeId
					+ "\",\"questionUUid\":\"" + questionUUid
					+ "\",\"isRequired\":\"" + (isRequired == "" ? "0" : isRequired)
					+ "\",\"sequence\":\"" + sequence + "\"}",
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

	},  

	DeleteSurveyQuestion : function(surveyId) {
		$.ajax({
			type : "POST",
			url : "../../../test-admin/action/deleteforupdatequestion",
			data : "{\"surveyId\":\"" + surveyId + "\"}",
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;
				adminObj.UpdateSurvey(surveyId);
			},
			complete : function(e) {

			},  
			error : function(xhr) {
				var jsonResponse = JSON.parse(xhr.responseText);
				alert(jsonResponse.error); 
			}
		});
	},

	EmailSurveyToRespondents : function(surveyId, message) {
		var objects = "";
		globalObj.ShowPreLoader();
		$.ajax({
			type : "POST",
			url : "../../../test-admin/action/sendemail",
			data : "{\"surveyId\":\"" + globalObj.GetSurveyId()
					+ "\",\"message\":\"" + adminObj.ReplaceCaharacters(message) + "\"}",
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;
			},  
			complete : function(e) {
				 $('#emailModal').modal('toggle');
				globalObj.HidePreLoader();
				globalObj.ReadActiveSurvey();
				alert("email sent!!");
				
			},
			error : function(xhr) {
				var jsonResponse = JSON.parse(xhr.responseText);
				alert(jsonResponse.error);
			}
		});
	},
	
	ReplaceCaharacters : function(stringText){
		var NewstringText = "";
		NewstringText = stringText.replace(/(?:\r\n|\r|\n)/g, '<br />');
		NewstringText = stringText.replace(/[^\w\s]/gi, ' ');
		
		return NewstringText;
	},
	SaveSurveyRecepientType : function(surveyId, surveyType) {
		globalObj.ShowPreLoader();
		$.ajax({
			type : "POST",
			url : "../../../test-admin/action/savesurveyrecepienttype",
			data : "{\"surveyId\":\"" + surveyId + "\"," + "\"surveyType\":\""
					+ surveyType + "\"" + "}",
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
	},
	GetMultipleValues : function(elementId) {

		return $("#" + elementId).val();
	},
	AddRecepienTypeListEmails : function(surveyId) {
		var recepients = [];
		switch (globalObj.GetSurveyType()) {
		case "1":
			recepients = adminObj.GetMultipleValues("wg_reciepient_list");
			break;
		case "2":
			recepients = adminObj.GetMultipleValues("tm_reciepient_list");
			break;
		case "3":
			recepients = adminObj
					.GetMultipleValues("individual_reciepient_list");
			break;
		}

		globalObj.ShowPreLoader();
		$.ajax({
			type : "POST",
			url : "../../../test-admin/action/addrecepienttypeemails",
			data : "{\"recepients\":\"" + recepients + "\","
					+ "\"surveyType\":\"" + globalObj.GetSurveyType() + "\""
					+ ",\"surveyId\":\"" + surveyId + "\"" + "}",
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
	},
	DownloadExcel : function() {
		window.open('../../../Reports?sn='
				+ $("#survey_list option:selected").text() + "&surveyId="
				+ $("#survey_list option:selected").attr("survey-uu-id")
				+ "&ano=" + globalObj.GetSurveyIsAnonymous(), '_blank', '');
	},
	AddToFollowUpCount : function(surveyId, message) {
		$.ajax({
			type : "POST",
			url : "../../../test-admin/action/addtofollowupemail",
			data : "{\"surveyId\":\"" + surveyId + "\"," + "\"message\":\""
					+ message + "\"" + "}",
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
	},
	UpdateSurveyDates : function(surveyId,startDate, endDate) {
		globalObj.ShowPreLoader();
		$.ajax({
			type : "POST",
			url : "../../../test-admin/action/updatesurveydates",
			data : "{\"surveyUUID\":\"" + surveyId + "\"," + "\"startDate\":\""
					+ startDate + "\",\"endDate\":\"" + endDate + "\"}",
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;
						alert("Update Successful");
			},
			complete : function(e) {
				$('#otherSurveyDetails').modal('toggle');
				globalObj.HidePreLoader();
			},
			error : function(xhr) {
				var jsonResponse = JSON.parse(xhr.responseText);
				alert(jsonResponse.error);
			}
		});
	},CreateNewAseSurvey : function(){
		console.log($(".amers_shift_class").attr("chk-val"));  
		
	}
	
};