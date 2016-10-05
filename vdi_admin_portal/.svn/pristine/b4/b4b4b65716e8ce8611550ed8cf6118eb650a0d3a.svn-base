$(document).ready(function() {
	GetAllEMEAVM();
});
var vmRefName = "";
var vmRefUrl = "";
function GetAllEMEAVM() {
	$.blockUI();
	$("#table_emea_vm_list").html('');
	$.ajax({
		type : "POST",
		url : "GetAllEMEAVmWares",
		data : '{"region":"' + "AMERS" + '"}',
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
			/* data = data + "<br />"; */
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
				data = data + "<td>" + Shortened(resultsArray[i].OsName)
						+ "</td>";
				data = data + "<td>" + Shortened(resultsArray[i].IeName)
						+ "</td>";
				data = data + "<td>" + resultsArray[i].LangName + "</td>";
				data = data + "<td>" + resultsArray[i].OfficeName + "</td>";

				data = data + "<td>"
						+ "<a href='#' onClick='ShowEMEAMvUpdatePage (\""
						+ resultsArray[i].vmRef + "\")'>";
				data = data + "<img src='images/pen16by16.png' />"
						+ "</a></td>";
				data = data + "<td>"
						+ "<a href='#'onClick='ValidateDisableEMEAVM (\""
						+ resultsArray[i].vmRef + "\")'><img src='images/bin16by16.png' />"
						+ "</a></td>";
				data = data + "</tr>";
			}

			data = data + "</tbody>";
			$("#table_emea_vm_list").append(data);

		},
		complete : function(e) {
			$("#table_emea_vm_list").dataTable({
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

function ShowEMEAMvUpdatePage(vmref) {
	$.blockUI();

	localStorage.setItem('vmRefUpdate', vmref);
	$("#containerPage").load("pages/EMEAUpdatePage.jsp");
	$.ajax({
		type : "POST",
		url : "GetEMEAVMDetail",
		data : '{"region":"' + "EMEA" + '","vmref":"' + vmref + '"}',

		/*
		 * "',emp_acitivy:'" + $('#emp_acitivy').val() + "',guid:'" + managedURL +
		 * "',workGroups:'" + toSpace() + toSpaceOthers() +
		 * FormatWorkGroupName($("#workGroupNameLabel").text())
		 */
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var i;
			
			var resultsArray = (typeof response) == 'string' ? eval('('+ response + ')') : response;
			
			for (i = 0; i < resultsArray.length; i++) {
				vmRefName = resultsArray[0].vmRef;
				vmRefUrl = resultsArray[0].defaultUriLink;
				
				$("#vm_emea_ref_update").val(resultsArray[0].vmRef);
				$("#vm_emea_url_update").val(resultsArray[0].defaultUriLink);
				
				
				GetEmeasInternetExplorer(resultsArray[0].IeName);
				
				GetEmeaOperatingSystem(resultsArray[0].OsName);
				GetEmeaOffice(resultsArray[0].OfficeName);
				GetEmeaLanguage(resultsArray[0].LangName);

			}
		},
		complete : function(e) {
			
			
			GetAllEmeaVMProducts('emea', localStorage.getItem('vmRefUpdate'));
		}
	});

}


function GetEmeasInternetExplorer(vmref) {
	$("#vm_emea_ie_update").html("");
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

			$("#vm_emea_ie_update").append(data);
		},
		complete : function(e) {
			
		}
	});
}


function GetEmeaOperatingSystem(vmref) {
	
	$.ajax({
		type : "POST",
		url : "GetAllOsList",
		data : '{"osList":"' + "osList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_emea_os_update").html("");
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
			
			$("#vm_emea_os_update").append(data);
		},complete : function(e) {
			
		}
	});
}

function GetEmeaOffice(vmref){

	$.ajax({
		type : "POST",
		url : "GetAllVMOffice",
		data : '{"MosList":"' + "MosList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_emea_office_update").html("");
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
			
			$("#vm_emea_office_update").append(data);
		},complete : function(e) {
			
		}
	});
	
}


function GetEmeaLanguage(vmref){

	$.ajax({
		type : "POST",
		url : "GetAllVMLanguage",
		data : '{"MosList":"' + "MosList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_emea_language_update").html("");
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
			
			$("#vm_emea_language_update").append(data);
		},complete : function(e) {
			
		}
	});
}

function GetAllEmeaVMProducts(region,vmref){
	$("#vm_emea_product_update option").html("");
	$.ajax({
		type : "POST",
		url : "GetAllVMProducts",
		data : '{"region":"' + region + '","vmref":"' + vmref +'"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_emea_product_update option").remove();
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
					data = data + "<option selected='selected' value='" + resultsArray[i].vmProdId + "'>";
					data = data + resultsArray[i].ProductName + "</option>";
			}
			
			$("#vm_emea_product_update").append(data);
			
		},complete : function(e) {
			GetAllEmeaUnselectedVMProducts('emea',localStorage.getItem('vmRefUpdate'));
		}
	});
}

