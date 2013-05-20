/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	http = require('http'),
	path = require('path'),
	Todo = require('./models.js').Todo(),
	ejs = require('ejs');

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');

    app.engine('html', ejs.renderFile);
	//app.set('view options',{layout:false})
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

// app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});

app.post('/todo/create', function(req, res) {
	var t = new Todo(req.body)
	console.log(t, req.body)
	t.save(function(err, doc) {
		console.log('saving', err, doc)
		if(err) {
			return res.render('index.js', {
				error: err
			})
		}
		res.redirect('/')
	})
})
app.get('/todo/delete/:_id', function(req, res) {
	var _id = req.params._id
	Todo.remove({
		_id: _id
	}, function(err, doc) {
		if(err) {
			return res.render('index.ejs', {
				error: err
			})
		}
		res.redirect('/')
	})
})


app.get('/todo/markAsCompleted/:_id', function(req, res) {
	var _id = req.params._id
	Todo.findByIdAndUpdate(_id, {
		$set: {
			isCompleted: true
		}
	}, function(err, doc) {
		if(err) {
			return res.render('index.ejs', {
				error: err
			})
		}
		res.redirect('/')
	})
})

/*app.get('/', function(req, res) {
	Todo.find({}, function(err, todos) {
		if(err) {
			return res.render('index.ejs', {
				error: err
			})
		}
		res.render('index.ejs', {
			todos: todos
		})
	})
})*/
app.get('/', function(req, res) {
	res.render('index.html')
})

/* RESTful services */

app.get('/todos', function(req, res) {
	Todo.find({}, function(err, docs) {
		if(err) return res.json(500, err)
		res.json(200, docs)
	})
})
app.post('/todos', function(req, res) {
	var t = new Todo(req.body)
	t.save(function(err, doc) {
		if (err)
			return res.json(500,err)
		res.json(200,doc)
	})
})

app.delete('/todos/:_id', function(req, res, next) {
	var _id = req.params._id
	Todo.findByIdAndRemove(_id, function(err,doc) {
		if(err) {
			console.log(err)
			return res.json(500, err)
		}
		res.json(200,doc)
	})
})

app.put('/todos/:_id', function(req, res, next) {
	var _id = req.params._id,
		body = req.body;
	delete body._id
	console.log('req.params._id',_id,body)
	Todo.findByIdAndUpdate(_id, {
		$set: body
	}, function(err, doc) {
		if(err) return res.json(500, err)
		res.json(200, doc)
	})
})