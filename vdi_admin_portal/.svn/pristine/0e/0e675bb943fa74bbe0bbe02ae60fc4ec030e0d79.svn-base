$(document).ready(function() {
	GetAllOSList();
});
var osName = "";
function GetAllOSList() {
	$.blockUI();
	$("#table_os_list").html('');
	$.ajax({
		type : "POST",
		url : "GetAllOsList",
		data : '{"OsList":"' + "all" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			/* data = data + "<br />"; */
			data = data + "<thead>" + "<th>Operating System ID</th>";
			data = data + "<th>Operating System Version</th>";
			data = data + "<th>Update</th>";
			data = data + "<th>Delete</th>";
			data = data + "</thead>";
			data = data + "<tbody>";
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<tr>";
				data = data + "<td>" + resultsArray[i].OsId + "</td>";
				data = data + "<td>" + (resultsArray[i].OsName) + "</td>";
				data = data + "<td style='align:right'>"
						+ "<a href='#' onClick='ShowOSUpdatePage(\""
						+ resultsArray[i].OsId + "\")'>";
				data = data + "<img src='images/pen16by16.png' />"
						+ "</a></td>";
				data = data + "<td style='align:right'>"
						+ "<a href='#' onClick='ValidateDeleteOs(\""
						+ resultsArray[i].OsId + "\")'>" + "<img src='images/bin16by16.png' />"
						+ "</a></td>";
				data = data + "</tr>";
			}

			data = data + "</tbody>";
			$("#table_os_list").append(data);
			
		},
		complete : function(e) {
			$("#table_os_list").dataTable({
				"bDestroy" : true,
				aoColumnDefs : [{
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

function ShowOSUpdatePage(osId) {
	$.blockUI();
	$("#containerPage").load("pages/OSUpdatePage.jsp");
	
	localStorage.setItem('osId', osId);
	
}

function GetBackToOSList() {
	$.blockUI();
	$("#containerPage").load("pages/OsList.jsp");
}


function UpdateOs(osId){
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "UpdateOS",
		data : '{"osId":"' + osId + '","osName":"'  + $("#os_name_update").val() +'"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
					alert("Updating Microsoft Office successful");
		},
		complete : function(e) {
			LogOSActivity('3', '8',osId, localStorage.getItem('userId'));
			GetBackToOSList();
		}
	});
}

function ValidateDeleteOs(osId){
	alert("This Record cannot be deleted. Please Contact Administrator.");
		
	}

	function DeleteOsVersion(osId){
		$.blockUI();
		$.ajax({
			type : "POST",
			url : "DeleteOS",
			data : '{"osId":"' + osId + '"}',
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;
				
			},
			complete : function(e) {
				LogOSActivity('4', '8',osId, localStorage.getItem('userId'));
				GetBackToOSList();
			}
		});
	}
function AddOs(){
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "AddOS",
		data : '{"osName":"' + $("#os_name_add").val() + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			alert("Adding Operating System successful");
		},
		complete : function(e) {
			LogOSActivity('1', '8',$("#os_name_add").val(), localStorage.getItem('userId'));
			GetBackToOSList();
		}
	});
}


function LogOSActivity(activity, module, moduleId, userId) {
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


