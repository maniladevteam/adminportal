/**
 * 
 */

$(document).ready(function() {
	GetAllAMERSVM();

});
var vmrefName = '';
var vmRefUrlLink = '';
function GetAllAMERSVM() {
	$.blockUI();
	$("#table_amers_vm_list").html('');
	$.ajax({
		type : "POST",
		url : "GetAllVMWares",
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
						+ "<a href='#' onClick='ShowAmersMvUpdatePage(\""
						+ resultsArray[i].vmRef + "\")'>";
				data = data + "<img src='images/pen16by16.png' />"
						+ "</a></td>";
				data = data + "<td>"
						+ "<a href='#' onClick='ValidateDisableAMERVM(\""
						+ resultsArray[i].vmRef + "\")'>"
						+ "<img src='images/bin16by16.png' />" + "</a></td>";
				data = data + "</tr>";
			}

			data = data + "</tbody>";
			$("#table_amers_vm_list").append(data);

		},
		complete : function(e) {
			$("#table_amers_vm_list").dataTable({
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
	if (url != null || url != undefined) {
		return url.substring(0, 10) + ".....";
	} else {
		return "";
	}
}

function ShowAmersMvUpdatePage(vmref) {
	$.blockUI();
	
	localStorage.setItem('vmRefUpdate', vmref);
	$("#containerPage").load("pages/AMERSUpdatePage.jsp");
	$.ajax({
		type : "POST",
		url : "GetVMDetail",
		data : '{"region":"' + "AMERS" + '","vmref":"' + vmref + '"}',

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
				$("#vm_ref_update").val(resultsArray[0].vmRef);
				$("#vm_url_update").val(resultsArray[0].defaultUriLink);
				vmrefName = resultsArray[0].vmRef;
				vmRefUrlLink = resultsArray[0].defaultUriLink;
				GetAmersInternetExplorer(resultsArray[0].IeName);
				
				GetAmersOperatingSystem(resultsArray[0].OsName);
				GetAmersOffice(resultsArray[0].OfficeName);
				GetAmersLanguage(resultsArray[0].LangName);
				
			}
		},
		complete : function(e) {
			
			
			GetAllAMersVMroducts('amers', localStorage.getItem('vmRefUpdate'));
		}
	});

}

function GetAllAMERSProducts() {

}

function GetAmersInternetExplorer(vmref) {
	$("#vm_ie_update").html("");
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

			$("#vm_ie_update").append(data);
		},
		complete : function(e) {

		}
	});
}

function GetAmersOperatingSystem(vmref) {

	$.ajax({
		type : "POST",
		url : "GetAllOsList",
		data : '{"osList":"' + "osList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_os_update").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				if (vmref == resultsArray[i].OsName) {
					data = data + "<option selected='selected' value='"
							+ resultsArray[i].OsId + "'>";
					data = data + resultsArray[i].OsName + "</option>";
				} else {
					data = data + "<option value='" + resultsArray[i].OsId
							+ "'>";
					data = data + resultsArray[i].OsName + "</option>";
				}
			}

			$("#vm_os_update").append(data);
		},
		complete : function(e) {

		}
	});
}
function GetAmersOffice(vmref) {

	$.ajax({
		type : "POST",
		url : "GetAllVMOffice",
		data : '{"MosList":"' + "MosList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_office_update").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				if (vmref == resultsArray[i].MsoName) {
					data = data + "<option selected='selected' value='"
							+ resultsArray[i].MsoId + "'>";
					data = data + resultsArray[i].MsoName + "</option>";
				} else {
					data = data + "<option value='" + resultsArray[i].MsoId
							+ "'>";
					data = data + resultsArray[i].MsoName + "</option>";
				}
			}

			$("#vm_office_update").append(data);
		},
		complete : function(e) {

		}
	});

}
function GetAmersLanguage(vmref) {

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
				if (vmref == resultsArray[i].LanguageName) {
					data = data + "<option selected='selected' value='"
							+ resultsArray[i].LanguageId + "'>";
					data = data + resultsArray[i].LanguageName + "</option>";
				} else {
					data = data + "<option value='"
							+ resultsArray[i].LanguageId + "'>";
					data = data + resultsArray[i].LanguageName + "</option>";
				}
			}

			$("#vm_language_update").append(data);
		},
		complete : function(e) {

		}
	});
}

function GetAllAmersProducts(region) {

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
				if (vmref == resultsArray[i].LanguageName) {
					data = data + "<option selected='selected' value='"
							+ resultsArray[i].LanguageId + "'>";
					data = data + resultsArray[i].LanguageName + "</option>";
				} else {
					data = data + "<option value='"
							+ resultsArray[i].LanguageId + "'>";
					data = data + resultsArray[i].LanguageName + "</option>";
				}
			}

			$("#vm_language_update").append(data);
		},
		complete : function(e) {

		}
	});

}

/* get only the products from specific vms */
function GetAllAMersVMroducts(region, vmref) {

	$.ajax({
		type : "POST",
		url : "GetAllVMProducts",
		data : '{"region":"' + region + '","vmref":"' + vmref + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_product_update option").remove();
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<option selected='selected' value='"
						+ resultsArray[i].vmProdId + "'>";
				data = data + resultsArray[i].ProductName + "</option>";
			}

			$("#vm_product_update").append(data);

		},
		complete : function(e) {
			
			GetAllAMersUnselectedVMroducts('amers', localStorage
					.getItem('vmRefUpdate'));
		}
	});
}

