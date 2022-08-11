require('dotenv').config();
const bodyparser = require('body-parser')
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {

  const {url} = req.body;

  const original_url = url;
  const short_url = 1;

  res.json({
    original_url,
    short_url
  })
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
