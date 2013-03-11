
###
  javascript Array class extensions and monkeys
###

Notjs.addPrototypeUnlessExists Array, "remove", (from, to) ->
  ###
    removes an element from an array

    by John Resig (MIT Licensed) (http://ejohn.org/blog/javascript-array-remove/)
  ###
  rest = this.slice((to || from) + 1 || this.length)
  this.length = if from < 0 then this.length + from else from
  return this.push.apply(this, rest)


Notjs.addPrototypeUnlessExists Array, "englishJoin", () ->
  ###
    returns a string of items separated by comma except the last which is prefaced by "and"
  ###
  out = this.join(',')
  lastComma = out.lastIndexOf(',')
  return out if lastComma <= 0

  return out[0..lastComma-1] + ' and ' + out[lastComma+1..-1]
