#!/usr/bin/env node

HELP = "script for running the tests from the debugger"

Mocha = require('mocha')
path = require('path')
fs = require('fs')
glob = require('glob')
execSync = require("exec-sync")
require('coffee-script')
require('../test/testHelper.coffee')

testFile = null
options = require('commander')
  .version('0.0.1')
  .option('--no-build', 'do not build before running tests')
  .on('--help', function(){(console.log(HELP))})
  .parse(process.argv)

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

if( options.build ){
  console.log("Building...")
  execSync("cake build")
}

console.log("Running...")
if( options.args.length > 0 ){
  options.args.forEach(processFile)
} else {
  testDir = './test/**/*';
  files = glob.sync(testDir)
  files.forEach(processFile)
}
runMocha()
