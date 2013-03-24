#!/usr/bin/env node

fs = require('fs');
htmlSource = fs.readFileSync("public/examples/test_js_dom.html", "utf8");

global.jsdom = require("jsdom");

jsdom.defaultDocumentFeatures = {
  FetchExternalResources   : ['script'],
  ProcessExternalResources : ['script'],
  MutationEvents           : '2.0',
  QuerySelector            : false
};

      doc = jsdom.jsdom(htmlSource)
      window = doc.createWindow()
      window.addEventListener('load',  function(){
        console.log(window.checkpoint1);
        console.log(window.checkpoint2);
        console.log(window.$().jquery)
        console.log("body:");
        console.log(window.$('body').html());
      });

