<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<style type="text/css">
.multiselectable {
	height: 200px";
	width: 500px;
	display: block;
	overflow: hidden;
	width: 100%;
	width: 500px;
}

.multiselectable select,.multiselectable div {
	width: 200px;
	float: left;
}

.multiselectable div * {
	display: block;
	margin: 0 auto;
}

.multiselectable div {
	display: inline;
}

.multiselectable .m-selectable-controls {
	margin-top: 3em;
	width: 50px;
}

.multiselectable .m-selectable-controls button {
	margin-top: 1em;
}

body {
	font-family: arial;
	font-size: small;
}

table {
	-moz-column-gap: 5px; /* Firefox */
	font-family: arial;
	font-size: small;
}
</style>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<script type="text/javascript">
$(document).ready(function(){
	$.ajax({
		type : "POST",
		url : "GetVMLanguageDetail",
		data : '{"langId":"' + localStorage.getItem('langId') + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var i = 0;
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				langName = resultsArray[0].LanguageName;
				$("#language_name_update").val(resultsArray[0].LanguageName);
			}
		},
		complete : function(e) {
			$("#language_name_update").val(langName);
			$.unblockUI();
		}
	});
});
$("#language_update_button").click(function(){
	$.blockUI();
	UpdateLanguage(localStorage.getItem("langId"));
});
</script>
</head>
<body>
	Update OS Language
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<div>
		<div>
			<center>
				OS Language: <input type="text" id="language_name_update" value="" style="width: 200px; height: 20px;" /> 
				<br />
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<div>
					<input type="button" value="Back" id="language_name_update"
						onclick="GetBackTolangList()" style="width: 110px;" /> &nbsp;
					&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <input type="button"
						value="Update" id="language_update_button" style="width: 110px;" />
				</div>
			</center>
		</div>
	</div>
</body>
</html>