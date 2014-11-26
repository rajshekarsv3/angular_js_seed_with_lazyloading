'use strict';

var login = angular.module('myApp.login', ['ngRoute','ngCookies']);

login.controller('loginCtrl', ['$http','$cookieStore','$scope',function($http,$cookieStore,$scope) {
	
   	console.log($scope.username);
	


    

}]);