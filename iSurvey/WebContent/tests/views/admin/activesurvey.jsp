<div>
active survey
	<table id="active_surveys"></table>
	<div id="test_active_surveys"></div>
	<div id="add_space">
		<a href="javscript:void(0)" id="create_new_survey">Create</a>
	</div>
</div>  

<script>
	$(document).ready(function(){
		
		$("#create_new_survey").click(function(){
			globalObj.AppendNewQuestionType("active_surveys",globalObj.generateUUID());
		});
			
	});
</script>