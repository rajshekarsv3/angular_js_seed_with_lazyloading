'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'welcome',
  'myApp.login',
  'myApp.home',
  'ngCookies',
  'ui.router',
  
  'myApp.version',
  
]).
config(['$httpProvider', function ($httpProvider) {
    
    //$httpProvider.defaults.headers.post['Accept'] = 'application/json'

    $httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('welcome', {
  	url: '/welcome',
    templateUrl: 'welcome/welcome.html',
    //controller: 'welcomeCtrl'
  }).
  state('/login',{
  	url: '/login',
  	templateUrl: 'login/login.html',
  	controller: 'loginCtrl'
  });
  $urlRouterProvider.otherwise('welcome');
}]).run(['$rootScope', function($root) {
  $root.$on('$stateChangeStart', function(e, curr, prev) { 
    console.log("route change start")
    if (curr.$$route && curr.$$route.resolve) {
      // Show a loading message until promises are not resolved
      $root.loadingView = true;
    }
  });
  $root.$on('$stateChangeSuccess', function(e, curr, prev) { 
    // Hide loading message
    console.log("route change success")
    $root.loadingView = false;
  });
}]);


