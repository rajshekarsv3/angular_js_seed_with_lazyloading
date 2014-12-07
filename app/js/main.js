'use strict';

require.config({
	paths: {
		angular: '../bower_components/angular/angular',
		bower_components: '../bower_components',
		app: 'app'
	},
	shim: {
		'angular': {
		    'exports': 'angular'
		},
		'app':{
			deps: ['angular']
		}
	}
});
window.name = "NG_DEFER_BOOTSTRAP!";
require( [
	'angular',
	'app',
	'route',
		
], function(angular,app,route) {				
		var $html = angular.element(document.getElementsByTagName('html')[0]);
		angular.element().ready(function() {
			angular.resumeBootstrap([app['name']]);
		});	
});