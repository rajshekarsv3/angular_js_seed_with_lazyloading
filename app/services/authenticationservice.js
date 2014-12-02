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
		roles: {

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
    			$http.post("http://localhost:3000/api/v1/sessions/get_roles")
    			.then(function(response){
    				$rootScope.roles=response['data']['roles'];		
    			}).then(function(){    				
    				//console.log(authService.checkAccess(destination));
    				return authService.checkAccess(destination);    				
    			});	
			}
			else
			{
				console.log(authService.checkAccess(destination));
				return authService.checkAccess(destination);
			}
		},
		checkAccess: function(destination)
		{
			
			
			$http.get("http://localhost:3000/api/v1/"+destination)
				.then(function(response){
					//console.log(response['data']['success']);
					if(response['data']['success'] == false)
					{
						console.log("inside");
						ErrorHandlingService.handleError(response['data']['error_code']);	
									
					}					
				});
				console.log($rootScope.roles);
			return $rootScope.roles;
			
		}
	}
	return authService;
});