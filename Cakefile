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
DEPLOY_TARGET = 'bee@beehub.xen.prgmr.com:/home/bee/notjs'
TEST_REPORTER = 'spec'
BUILD_DIR = './build'

fs = require 'fs'
fsx = require 'fs-extra'
path = require 'path'
{spawn, exec} = require 'child_process'
util = require 'util'
glob = require 'glob'
compressor = require('node-minify')
execSync = require("exec-sync")

option '-f', '--file [FILE_TO_RUN_TESTS_FROM]', 'Run tests from one file'
task 'test', 'Runs all specs in test/ folder', (options)->
  invoke 'build'
  options.file ||= (process.env.FILE || "")

  testCmd = "NODE_ENV=test ./node_modules/.bin/mocha
    --compilers coffee:coffee-script
    --reporter #{TEST_REPORTER}
    --require coffee-script
    --require test/testHelper.coffee
    --colors
    --recursive
    #{options.file}
    "

  console.log "Running tests.\n" + testCmd
  # run tests
  exec testCmd, (err, output) ->
    throw err if err
    console.log output

task 'build', 'build the public/.js build targets', ->
  for buildTarget in BUILD_TARGETS
    thisBuildDir = path.join(BUILD_DIR, buildTarget.name)
    console.log "creating build dir (#{thisBuildDir})"
    fsx.mkdirsSync "./" + thisBuildDir
    console.log "compiling coffeescripts..."
    execSync "coffee -c -o #{thisBuildDir} #{buildTarget.srcDir}", (error) ->
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

task 'deploy', 'deploy public/* and demo rest server components to public notjs.org VPS', ->
  invoke 'build'
  invoke 'docs'
  console.log "deploying to #{DEPLOY_TARGET}"
  execSync("scp -r ./public #{DEPLOY_TARGET}")
  # for now, just deploying public,  this will get more involved when we get to the backbone module
  # and need to update the demo REST server

handleError = (error) ->
  return unless error
  console.error(error)
  process.exit(1)
