var express = require('express');
var bodyParser = require('body-parser');
var bbt = require('beebotte');
var mqtt = require('mqtt');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var bclient = new bbt.Connector({apiKey: '',
                                secretKey: ''});

app.get('/', function(request, response) {
  response.send('音声でドローン操作して！');
});

app.post('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var parameters = req.body.queryResult.parameters;
  var drone_command = parameters.drone_command;
  console.log(parameters);

  bclient.publish(
  {channel: 'MySmartHome', resource: 'voice', data: parameters},
  function(err, res) {
    // Do something here
  });

  if (drone_command == 'take_off') {
    var response = 'ドローンが離陸します';
  }
  if (drone_command == 'land') {
    var response = 'ドローンが着陸します';
  }
  if (drone_command == 'up') {
    var response = 'ドローンが上昇します';
  }
  if (drone_command == 'down') {
    var response = 'ドローンが下降します';
  }
  if (drone_command == 'forward') {
    var response = 'ドローンが前進します';
  }
  if (drone_command == 'backward') {
    var response = 'ドローンが後退します';
  }
  if (drone_command == 'right') {
    var response = 'ドローンが右に移動します';
  }
  if (drone_command == 'left') {
    var response = 'ドローンが左に移動します';
  }
  if (drone_command == 'hovering') {
    var response = 'ドローンがホバリングします';
  }
  if (drone_command == 'clockwise') {
    var response = 'ドローンが右回転します';
  }
  if (drone_command == 'counterclockwise') {
    var response = 'ドローンが左回転します';
  }
  res.json({
    'fulfillmentText': response
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
});
