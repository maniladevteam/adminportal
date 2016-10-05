$(document).ready(function() {
	GetAllAPACVM();
});

var vmRerName = "";
var vmURILink = "";
function GetAllAPACVM() {
	$.blockUI();
	$("#table_apac_vm_list").html('');
	$.ajax({
		type : "POST",
		url : "GetAllAPACVmWares",
		data : '{"region":"' + "APAC" + '"}',
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
				data = data + "<td>" + Shortened(resultsArray[i].OsName)
						+ "</td>";
				data = data + "<td>" + Shortened(resultsArray[i].IeName)
						+ "</td>";
				data = data + "<td>" + resultsArray[i].LangName + "</td>";
				data = data + "<td>" + resultsArray[i].OfficeName + "</td>";

				data = data + "<td>"
						+ "<a href='#' onClick='ShowAPACMvUpdatePage(\""
						+ resultsArray[i].vmRef + "\")'>";
				data = data + "<img src='images/pen16by16.png' />"
						+ "</a></td>";
				data = data + "<td>"
						+ "<a href='#'onClick='ValidateDisableAPACVM(\""
						+ resultsArray[i].vmRef
						+ "\")'><img src='images/bin16by16.png' />"
						+ "</a></td>";
				data = data + "</tr>";

			}

			data = data + "</tbody>";
			$("#table_apac_vm_list").append(data);

		},
		complete : function(e) {
			$("#table_apac_vm_list").dataTable({
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

function ShowAPACMvUpdatePage(vmref) {

	$.blockUI();
	localStorage.setItem('vmRefUpdate', vmref);
	$("#containerPage").load("pages/APACUpdatePage.jsp");
	$.ajax({
		type : "POST",
		url : "GetAPACVMDetail",
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
				vmRerName = resultsArray[0].vmRef;
				vmURILink = resultsArray[0].defaultUriLink;
				$("#vm_apac_ref_update").val(resultsArray[0].vmRef);
				$("#vm_apac_url_update").html(vmURILink);
				GetApacsInternetExplorer(resultsArray[0].IeName);
				GetApacOperatingSystem(resultsArray[0].OsName);  
				GetApacOffice(resultsArray[0].OfficeName);
				GetApacLanguage(resultsArray[0].LangName);

			}
		},
		complete : function(e) {

			GetAllApacVMProducts('apac', localStorage.getItem('vmRefUpdate'));
		}
	});

}

function GetApacsInternetExplorer(vmref) {
	$("#vm_apac_ie_update").html("");
	var data = "";
	$.ajax({
		type : "POST",
		url : "GetVMIeList",
		data : '{"ielist":"' + "ielist" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var i = 0;
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			$("#vm_apac_ie_update").html("");
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

			
		},
		complete : function(e) {
			$("#vm_apac_ie_update").append(data);
		}
	});
}

function GetApacOperatingSystem(vmref) {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "GetAllOsList",
		data : '{"osList":"' + "osList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_apac_os_update").html("");
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

			$("#vm_apac_os_update").append(data);
		},
		complete : function(e) {

		}
	});
}

function GetApacOffice(vmref) {

	$.ajax({
		type : "POST",
		url : "GetAllVMOffice",
		data : '{"MosList":"' + "MosList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_apac_office_update").html("");
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

			$("#vm_apac_office_update").append(data);
		},
		complete : function(e) {

		}
	});

}

function GetApacLanguage(vmref) {

	$.ajax({
		type : "POST",
		url : "GetAllVMLanguage",
		data : '{"MosList":"' + "MosList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_apac_language_update").html("");
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

			$("#vm_apac_language_update").append(data);
		},
		complete : function(e) {

		}
	});
}

function GetAllApacVMProducts(region, vmref) {
	$("#vm_product_update option").html("");
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

			$("#vm_apac_product_update").append(data);

		},
		complete : function(e) {
			GetAllApacUnselectedVMroducts('apac', localStorage
					.getItem('vmRefUpdate'));
		}
	});
}

function GetAllApacUnselectedVMroducts(region, vmref) {
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

			$("#vm_apac_product_update").append(data);
		},
		complete : function(e) {
			$('.multi').multiselectable({
				selectableLabel : 'Available Products',
				selectedLabel : 'Vm Products'
			});
			$("#vm_apac_ref_update").val(localStorage.getItem('vmRefUpdate'));
			$("#vm_apac_url_update").val(vmURILink);
			$.unblockUI();
		}
	});
}

