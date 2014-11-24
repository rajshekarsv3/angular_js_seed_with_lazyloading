'use strict';

angular.module('myApp.view1', ['ngRoute','ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])


.controller('View1Ctrl', ['$http','$cookieStore',function($http,$cookieStore) {
	//$http.get("http://localhost:3000/api/v1/sessions")
    //.success(function(response) {document.cookie="XSRF-TOKEN="+response.data['csrf_token']})
    console.log($http.defaults.headers.post['Content-Type']);
	$http.post("http://localhost:3000/api/v1/sessions",{user:{email:"user@example.com",password:"1234567890"}})
    .success(function(response) {console.log(response);});
    $cookieStore.put('myFavorite','oatmeal');
  // Get cookie
  var favoriteCookie = $cookieStore.get('myFavorite');
  // Removing a cookie
  console.log(favoriteCookie)

    $cookieStore.put('user-email','oatmeal@oatmeal');
    $cookieStore.put('user-token','oatmeal@oatmeal');

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