var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

this.db || (this.db = mongoose.connect('mongodb://localhost/todo_app'));

var TodoSchema=new Schema({
	name: String,
	isCompleted: Boolean
})

mongoose.model('Todo', TodoSchema);

exports.Todo = function (db) {
	return this.db.model('Todo');
}

