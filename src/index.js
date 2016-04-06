import {getThumb} from './thumb';

const express = require('express'),
      app = express(),
      fs = require('fs'),
      moment = require('moment'),
      _ = require('lodash'),
      path = require('path'),
      request = require('request'),
      cachedRequest = require('cached-request')(request);

app.listen(61182);

var config = require('./config.json');

cachedRequest.setCacheDirectory(config.cacheDir);

function randomInt(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}

const getFn = (req, res) => {
  var current = moment();
  var start = moment();
  _.some(config.times, t => {
    if (current.day() === start.day(t.day).day()) {
      if (current.hour() >= start.hour(t.start).hour() && current.hour() <= start.hour(t.end).hour()) {
        dir = t.dir;
        return true;
      }
    }
  });

  var picList = fs.readFileSync(config.catFile, 'utf-8').split('\n').filter(c => c);

  var file = picList[randomInt(0,picList.length-1)];

    var x = cachedRequest({
      url: 'https://s3.eu-central-1.amazonaws.com/maurudor/' + file,
      ttl: 259200 * 1000
    });
    res.set('Content-Type', 'image/jpeg');
    req.pipe(x);
    x.pipe(res);
};
app.get('/', getFn);

app.get('/thumb', getFn);
