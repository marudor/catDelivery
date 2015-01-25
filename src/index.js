import {getThumb} from './thumb';

const express = require('express'),
      app = express(),
      fs = require('fs'),
      moment = require('moment'),
      _ = require('lodash'),
      path = require('path');

app.listen(61182);

var config = require('./config.json');
config.catDir = path.resolve(config.catDir);

function randomInt(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}

app.get('/', (req, res) => {
  var dir= config.catDir;
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

  var readDir = fs.readdirSync(dir);
  res.sendFile(path.resolve(dir)+'/'+readDir[randomInt(0,readDir.length-1)], {
    headers: {
      'Content-Type': 'image/jpeg'
    }
  }, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
    }
  });
});

app.get('/thumb', (req, res) => {
  var dir= config.catDir;
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

  var readDir = fs.readdirSync(dir);
  getThumb(readDir[randomInt(0,readDir.length-1)], dir).then(() => {
   console.log('done'); res.sendFile(path.resolve(dir)+'/thumb/'+readDir[randomInt(0,readDir.length-1)], {
      headers: {
        'Content-Type': 'image/jpeg'
      }
    }, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
      else {
      }
    });
  });
});