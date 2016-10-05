$(document).ready(function() {
	GetAllLanguageList();
});
var langName = "";
function GetAllLanguageList() {
	$.blockUI();
	$("#table_language_list").html('');
	$
			.ajax({
				type : "POST",
				url : "GetAllVMLanguage",
				data : '{"OsList":"' + "all" + '"}',
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var i = 0;
					var data = "";
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;
					/* data = data + "<br />"; */
					data = data + "<thead>" + "<th>Language ID</th>";
					data = data + "<th>Language</th>";
					data = data + "<th>Update</th>";
					data = data + "<th>Delete</th>";
					data = data + "</thead>";
					data = data + "<tbody>";
					for (i = 0; i < resultsArray.length; i++) {
						data = data + "<tr>";
						data = data + "<td>" + resultsArray[i].LanguageId
								+ "</td>";
						data = data + "<td>" + (resultsArray[i].LanguageName)
								+ "</td>";
						data = data
								+ "<td style='align:right'>"
								+ "<a href='#' onClick='ShowLanguageUpdatePage(\""
								+ resultsArray[i].LanguageId + "\")'>";
						data = data + "<img src='images/pen16by16.png' />"
								+ "</a></td>";
						data = data
								+ "<td style='align:right'>"
								+ "<a href='#' onClick='ValidateDeleteLanguage(\""
								+ resultsArray[i].LanguageId + "\")'>"
								+ "<img src='images/bin16by16.png' />"
								+ "</a></td>";
						data = data + "</tr>";
					}

					data = data + "</tbody>";
					$("#table_language_list").append(data);

				},
				complete : function(e) {
					$("#table_language_list").dataTable({
						"bDestroy" : true,
						aoColumnDefs : [ {
							bSortable : false,
							aTargets : [ -2, -1 ]
						} ],
						"sScrollY" : "300px",
						"bPaginate" : false
					});
					$.unblockUI();
				}
			});
}

function ShowLanguageUpdatePage(langId) {
	$.blockUI();
	$("#containerPage").load("pages/LanguageUpdatePage.jsp");
	localStorage.setItem('langId', langId);
}

function GetBackTolangList() {
	$("#containerPage").load("pages/LanguageList.jsp");
}

function UpdateLanguage(langId) {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "UpdateVMLanguage",
		data : '{"langId":"' + langId + '","langName":"'
				+ $("#language_name_update").val() + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			alert("Updating Microsoft Language successful");
		},
		complete : function(e) {
			LogLanguageActivity('3', '7',langId, localStorage.getItem('userId'));
			GetBackTolangList();
		}
	});
}

function ValidateDeleteLanguage(langId) {
	var r = confirm("Are you sure you want to delete this?");
	if (r == true) {
		DeleteLanguage(langId);
	} else {
		return false;
	}

}

function DeleteLanguage(langId) {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "DeleteLanguageFromList",
		data : '{"langId":"' + langId + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

		},
		complete : function(e) {
			LogLanguageActivity('4', '7',langId, localStorage.getItem('userId'));
			GetBackTolangList();
		}
	});
}
function AddLanguage() {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "AddNewLanguage",
		data : '{"langName":"' + $("#language_name_add").val() + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			alert("Adding language successful");
		},
		complete : function(e) {
			LogLanguageActivity('1', '7',$("#language_name_add").val(), localStorage.getItem('userId'));
			GetBackTolangList();
		}
	});
}
function DeleteLanguage(langId) {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "DeleteVMLanguage",
		data : '{"langId":"' + langId + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

		},
		complete : function(e) {
			LogLanguageActivity('4', '7',langId, localStorage.getItem('userId'));
			GetBackTolangList();
		}
	});
}

function LogLanguageActivity(activity, module, moduleId, userId) {
	$.ajax({
		type : "POST",
		url : "LogActivity",
		data : '{"activity":"' + activity + '","module":"' + module
				+ '","moduleId":"' + moduleId + '","userId":"' + userId + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

		},
		complete : function(e) {

		}
	});
}
