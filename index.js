require('dotenv').config();
const bodyparser = require('body-parser')
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyparser.urlencoded({ extended: false }))
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

app.get('/api/:shorturl', (req, res) => {

  // const { shorturl } = req.params;
  // const { original_url } = req.body;

  console.log('REQPARAMS:', req.params)
  console.log('REQBODY:', req.body)
  console.log('REQQUERY:', req.query)


  res.redirect(original_url)
})

const validate_url = (url) => {
  const url_regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  return url_regex.test(url);
}

app.post('/api/shorturl', (req, res) => {

  const { url } = req.body;

  const original_url = url;
  const short_url = 1;

  return validate_url(url) ?
    res.json({
      original_url,
      short_url
    })
    :
    res.json({ error: 'invalid url' })
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
