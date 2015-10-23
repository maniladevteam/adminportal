$(document)
		.ready(
				function() {
					$("#home_button").click(function() {
						globalObj.ReadActiveSurvey();
					});
					
					globalObj.ReadActiveSurvey();

					$("#create_new_survey")
							.click(
									function() {
										adminObj
												.CreateNewSurvey(
														$("#survey_name_add")
																.val(),
														$("#survey_desc_add")
																.val(),
														localStorage
																.getItem("0b8b667e7722bc7e363b601ce584259d"));
									});

					$("#launch_create_survey_dialogue").click(function() {
						globalObj.HidePreLoader();
					});
				});