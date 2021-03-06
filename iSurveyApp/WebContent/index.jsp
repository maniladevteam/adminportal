<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

  <head>
    <title>My App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui">
    <link rel="stylesheet" href="js/appjs/app.min.css">
    <style>
      /* TODO */
    </style>
    
  </head>

  <body>
    <div class="app-page" data-page="home">
    <div class="app-topbar">
        <div class="app-title">Simple Web App</div>
    </div>
    <div class="app-content">
        <br />
        <div class="app-button green">SignIn</div>
        <br />
        <div class="app-button blue">SignUp</div>
    </div>
</div>

    <div class="app-page" data-page="page2">
      <div class="app-topbar">
        <div class="app-button left" data-back data-autotitle></div>
        <div class="app-title">Page 2</div>
      </div>
      <div class="app-content">
        Page 2 is lonely
      </div>
    </div>

    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/appjs/zepto.js"></script>
    <script src="js/appjs/app.min.js"></script>
    <script>
      App.controller('home', function (page) {
        // put stuff here
      });

      App.controller('page2', function (page) {
        // put stuff here
      });

      try {
        App.restore();
      } catch (err) {
        App.load('home');
      }
    </script>
  </body>
</html>
