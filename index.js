var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.send('Getではうまくサーバーが起動してます! 多分Postもできます')
});

app.post('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var parameters = req.body.queryResult.parameters.drone_command;
  console.log(parameters);
  // console.log("req = ", req);
  // console.log("res = ", res);
  // console.log("next = ", next);
  res.json({
    "fulfillmentText": "転スラ"
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
