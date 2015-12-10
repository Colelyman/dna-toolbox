var express = require('express');
var router = express.Router();

var toArray = function(data) {
  return Object.keys(data).map(function(k) { return data[k]; });
};

var getFileArgs = function(obj, key) {
  for(var k in obj) {
    console.log(k);
    if(obj.hasOwnProperty(key)) {
      return obj[k];
    }
  }
};

var files = {
  "suffixTree": {
    "id": "tool5",
    "name": "Suffix Tree",
    "input": {
      "0": "/home/bitnami/app/scripts/suffixTree.py",
      "1": "/home/bitnami/app/data/test.txt",
      "2": "st"
    }
  },
  "bwt": {
    "id": "tool6",
    "name": "Burrows Wheeler Transform",
    "input": {
      "0": "/home/bitnami/app/scripts/suffixTree.py",
      "1": "/home/bitnami/app/data/text.txt",
      "2": "bwt"
    }
  }
};

router.get('/', function(req, res, next) {
  res.json('hi from api');
});

/*router.param('tool', function(req, res, next, toolName) {

});*/

// Suffix Tree
router.get('/suffixTree', function(req, res) {
  var fileArgs = getFileArgs(files, 'suffixTree');
  var python = require('child_process').spawn(
    'python',
    toArray(fileArgs.input)
  );
  var output = "";
  python.stderr.on('data', function(data) { console.log('From stderr: ' + data); })
  python.on('error', function(err) { console.log('Failed to start the process with: ' + err); });
  python.stdout.on('data', function(data) { output += data });
  python.on('close', function(code) {
    console.log('output is: ' + output);
    if ( code != 0){ return res.status(code).send("Error with code: " + code + ' and output: ' + output); }
    return res.status(code).send(output);
  });
});

module.exports = router;
