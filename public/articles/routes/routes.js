angular.module('articles').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/articles', {
			templateUrl: 'articles/partials/list.html'
		}).
		when('/articles/create', {
			templateUrl: 'articles/partials/create.html'
		}).
		when('/articles/:articleId', {
			templateUrl: 'articles/partials/view.html'
		}).
		when('/articles/:articleId/edit', {
			templateUrl: 'articles/partials/edit.html'
		});
	}
]);