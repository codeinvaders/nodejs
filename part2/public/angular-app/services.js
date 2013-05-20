angular.module('TodoResource', ['ngResource']).
factory('Todo', ['$resource', function($resource) {
	return $resource('/todos/:_id', {
		_id: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	})
}]);