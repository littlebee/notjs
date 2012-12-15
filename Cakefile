fs = require 'fs'
fsx = require 'fs-extra'
path = require 'path'
{spawn, exec} = require 'child_process'
util = require 'util'
glob = require 'glob'
compressor = require('node-minify')
execSync = require("exec-sync")

BUILD_DIR = './build'
BUILD_TARGETS = [
  {
    name: 'notjs.basics'
    target: 'public/notjs.basics'
    srcDir: 'notjs.basics/src'
    loadOrder: [
      "notjs.js",
      "lib/*.js",
      "lib/**/*.js",
    ]
  }
]
DOCUMENTATION_TARGETS = [
  {
    name: 'notjs.basics'
    srcDir: 'notjs.basics/src'
  },
  {
    name: 'notjs/scripts'
    srcDir: 'scripts'
  },
  {
    name: 'empty directory'
    srcDir: 'empty'
  }

]
DOCUMENTOR_DATA = 'public/documentorData.js'

task 'test', 'Runs all specs in spec/ folder', ->
  # run tests

task 'build', 'build the public/.js build targets', ->
  for buildTarget in BUILD_TARGETS
    thisBuildDir = path.join(BUILD_DIR, buildTarget.name)
    console.log "creating build dir (#{thisBuildDir})"
    fsx.mkdirsSync "./" + thisBuildDir
    console.log "compiling coffeescripts..."
    exec "coffee -c -o #{thisBuildDir} #{buildTarget.srcDir}", (error) ->
      handleError error

    console.log "creating #{buildTarget.target}.js"
    filesSeen = []
    fdOut = fs.openSync "#{buildTarget.target}.js", "w+"
    for pathSpec in buildTarget.loadOrder
      files = glob.sync path.join(thisBuildDir, pathSpec)
      for file in files
        continue if file in filesSeen
        filesSeen.push file
        fs.writeSync fdOut, fs.readFileSync(file) + "\n\n"
    fs.closeSync(fdOut)

    console.log "creating #{buildTarget.target}.min.js"
    new compressor.minify
      type: 'gcc'
      fileIn: "#{buildTarget.target}.js"
      fileOut: "#{buildTarget.target}.min.js"
      callback: handleError

task 'docs', 'collect API docs from srcs and create or update public/documentorData.js (used by public/index.html)', ->
  fsx.deleteSync(DOCUMENTOR_DATA)
  for docTarget in DOCUMENTATION_TARGETS
    console.log 'collecting api docs for ' + docTarget.name
    execSync "scripts/documentor.coffee #{docTarget.srcDir} -n #{docTarget.name} -o public/documentorData.js"


handleError = (error) ->
  return unless error
  console.error(error)
  process.exit(1)
