
# this file gets included by test task in /Cakefile and is execute once per test pass
# add functions and declarations that apply to all tests here.

global.chai =  require("chai")
global.assert = chai.assert
global.should = chai.should()
global.expect = chai.expect

global.$ = require("jquery");
global.jQuery = global.$
global._ = require("underscore")

global.jsdom = require("jsdom").jsdom;
global.document = jsdom('<html><body></body></html>');
global.window = document.createWindow();

# adds spec like vocabulary for testing jquery stuff  (https://github.com/chaijs/chai-jquery)
require '../node_modules/chai-jquery/chai-jquery.js'

# allows mocking jquery .ajax requests (https://github.com/appendto/jquery-mockjax)
require '../public/vendor/jquery-mockjax-1.5.1'
$.mockjaxSettings.log = false