function GetAllAMersUnselectedVMroducts(region, vmref) {
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

			$("#vm_product_update").append(data);
		},
		complete : function(e) {
			$('.multi').multiselectable({
				selectableLabel : 'Available Products',
				selectedLabel : 'Vm Products'
			});
			$("#vm_url_update").val(vmRefUrlLink);
			$("#vm_ref_update").val(localStorage.getItem('vmRefUpdate'));
			$.unblockUI();
		}
	});
}

function GetBackToAmersList() {
	$.blockUI();
	$("#containerPage").load("pages/AMERSList.jsp");
}

function GetAllSelectedProducts() {
	LogAmersActivity('3', '1', localStorage.getItem("vmRefUpdate"), localStorage.getItem('userId'));
	$("#m-selected option").each(
			function() {
				// (vmref,os,language,office,enabled,uriLink,ieId,product)
				AddUpdateAMERSVmWare(localStorage.getItem("vmRefUpdate"), $(
						"#vm_os_update").val(), $("#vm_language_update").val(),
						$("#vm_office_update").val(), $("#vm_update_enabled")
								.val(), $("#vm_url_update").val(), $(
								"#vm_ie_update").val(), this.value);
			});
	$.unblockUI();
	$("#containerPage").load("pages/AMERSList.jsp");
}

function DeleteAMERSVmWareForUpdate(region, vmref) {
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
			GetAllSelectedProducts();
			$.unblockUI();
		}
	});
}

function AddUpdateAMERSVmWare(vmref, os, language, office, enabled, uriLink,
		ieId, product) {
	
	$.ajax({
		type : "POST",
		url : "AddNewAMERSVM",
		data : '{"region":"' + 'amers' + '","vmref":"' + vmref + '","os":"'
				+ os + '","language":"' + language + '","office":"' + office
				+ '","enabled":"' + enabled + '","uriLink":"' + ReplaceCh(uriLink)
				+ '","ieId":"' + ieId + '","product":"' + product + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

		},
		complete : function(e) {
			$.unblockUI();
		}
	});

}

function DisableVm(vmref, region) {

}

function GetAllAddSelectedProducts() {
	$.blockUI();
	$("#m-selected option").each(
			function() {
				// (vmref,os,language,office,enabled,uriLink,ieId,product)

				AddUpdateAMERSVmWare($("#vm_ref_add").val(), $("#vm_os_add")
						.val(), $("#vm_language_add").val(),
						$("#vm_office_add").val(), $("#vm_add_enabled").val(),
						$("#vm_url_add").val(), $("#vm_ie_add").val(),
						this.value);
			});
	$("#containerPage").load("pages/AMERSList.jsp");
	$.unblockUI();
}

function GetAddAmersOS() {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "GetAllOsList",
		data : '{"osList":"' + "osList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_os_update").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='" + resultsArray[i].OsId + "'>";
				data = data + resultsArray[i].OsName + "</option>";
			}

			$("#vm_os_add").append(data);
		},
		complete : function(e) {

		}
	});

}

function GetAddAmersOffice() {
	$.ajax({
		type : "POST",
		url : "GetAllVMOffice",
		data : '{"MosList":"' + "MosList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_office_add").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {

				data = data + "<option value='" + resultsArray[i].MsoId + "'>";
				data = data + resultsArray[i].MsoName + "</option>";
			}

			$("#vm_office_add").append(data);
		},
		complete : function(e) {

		}
	});

}

function GetAddAmersInternetExplorer() {

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

			$("#vm_ie_add").append(data);
		},
		complete : function(e) {

		}
	});
}
function GetAddAmersLanguage() {

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

			$("#vm_language_add").append(data);
		},
		complete : function(e) {

		}
	});
}

function GetAddAmersProducts(region) {

	$.ajax({
		type : "POST",
		url : "GetAllUnselectedVmProd",
		data : '{"region":"' + region + '","vmref":"' + "" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_product_add").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='" + resultsArray[i].ProductId
						+ "'>";
				data = data + resultsArray[i].ProductName + "</option>";
			}

			$("#vm_product_add").append(data);
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
function GetAddSelectedProducts() {
	$.blockUI();
	LogAmersActivity('1', '1', $("#vm_ref_add").val(), localStorage.getItem('userId'));
	$("#m-selected option").each(
			function(index) {
				var total = $('#m-selected option').length;
				$.blockUI();
				// (vmref,os,language,office,enabled,uriLink,ieId,product)
				AddUpdateAMERSVmWare($("#vm_ref_add").val(), $("#vm_os_add")
						.val(), $("#vm_language_add").val(),
						$("#vm_office_add").val(), $("#vm_add_enabled").val(),
						$("#vm_url_add").val(), $("#vm_ie_add").val(),
						this.value);
				if (index + 1 === total) {
					$.unblockUI();
					$("#containerPage").load("pages/AMERSList.jsp");
				}
			});
	$.unblockUI();

}
function ValidateDisableAMERVM(vmref) {
	var r = confirm("Are you sure you want to disable this?");
	if (r == true) {
		DisableAMERVM(vmref);
	} else {
		return false;
	}

}

function DisableAMERVM(vmref) {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "DisableVMWare",
		data : '{"vmref":"' + vmref + '","region":"' + "amers" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

		},
		complete : function(e) {
			LogAmersActivity('5', '1', vmref, localStorage.getItem('userId'));
			GetAllAMERSVM();
		}
	});
}

function ReplaceCh(ch){
	return ch.replace(/\&/g, '*****');
}

function LogAmersActivity(activity, module, moduleId, userId){
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
