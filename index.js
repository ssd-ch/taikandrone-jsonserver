var express = require('express');
var bodyParser = require('body-parser');
var bbt = require('beebotte');
var mqtt = require('mqtt');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var bclient = new bbt.Connector({apiKey: 'OFNz5cAYo7N8LJadi8B9mUM2',
                                secretKey: 'jrtvfzHPIGuGa56U6R3GAz8WZwyRnFyO'});

app.get('/', function(request, response) {
  response.send('Getではうまくサーバーが起動してます! 多分Postもできます');
});

app.post('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var parameters = req.body.queryResult.parameters.drone_command;
  // var parameters = req.body; //local version
  console.log(parameters);

  bclient.publish(
  {channel: 'MySmartHome', resource: 'voice', data: parameters},
  function(err, res) {
    // Do something here
  });

  res.json({
    'fulfillmentText': '転スラ'
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
});
