$(document).ready(function() {
	if(localStorage.getItem('prodRegion') == "" || localStorage.getItem('prodRegion') == undefined){
    GetAllProductsList('amers');
    $("#region_list").val("amers");
  }else{
    GetAllProductsList(localStorage.getItem('prodRegion'));
    $("#region_list").val(localStorage.getItem('prodRegion'));
  }
	$('#region_list').change(function(){
		localStorage.setItem('prodRegion', $('#region_list').val());
		GetAllProductsList($('#region_list').val());
		
	});
});
var productName = "";
function GetAllProductsList(region) {
	$.blockUI();
	$("#table_product_list").html('');
	
	$.ajax({
		type : "POST",
		url : "GetAllProductsPerRegion",
		data : '{"region":"' + region + '"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var i = 0;
			var data = "";
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			/* data = data + "<br />"; */
			data = data + "<thead>" + "<th>Product ID</th>";
			data = data + "<th>Product Name</th>";
			data = data + "<th>Update</th>";
			data = data + "<th>Delete</th>";
			data = data + "</thead>";
			data = data + "<tbody>";
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<tr>";
				data = data + "<td>" + resultsArray[i].ProductId
						+ "</td>";
				data = data + "<td>" + (resultsArray[i].ProductName)
						+ "</td>";
				data = data
						+ "<td style='align:right'>"
						+ "<a href='#' onClick='ShowProductseUpdatePage(\""
						+ resultsArray[i].ProductId + "\")'>";
				data = data + "<img src='images/pen16by16.png' />"
						+ "</a></td>";
				data = data
						+ "<td style='align:right'>"
						+ "<a href='#' onClick='ValidateDeleteProduct(\""
						+ resultsArray[i].ProductId + "\")'>"
						+ "<img src='images/bin16by16.png' />"
						+ "</a></td>";
				data = data + "</tr>";
			}

			data = data + "</tbody>";
			$("#table_product_list").append(data);

		},
		complete : function(e) {
			$("#table_product_list").dataTable({
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


function ShowProductseUpdatePage(productId) {

	$.blockUI();
	localStorage.setItem('productId', productId);
	localStorage.setItem('prodRegion', $('#region_list').val());
	$("#containerPage").load("pages/ProductUpdatePage.jsp");
	
}

function GetBackToProductsList() {
	$.blockUI();
	$("#containerPage").load("pages/ProductsList.jsp");
}

function UpdateProducts(productId) {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "UpdateVMProductsList",
		data : '{"productId":"' + productId + 
				'","region":"' + localStorage.getItem('prodRegion') + 
				'","productName":"' + ReplaceCh($("#product_name_update").val()).trim() +
				'","productVersion":"' + ReplaceCh($("#product_version_update").val()) +
				'"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			alert("Updating Microsoft Language successful");
		},
		complete : function(e) {
			LogProductsActivity('3', '9',productId, localStorage.getItem('userId'));
			GetBackToProductsList();
			
		}
	});
}


function AddProduct() {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "AddNewVMProduct",
		data : '{"productName":"' + ReplaceCh($("#product_name_add").val()) + 
		'","region":"' + $("#add_product_region").val() +
		'"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			alert("Adding Products successful");
		},
		complete : function(e) {
			LogProductsActivity('1', '9',ReplaceCh($("#product_name_add").val()), localStorage.getItem('userId'));
			GetBackToProductsList();
		}
	});
}


function ValidateDeleteProduct(productId) {
	var r = confirm("Are you sure you want to delete this?");
	if (r == true) {
		DeleteProducts(productId);
	} else {
		return false;
	}

}

function DeleteProducts(productId) {
	$.blockUI();
	$.ajax({
		type : "POST",
		url : "DeleteVMProduct",
		data : '{"productId":"' + productId + '","region":"' +
		$('#region_list').val() +
		'"}',
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

		},
		complete : function(e) {
			LogProductsActivity('4', '9',productId, localStorage.getItem('userId'));
			GetAllProductsList(localStorage.getItem('prodRegion'));
		}
	});
}
function ReplaceCh(ch){
	return ch.replace(/\&/g, '*****');
	
}


function LogProductsActivity(activity, module, moduleId, userId) {
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

