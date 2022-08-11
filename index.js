require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { generateRandomString } = require('../../lighthouse/dailyTracker/Week_3/tinyApp/helpers');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3001;

app.use(cors());

const uri = process.env.URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
mongoose.connect(uri);

client.connect(err => {
  const collection = client.db("test").collection("shortURLs");

  if (err) return console.error(err)
  // perform actions on the collection object
  client.close();
});

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

  res.redirect(original_url)
})

const validate_url = (url) => {
  const url_regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  return url_regex.test(url);
}

const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: String
})

const Url = mongoose.model('Url', urlSchema);

generateRandomString = () => {
  const charList = "abcdefghijklmnopqrstuvwxyz0123456789";
  const randomID = [];
  while (randomID.length < 6) {
    randomID.push(charList[Math.floor(Math.random() * charList.length)]);
  };
  return randomID.join('');
};

const createAndSaveUrl = (url) => {
  const newUrl = new Url({
    original_url: url,
    short_url: generateRandomString()
  });

  newUrl.save((err, url) => {
    if (err) return console.error(err);
    done(null, url)
  });
};

app.post('/api/shorturl', (req, res) => {

  const { url } = req.body;

  const original_url = url;
  const short_url = 1;

  createAndSaveUrl(url);

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