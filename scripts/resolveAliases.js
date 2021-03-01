var path = require('path');
var fs = require('fs');

function processFile(fileName) {
  var importRegEx = /require\(['"](.*)['"]\);/gmi;
  var pathRegEx = /@source(.*)['"]\);/i;
  var fictiveRoot = 'build';

  var fileContent = fs.readFileSync(fileName).toString();
  var matches = fileContent.match(importRegEx);
  var filePath = fileName.replace(/[^\/]*\.js/, '');
  var someChange = false;

  if (!matches) return;

  for (var i = 0; i < matches.length; i++) {
    var originalImport = matches[i];
    var _path = originalImport.match(pathRegEx);
    if (!_path) continue;

    // Get full path from root of import
    var _fullPath = fictiveRoot + _path[1];
    var diff = path.relative(filePath, _fullPath);
    if (diff[0] !== '.') diff = './' + diff;

    // Create from text
    var newImport = `require("${diff}");`;

    // Replace import
    fileContent = fileContent.replace(originalImport, newImport);
    someChange = true;
  }

  if (someChange) {
    console.log('Resolving file ', fileName);
    // Write changes
    fs.writeFileSync(path.resolve(fileName), fileContent);
  }
}

function processFolder(folder) {
  var testRegEx = /\.js$/;
  var files = fs.readdirSync(folder);

  for (var i = 0; i < files.length; i++) {
    var filePath = path.join(folder, files[i]);
    var stats = fs.lstatSync(filePath);

    if (stats.isDirectory()) {
      processFolder(filePath);
    }

    if (stats.isFile()) {
      if (testRegEx.test(filePath)) {
        processFile(filePath);
      }
    }
  }
}

module.exports = {
  resolveAliases: processFolder,
};
