<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<style type="text/css">
body {
	font-family: arial;
	background: #FFFFFF;
	margin: 0;
	padding: 0;
	color: #7a7a7a;
	font-size: x-small;
}

.button {
	font-family: arial;
	background: #FFFFFF;
	margin: 0;
	padding: 0;
	color: #7a7a7a;
	font-size: x-small;
	border: 2px solid #a1a1a1;
	padding: 1px 5px;
	background-color: #66b5d9;
	border-radius: 25px;
	width: 200px;
	padding-left: 10px;
}

.button:hover {
	width: 200px;
}

span {
	color: red;
}
</style>
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-1.9.1.js"></script>

<script type="text/javascript" src="js/jQuery-MD5-master/jquery.md5.js"></script>
<script type="text/javascript" src="js/jquery.blockUI.js"></script>
<script type="text/javascript">
  $(document)
          .ready(
                  function() {
                    if (localStorage.getItem('logged') == '1') {
                      window.location = 'index.jsp';
                    }
                    GetLoginValue();

                    $("#save_password_chk")
                            .click(
                                    function() {
                                      if ($('#save_password_chk')
                                              .is(":checked") === true) {
                                        if (localStorage.getItem("111$$") == "undefined"
                                                || localStorage
                                                        .getItem("email") == "undefined") {
                                          localStorage.setItem("email", $(
                                                  "#vdi_user_name").val());
                                          localStorage.setItem("111$$", $(
                                                  "#vdi_user_pass").val());
                                        } else {
                                          $("#vdi_user_pass")
                                                  .val(
                                                          localStorage
                                                                  .getItem("111$$"));
                                          $("#vdi_user_name")
                                                  .val(
                                                          localStorage
                                                                  .getItem("email"));
                                        }
                                      } else {
                                        localStorage.setItem("111$$", "");
                                        $("#vdi_user_name").val("");
                                        $("#vdi_user_pass").val("");
                                      }
                                    });

                    $("#vdi_login_button").click(function() {
                      $.blockUI();
                      FreshLogin();
                    });

                  });

  function FreshLogin() {
    SetLoginValue();
    $.ajax({
      type: "POST",
      url: "ValidatePassword",
      data: '{"email":"' + $("#vdi_user_name").val() + '"' + ',"password":"'
              + $.md5($("#vdi_user_pass").val()) + '"}',
      contentType: "application/x-www-form-urlencoded",
      dataType: "json",
      success: function(response) {
        var i = 0;
        var data = "";
        var resultsArray = (typeof response) == 'string' ? eval('(' + response
                + ')') : response;
        for (i = 0; i < resultsArray.length; i++) {
          localStorage.setItem('userpass', resultsArray[0].password);
          localStorage.setItem('userId', resultsArray[0].userId);
          localStorage.setItem('email', resultsArray[0].email);
          localStorage.setItem('admin', resultsArray[0].isAdmin);
          if (resultsArray[0].Valid == 'VALID') {
            if (resultsArray[0].changed == '0') {
              window.location = 'ChangePassword.jsp';
            } else {
              localStorage.setItem('logged', '1');
              localStorage.setItem('loggedname', resultsArray[0].firstName);
              window.location = 'index.jsp';
            }
          } else {
            alert('INVALID USER');
          }
        }
      },
      complete: function(e) {
        $.unblockUI();
      }
    });
  }

  function GeneratedLogin() {
    $.ajax({
      type: "POST",
      url: "ValidatePassword",
      data: '{"email":"' + $("#vdi_user_name").val() + '"' + ',"password":"'
              + $.md5($("#vdi_user_pass").val()) + '"}',
      contentType: "application/x-www-form-urlencoded",
      dataType: "json",
      success: function(response) {
        var i = 0;
        var data = "";
        var resultsArray = (typeof response) == 'string' ? eval('(' + response
                + ')') : response;
        for (i = 0; i < resultsArray.length; i++) {
          localStorage.setItem('userpass', resultsArray[0].password);
          localStorage.setItem('userId', resultsArray[0].userId);
          localStorage.setItem('email', resultsArray[0].email);
          localStorage.setItem('admin', resultsArray[0].isAdmin);
          if (resultsArray[0].Valid == 'VALID') {
            if (resultsArray[0].changed == '0') {
              window.location = 'ChangePassword.jsp';
            } else {
              localStorage.setItem('logged', '1');
              localStorage.setItem('loggedname', resultsArray[0].firstName);
              window.location = 'index.jsp';
            }
          } else {
            alert('INVALID USER');
          }
        }
      },
      complete: function(e) {
        $.unblockUI();
      }
    });
  }

  function GetLoginValue() {
    if (localStorage.getItem("123m3w13312") == "t12u3") {
      $('#save_password_chk').prop('checked', true);
      $("#vdi_user_pass").val(localStorage.getItem("111$$"));
      $("#vdi_user_name").val(localStorage.getItem("email"));
    }
  }

  function SetLoginValue() {
    if ($('#save_password_chk').is(":checked") === true) {
      localStorage.setItem("email", $("#vdi_user_name").val());
      localStorage.setItem("111$$", $("#vdi_user_pass").val());
      localStorage.setItem("123m3w13312", "t12u3");
    } else {
      localStorage.setItem("123m3w13312", "fV1$3");
    }
  }
</script>
<title>VDI LOGIN PAGE</title>
</head>

<body>
	<center>
		<div>
			<img src="images/headerGVDI02.png" alt="Insert Logo Here"
				width="100%" height="100%;" id="Insert_logo"
				style="background: #7a7a7a;" />
		</div>
		<div>
			<br /> <br /> <br /> <br /> <br /> <br />
			<table frame="box">
				<tr>
					<td colspan="2" aling="center">LOGIN HERE:</td>
				</tr>
				<tr>
					<td>EMAIL:<span>*</span></td>
					<td><input type="text" id="vdi_user_name"></input></td>
				</tr>
				<tr>
					<td>PASSWORD:<span>*</span></td>
					<td><input type="password" id="vdi_user_pass"></input></td>
				</tr>
				<tr>
					<td></td>
					<td><h3>
							<input type="checkbox" id="save_password_chk" />Remember
							password
						</h3></td>
				</tr>

				<tr>
					<td colspan="2">&nbsp;</td>
				</tr>

				<tr>
					<td colspan="2" style="padding-left: 15px;"><input
						class="button" type="button" id="vdi_login_button" value="LOGIN" /></td>
				</tr>
				<tr>
					<td colspan="2">&nbsp;</td>
				</tr>

			</table>
		</div>
	</center>
</body>
</html>