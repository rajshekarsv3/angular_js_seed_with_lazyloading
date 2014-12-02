'use strict';

angular.module('myApp').
factory('ErrorHandlingService',function($http,$location){
	var errorResponse = ['Please login to continue','for error code 1'];
	var errorHandlingService = {
	
		handleError: function(err_code) {
			alert(errorResponse[err_code]);
			if( sessionStorage.my_key &&  sessionStorage.my_email)
			{
				$http.delete("http://localhost:3000/api/v1/sessions");
			}
    			
			$location.path('/login');
			$http.defaults.headers.common['X-User-Email'] = undefined;
			$http.defaults.headers.common['X-User-Token'] = undefined;
			sessionStorage.clear();


    		

		}
	}
	return errorHandlingService;
});