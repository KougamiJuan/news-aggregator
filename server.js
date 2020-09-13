const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Cross-Origin
app.use(cors());

// Serve static files....
app.use(express.static(__dirname + '/dist/news-aggregator'));

// Send all requests to index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/news-aggregator/index.html'));
});

// Default Heroku PORT
app.listen(process.env.PORT || 8080);