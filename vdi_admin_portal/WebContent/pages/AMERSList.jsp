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
div#table_amers_vm_list_paginate{
	float:right;
	
}

</style>

<script type="text/javascript" src="modules/AMERS.js"></script>
<script type="text/javascript">
	$("#add_new_amers_vm_button").click(function(){
		$("#containerPage").load("pages/AmersAddPage.jsp");
		$.blockUI();
	});
</script>
</head>
<body>
	Virtual Machine In AMERS Region:
	<p>&nbsp;</p>
	<table style="width:150%; padding-left:20px;" id="table_amers_vm_list"></table>
	<p>&nbsp;</p>
	
	<span style="padding-left:700px;"></span><input type="button" id="add_new_amers_vm_button" value="Add" style="width:150px;" />
	<p>&nbsp;</p>
	<p>&nbsp;</p>
</body>
</html>