<div>
	<h2>Update Survey Page</h2>
	<div class="table-responsive">
		<table id="update_active_surveys" class="table hover borderless" width='100%'></table>
		<div id="test_active_surveys"></div>
		<div id="add_space">
			<a href="javscript:void(0)" id="create_new_survey">Add Question</a> <a
				href="javscript:void(0)" id="save_elements"
				onclick='adminObj.SaveSurvey("")'>save</a>
		</div>
	</div>
</div>
<script>
	$(document).ready(
			function() {
				globalObj.LoadUpdateSurvey(globalObj.GetSurveyUUID(), "update_active_surveys");
				$("#create_new_survey").click(
						function() {
							globalObj.AppendNewQuestionType("active_surveys",
									globalObj.GetSurveyUUID());
						});

			});
</script>