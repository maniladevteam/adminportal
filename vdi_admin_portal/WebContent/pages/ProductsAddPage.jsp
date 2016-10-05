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
var  VersionCounter = 1;
$(document).ready(function(){

  $.unblockUI();
	$("#product_add_button").click(function() {
		$.blockUI();
		AddProduct();
	});
	
	$("#add_version_button").click(function(){
	  AppendVersion();
	});
	
	
});

function AddVersionToProduct(){
  
}
function AppendVersion(){
 
  var data = "";
  
  data = data + "<tr class='version'>";
  data = data + "<td>Version Number "+ parseInt(VersionCounter + 1) +" </td>"
  data = data + "<td>";
  data = data + "<input type='text' class='version-number' />";
  data = data + "</td></tr>";
  
  $("#product_table").append(data);
  VersionCounter++;
}	
</script>
</head>
<body>
	Add Product
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<div>
		<div>
			<center>
				<table id="product_table">
					<tr>
						<td>Select Region:</td>
						<td><select id="add_product_region">
								<option value='amers'>AMERS/EMEA</option>
								<option value='apac'>APAC</option>
								<option value='ipbs'>ipbs</option>
						</select></td>
					</tr>
					<tr>
						<td>Product Name:</td>
						<td><input type="text" id="product_name_add"
							placeholder="product name" value=""
							style="width: 200px; height: 20px;" /></td>
					</tr>
					<tr class="version">
						<td>Version Number</td>	
						<td><input type="text" class="version-number"/></td>	
					</tr>

				</table>
				
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<div>
					<a href="javascript:void(0)" id="add_version_button">Add More Version</a>
				</div>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				
				<div>
					<input type="button" value="Back"
						onclick="GetBackToProductsList()" style="width: 110px;" /> &nbsp;
					&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <input type="button"
						value="Add" id="product_add_button" style="width: 110px;" />
				</div>
			</center>
		</div>
	</div>
</body>
</html>	