<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<link type="text/css" rel="stylesheet" href="css/pages.css"></link>
<!-- <script type="text/javascript" src="js/jquery-ui-1.10.3.custom/js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.js"></script>
<script type="text/javascript" src="js/DataTables-1.9.4/media/js/jquery.dataTables.min.js"></script> -->
<script type="text/javascript" src="modules/APAC.js"></script>
<style type="text/css">
body {
	/* font-size: medium; */
	font-family: arial;
	font-size: small;
}
div#table_apac_vm_list_paginate{
	float:right;
	
}
</style>
<script type="text/javascript">
	$("#add_new_apac_vm_button").click(function(){
		$("#containerPage").load("pages/ApacAddPage.jsp");
		
	});
</script>	
</head>
<body>
	Virtual Machine In APAC Region:
	<p>&nbsp;</p>
	<table style="width:150%; padding-left:20px;" id="table_apac_vm_list"></table>
	<p>&nbsp;</p>
	
	<span style="padding-left:700px;"></span><input type="button" id="add_new_apac_vm_button" value="Add" style="width:150px;" />
	<p>&nbsp;</p>
	<p>&nbsp;</p>
</body>
</html>
