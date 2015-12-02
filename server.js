var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require ('body-parser');
var cors = require('cors');

var app = express();
var db = mongojs('eCommerce', ['products']);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));


app.post('/api/products', function(req, res) {
	db.products.insert(req.body, function(err, results) {
		if (!err) {
			console.log(results);
			res.status(201).end();
		}
	})
});

app.get('/api/products', function(req, res) {
	db.products.find({}, function(err, results) {
		if (!err) {
			console.log(results);
			res.status(200).send(results);
		}
	});
});

app.get('/api/products/:id', function(req, res) {
	db.products.find({_id: mongojs.ObjectId(req.params.id)}, function(err, results) {
		if (!err) {
			console.log(results);
			res.status(200).send(results);
		}
	})
});

app.put('/api/products/:id', function(req, res) {
	db.products.update({_id: mongojs.ObjectId(req.params.id)}, {$set: req.body}, function(err, results) {
		console.log(results);
		res.status(200).end();
	})
});

app.delete('/api/products/:id', function(req, res) {
	db.products.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, results) {
		if (!err) {
			console.log(results);
			res.status(200).end();
		}
	})
});



app.listen(8080, function() {
	console.log('Listening on port 8080');
});