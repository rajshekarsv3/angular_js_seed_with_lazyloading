'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  
]).
config(['$httpProvider', function ($httpProvider) {
    
    //$httpProvider.defaults.headers.post['Accept'] = 'application/json'

    $httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]).
controller('mainAppController',['$rootScope','$cookieStore',function($rootScope,$cookieStore){
	$cookieStore.put('user-email','oatmeal@oatmeal');
	console.log($cookieStore.get('user-email'));
	console.log('hi');


	if($cookieStore.get('user-email') && $cookieStore.get('user-token'))
	{
		console.log('hi inside');
	}
	else
	{
		console.log('hi');
	}
}]);
