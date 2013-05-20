var TodoCtrl = ['$scope', 'Todo', function($scope, Todo) {

	console.log('Todo', Todo, new Todo())

	Todo.query({}, function(todos) {
		$scope.todos = todos
	})



	$scope.createTodo = function(todo) {
		var t = new Todo(todo)
		t.$save(function(todo) {
			$scope.todos.push(todo)
			$scope.newTodo = null;
		});
	}

	$scope.deleteTodo = function(todo, index) {
		todo = new Todo(todo)
		todo.$delete({
			_id: todo._id
		}, function() {
			$scope.todos.splice(index, 1)
		});
	}


	$scope.markAsCompleted = function(todo, index) {
		todo.isCompleted = true
		todo.$update({
			_id: todo._id
		}, function() {
			todo.isCompleted = true;
			$scope.todos.splice(index, 1, todo)
		}, function(err) {
			alert(JSON.stringify(err))
		});
	}
}]