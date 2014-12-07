'use strict';

define(['angular', 'app'], function(angular, app) {

	return app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('welcome', {
  	url: '/welcome',
    templateUrl: 'modules/welcome/welcome.html',
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
  	templateUrl: 'modules/login/login.html',
  	controller: 'loginCtrl'
  }).
  state('/logout',{
    url: 'modules/logout',
    controller: 'logoutCtrl'
  }).state('/home', {         
      resolve: {
        access: function(AuthService)
        {
           return AuthService.hasAccess("tests");
        }
      },
      url: '/home',
      templateUrl: 'home/home.html',  
      controller: 'homeCtrl'
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

});