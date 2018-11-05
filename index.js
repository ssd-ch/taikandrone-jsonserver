var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Getではうまくサーバーが起動してます! 多分Postもできます')
});

app.post('/', function(req, res, next) {
  res.json({
    "fulfillmentText": req
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});