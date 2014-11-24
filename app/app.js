'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.welcome',
  'myApp.login',
  'myApp.view2',
  'myApp.version',
  
]).
config(['$httpProvider', function ($httpProvider) {
    
    //$httpProvider.defaults.headers.post['Accept'] = 'application/json'

    $httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/welcome', {
    templateUrl: 'welcome/welcome.html',
    controller: 'welcomeCtrl'
  }).
  when('/login',{
  	templateUrl: 'login/login.html',
  	controller: 'loginCtrl'
  }).
  otherwise({
    templateUrl: 'welcome/welcome.html',
    controller: 'welcomeCtrl'
  });
}]);


