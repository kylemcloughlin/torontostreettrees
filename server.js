const express = require('express');
const port = process.env.PORT || 8181;
const app = express();
console.log('server starting........');

app.use(express.static(__dirname + '/dist/'));
app.get(/.*/, function(req, res ) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port);

console.log('......server started');