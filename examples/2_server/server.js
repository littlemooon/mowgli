
var express = require('express');
var bodyParser = require('body-parser');

// initialise data
var list = [
	{name: 'Apple', color: 'Red'},
	{name: 'Orange', color: 'Orange'},
	{name: 'Banana', color: 'Yellow'}
];

// create app
var app = express();

// setup index route
app.use(express.static(__dirname));
app.get('/', function(req, res) {
  res.render('/index.html');
});

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.json());

// setup entry points
app.get('/api/list', getList);
app.post('/api/list', addToList);

// request list
function getList(req, res) {
	// create artificial loading time
	setTimeout(function() {
		// return the list
		res.send(list);
	}, 3000);
}

// add an entry to the list
function addToList(req, res) {
	var newEntry = req.body;

	// update server data
	list.push(newEntry);

	// inform the client
	res.send(newEntry);
}

// start server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});