function GetBackToApacList() {
	$.blockUI();
	$("#containerPage").load("pages/APACList.jsp");
}
function GetAllApacSelectedProducts() {
	LogApacActivity('3', '2', localStorage.getItem("vmRefUpdate"), localStorage
			.getItem('userId'));
	$.blockUI();
	$("#m-selected option").each(
			function() {
				// (vmref,os,language,office,enabled,uriLink,ieId,product)
				AddUpdateAPACVmWare(localStorage.getItem("vmRefUpdate"), $(
						"#vm_apac_os_update").val(), $(
						"#vm_apac_language_update").val(), $(
						"#vm_apac_office_update").val(), $(
						"#vm_apac_update_enabled").val(), $(
						"#vm_apac_url_update").val(), $("#vm_apac_ie_update")
						.val(), this.value);
			});
	$("#containerPage").load("pages/APACList.jsp");
}

function DeleteApacVmWareForUpdate(region, vmref) {
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
			GetAllApacSelectedProducts();
			$.unblockUI();
		}
	});
}

function AddUpdateAPACVmWare(vmref, os, language, office, enabled, uriLink,
		ieId, product) {
	$.ajax({
		type : "POST",
		url : "AddNewApacVM",
		data : '{"region":"' + 'apac' + '","vmref":"' + vmref + '","os":"' + os
				+ '","language":"' + language + '","office":"' + office
				+ '","enabled":"' + enabled + '","uriLink":"'
				+ ReplaceCh(uriLink) + '","ieId":"' + ieId + '","product":"'
				+ product + '"}',
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

function GetAddApacOS() {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "GetAllOsList",
		data : '{"osList":"' + "osList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_apac_os_add").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='" + resultsArray[i].OsId + "'>";
				data = data + resultsArray[i].OsName + "</option>";
			}

			$("#vm_apac_os_add").append(data);
		},
		complete : function(e) {

		}
	});

}

function GetAddApacOffice() {
	$.ajax({
		type : "POST",
		url : "GetAllVMOffice",
		data : '{"MosList":"' + "MosList" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#vm_office_apac_add").html("");
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (i = 0; i < resultsArray.length; i++) {

				data = data + "<option value='" + resultsArray[i].MsoId + "'>";
				data = data + resultsArray[i].MsoName + "</option>";
			}

			$("#vm_office_apac_add").append(data);
		},
		complete : function(e) {

		}
	});

}

function GetAddApacInternetExplorer() {

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

			$("#vm_apac_ie_add").append(data);
		},
		complete : function(e) {

		}
	});
}

function GetAddApacLanguage() {

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

			$("#vm_apac_language_add").append(data);
		},
		complete : function(e) {

		}
	});
}

function GetAddApacProducts(region) {
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

			$("#vm_apac_product_add").append(data);
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

function GetAddApacSelectedProducts() {
	LogApacActivity('1', '2', $("#vm_apac_ref_add").val(), localStorage
			.getItem('userId'));
	$.blockUI();
	$("#m-selected option").each(
			function(index) {
				var total = $('#m-selected option').length;

				// (vmref,os,language,office,enabled,uriLink,ieId,product)
				AddUpdateAPACVmWare($("#vm_apac_ref_add").val(), $(
						"#vm_apac_os_add").val(), $("#vm_apac_language_add")
						.val(), $("#vm_office_apac_add").val(), $(
						"#vm_apac_add_enabled").val(), $("#vm_apac_url_add")
						.val(), $("#vm_apac_ie_add").val(), this.value);
				if (index + 1 === total) {
					$.unblockUI();
					$("#containerPage").load("pages/APACList.jsp");
				}
			});

}

function ValidateDisableAPACVM(vmref) {
	var r = confirm("Are you sure you want to disable this?");
	if (r == true) {
		DisableAPACVM(vmref);
	} else {
		return false;
	}

}

function DisableAPACVM(vmref) {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "DisableVMWare",
		data : '{"vmref":"' + vmref + '","region":"' + "apac" + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

		},
		complete : function(e) {
			LogApacActivity('5', '2', vmref, localStorage.getItem('userId'));
			GetAllAPACVM();
		}
	});
}


function ReplaceCh(ch) {
	return ch.replace(/\&/g, '*****');

}

function LogApacActivity(activity, module, moduleId, userId) {
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
