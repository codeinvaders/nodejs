angular.module('MyApp', ['TodoResource']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'angular-app/views/todos.html',
        controller: TodoCtrl
    })
}]);