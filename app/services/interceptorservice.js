'use strict';

angular.module('myApp').factory('myHttpInterceptor',function($q,$location) {
  var errorResponse = ['Please login to continue','for error code 1'];
  return {   
    'request': function(config) {      
      return config;
    },    
   'requestError': function(rejection) {
      return $q.reject(rejection);      
    },
    'response': function(response) {

        return response;
    },
    'responseError': function(rejection) {
      if(rejection.status==401 || rejection.status==500)
      {

        alert("You are not authorized");

        $location.path('/login');  
              
      }
      return $q.reject(rejection);
    }
  };
});
angular.module('myApp').config(['$httpProvider',function($httpProvider){
  $httpProvider.interceptors.push('myHttpInterceptor');
}]);




