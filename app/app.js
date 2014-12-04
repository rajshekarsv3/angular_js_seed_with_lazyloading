'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [  
  'welcome',
  'myApp.login',
  'myApp.home',  
  'ui.router',
  'myApp.logout'  
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('welcome', {
  	url: '/welcome',
    templateUrl: 'welcome/welcome.html',
    resolve: {
        access: function(AuthService)
        {
           return AuthService.welcomeCheck();
        }
      },
    //controller: 'welcomeCtrl'
  }).
  state('/login',{
  	url: '/login',
  	templateUrl: 'login/login.html',
  	controller: 'loginCtrl'
  }).
  state('/logout',{
    url: '/logout',
    controller: 'logoutCtrl'
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
  $root.$on('$stateChangeError', function(e, curr, prev) { 
    // Hide loading message
    console.log("route change Error")
    $root.loadingView = false;
  });
}]);




