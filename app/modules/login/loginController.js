'use strict';
define([],function(){
	return ['$http','$scope','AuthService','$rootScope',function($http,$scope,AuthService,$rootScope) {

	$rootScope.show_authentication_bar=true;
	$http.defaults.headers.common['X-User-Email'] = undefined;
    $http.defaults.headers.common['X-User-Token'] = undefined;
    sessionStorage.clear();
    $rootScope.logged_in =false;
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
