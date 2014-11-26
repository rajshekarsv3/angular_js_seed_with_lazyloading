'use strict';

var login = angular.module('myApp.login', ['ngRoute','ngCookies']);

login.controller('loginCtrl', ['$http','$cookieStore','$scope','AuthService',function($http,$cookieStore,$scope,AuthService) {
	$scope.credentials = {
	    username: '',
	    password: ''
	  };
   	$scope.login = function(credentials){
   		AuthService.login(credentials);
   		
   	};
	


    

}]);