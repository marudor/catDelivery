var easyimg = require('easyimage'),
    path = require('path'),
    Q = require('q'),
    fs = require('fs');

export function getThumb(fileName, dir) {
  var fPath = path.resolve(dir)+'/thumb/'+fileName;
  if (!fs.existsSync(fPath)) {
    return easyimg.rescrop({
      src: path.resolve(dir)+'/'+fileName,
      dst: fPath,
      width: 300,
      height: 300
    });
  } else {
    return Q.when(true);
  }
}