function GetAllEmeaUnselectedVMProducts(region, vmref) {
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

			$("#vm_emea_product_update").append(data);
		},
		complete : function(e) {
			$('.multi').multiselectable({
				selectableLabel : 'Available Products',
				selectedLabel : 'Vm Products'
			});
			$("#vm_emea_url_update").val(vmRefUrl);
			$("#vm_emea_ref_update").val(localStorage.getItem('vmRefUpdate'));
			$.unblockUI();
		}
		
	});
}

function GetBackToEmeaList() {
	$.blockUI();
	$("#containerPage").load("pages/EMEAList.jsp");
}

function GetAllEmeaSelectedProducts() {
	LogEmeaActivity('3', '3', localStorage.getItem("vmRefUpdate"), localStorage.getItem('userId'));
	$.blockUI();
	$("#m-selected option").each(
			function() {
				// (vmref,os,language,office,enabled,uriLink,ieId,product)
				AddUpdateEMEAVmWare(localStorage.getItem("vmRefUpdate"), $(
						"#vm_emea_os_update").val(), $(
						"#vm_emea_language_update").val(), $(
						"#vm_emea_office_update").val(), $(
						"#vm_emea_update_enabled").val(), $(
						"#vm_emea_url_update").val(), $("#vm_emea_ie_update")
						.val(), this.value);
			});
	$("#containerPage").load("pages/EMEAList.jsp");
}


function DeleteEmeaVmWareForUpdate(region, vmref) {

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
			GetAllEmeaSelectedProducts();
		}
	});
}


function AddUpdateEMEAVmWare(vmref, os, language, office, enabled, uriLink,
		ieId, product) {
	
	$.ajax({
		type : "POST",
		url : "AddNewEMEAVM",
		data : '{"region":"' + 'emea' + '","vmref":"' + vmref + '","os":"' + os
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


function GetAddEmeaOS() {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "GetAllOsList",
		data : '{"osList":"' + "osList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_emea_os_add").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='" + resultsArray[i].OsId + "'>";
				data = data + resultsArray[i].OsName + "</option>";
			}

			$("#vm_emea_os_add").append(data);
		},
		complete : function(e) {

		}
	});

}


function GetAddEmeaOffice() {
	$.ajax({
		type : "POST",
		url : "GetAllVMOffice",
		data : '{"MosList":"' + "MosList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_office_emea_add").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {

				data = data + "<option value='" + resultsArray[i].MsoId + "'>";
				data = data + resultsArray[i].MsoName + "</option>";
			}

			$("#vm_office_emea_add").append(data);
		},
		complete : function(e) {

		}
	});

}

function GetAddEmeaInternetExplorer() {

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

			$("#vm_emea_ie_add").append(data);
		},
		complete : function(e) {

		}
	});
}

function GetAddEmeaLanguage() {

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

			$("#vm_emea_language_add").append(data);
		},
		complete : function(e) {

		}
	});
}

function GetAddEmeaProducts(region) {
	$.ajax({
		type : "POST",
		url : "GetAllUnselectedVmProd",
		data : '{"region":"' + region + '","vmref":"' + "" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_emea_add").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='" + resultsArray[i].ProductId
						+ "'>";
				data = data + resultsArray[i].ProductName + "</option>";
			}

			$("#vm_emea_product_add").append(data);
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


function GetAddEmeaSelectedProducts() {
	LogEmeaActivity('1', '3',$("#vm_emea_ref_add").val(), localStorage.getItem('userId'));
	$.blockUI();
		$("#m-selected option").each(
		function(index) {
			var total = $('#m-selected option').length;
		
		// (vmref,os,language,office,enabled,uriLink,ieId,product)
		AddUpdateEMEAVmWare($("#vm_emea_ref_add").val(), $("#vm_emea_os_add")
		.val(), $("#vm_emea_language_add").val(),
		$("#vm_office_emea_add").val(), $("#vm_emea_add_enabled").val(),
		$("#vm_emea_url_add").val(), $("#vm_emea_ie_add").val(),
				this.value);
		if (index + 1 === total) {
			
			$("#containerPage").load("pages/EMEAList.jsp");
			}
		});

}



function ValidateDisableEMEAVM(vmref) {
	var r = confirm("Are you sure you want to disable this?");
	if (r == true) {
		DisableEMEAVM(vmref);
	} else {
		return false;
	}

}


function DisableEMEAVM(vmref){
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "DisableVMWare",
		data : '{"vmref":"' + vmref + '","region":"' + "emea" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
				
		},
		complete : function(e) {
			LogEmeaActivity('5', '3', vmref, localStorage.getItem('userId'));
			GetAllEMEAVM();
		}
	});
}


function ReplaceCh(ch){
	return ch.replace(/\&/g, '*****');
	
}


function LogEmeaActivity(activity, module, moduleId, userId){
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
