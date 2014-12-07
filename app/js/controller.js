'use strict';

define(function () {

	/* Controllers */
	
	return angular.module('controllers',[])
		.controller('welcomeCtrl', ['$scope', '$injector', function($scope, $injector) {
			require(['../modules/welcome/welcomeController'], function(myctrl2) {
				$injector.invoke(myctrl2, this, {'$scope': $scope});
			});
		}])
		.controller('loginCtrl',['$scope','$injector','$http','AuthService'],function($scope,$injector,$http,AuthService){
			require(['../modules/login/loginController'], function(loginCtrl) {
				$injector.invoke(loginCtrl, this, {'$scope': $scope});
			});
		});
});