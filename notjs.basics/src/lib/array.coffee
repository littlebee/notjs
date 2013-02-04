
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
