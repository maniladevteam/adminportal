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
		url : "GetVmIeDetail",
		data : '{"ieId":"' + localStorage.getItem('ieId') + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			var i = 0;
			
			for (i = 0; i < resultsArray.length; i++) {
				ieName = resultsArray[0].IeName;
				$("#ie_name_update").val(resultsArray[0].IeName);
			}
		},
		complete : function(e) {
			$("#ie_name_update").val(ieName);
			$.unblockUI();
		}
	});
});
$("#ie_update_button").click(function(){
	$.blockUI();
	UpdateIeVersion(localStorage.getItem("ieId"));
});
</script>
</head>
<body>
	Update Internet Explorer
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<div>
		<div>
			<center>


				Internet Explorer Version: <input type="text" id="ie_name_update" value="" style="width: 200px; height: 20px;" /> 
				<br />
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<div>
					<input type="button" value="Back" id="vm_update_ie_back"
						onclick="GetBackToIeList()" style="width: 110px;" /> &nbsp;
					&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <input type="button"
						value="Update" id="ie_update_button" style="width: 110px;" />
				</div>
			</center>
		</div>
	</div>
</body>
</html>