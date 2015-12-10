var express = require('express');
var router = express.Router();
var util = require('util');
var formidable = require('formidable');
var fs = require('fs-extra');


var files = {
  "dnaABoxes": {
    "id": "tool1",
    "name": "dnaA Boxes",
    "input": {
      "0": "/home/bitnami/app/scripts/dnaABoxes.py",
      "1": "/home/bitnami/app/data/dnaabox_ecoli.fasta"
    }
  },
  "translation": {
    "id": "tool2",
    "name": "Translation",
    "input": {
      "0": "/home/bitnami/app/scripts/translate.py",
      "1": "/home/bitnami/app/data/translate.txt"
    }
  },
  "transcription": {
    "id": "tool3",
    "name": "Transcription",
    "input": {
      "0": "/home/bitnami/app/scripts/transcribe.py",
      "1": "/home/bitnami/app/data/test.txt"
    }
  },
  "reverse": {
    "id": "tool4",
    "name": "Reverse",
    "input": {
      "0": "/home/bitnami/app/scripts/reverseTranscribe.py",
      "1": "/home/bitnami/app/data/test.txt"
    }
  },
  "suffixTree": {
    "id": "tool5",
    "name": "Suffix Tree",
    "input": {
      "0": "/home/bitnami/app/scripts/suffixTree.py",
      "1": "/home/bitnami/app/data/test.txt",
      "2": "st"
    }
  },
  "suffixArray": {
    "id": "tool6",
    "name": "Suffix Array",
    "input": {
      "0": "/home/bitnami/app/scripts/suffixTree.py",
      "1": "/home/bitnami/app/data/test.txt",
      "2": "sa"
    }
  },
  "bwt": {
    "id": "tool7",
    "name": "Burrows Wheeler Transform",
    "input": {
      "0": "/home/bitnami/app/scripts/suffixTree.py",
      "1": "/home/bitnami/app/data/test.txt",
      "2": "bwt"
    }
  },
  "firstColumn": {
    "id": "tool8",
    "name": "First Column",
    "input": {
      "0": "/home/bitnami/app/scripts/suffixTree.py",
      "1": "/home/bitnami/app/data/test.txt",
      "2": "firstbwt"
    }
  },
  "firstToLast": {
    "id": "tool9",
    "name": "First To Last",
    "input": {
      "0": "/home/bitnami/app/scripts/suffixTree.py",
      "1": "/home/bitnami/app/data/test.txt",
      "2": "ftl"
    }
  },
  "deBruijn": {
    "id": "toold10",
    "name": "De Bruijn Graph Assembly",
    "input": {
      "0": "/home/bitnami/app/scripts/deBruijnGraphAssembler.py",
      "1": "/home/bitnami/app/data/debruijn_small.txt"
    }
  },
  "mapping": {
    "id": "tool11",
    "name": "Mapping",
    "input": {
      "0": "/home/bitnami/app/scripts/mapper.py",
      "1": "/home/bitnami/app/scripts/mapping_genome.fasta",
      "2": "/home/bitnami/app/scripts/mapping_reads.fasta",
      "kmerLen": "8",
      "mismatches": "3"
    }
  }
};

router.get('/', function(req, res, next) {
  res.json('hi from api');
});

router.param('tool', function(req, res, next, toolName) {
  var toArray = function(data) {
    return Object.keys(data).map(function(k) { return data[k]; });
  };

  var getFileArgs = function(obj, key) {
    if(obj.hasOwnProperty(key)) {
      return obj[key];
    }
  };
  var fileArgs = getFileArgs(files, toolName);
  req.params = toArray(fileArgs.input);
  return next();
});

router.get('/useTool/:tool', function(req, res) {
  var python = require('child_process').spawn(
    'python',
    req.params
  );
  var output = "";
  python.stderr.on('data', function(data) { console.log('From stderr: ' + data); })
  python.on('error', function(err) { console.log('Failed to start the process with: ' + err); });
  python.stdout.on('data', function(data) { output += data });
  python.on('close', function(code) {
    console.log('output is: ' + output);
    if ( code != 0){ return res.status(code).send("Error with code: " + code + ' and output: ' + output); }
    return res.status(code).json(output);
  });
});

// File upload
router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Upload your data', success: false});
});

router.post('/upload', function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    res.render('upload', { title: 'Success', success: true});
    //res.status(200).send(util.inspect({fields: fields, files: files}));
  });
  form.on('error', function(err) {
    console.error(err);
  });
  form.on('progress', function(bytesReceived, bytesExpected) {
    var percentage = (bytesReceived / bytesExpected) * 100;
    console.log(percentage.toFixed(2));
  });
  form.on('end', function(fields, files) {
    var tempPath = this.openedFiles[0].path;
    var fileName = this.openedFiles[0].name;
    var newLocation = '/home/bitnami/data/uploaded/';

    fs.copy(tempPath, newLocation + fileName, function(err) {
      if(err) {
        console.error(err);
      }
      else {
        console.log("Successfully copied file");
        fs.unlink(tempPath, function() {
          console.log("Successfully deleted tempFile");
        });
      }
    });
  });
});

module.exports = router;
