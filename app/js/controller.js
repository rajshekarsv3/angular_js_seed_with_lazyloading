'use strict';

define(function () {

	/* Controllers */
	
	return angular.module('controllers',[])
		.controller('welcomeCtrl', ['$scope', '$injector', function($scope, $injector) {
			require(['../modules/welcome/welcomeController'], function(myctrl2) {
				$injector.invoke(myctrl2, this, {'$scope': $scope});
			});
		}])
		.controller('loginCtrl',['$scope','$injector',function($scope,$injector){
			require(['../modules/login/loginController'], function(loginCtrl) {
				$injector.invoke(loginCtrl, this, {'$scope': $scope});
			});
		}])
		.controller('homeCtrl',['$scope','$injector','$http','AuthService',function($scope,$injector,$http,AuthService){
			require(['../modules/home/homecontroller'], function(homeCtrl) {
				$injector.invoke(homeCtrl, this, {'$scope': $scope});
			});
		}])
		.controller('logoutCtrl',['$injector','AuthService',function($injector,AuthService){
			require(['../modules/logout/logoutController'], function(logoutCtrl) {
				$injector.invoke(logoutCtrl, this);
			});
		}]);
});