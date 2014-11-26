'use strict';

angular.module('myApp').
factory('AuthService',function($http){
	var authService = {
		login: function(credentials) {
			$http.post("http://localhost:3000/api/v1/sessions",{user:{email:credentials.username,password:credentials.password}})
    			.success(function(response) {console.log(response);});
		}
	}
	return authService;
});