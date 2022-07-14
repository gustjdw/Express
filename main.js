const express = require('express');
const app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');

app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function (request, response, next) {
  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;
    next();
  });
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);

app.use(function (request, response, next) {
  response.status(404).send('Sorry cant find that!');
});

app.use(function (error, request, response, next) {
  console.error(error.stack);
  response.status(500).send('Something broke!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000')
});