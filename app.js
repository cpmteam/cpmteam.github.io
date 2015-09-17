'use strict';

var app = angular.module('sampleApp', ['ngRoute', 'ngMaterial']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', 
		{
			templateUrl: 'partial/main.html', 
			controller: 'MainCtrl',
		})
		.otherwise({redirectTo: '/'});
}]);