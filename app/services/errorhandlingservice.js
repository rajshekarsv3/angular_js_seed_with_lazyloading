'use strict';

angular.module('myApp').
factory('ErrorHandlingService',function($http,$location){
	var errorResponse = ['for error code 0','for error code 1'];
	var errorHandlingService = {
	
		handleError: function(err_code) {
			alert(errorResponse[err_code]);
			$http.post("http://localhost:3000/api/v1/sessions")
    			.then(function(response) {
    				console.log("deleted");
    				$location.path('/welcome');
    				$http.defaults.headers.common['X-User-Email'] = undefined;
    				$http.defaults.headers.common['X-User-Token'] = undefined;


    		});

		}
	}
	return errorHandlingService;
});