'use strict';

var login = angular.module('myApp.login', ['ngRoute','ui.router','myApp.home']);
login.controller('loginCtrl', ['$http','$scope','AuthService',function($http,$scope,AuthService) {
	$http.defaults.headers.common['X-User-Email'] = undefined;
    $http.defaults.headers.common['X-User-Token'] = undefined;
	$scope.credentials = {
	    username: '',
	    password: ''
	  };
   	$scope.login = function(credentials){
   		AuthService.login(credentials);
   		$scope.roles = AuthService.roles;   		
   	};
}])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider,AuthService) {
	$stateProvider.state('/home', {	  	   	
	    resolve: {
	    	access: function(AuthService)
	    	{
	    		 return AuthService.hasAccess("tests");
	    	}
	    },
	    url: '/home',
	    templateUrl: 'home/home.html',	
	    controller: 'homeCtrl'
	  })
}]);