$(document).ready(function() {
	GetAllIPBSVM();
});
var vmRefName = "";
var vmURILink = "";
function GetAllIPBSVM() {
	$.blockUI();
	$("#table_ipbs_vm_list").html('');
	$.ajax({
		type : "POST",
		url : "GetAllIPBSVmWares",
		data : '{"region":"' + "IPBS" + '"}',
		/*
		 * ",emp_country:'" /*+ $('#emp_city').val() + "',emp_acitivy:'" +
		 * $('#emp_acitivy').val() + "',guid:'" + managedURL + "',workGroups:'" +
		 * toSpace() + toSpaceOthers() +
		 * FormatWorkGroupName($("#workGroupNameLabel").text())
		 */
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			data = data + "<thead>" + "<th>Virtual Machine</th>";
			data = data + "<th>URI Link</th>";
			data = data + "<th>Operating System</th>";
			data = data + "<th>IE Version</th>";
			data = data + "<th>VM Language</th>";
			data = data + "<th>Office Version</th>";
			data = data + "<th>Update</th>";
			data = data + "<th>Disable</th>";
			data = data + "</thead>";
			data = data + "<tbody>";
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<tr>";
				data = data + "<td>" + resultsArray[i].vmRef + "</td>";
				data = data + "<td>"
						+ Shortened(resultsArray[i].defaultUriLink) + "</td>";
				data = data + "<td>" + Shortened(resultsArray[i].OsName) + "</td>";
				data = data + "<td>" + Shortened(resultsArray[i].IeName) + "</td>";
				data = data + "<td>" + Shortened(resultsArray[i].LangName) + "</td>";
				data = data + "<td>" + Shortened(Replaceundefined(resultsArray[i].OfficeName)) + "</td>";

				data = data + "<td>"
						+ "<a href='#' onClick='ShowIPBSMvUpdatePage(\""
						+ resultsArray[i].vmRef + "\")'>";
				data = data + "<img src='images/pen16by16.png' />"
						+ "</a></td>";
				data = data + "<td>"
						+ "<a href='#' onClick='ValidateDisableIPBSVM(\""
						+ resultsArray[i].vmRef + "\")'><img src='images/bin16by16.png' />"
						+ "</a></td>";
				data = data + "</tr>";
			}

			data = data + "</tbody>";
			$("#table_ipbs_vm_list").append(data);

		},
		complete : function(e) {
			$("#table_ipbs_vm_list").dataTable({
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

function Shortened(url) {
	if(url != null || url != undefined){
		return url.substring(0, 10) + ".....";
	}else{
		return "";
	}
}

function Replaceundefined(str){
	if(str == undefined){
		str = "Not Specified or Not in the list";
	}
	return str;
}


function ShowIPBSMvUpdatePage(vmref) {
	$.blockUI();
	localStorage.setItem('vmRefUpdate', vmref);
	$("#containerPage").load("pages/IPBSUpdatePage.jsp");
	
	$.ajax({
		type : "POST",
		url : "GetIPBSVMDetail",
		data : '{"region":"' + "APAC" + '","vmref":"' + vmref + '"}',

		/*
		 * "',emp_acitivy:'" + $('#emp_acitivy').val() + "',guid:'" + managedURL +
		 * "',workGroups:'" + toSpace() + toSpaceOthers() +
		 * FormatWorkGroupName($("#workGroupNameLabel").text())
		 */
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var i = 0;
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
					
			for (i = 0; i < resultsArray.length; i++) {
				vmRefName = resultsArray[0].vmRef;
				vmURILink = resultsArray[0].defaultUriLink;
				$("#vm_ipbs_ref_update").val(resultsArray[0].vmRef);
				GetIpbssInternetExplorer(resultsArray[0].IeName);
				$("#vm_ipbs_url_update").val(resultsArray[0].defaultUriLink);
				GetIpbsOperatingSystem(resultsArray[0].OsName);
				GetIpbsOffice(resultsArray[0].OfficeName);
				GetIpbsLanguage(resultsArray[0].LangName);
			}
		},
		complete : function(e) {
			
			
			GetAllIpbsVMProducts('ipbs', localStorage.getItem('vmRefUpdate'));
		}
	});
}



function GetIpbssInternetExplorer(vmref) {
	$("#vm_ipbs_ie_update").html("");
	$.ajax({
		type : "POST",
		url : "GetVMIeList",
		data : '{"ielist":"' + "ielist" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {

				if (vmref == resultsArray[i].IeName) {
					data = data + "<option selected='selected' value='"
							+ resultsArray[i].IeId + "'>";
					data = data + resultsArray[i].IeName + "</option>";
				} else {
					data = data + "<option value='" + resultsArray[i].IeId
							+ "'>";
					data = data + resultsArray[i].IeName + "</option>";
				}
			}

			$("#vm_ipbs_ie_update").append(data);
		},
		complete : function(e) {
			
		}
	});
}

function GetIpbsOperatingSystem(vmref) {
	
	$.ajax({
		type : "POST",
		url : "GetAllOsList",
		data : '{"osList":"' + "osList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_ipbs_os_update").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				if(vmref == resultsArray[i].OsName){
					data = data + "<option selected='selected' value='" + resultsArray[i].OsId + "'>";
					data = data + resultsArray[i].OsName + "</option>";
				}else{
					data = data + "<option value='" + resultsArray[i].OsId + "'>";
					data = data + resultsArray[i].OsName + "</option>";
				}
			}
			
			$("#vm_ipbs_os_update").append(data);
		},complete : function(e) {
			
		}
	});
}


