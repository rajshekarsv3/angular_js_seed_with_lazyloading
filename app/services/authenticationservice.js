'use strict';

angular.module('myApp').
factory('AuthService',function($http,$location,ErrorHandlingService,$rootScope,$q,$timeout){
	var authService = {
		auth_token: '',
		email: '',
		login: function(credentials) {
			$http.post("http://localhost:3000/api/v1/sessions",{user:{email:credentials.username,password:credentials.password}})
    			.then(function(response) {
    				sessionStorage.my_key=response.data['data']['user']['authentication_token'];
    				sessionStorage.my_email=response.data['data']['user']['email'];
    				$location.path('/home');
    			});
		},
		hasAccess: function(destination){			
			if(! sessionStorage.my_key && ! sessionStorage.my_email)
			{
				ErrorHandlingService.handleError(0);
				return;
			}
			else if( ($http.defaults.headers.common['X-User-Email']==undefined) || ($http.defaults.headers.common['X-User-token']==undefined) )
			{
				$http.defaults.headers.common['X-User-Email'] = sessionStorage.my_email;
    			$http.defaults.headers.common['X-User-Token'] = sessionStorage.my_key;
    			var get_roles = $http.post("http://localhost:3000/api/v1/sessions/get_roles")
    			.then(function(response){
    				//$rootScope.roles=response['data']['roles']; 
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
						ErrorHandlingService.handleError(response['data']['error_code']);	
					}					
				});
			return check_access;
		}
	}
	return authService;
});