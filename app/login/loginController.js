'use strict';

var login = angular.module('myApp.login', ['ngRoute','ui.router']);

login.controller('loginCtrl', ['$http','$cookieStore','$scope','AuthService',function($http,$cookieStore,$scope,AuthService) {
	$scope.credentials = {
	    username: '',
	    password: ''
	  };
   	$scope.login = function(credentials){
   		AuthService.login(credentials);
   		$scope.roles = AuthService.roles;
   		
   	};
   	$scope.test = function(){
   		AuthService.getRoles();
   	}
	


    

}])
.
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', {
	  	url: '/home',
	    templateUrl: 'home/home.html',
	    //controller: 'welcomeCtrl'
	  })
}]);