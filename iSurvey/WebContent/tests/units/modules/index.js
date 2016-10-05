
$(document)
		.ready(
				function() {
					/*
					if(!($.browser.chrome)){
						alert("Kindly use Google Chrome");
						var message = '<p>When using other browsers,kindly copy and paste the URL address from your current browser to google chrome</p><p>Thank You!!</p>Dev Manila';
						$(".container").html("<p>Please use Google Chorme</p>" + message); 
						$("body").click(function(){
							return false;
						});

					}else{*/
					$("#create_new_ase_survey").click(function(){
						adminObj.CreateNewAseSurvey();
					});
					$("#alert_values").click(function(){
						adminObj.AddRecepienTypeListEmails();
					});
					$(".yes").click(function(){
						alert("me");
					});
					
					$("#send_email").click(function(){
						adminObj.EmailSurveyToRespondents(globalObj.GetSurveyId(),$("#email_message").val());
					});
					$("#append_work_group_create_page").click(function(){
						$("#td_multiselect").html("");
						$(this).attr("disabled","disabled");
						$("#td_multiselect").append('<select class="form-control" multiple id="wg_reciepient_list"></select>');
						globalObj.appendWorkGroupList("wg_reciepient_list","");
						
						$("#append_team_manager_create_page").attr("disabled",false);
						$("#append_individual_create_page").attr("disabled",false);
						globalObj.SetSurveyType("1");
						
					});
					
					$("#launch_archives_page").click(function(){
						globalObj.ReadArchiveSurvey();
					});
					
					$("#append_individual_create_page").click(function(){
						$("#td_multiselect").html("");
						$(this).attr("disabled","disabled");
						$("#td_multiselect").append('<select class="form-control" multiple id="individual_reciepient_list"></select>');
						globalObj.AppendAllEmployees("individual_reciepient_list","");
						$("#append_work_group_create_page").attr("disabled",false);
						$("#append_team_manager_create_page").attr("disabled",false);
						globalObj.SetSurveyType("3");
						
					});
					$("#append_team_manager_create_page").click(function(){
						$("#td_multiselect").html("");
						$(this).attr("disabled","disabled");
						$("#td_multiselect").append('<select class="form-control" multiple id="tm_reciepient_list"></select>');
						
						$("#append_work_group_create_page").attr("disabled",false);
						$("#append_individual_create_page").attr("disabled",false);
						globalObj.AppendAllTeamManagers("tm_reciepient_list","");
						globalObj.SetSurveyType("2");
						
					});
					
					$('#myModal').on('shown.bs.modal', function(e) {
						$("#survey_name_add").val("");
				        $("#survey_desc_add").html("");
				        $("#survey_desc_add").val("");
				        $("#survey_start_date").val("");
				        $("#survey_end_date").val("");
				        
				    });
					$('#emailModal').on('shown.bs.modal', function(e) {
						$("#email_message").html("");
				    });
				
					$("#launch_analytics_page_top").click(function(){
						globalObj.LoadPageAnalytics();
					});
					globalObj.SetCurrentpage(localStorage.setItem("page", ""));
					globalObj.MakeDatePicker("survey_start_date","survey_end_date");
					
					
					
					$("#launch_home").click(function(){
						globalObj.ReadActiveSurvey();
					});
					$("#home_button").click(function() {  
						globalObj.ReadActiveSurvey();
					});
					$("#launch_analytics_page").click(function(){
						globalObj.LoadPageAnalytics();
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
																.getItem("0b8b667e7722bc7e363b601ce584259d")
																,$("#anonymous").is("checked"),
																$("#analytic_type").val(),
																$("#survey_start_date").val(),
																$("#survey_end_date").val()
												);
									});

					$("#launch_create_survey_dialogue").click(function() {
						/*globalObj.ShowCreateSurveyPage();  */
						globalObj.HidePreLoader();
					});
					
					//}
				});