<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<style type="text/css">
body {
	/* font-size: medium; */
	font-family: arial;
	font-size: small;
}

/* tr:nth-child(odd)		{ background-color:#7a7a7a; }
tr:nth-child(even)		{ background-color:#eee; }
 */
</style>
<script type="text/javascript">
	$("#add_new_product_button").click(function() {
		$.blockUI();
		$("#containerPage").load("pages/ProductsAddPage.jsp");
	});
</script>
<script type="text/javascript" src="modules/products.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
</head>
<body>
	Select Products:
	<select id="region_list">
		<option value="amers">Amers/EMEA</option>
		<option value="apac">APAC</option>
		<option value="ipbs">IPBS</option>
	</select>
	<p>&nbsp;</p>
	<table style="width: 150%; padding-left: 20px;" id="table_product_list"></table>
	<p>&nbsp;</p>

	<span style="padding-left: 700px;"></span>
	<input type="button" id="add_new_product_button" value="Add"
		style="width: 150px;" />
	<p>&nbsp;</p>
	<p>&nbsp;</p>
</body>
</html>