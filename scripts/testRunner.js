#!/usr/bin/env node

// this is for running the tests from the debugger

Mocha = require('mocha')
path = require('path')
fs = require('fs')
glob = require('glob')
execSync = require("exec-sync")
require('coffee-script')
require('../test/testHelper.coffee')

mocha = new Mocha({
  reporter: 'spec',
  ui: 'bdd',
  timeout: 999999,
  compilers: 'coffee:coffee-script'
})

processFile = function(file) {
  if( path.extname(file) === ".coffee" ){
    console.log('adding test file: %s', file);
    mocha.addFile(file);
  }
}

runMocha = function() {
  var runner = mocha.run(function () {
    console.log('finished');
  })
  runner.on('pass', function (test) {
    //console.log('... %s passed', test.title);
  })
  runner.on('fail', function (test) {
    //console.log('... %s failed', test.title);
  })
}

console.log("Building...")
execSync("cake build")

console.log("Running...")
if( process.argv.length > 2 ){
  for(i = 2; i < process.argv.length; i++ ) {
    processFile(process.argv[i])
  }
  runMocha()
}
else{
  testDir = './test/**/*';
  files = glob.sync(testDir)
  files.forEach(processFile)
  runMocha()
}
