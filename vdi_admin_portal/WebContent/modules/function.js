functionInstance = function() {

	
	this.GetRegionProductList = function(region){
		alert(region);
		
	};
	
	this.Logout = function(){
		
		localStorage.setItem('logged','0');
		
		localStorage.setItem('ieId','');
		localStorage.setItem('langId','');
		localStorage.setItem('loggedname','');
		localStorage.setItem('officeId','');
		localStorage.setItem('prodRegion','');
		
		localStorage.setItem('userId','');
		localStorage.setItem('userpass','');
		localStorage.setItem('vmRefUpdate','');
		window.location = 'login.jsp';
	};
	
};