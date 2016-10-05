<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
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

.square {
	background: #000;
	width: 50vw;
	height: 50vw;
}

table {
	-moz-column-gap: 5px; /* Firefox */
	font-family: arial;
	font-size: small;
}
</style>
<script src="js/tinymce/tinymce.min.js"></script>
<script type="text/javascript">
	$(document).ready(
			function() {
				/**/
				$.unblockUI();
				GetComment();
				$("#add_new_comment").click(
						function() {
							AddCommentToDB("");
						});
			});
	function ReplaceNewLine(NewLine){
	
		var toBR = NewLine.replace(/\\u00a0/g," ");
		toBR  = toBR .replace(/\\n/g,"<br />");
		return toBR;
	}

	function ReplaceStrings(stringToReplace) {

		var text = stringToReplace;
		text = text.replace(/&#32;/g, ':&nbsp;');
		text = text.replace(/\n/g, '<br />');
		text = text.replace(/=/g,"$");
		text =text.replace(/\\"/g,"~");
		//text = text.replace(/^style:/g, 'style=');
		text = text.substring(1,text.length-1);


		return text;
	}
	function AddCommentToDB(osId) {
		//var obj = tinymce.util.JSON.serialize(tinymce.get('vdi_comment').getContent());
		var obj = tinymce.util.JSON.serialize(tinymce.get('vdi_comment').getContent());
		//alert(tinyMCE.activeEditor.getContent({format : 'raw'}));
		
		$.blockUI();
		$.ajax({
			type : "POST",
			url : "AddComment",
			data : '{"osId":"' + encodeURIComponent(ReplaceStrings(obj)) + '"}',
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				$.unblockUI();
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;
				alert("Announcement Sucessfully Published");
			},
			complete : function(e) {
				//LogOSActivity('3', '8', osId, localStorage.getItem('userId'));
				alert("Announcement Sucessfully Published");
				$.unblockUI();
  
			}
		});

	}
	function GetComment() {
		
		
		$.blockUI();
		$.ajax({
			type : "POST",
			url : "GetCommentFromDB",
			data : '{}',
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {

				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;
				for (var i = 0; i < resultsArray.length; i++) {
					$("#vdi_comment").html(ReplaceNewLine(resultsArray[0].comment));
				}
			},

			complete : function(e) {
				//LogOSActivity('3', '8', osId, localStorage.getItem('userId'));
				tinymce.init({
					selector : "textarea",
					statusbar : false,
					force_br_newlines : true,
					forced_root_block : '',
					force_p_newlines: true,
					entity_encoding : "raw"
				});

				$.unblockUI();
				
			}
		});

	}
</script>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Add Comment</title>
</head>
<body>
	<textarea id="vdi_comment" cols="10" rows="8"
		style="margin: 0px; width: 100%; height: 186px;"></textarea>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<input type="button" id="add_new_comment" value="Add Phrase"
		style="width: 150px;" />
</body>
</html>