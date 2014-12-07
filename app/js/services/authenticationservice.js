'use strict';
define(function(){
	
return angular.module("authenticationservice",[]).factory('AuthService',function($http,$location,$rootScope,$q,$timeout){
	var authService = {
		auth_token: '',
		email: '',
		login: function(credentials) {
			$http.post("http://localhost:3000/api/v1/sessions",{user:{email:credentials.username,password:credentials.password}})
    			.then(function(response) {
    				sessionStorage.my_key=response.data['data']['user']['authentication_token'];
    				sessionStorage.my_email=response.data['data']['user']['email'];
    				$rootScope.logged_in=true;
    				$rootScope.show_authentication_bar=true;
    				$location.path('/home');
    			});
		},
		hasAccess: function(destination){
			destination	=	destination || null;
			if(! sessionStorage.my_key || ! sessionStorage.my_email)
			{
				authService.logOut(1);
				return;
			}
			else if( ($http.defaults.headers.common['X-User-Email']==undefined) || ($http.defaults.headers.common['X-User-token']==undefined) )
			{
				$http.defaults.headers.common['X-User-Email'] = sessionStorage.my_email;
    			$http.defaults.headers.common['X-User-Token'] = sessionStorage.my_key;
    			var get_roles = $http.post("http://localhost:3000/api/v1/sessions/get_roles")
    			.then(function(response){
    				$rootScope.logged_in=true;
    				$rootScope.show_authentication_bar=true;
    				var role = response['data']['roles'];
    				angular.forEach(role,function(value){
    					console.log(value);
    					switch(value){
    						case "test_user":
    							$rootScope.test_user = true;
    							break;
    					}
    				});
    				console.log($rootScope.test_user);
    				if(destination)
    					authService.checkAccess(destination);   				
    			});
    			return get_roles;   
   			}
					
		},
		checkAccess: function(destination)
		{
    		var check_access = $http.get("http://localhost:3000/api/v1/"+destination)
				.then(function(response){
					if(response['data']['success'] == false)
					{
						authService.logOut(response['data']['error_code']);	
					}					
				});
			return check_access;
		},
		logOut: function(err_code)
		{
			console.log("here");
			console.log(err_code);
			err_code = err_code || null;
			console.log(err_code);
			var errorResponse = ['User clicked logout','Please login to continue','for error code 1'];
			if(err_code)
				alert(errorResponse[err_code]);
			if( sessionStorage.my_key &&  sessionStorage.my_email)
			{
				$http.delete("http://localhost:3000/api/v1/sessions");
			}
			$rootScope.logged_in=false;
			$rootScope.show_authentication_bar=true;
			if(err_code)    			
				$location.path('/login');
			else
				$location.path('/welcome');
			$http.defaults.headers.common['X-User-Email'] = undefined;
			$http.defaults.headers.common['X-User-Token'] = undefined;
			sessionStorage.clear();
		},
		welcomeCheck: function()
		{
			if(! sessionStorage.my_key && ! sessionStorage.my_email)
			{
				$rootScope.show_authentication_bar=true;
				return;
			}
			else
				return authService.hasAccess();	
		}
	}
	return authService;

	});
});