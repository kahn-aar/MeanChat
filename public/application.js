var mainApplicationModuleName = 'meanchat';
var mainApplicationModule = angular.module(mainApplicationModuleName
, ['ngRoute', 'users', 'profile']);
angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);
});

if (window.location.hash === '#_=_') window.location.hash = '#';