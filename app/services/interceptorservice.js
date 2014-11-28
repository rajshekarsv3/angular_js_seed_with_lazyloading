'use strict';

angular.module('myApp').factory('myHttpInterceptor', function($q,$location) {
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
      if(rejection.status==401)
      {
        $http.defaults.headers.common['X-User-Email'] = undefined;
        $http.defaults.headers.common['X-User-Token'] = undefined;
        alert("You are not authorized");
        $location.path('/welcome');        
      }
      return $q.reject(rejection);
    }
  };
});
angular.module('myApp').config(['$httpProvider',function($httpProvider){
  $httpProvider.interceptors.push('myHttpInterceptor');
}]);




