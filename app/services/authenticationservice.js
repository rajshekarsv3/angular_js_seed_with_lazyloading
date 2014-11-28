'use strict';

angular.module('myApp').
factory('AuthService',function($http,$location,ErrorHandlingService){
	var authService = {
		auth_token: '',
		email: '',
		login: function(credentials) {
			$http.post("http://localhost:3000/api/v1/sessions",{user:{email:credentials.username,password:credentials.password}})
    			.then(function(response) {console.log(response.data['data']['user']['authentication_token']);
    				sessionStorage.my_key=response.data['data']['user']['authentication_token'];
    				sessionStorage.my_email=response.data['data']['user']['email'];
    				$http.defaults.headers.common['X-User-Email'] = sessionStorage.my_email;
    				$http.defaults.headers.common['X-User-Token'] = sessionStorage.my_key;
    				authService.getRoles();
    				$location.path('/home');

    			});
		},

		getRoles: function(){
			$http.post("http://localhost:3000/api/v1/sessions/get_roles")
				.then(function(response){
					
					authService.roles = response['data']['roles'];
					console.log(authService.roles);
				});
		},
		roles: {

		}
	}
	return authService;
});