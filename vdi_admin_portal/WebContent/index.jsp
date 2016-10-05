<!-- Coded By MarAngelo Dela torre 2013 -->

<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>GVDI Portal</title>

<link type="text/css" href="css/gvdiMain.css" rel="stylesheet"></link>
<link type="text/css"
	href="js/DataTables-1.9.4/media/css/jquery.dataTables_themeroller.css"
	rel="stylesheet"></link>
<link type="text/css"
	href="js/DataTables-1.9.4/media/css/jquery.dataTables.css"
	rel="stylesheet"></link>
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-1.9.1.js"></script>
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.js"></script>
<script type="text/javascript"
	src="js/DataTables-1.9.4/media/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="js/multiselectable.js"></script>
<script type="text/javascript" src="js/jquery.blockUI.js"></script>
<script type="text/javascript" src="modules/function.js"></script>
<script type="text/javascript">
	var idleTime = 0;  
	$(document).ready(  
			function() {
				
				setInterval(timerIncrement, 60000);
				$(this).mousemove(function(e) {
					idleTime = 0;
				});
				$(this).keypress(function(e) {
					idleTime = 0;
				});
				if (localStorage.getItem('logged') == 1) {
					if (localStorage.getItem('admin') != '1') {
						$('.security_constraint').hide();
						$("#username_span").text(
								'WELCOME: '
										+ localStorage.getItem('loggedname'));
					} else {
						$("#username_span").text(
								'WELCOME: '
										+ localStorage.getItem('loggedname')
										+ ' (Admin)');
					}
					$("#load_amers_link").click(function() {
						$.blockUI();
						$("#containerPage").load("pages/AMERSList.jsp");
					});
					$("#load_apac_link").click(function() {
						$.blockUI();
						$("#containerPage").load("pages/APACList.jsp");  
					});
					$("#load_emea_link").click(function() {
						$.blockUI();
						$("#containerPage").load("pages/EMEAList.jsp");
					});
					$("#load_ipbs_link").click(function() {
						$.blockUI();
						$("#containerPage").load("pages/IPBSList.jsp");
					});

					$("#load_ie_link").click(function() {
						$.blockUI();
						$("#containerPage").load("pages/IEList.jsp");
					});
					$("#load_office_link").click(function() {
						$.blockUI();
						$("#containerPage").load("pages/OfficeList.jsp");
					});
					$("#load_language_link").click(function() {
						$.blockUI();
						$("#containerPage").load("pages/LanguageList.jsp");
					});

					$("#load_comment_link").click(function() {
						$.blockUI();
						$("#containerPage").load("pages/AddCommentpage.jsp");
					});

					$("#load_os_link").click(function() {
						$.blockUI();
						$("#containerPage").load("pages/OsList.jsp");
					});

					$("#load_products_link").click(function() {
						$.blockUI();
						localStorage.removeItem('prodRegion');
						$("#containerPage").load("pages/ProductsList.jsp");
						
					});
				} else {
					window.location = 'login.jsp';
				}

				$("#export_to_excel").click(function() {
				  $("#submitForm").attr("action","DownloadExcel");
					$("form").submit();
				});
				
				$("#export_activity").click(function() {
				  	$("#submitForm").attr("action","DownloadActivity");
					$("form").submit();
				});
			});

	function timerIncrement() {
		idleTime = idleTime + 1;
		if (idleTime > 15) { // 15mins
			localStorage.setItem('logged', '0');
			window.location = 'login.jsp';
		}
	}
	var functionObject = new functionInstance();

	function DownloadExcel() {

		$.ajax({
			type : "POST",
			url : "DownloadExcel",
			data : '{}',
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;
			},
			complete : function(e) {
				alert("Downloaded");
			}
		});
	}
</script>
</head>

<body>
	<form name="dl" id="submitForm" method="post" action="DownloadExcel">
		<div class="container">
			<div class="header">
				<img src="images/headerGVDI02.png" alt="Insert Logo Here"
					width="100%" height="100%;" id="Insert_logo"
					style="background: #7a7a7a;" />
				<!-- end .header -->
			</div>
			<div class="sidebar1"
				style="padding-left: 10px; padding-right: 10px;">
				<ul class="nav">
					<li><span id="username_span"></span></li>
					<li><p>&nbsp;</p></li>
					<li
						style="padding-left: 16px; 16 px; padding-top: 8px; height: 26px; background-color: #7a7a7a; color: white;">PLEASE
						SELECT A REGION</li>
					<li>&nbsp;</li>
					<li><a id="load_amers_link" href="javascript:void(0)"><img
							src="images/images.jpg" style="height: 16px; width: 16px;" />
							AMERS</a></li>
					<li><a id="load_apac_link" href="javascript:void(0)"><img
							src="images/images.jpg" style="height: 16px; width: 16px;" />
							APAC</a></li>
					<li><a id="load_emea_link" href="javascript:void(0)"><img
							src="images/images.jpg" style="height: 16px; width: 16px;" />
							EMEA</a></li>
					<li><a id="load_ipbs_link" href="javascript:void(0)"><img
							src="images/images.jpg" style="height: 16px; width: 16px;" />
							IPBS</a></li>

					<li>&nbsp;</li>
					<li>&nbsp;</li>
					<li
						style="padding-left: 16px; 16 px; padding-top: 8px; height: 26px; background-color: #7a7a7a; color: white;">
						DOCUMENT OPTION</li>
					<li>&nbsp;</li>
					<li><a id="export_to_excel" href="javascript:void(0)"><img
							src="images/excel.png" style="height: 16px; width: 16px;" />
							DOWNLOAD EXCEL</a></li>

					<li><a id="export_activity" href="javascript:void(0)"><img
							src="images/excel.png" style="height: 16px; width: 16px;" />
							DOWNLOAD ACTIVITY</a></li>
					<li>&nbsp;</li>
					<li>&nbsp;</li>
					<li class="security_constraint"
						style="padding-left: 16px; padding-top: 8px; height: 26px; background-color: #7a7a7a; color: white;">PLEASE
						SELECT A FEATURE</li>
					<li>&nbsp;</li>
					<li class="security_constraint"><a id="load_ie_link"
						href="javascript:void(0)">INTERNET EXPLORER</a></li>
					<li class="security_constraint"><a id="load_office_link"
						href="javascript:void(0)">MS OFFICE</a></li>
					<li class="security_constraint"><a id="load_language_link"
						href="javascript:void(0)">OS LANGUAGE</a></li>
					<li class="security_constraint"><a id="load_os_link"
						href="javascript:void(0)">OPERATING SYSTEM</a></li>
					<li class="security_constraint"><a id="load_products_link"
						href="javascript:void(0)">PRODUCTS</a></li>
					<li class="security_constraint"><a id="load_comment_link"
						href="javascript:void(0)">ADD COMMENT</a></li>
					<li class="security_constraint"><p>&nbsp;</p></li>
					<li><a style="color: red" onclick="functionObject.Logout();"
						href="javascript:void(0)">LOGOUT</a></li>
				</ul>
				<p></p>
				<p></p>
			</div>
			<div class="content" id="containerPage">
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<center>
					<img src="images/ThomsonReuters024.png"
						style="height: 80%; width: 80%" />
				</center>
			</div>

			<div class="footer">
				<center>Developed by the Development Group of Reporting
					Team. All rights reserved 2015.</center>
			</div>
		</div>
	</form>
</body>
</html>
