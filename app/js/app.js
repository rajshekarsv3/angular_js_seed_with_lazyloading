'use strict';


define([
  'angular',
  'controller',

  'services/authenticationservice',
  'services/interceptorservice',
  'services/routeresolverservice',
  
  'bower_components/angular-ui-router/release/angular-ui-router.min'
  ], function (angular) {

    // Declare app level module which depends on filters, and services
    
    

    return angular.module('myApp', [
      
      'ui.router',
      'authenticationservice',
      'interceptorservice',
      'controllers'

    ]);
    
});


