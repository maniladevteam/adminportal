/** Developed by MarAngelo **/

$(document).ready(function() {
	GetAllIEList();
});
var ieName = "";
function GetAllIEList() {
	$.blockUI();
	$("#table_ie_list").html('');
	$.ajax({
		type : "POST",
		url : "GetVMIeList",
		data : '{"IeList":"' + "all" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			/* data = data + "<br />"; */
			data = data + "<thead>" + "<th>Internet Explorer ID</th>";
			data = data + "<th>Internet Explorer Version</th>";
			data = data + "<th>Update</th>";
			data = data + "<th>Delete</th>";
			data = data + "</thead>";
			data = data + "<tbody>";
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<tr>";
				data = data + "<td>" + resultsArray[i].IeId + "</td>";
				data = data + "<td>" + (resultsArray[i].IeName) + "</td>";
				data = data + "<td style='align:right'>"
						+ "<a href='#' onClick='ShowIEUpdatePage(\""
						+ resultsArray[i].IeId + "\")'>";
				data = data + "<img src='images/pen16by16.png' />"
						+ "</a></td>";
				data = data + "<td style='align:right'>"
						+ "<a href='#' onClick='ValidateDeleteIE(\""
						+ resultsArray[i].IeId + "\")'>" + "<img src='images/bin16by16.png' />"
						+ "</a></td>";
				data = data + "</tr>";
			}

			data = data + "</tbody>";
			$("#table_ie_list").append(data);

		},
		complete : function(e) {
			$("#table_ie_list").dataTable({
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


function ShowIEUpdatePage(ieId) {

	$.blockUI();
	$("#containerPage").load("pages/IEUpdatePage.jsp");
	localStorage.setItem('ieId', ieId);
}


function GetBackToIeList() {
	$.blockUI();
	$("#containerPage").load("pages/IEList.jsp");
}

function UpdateIeVersion(ieId){
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "UpdateIE",
		data : '{"ieId":"' + ieId + '","ieName":"'  + $("#ie_name_update").val() +'"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
					alert("Updating Internet Explorer successful");
		},
		complete : function(e) {
			LogIEActivity('3', '5', ieId, localStorage.getItem('userId'));
			GetBackToIeList();
		}
	});
}

function ValidateDeleteIE(ieId){
var r=confirm("Are you sure you want to delete this?");
if (r==true)
	  {
		DeleteIeVersion(ieId);
	  }
else
	  {
	  	return false;
	  }
	
}

function DeleteIeVersion(ieId){
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "DeleteIeFromList",
		data : '{"ieId":"' + ieId + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			
		},
		complete : function(e) {
			LogIEActivity('4', '5', ieId, localStorage.getItem('userId'));
			GetBackToIeList();
		}
	});
}
function AddIeVersion(){
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "AddNewIE",
		data : '{"ieName":"' + $("#ie_name_add").val() + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			alert("Adding Internet Explorer successful");
		},
		complete : function(e) {
			LogIEActivity('1', '5', $("#ie_name_add").val(), localStorage.getItem('userId'));
			GetBackToIeList();
		}
	});
}

function LogIEActivity(activity, module, moduleId, userId){
	$.ajax({
		type : "POST",
		url : "LogActivity",
		data : '{"activity":"' + activity + 
		'","module":"' + module + 
		'","moduleId":"' + moduleId +
		'","userId":"' + userId +
		'"}',
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


