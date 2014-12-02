'use strict';

var login = angular.module('myApp.login', ['ngRoute','ui.router']);
login.controller('loginCtrl', ['$http','$cookieStore','$scope','AuthService',function($http,$cookieStore,$scope,AuthService) {
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
	    	roles: function($q,$timeout,AuthService)
	    	{
	    		
	    		

	    		//return AuthService.hasAccess("tests")
	    		var deferred=$q.defer();
	    		$timeout(function(){
	    			console.log(AuthService.hasAccess("tests"));
	    			if(AuthService.hasAccess("tests"))
	    			{
	    				console.log(1);
		    			deferred.resolve("Is Authenticated");
	    			}
		    		else
		    		{
		    			console.log(2);
		    			deferred.reject("Not Authenticated");
		    		}
		    	});

	    		 return deferred.promise;
	    	}
	    },
	    url: '/home',
	    templateUrl: 'home/home.html',	
	    controller: 'homeCtrl'

	  })
}]);