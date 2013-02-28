#!/usr/bin/env coffee

HELP = """
  This script walks a tree of coffeescript and pulls out any ### comments and
  associates them with the next indent level out and up.  A .js file containing
  an array with the structure below is produced.
"""
MORE_HELP = """
  Example  (src/somefile.coffee):
    | # if I want to show something like the delaration of constant, e.g.
    | HELP = "this is a really neat script that does bla"
    | # I can just put it above the block comment and it will get sucked up into
    | # that thing's declaration (these single # comments also get sucked up).
    | ###
    |   This block comment will be associated with the file it could be empty
    |   if for example you wanted to just document that the file existed
    | ###
    |
    | class myAwesomeClass extends myAwesomeBaseClass
    |   ###
    |     This block comment gets associated with the class
    |   ###
    |
    |   constructor: (options={}) =>
    |     @options = _.defaults options,
    |       beAwesome: true                   # will this instance be awesome?
    |       extendAwesomeness: true           # push awesomeness outward
    |       forcedAwesome: false              # can we fake it if all else fails?
    |       awesomeIcon: "/img/awesome.icon"
    |     ###
    |       this block comment gets associated with the constructor method.  putting it after
    |       the defaulting of options makes the options self documenting no?
    |     ###

  From the root notjs directory:

    |  scripts/documentor.coffee ./src

  generates documentorData.js file in current directory that contains:

    |  var documentorData = [
    |    {
    |      "moduleName": "optional name given when running documentor or the path given to document",
    |      // both files and classes only have information in here if they are documented (have ###
    |      // comments at the same indentation level
    ...

  the output js file can then be loaded for a documentation page and a notjs script can pick it up and spit out the
  API documentation (see index.html in notjs root)

  Developer's note:  I really wanted to generate JSON data and pull that in from the script on the page,
  but then the documentation would only be viewable if served up remotely and I'd really like people to be
  able to view the API docs locally via a file:// url

  see --help output for options
"""

###

  Generates public/documentorData.js which is used for Notjs API docs.

  ...and...  shut the front door!... Generates documentation for itself too.   I'm pretty sure this is how Skynet starts.
###


options = require('commander')
  .version('0.0.1')
  .option('-o --outputFile [path]', 'output path and file name of file to generate [./documentorData.js]', './documentorData.js')
  .option('-n --name [name]', 'name to add to module in documentor data. defaults to src file path')
  .on('--help', () -> console.log HELP)

srcDir = null
options.command('*')
  .description('source dir')
  .action (arg) =>
    srcDir = arg
    # console.log 'arg = "%s"', arg
options.parse(process.argv)

unless srcDir
  console.log "fail: This script requires one parameter, the src dir, use --help for more information"
  process.exit(1);

_ = require('underscore')
fs = require('fs')
Encoder = require('node-html-encoder').Encoder;
encoder = new Encoder('entity');

# documentor only creates and updates modules in the existing file...
if fs.existsSync(options.outputFile)
  require(fs.realpathSync(options.outputFile))
else
  root.documentorData = []

moduleName = options.name || srcDir
moduleData =
  "id": _.uniqueId("dd_")
  "name":  moduleName
  "files": []
  "classes": []
  "methods": []

