'use strict';
define([],function(){
	['$http','$scope','AuthService',function($http,$scope,AuthService) {
	$http.defaults.headers.common['X-User-Email'] = undefined;
    $http.defaults.headers.common['X-User-Token'] = undefined;
    sessionStorage.clear();
	$scope.credentials = {
	    username: '',
	    password: ''
	  };
   	$scope.login = function(credentials){
   		AuthService.login(credentials);
   		$scope.roles = AuthService.roles;   		
   	};
   	$scope.$apply();
}];
});
