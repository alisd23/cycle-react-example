const express = require('express');
const path = require('path');
const appConfig = require('../app.config');

const projectRoot = path.join(__dirname, '..');
const app = express();

app.use(express.static(path.join(projectRoot, 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(projectRoot + '/index.html'));
});

app.get('/data', function(req, res) {
  console.log("Getting data");
  res.status(200).send({ cool: 'data' });
});

app.listen(appConfig.PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> Backend server listening on port %s.', appConfig.PORT);
  }
});
