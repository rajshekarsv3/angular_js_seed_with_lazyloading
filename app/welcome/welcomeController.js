'use strict';

angular.module('welcome', ['ngRoute','ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/welcome', {
    templateUrl: 'welcome/welcome.html',
    controller: 'welcomeCtrl'
  });
}])


.controller('welcomeCtrl', ['$http','$cookieStore','$scope',function($http,$cookieStore,$scope) {
	
   	$scope.welcomeText = "Welcome To Schoolcom!!!! This is Welcome page and we will be using this part later";
	//$http.post("http://localhost:3000/api/v1/sessions",{user:{email:"user@example.com",password:"1234567890"}})
    //.success(function(response) {console.log(response);});


    

}]);