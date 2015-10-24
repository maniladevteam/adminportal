<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<meta name="this site is to create / record / sruvey the helpdesk" content="">
<meta name="marangelo">
<title>iSurvey</title>
<link href="../../resources/css/bootstrap-3.3.5-dist/css/bootstrap.min.css" rel="stylesheet">
<link href="../../resources/css/bootstrap-3.3.5-dist/css/bootstrap-theme.min.css"></link>
<link href="../../resources/css/bootstrap-3.3.5-dist/css/bootstrap-theme.css.map"></link>
<link href="../../resources/css/bootstrap-3.3.5-dist/css/dashboard.css" rel="stylesheet">

<link href="../../resources/css/bootstrap-3.3.5-dist/css/survey.css"></link>

<script src="../../common/lib/jquery-1.11.3.min.js"></script>  
<script src="../../resources/css/bootstrap-3.3.5-dist/css/jquery.min.js"></script>
<script src="../../resources/css/bootstrap-3.3.5-dist/css/bootstrap.min.js"></script>
<script src="../../resources/css/bootstrap-3.3.5-dist/css/ie-emulation-modes-warning.js"></script>
<script src="../../resources/jquery-ui.min.js"></script>
<script src="../../resources/css/bootstrap-3.3.5-dist/css/ie10-viewport-bug-workaround.js"></script>
	
<script src="../../common/lib/overlay.jquery/loadingoverlay.js"></script>
<script	src="../../resources/css/bootstrap-3.3.5-dist/css/ie-emulation-modes-warning.js"></script>
<script type="text/javascript" src="../../units/modules/global.survey.js"></script>
<script type="text/javascript" src="../../units/modules/admin.js"></script>
<script type="text/javascript" src="../../units/modules/initializer.js"></script>
<script type="text/javascript" src="../../units/modules/index.js"></script>

</head>
   
<body>
	
	<nav class="navbar navbar-inverse navbar-fixed-top">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed"
				data-toggle="collapse" data-target="#navbar" aria-expanded="false"
				aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="navbar-brand" id='home_button'
				href="javascript:void(0)">iSurvey</a>
		</div>
		<div id="navbar" class="navbar-collapse collapse">
			<ul class="nav navbar-nav navbar-right">
				<li><a href="javascript:void(0);" data-toggle="modal" id="launch_create_survey_dialogue_top" data-target="#myModal">New Survey</a></li>
				<li><a
					href="./Dashboard Template for Bootstrap_files/Dashboard Template for Bootstrap.html">Settings</a></li>
				<li><a
					href="./Dashboard Template for Bootstrap_files/Dashboard Template for Bootstrap.html">Profile</a></li>
			</ul>
			<form class="navbar-form navbar-right">
				<input type="text" class="form-control" placeholder="Search...">
			</form>
		</div>
	</div>
	</nav>

	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-3 col-md-2 sidebar">
				<ul class="nav nav-sidebar">
					<li class="active"><a href="javascript:void(0)">Useful Links <span
							class="sr-only">(current)</span></a></li>
					<li><a href="javascript:void(0)" data-toggle="modal" id="launch_create_survey_dialogue" data-target="#myModal">New Survey</a></li>
					<li><a href="javascript:void(0)">Analytics</a></li>
					<li><a href="javascript:void(0)">Export</a></li>
				</ul>

			</div>
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" id='test_wait'>
				<h1 class="page-header" id="page_header">Active reports</h1>
				
				<div class="table-responsive" id="sample_wat_test">
				
				</div>
				
				<div id='active_reports_display' class='table-responsive'></div>
				
				<div class="row placeholders">
					<div class="col-xs-6 col-sm-3 placeholder">
						<div id="" class="row placeholders"></div>
					</div>
				</div>
					
				<h2 class="sub-header"></h2>
				<div class="table-responsive" id="sample" style="" cellpadding="10px;">
					<table class="table table-striped">
						<!--  theaed tbody -->


					</table>
					
					<!-- Trigger the modal with a button -->
					<!-- <button type="button" class="btn btn-info btn-lg"
						data-toggle="modal" data-target="#myModal">Open Modal</button> -->

					<div class="modal fade" id="myModal" role="dialog">
						<div class="modal-dialog">

							<!-- Modal content-->
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal">&times;</button>
									<h4 class="modal-title">Create New Survey</h4>
								</div>
								<div class="modal-body">
									<table id="" class="table">
										<tr>
											<td><label for="survey_name_add">Survey Name:</label></td>
											<td><input type="text" class="form-control"
												id="survey_name_add"></td>
										</tr>
										<tr>
											<td><label for="survey_desc_add">Survey
													Description:</label></td>
											<td><textarea rows="8" class="form-control"
													id="survey_desc_add" style="resize: none"></textarea></td>
										</tr>
									</table>
								</div>
								<div class="modal-footer">
									<button type="button" id="create_new_survey"
										class="btn btn-default">Add</button>
									<button type="button" class="btn btn-default"
										data-dismiss="modal">Close</button>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	

	<object id="__symantecPKIClientMessenger" style="display: none;"></object>
	<span id="__symantecPKIClientDetector" style="display: none;">__PRESENT</span>
</body>
</html>
