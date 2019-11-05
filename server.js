'use strict';

let compression = require('compression');
let express = require('express');
let logger = require('morgan');
let http = require('http');
let path = require('path');

let app = express();

app.use(compression());

app.use(logger('combined'));

app.use(express.static(path.join(__dirname, 'www')));

let server = http.createServer(app);
app.get('/env.js', (_, res) => {
  const envData = `window.__env = {
    accessToken: '${process.env.TOKEN}',
    serverUrl: '${process.env.SERVER_URL}'
  }`;
  res.send(envData);
});

app.use((req, res) => {
  // respond with index to process links
  if (req.accepts('html')) {
    res.sendFile(__dirname + '/www/index.html');
    return;
  }

  // otherwise resource was not found
  res.status(404);
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  res.type('txt').send('Not found');
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
