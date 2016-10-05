$(document).ready(function() {
	GetAllOfficeList();
});
var officeName = "";
function GetAllOfficeList() {
	$.blockUI();
	$("#table_office_list").html('');
	$.ajax({
		type : "POST",
		url : "GetAllVMOffice",
		data : '{"OsList":"' + "all" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			/* data = data + "<br />"; */
			data = data + "<thead>" + "<th>Microsoft Office ID</th>";
			data = data + "<th>Microsoft Office Version</th>";
			data = data + "<th>Update</th>";
			data = data + "<th>Delete</th>";
			data = data + "</thead>";
			data = data + "<tbody>";
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<tr>";
				data = data + "<td>" + resultsArray[i].MsoId + "</td>";
				data = data + "<td>" + (resultsArray[i].MsoName) + "</td>";
				data = data + "<td style='align:right'>"
						+ "<a href='#' onClick='ShowOfficeUpdatePage(\""
						+ resultsArray[i].MsoId + "\")'>";
				data = data + "<img src='images/pen16by16.png' />"
						+ "</a></td>";
				data = data + "<td style='align:right'>"
						+ "<a href='#' onClick='ValidateDeleteOffice(\""
						+ resultsArray[i].MsoId + "\")'>"
						+ "<img src='images/bin16by16.png' />" + "</a></td>";
				data = data + "</tr>";
			}

			data = data + "</tbody>";
			$("#table_office_list").append(data);

		},
		complete : function(e) {
			$("#table_office_list").dataTable({
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

function ShowOfficeUpdatePage(officeId) {

	$.blockUI();
	$("#containerPage").load("pages/OfficeUpdatePage.jsp");
	localStorage.setItem('officeId', officeId);
	
}

function GetBackToOfficeList() {
	$.blockUI();
	$("#containerPage").load("pages/OfficeList.jsp");
}

function UpdateOfficeVersion(officeId) {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "UpdateVMOffice",
		data : '{"officeId":"' + officeId + '","officeName":"'
				+ $("#office_name_update").val() + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			alert("Updating Microsoft Office successful");
		},
		complete : function(e) {
			LogOfficeActivity('3', '6', officeId, localStorage.getItem('userId'));
			GetBackToOfficeList();
		}
	});
}

function ValidateDeleteOffice(officeId) {
	var r = confirm("Are you sure you want to delete this?");
	if (r == true) {
		DeleteOfficeVersion(officeId);
	} else {
		return false;
	}

}

function DeleteOfficeVersion(officeId) {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "DeleteOfficeFromList",
		data : '{"officeId":"' + officeId + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

		},
		complete : function(e) {
			LogOfficeActivity('4', '6', officeId, localStorage.getItem('userId'));
			GetBackToOfficeList();
		}
	});
}
function AddOfficeVersion() {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "AddVMOffice",
		data : '{"officeName":"' + $("#office_name_add").val() + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			alert("Adding Microsoft Office successful");
		},
		complete : function(e) {
			LogOfficeActivity('1', '6', $("#office_name_add").val(), localStorage.getItem('userId'));
			GetBackToOfficeList();
		}
	});
}
function DeleteOfficeVersion(officeId) {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "DeleteVMOffice",
		data : '{"officeId":"' + officeId + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

		},
		complete : function(e) {
			LogOfficeActivity('4', '6',officeId, localStorage.getItem('userId'));
			GetBackToOfficeList();
		}
	});
}

function LogOfficeActivity(activity, module, moduleId, userId) {
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