function GetIpbsOffice(vmref){

	$.ajax({
		type : "POST",
		url : "GetAllVMOffice",
		data : '{"MosList":"' + "MosList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_ipbs_office_update").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				if(vmref == resultsArray[i].MsoName){
					data = data + "<option selected='selected' value='" + resultsArray[i].MsoId + "'>";
					data = data + resultsArray[i].MsoName + "</option>";
				}else{
					data = data + "<option value='" + resultsArray[i].MsoId + "'>";
					data = data + resultsArray[i].MsoName + "</option>";
				}
			}
			
			$("#vm_ipbs_office_update").append(data);
		},complete : function(e) {
			
		}
	});
	
}


function GetIpbsLanguage(vmref){

	$.ajax({
		type : "POST",
		url : "GetAllVMLanguage",
		data : '{"MosList":"' + "MosList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_ipbs_language_update").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				if(vmref == resultsArray[i].LanguageName){
					data = data + "<option selected='selected' value='" + resultsArray[i].LanguageId + "'>";
					data = data + resultsArray[i].LanguageName + "</option>";
				}else{
					data = data + "<option value='" + resultsArray[i].LanguageId + "'>";
					data = data + resultsArray[i].LanguageName + "</option>";
				}
			}
			
			$("#vm_ipbs_language_update").append(data);
		},complete : function(e) {
			
		}
	});
}

function GetAllIpbsVMProducts(region,vmref){
	$("#vm_ipbs_product_update option").html("");
	$.ajax({
		type : "POST",
		url : "GetAllVMProducts",
		data : '{"region":"' + region + '","vmref":"' + vmref +'"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_ipbs_product_update option").remove();
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
					data = data + "<option selected='selected' value='" + resultsArray[i].vmProdId + "'>";
					data = data + resultsArray[i].ProductName + "</option>";
			}
			
			$("#vm_ipbs_product_update").append(data);
			
		},complete : function(e) {
			GetAllIpbsUnselectedVMProducts('ipbs',localStorage.getItem('vmRefUpdate'));
		}
	});
}

function GetAllIpbsUnselectedVMProducts(region, vmref) {
	$.ajax({
		type : "POST",
		url : "GetAllUnselectedVmProd",
		data : '{"region":"' + region + '","vmref":"' + vmref + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='" + resultsArray[i].ProductId
						+ "'>";
				data = data + resultsArray[i].ProductName + "</option>";
			}

			$("#vm_ipbs_product_update").append(data);
		},
		complete : function(e) {
			$('.multi').multiselectable({
				selectableLabel : 'Available Products',
				selectedLabel : 'Vm Products'
			});
			$("#vm_ipbs_url_update").val(vmURILink);
			$("#vm_ipbs_ref_update").val(localStorage.getItem('vmRefUpdate'));
			$.unblockUI();
		}
	});
}

function GetBackToIpbsList() {
	
	$("#containerPage").load("pages/IPBSList.jsp");
}


function GetAllIpbsSelectedProducts() {
	LogIpbsActivity('3', '4', localStorage.getItem("vmRefUpdate"), localStorage.getItem('userId'));
	$.blockUI();
	$("#m-selected option").each(
			function() {
				// (vmref,os,language,office,enabled,uriLink,ieId,product)
				AddUpdateIPBSVmWare(localStorage.getItem("vmRefUpdate"), $(
						"#vm_ipbs_os_update").val(), $(
						"#vm_ipbs_language_update").val(), $(
						"#vm_ipbs_office_update").val(), $(
						"#vm_ipbs_update_enabled").val(), $(
						"#vm_ipbs_url_update").val(), $("#vm_ipbs_ie_update")
						.val(), this.value);
			});
	$("#containerPage").load("pages/IPBSList.jsp");
}

