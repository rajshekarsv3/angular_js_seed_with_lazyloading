'use strict';

angular.module('myApp.logout', []);
login.controller('logoutCtrl', ['AuthService',function(AuthService) {
	AuthService.logOut();	
}]);