monkeyRegex = /^Notjs\.addPrototypeUnlessExists\s*\(?(\w*)\,\s*\"(\w*)\"\,\s*(\([^)]*\)).*/
methodRegex = /^\s*((this\.|\@)?\w*)\s*\:\s*\(.*\).*/
classRegex = /^\s*class\s*([\w\.]*)\s*(extends.*)?\s*$/
blockCommentRegex = /^\s*\#\#\#.*/
htmlEncodedRegex = /^\s*\|.*/
namespaceRegex = /^Notjs.namespace\s*[\'\"]([^\'\"]*)[\'\"]\s*\,\s*\(([^\)]*)\)\s*\-\>/

processFile = (file) =>
  console.log "Processing #{file}..."

  currentNamespace = ""
  currentNamespaceSymbol = ""

  currentFile = null
  currentClass = null

  lastClassIndex = null
  lastMethodIndex = null
  fileCommentFound = false
  commentStartIndex = null


  preprocessComment = (comments) ->
    commentsOut = []
    for comment in comments
      commentsOut.push if comment.match(htmlEncodedRegex)
        encoder.htmlEncode(comment.replace('|', ''))
      else
        comment
    commentsOut

  getComment = () ->
    commentLines = lines.slice(commentStartIndex + 1, lineNumber)
    preprocessComment commentLines

  # modules have classes, files and methods.  Classes and files have methods.


  createFileComment = () ->
    fileCommentFound = true
    currentFile =
      id: _.uniqueId("dd_")
      name:    file.replace(/^.*[\\\/]/, '')
      code:    lines.slice(0, commentStartIndex - 1)
      comment: getComment()
      methods: []
    moduleData.files.push currentFile

  createClassComment = () ->
    nameMatch = classRegex.exec(lines[lastClassIndex]);
    throw "createClassComment: no match on name" unless nameMatch
    name = if currentNamespace
      nameMatch[1].replace(currentNamespaceSymbol + ".", currentNamespace + ".")
    else
      nameMatch[1]
    currentClass =
      id: _.uniqueId("dd_")
      shortName: nameMatch[1]
      name:    name
      code:    lines.slice(lastClassIndex, commentStartIndex)
      comment: getComment()
      methods: []
    moduleData.classes.push currentClass
    lastClassIndex = null

  createMethodComment = () ->
    monkeyMatch = monkeyRegex.exec(lines[lastMethodIndex])
    nameMatch = methodRegex.exec(lines[lastMethodIndex]);
    throw "createMethodComment: no match on name" unless nameMatch || monkeyMatch
    method =
      id: _.uniqueId("dd_")
      code:    lines.slice(lastMethodIndex, commentStartIndex)
      comment: getComment()
    if monkeyMatch
      method.shortName = "#{monkeyMatch[1]}.#{monkeyMatch[2]}"
      method.name = method.shortName + monkeyMatch[3]
    else
      method.shortName = nameMatch[1]
      method.name = if currentClass then "#{currentClass.name}.#{nameMatch[1]}" else nameMatch[1]

    if currentClass
      currentClass.methods.push method
    else if currentFile
      currentFile.methods.push method
    else
      moduleData.methods.push method
    lastMethodIndex = null

  lines = fs.readFileSync(file).toString().split("\n");
  for string, lineNumber in lines
    continue unless string
    continue if commentStartIndex? && !string.match(blockCommentRegex)
    match = string.match(namespaceRegex)
    if match
      currentNamespace = match[1]
      currentNamespaceSymbol = match[2]
    else if string.match(classRegex)
      lastClassIndex = lineNumber
    else if string.match(methodRegex) || string.match(monkeyRegex)
      lastMethodIndex = lineNumber
    else if string.match(blockCommentRegex)
      if !commentStartIndex
        commentStartIndex = lineNumber
      else
        # are we ending a file comment...
        if !lastMethodIndex && !lastClassIndex && !fileCommentFound
          createFileComment()
        # are we ending a class comment
        else if lastClassIndex && (!lastMethodIndex || lastClassIndex > lastMethodIndex)
          createClassComment()
        # are we ending a method comment
        else if lastMethodIndex && (!lastClassIndex || lastClassIndex < lastMethodIndex)
          createMethodComment()
        commentStartIndex = null
# end of processFile()

updateDocumentorData = () =>
  module = _.find documentorData, (m) -> m.name == moduleName
  if module
    _.extend module, moduleData
  else
    documentorData.push moduleData

createOutputFile = () =>
  updateDocumentorData()
  console.log "creating #{options.outputFile}"
  output = "base = (typeof module !== 'undefined' && module.exports) ? root : window\n" +
           "base.documentorData = #{JSON.stringify(documentorData, null, "  ")};\n"
  fs.writeFile options.outputFile, output, (err) ->
    throw err if(err)

finder = require('findit').find(srcDir)
finder.on 'file', processFile
finder.on 'end', createOutputFile

