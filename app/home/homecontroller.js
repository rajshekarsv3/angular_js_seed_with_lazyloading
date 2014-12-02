'use strict';

angular.module('myApp.home', ['ngRoute','ui.router'])
.controller('homeCtrl', ['$rootScope','$http','$cookieStore','$scope','AuthService',function($rootScope,$http,$cookieStore,$scope,AuthService) {

   	
   	setTimeout(function(){ console.log($scope.roles); }, 3000);
   	console.log($scope.roles)
   	

	


    

}])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider,AuthService) {
	
}]);