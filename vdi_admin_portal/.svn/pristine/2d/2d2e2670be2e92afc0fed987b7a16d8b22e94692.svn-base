<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<style type="text/css">
	body {
	font-family: arial;
	background: #FFFFFF;
	margin: 0;
	padding: 0;
	color: #7a7a7a;
	font-size: x-small;
}

button {
	font-family: arial;
	background: #FFFFFF;
	margin: 0;
	padding: 0;
	color: #7a7a7a;
	font-size: x-small;
}
</style>
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-1.9.1.js"></script>
	
	<script type="text/javascript" src="js/jQuery-MD5-master/jquery.md5.js"></script>
	<script type="text/javascript">
		
		$(document).ready(function(){
			$("#vdi_change_button").click(function(){
				if($.md5($('#vdi_current_password').val()) == localStorage.getItem('userpass')){
					if($('#vdi_one_change_user_pass').val() == $('#vdi_two_change_user_pass').val()){
						ChangePassword();
					}else{
						alert("Password Do not Match");
					}
						
				}else{
					alert("Password is invalid for this username");
				}
			});
		});	
			
			function ChangePassword(){
				$.ajax({
					type : "POST",
					url : "ChangePassword",
					data : '{"userId":"' + localStorage.getItem('userId') + '"' +
					',"email":"' + localStorage.getItem('email') +'"' + 	
					',"password":"' + $.md5($("#vdi_two_change_user_pass").val()) +'"}',
					contentType : "application/x-www-form-urlencoded",
					dataType : "json",
					success : function(response) {
						var i = 0;
						var data = "";
						var resultsArray = (typeof response) == 'string' ? eval('('
								+ response + ')') : response;
						
						localStorage.setItem('logged','0');
						alert("Change Password successful, Please Log in again");
						
						
					},
					complete : function(e) {
						window.location = 'login.jsp';
					}
				});
			}

	</script>
<title>Change Password</title>
</head>

<body>
<center>
<div><img src="images/headerGVDI02.png"
				alt="Insert Logo Here" width="100%" height="100%;" id="Insert_logo"
				style="background: #7a7a7a;" /></div>
	<div>
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
		<table frame="box">
			<tr>
				<td colspan="2" aling="center">CHANGE PASSWORD:</td>
			</tr>
			<tr>
				<td>CURRENT PASSWORD:</td>
				<td><input type="password" id="vdi_current_password" ></input></td>
			</tr>
			<tr>
				<td>NEW PASSWORD:</td>
				<td><input type="password" id="vdi_one_change_user_pass"></input></td>
			</tr>
			<tr>
				<td>CONFIRM PASSWORD:</td>
				<td><input type="password" id="vdi_two_change_user_pass"></input></td>
			</tr>
			<tr>
				<td colspan="2">&nbsp;</td>
			</tr>
			<tr>
				<td colspan="2">&nbsp;</td>
			</tr>
			<tr>
				<td colspan="2">&nbsp;</td>
			</tr>
			<tr>
				<td colspan="2"><input type="button" id="vdi_change_button" value="CHANGE" /></td>
			</tr>
		</table>
	</div>
</center>	
</body>
</html>