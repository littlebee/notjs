
# this file gets included by test task in /Cakefile and is execute once per test pass
# add functions and declarations that apply to all tests here.

global.chai =  require("chai")
global.assert = chai.assert
global.should = chai.should()
global.expect = chai.expect

global.$ = require("jquery");
global.jQuery = global.$
global._ = require("underscore")

global.jsdom = require("jsdom");
global.document = jsdom.jsdom('<html><body></body></html>');
global.window = document.createWindow();

# adds spec like vocabulary for testing jquery stuff  (https://github.com/chaijs/chai-jquery)
require '../node_modules/chai-jquery/chai-jquery.js'

# allows mocking jquery .ajax requests (https://github.com/appendto/jquery-mockjax)
require '../public/vendor/jquery-mockjax-1.5.1'
$.mockjaxSettings.log = false

global.fs = require 'fs'




#*********     HELPER METHODS      *****************

# loads a not js example, executing any script on the page
global.loadExample = (exampleFile, block) ->
  htmlSource = fs.readFileSync("public/examples/#{exampleFile}", "utf8");
  #htmlSource = fs.readFileSync("public/examples/test_js_dom.html", "utf8");
  #console.log 'htmlSource:'
  #console.log htmlSource
  global.document = jsdom.jsdom(htmlSource)
  global.window = document.createWindow()

  window.addEventListener 'load', () ->
    # note that this blows away Chai's chaining on jquery object and makes all subsequent tests fail
    #global.$ = global.jQuery = window.$

    # For testing DOM effects in examples, use
    #    window.$('selector').length.should.equal 2
    # instead of
    #    $('selector').length....


    # console.log "\n\n\n\n=============================\nbody:"
    # console.log(window.$('body').html())
    block.call("examples/#{exampleFile}")

