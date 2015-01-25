var easyimg = require('easyimage'),
    path = require('path'),
    Q = require('q'),
    fs = require('fs');

export function getThumb(fileName, dir) {
  var fPath = path.resolve(dir)+'/thumb/'+fileName;
  console.log(fPath);
  console.log(path.resolve(dir)+'/'+fileName);
  if (!fs.existsSync(fPath)) {
    return easyimg.rescrop({
      src: path.resolve(dir)+'/'+fileName,
      dst: fPath,
      width: 750,
      height: 580
    });
  } else {
    return Q.when(true);
  }
}