function DeleteIpbsVmWareForUpdate(region, vmref) {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "DeleteVMCreateUpdate",
		data : '{"region":"' + region + '","vmref":"' + vmref + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

		},
		complete : function(e) {
			GetAllIpbsSelectedProducts();
		}
	});
}


function AddUpdateIPBSVmWare(vmref, os, language, office, enabled, uriLink,
		ieId, product) {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "AddNewIPBSVM",
		data : '{"region":"' + 'ipbs' + '","vmref":"' + vmref + '","os":"' + os
				+ '","language":"' + language + '","office":"' + office
				+ '","enabled":"' + enabled + '","uriLink":"' + ReplaceCh(uriLink)
				+ '","ieId":"' + ieId + '","product":"' + product + '"}',
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


function GetAddIpbsOS() {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "GetAllOsList",
		data : '{"osList":"' + "osList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_ipbs_os_add").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='" + resultsArray[i].OsId + "'>";
				data = data + resultsArray[i].OsName + "</option>";
			}

			$("#vm_ipbs_os_add").append(data);
		},
		complete : function(e) {

		}
	});

}


function GetAddIpbsOffice() {
	$.ajax({
		type : "POST",
		url : "GetAllVMOffice",
		data : '{"MosList":"' + "MosList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_office_ipbs_add").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {

				data = data + "<option value='" + resultsArray[i].MsoId + "'>";
				data = data + resultsArray[i].MsoName + "</option>";
			}

			$("#vm_office_ipbs_add").append(data);
		},
		complete : function(e) {

		}
	});

}

function GetAddIpbsInternetExplorer() {

	$.ajax({
		type : "POST",
		url : "GetVMIeList",
		data : '{"ielist":"' + "ielist" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='" + resultsArray[i].IeId + "'>";
				data = data + resultsArray[i].IeName + "</option>";
			}

			$("#vm_ipbs_ie_add").append(data);
		},
		complete : function(e) {

		}
	});
}

function GetAddIpbsLanguage() {

	$.ajax({
		type : "POST",
		url : "GetAllVMLanguage",
		data : '{"MosList":"' + "MosList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_language_update").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='" + resultsArray[i].LanguageId
						+ "'>";
				data = data + resultsArray[i].LanguageName + "</option>";
			}

			$("#vm_ipbs_language_add").append(data);
		},
		complete : function(e) {

		}
	});
}

function GetAddIpbsProducts(region) {
	$.ajax({
		type : "POST",
		url : "GetAllUnselectedVmProd",
		data : '{"region":"' + region + '","vmref":"' + "" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_ipbs_add").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='" + resultsArray[i].ProductId
						+ "'>";
				data = data + resultsArray[i].ProductName + "</option>";
			}

			$("#vm_ipbs_product_add").append(data);
		},
		complete : function(e) {
			$('.multi').multiselectable({
				selectableLabel : 'Available Products',
				selectedLabel : 'Vm Products'
			});
			$.unblockUI();
		}
	});

}


function GetAddIpbsSelectedProducts() {
	LogIpbsActivity('1', '4', $("#vm_ipbs_ref_add").val(), localStorage.getItem('userId'));
$.blockUI();
$("#m-selected option").each(
	function(index) {
		var total = $('#m-selected option').length;
		$.blockUI();
		// (vmref,os,language,office,enabled,uriLink,ieId,product)
		AddUpdateIPBSVmWare($("#vm_ipbs_ref_add").val(), $("#vm_ipbs_os_add")
		.val(), $("#vm_ipbs_language_add").val(),
			$("#vm_office_ipbs_add").val(), $("#vm_ipbs_add_enabled").val(),
			$("#vm_ipbs_url_add").val(), $("#vm_ipbs_ie_add").val(),
					this.value);
			if (index + 1 === total) {
				$.unblockUI();
				$("#containerPage").load("pages/IPBSList.jsp");
				}
			});

}



function ValidateDisableIPBSVM(vmref) {
	var r = confirm("Are you sure you want to disable this?");
	if (r == true) {
		DisableiPBSVM(vmref);
	} else {
		return false;
	}

}


function DisableiPBSVM(vmref){
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "DisableVMWare",
		data : '{"vmref":"' + vmref + '","region":"' + "ipbs" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
				
		},
		complete : function(e) {
			LogIpbsActivity('5', '4', vmref, localStorage.getItem('userId'));
			GetAllIPBSVM();
		}
	});
}



function ReplaceCh(ch){
	return ch.replace(/\&/g, '*****');
	
}



function LogIpbsActivity(activity, module, moduleId, userId){
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
