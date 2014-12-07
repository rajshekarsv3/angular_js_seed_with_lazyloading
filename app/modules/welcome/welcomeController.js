'use strict';


define([],function(){
	return ['$http','$scope',function($http,$scope) {
	
   	$scope.welcomeText = "Welcome To Schoolcom!!!! This is Welcome page and we will be using this part later";
	//$http.post("http://localhost:3000/api/v1/sessions",{user:{email:"user@example.com",password:"1234567890"}})
    //.success(function(response) {console.log(response);});


    $scope.$apply();

}];
});
