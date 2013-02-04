
###
  javascript String class extensions and monkeys
###

Notjs.addPrototypeUnlessExists String, "startsWith", (anotherString) ->
  ###
    returns true if string starts with anotherString

    example:
    | "this string".startsWith("this")
    | -> true
  ###
  return this.slice(0, anotherString.length) == anotherString

Notjs.addPrototypeUnlessExists String, "endsWith", (anotherString) ->
  ###
    returns true if string ends with anotherString

    example:
    | "this string".endsWith("string")
    | -> true
  ###
  return this.slice(-anotherString.length) == str

Notjs.addPrototypeUnlessExists String, "isBlank", () ->
  ###
    returns true if this string is blank

    examples (all return true):
    | "".isBlank()
    | "   ".isBlank()
    | "\n\r  ".isBlank()
  ###
  return this.trim() == ""

Notjs.addPrototypeUnlessExists String, "trim", () ->
  ###
    returns copy of this string with white spaces and line end chars removed
  ###
  return this.replace(/^\s+|\s+$/g, "")

Notjs.addPrototypeUnlessExists String, "elipsize",  (maxLength) ->
  ###
    returns a copy of this string truncated to maxLength - 3 and "..." appended
  ###
  return this if this.length <= maxLength
  this.slice(0, maxLength-3) + '...'

Notjs.addPrototypeUnlessExists String, "decamelize", () ->
  ###
    returns a decamelized copy of this string

    example:
    | "dropCamelCase".decamelize()
    | => "Drop Camel Case"
  ###
  result = this.replace( /([A-Z])/g, " $1" );
  return result.charAt(0).toUpperCase() + result.slice(1);

Notjs.addPrototypeUnlessExists String, "dropCamelize", () ->
  ###
    returns a copy of this string camel cased with first char lower case

    example:
    | "Camel Case My Ass".dropCamelize()
    | => "camelCaseMyAss"
  ###
  result = this.replace( /\s/g, "" );
  return result.charAt(0).toLowerCase() + result.slice(1);

