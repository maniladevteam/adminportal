<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<style type="text/css">
.multiselectable {
	height: 200px"; width : 500px;
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
	GetAddEmeaOS();
	GetAddEmeaOffice();
	GetAddEmeaInternetExplorer();
	GetAddEmeaLanguage();
	GetAddEmeaProducts('emea');
});
$("#vm_add_emea_button").click(function(){
	GetAddEmeaSelectedProducts();
	$.blockUI();
});
</script>
</head>
<body>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	Add New Virtual Machine (EMEA)
	<div>
		<div>
			<center>
				<table style="width: 80%; border-spacing: 10px; padding-left: 70px;">
					<tr>
						<td colspan="2"></td>
					</tr>
					<tr>

						<td>VM Reference:</td>
						<td><input type="text" id="vm_emea_ref_add"
							placeholder="VM Reference Here...." value=""
							style="width: 200px; height: 20px;" /></td>

						<td>MS Office:</td>
						<td><select id="vm_office_emea_add">

						</select></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
					
					<tr>
						<td>VM Enabled</td>
						<td><select id="vm_emea_add_enabled">
							<option value="1">Enabled</option>
							<option value="0">Disabled</option>
						</select></td>
						
					</tr>
					<tr>
						<td>Operating System:</td>
						<td><select id="vm_emea_os_add"></select></td>
						<td>Internet Explorer:</td>
						<td><select id="vm_emea_ie_add"></select></td>
					</tr>
					<tr style="height: 200px;">
						<td>VM Products:</td>
						<td colspan="3"><select multiple="multiple"
							id="vm_emea_product_add" class="multi" style="height: 400px;">
							
						</select></td>

					</tr>
					<tr>
						<td>VM Language</td>
						<td><select id="vm_emea_language_add"></select></td>

					</tr>
					<tr>
						<td>URL Link</td>

						<td colspan="3"><textarea id="vm_emea_url_add" rows="6"
								cols="50" placeholder="Add URL Link Here...."
								style="width: 400px; resize: none;"></textarea></td>
					</tr>
				</table>
				<br /> <br /> <br /> <br />
				<div>

					<input type="button" value="Back" id="vm_add_emea_back" onclick="GetBackToEmeaList()"
						style="width: 110px;" /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
					&nbsp; <input type="button" value="Add"
						id="vm_add_emea_button" style="width: 110px;" />
				</div>
			</center>
		</div>
	</div>
</body>
</html>