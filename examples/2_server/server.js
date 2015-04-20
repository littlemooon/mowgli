
var express = require('express');

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

// setup entry points
app.get('/api/list', getList);
app.put('/api/list', addToList);

// request list
var getList = function(req, res) {
	// create artificial loading time
	setTimeout(3000);

	// return the list
	res.send(list);
};

// add an entry to the list
var addToList = function(req, res) {
	var newEntry = req.body;

	// update server data
	list.push(newEntry);

	// inform the client
	res.send(newEntry);
};

// start server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});
