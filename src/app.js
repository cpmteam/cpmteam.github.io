'use strict';

/// Styles loading
import 'angular-material/angular-material.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'source-sans-pro/source-sans-pro.css';
import './css/default.scss';

window.$ = window.jQuery = require('jquery');
import 'typed.js';

import angular from 'angular';

import 'angular-material';
import 'angular-route';
import 'angular-marked';
// import 'bootstrap';
import 'angular-bootstrap';

let app = angular.module('app', [
	'ngRoute',
	'ngMaterial',
	'ui.bootstrap',
	'hc.marked'
]);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('teal');
});

app.config(['markedProvider', function(markedProvider) {
  markedProvider.setOptions({gfm: true});
}]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', 
		{
			template: require('./templates/main-flex.html'),
			controller: 'MainCtrl',
		})
		.when('/repo/:name', 
		{
			template: require('./templates/repo.html'), 
			controller: 'RepoCtrl',
		})
		.otherwise({redirectTo: '/'});
}]);

// Services
let services = require.context('./services', true, /.js$/);
services.keys().forEach(services);
 
// Controllers
let controllers = require.context('./controllers', true, /.js$/);
controllers.keys().forEach(controllers);

$("#typed").typed({
		strings: ["Caché", "Community"],
		typeSpeed: 30,
		backDelay: 1500,
		loop: false,
		loopCount: 3
	});
