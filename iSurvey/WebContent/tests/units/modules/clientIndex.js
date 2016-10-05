$(document).ready(function() {

	//clientObj.validateSurveyAndUser(userId, surveyId);
	/*if($.browser.chrome){*/
			$("#cancel_answer_survey_page").click(function() {
				window.close();
			});
	
			$("#savesurveyanswers").click(function() {
				clientObj.AddSurveyUsermapping(clientObj.getParameterByName("s"), clientObj
						.getParameterByName("u"));
			});
			
			
			clientObj.IsAnswered(clientObj.getParameterByName("s"), clientObj.getParameterByName("u"));

		/*}else{
			alert("Kindly use Google Chrome");
			var message = '<p>When using other browsers,kindly copy and paste the URL address from your current browser to google chrome</p><p>Thank You!!</p>Dev Manila';
			$(".container").html("<p>Please use Google Chorme</p>" + message); 
		}*/
});  