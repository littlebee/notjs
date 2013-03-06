###
  Notjs Utility methods
###


# I really wanted to extend Object.prototype and add the methods but jQuery clone and
# other things break if you modify Object like that see,
# <a href="http://stackoverflow.com/questions/9138161/javascript-clone-function-breaks-with-jquery"> this stack overflow </a>

Notjs.deepGet = (object, pathToAttribute) ->
  ###
    gets the value of a nested member of this object.

    example:
    <code>
      |  var data = {
      |     sayulita: {
      |       fun: true,
      |       surf: true,
      |       weather: {
      |         high: 90,
      |         low: function(){ return 70; }
      |       }
      |     }
      |   }
      |  Notjs.deepGet(data, 'weather.high')   # will return 90
    </code>

    There is no limit to the depth, also functions may be employed anywhere along the path.
    From the former example:
    <code>
      |  Notjs.deepGet(data, 'weather.low')   # will call the function associated with 'low' which returns 70
    </code>

  ###
  current = object
  for part in pathToAttribute.split('.')
    unless current[part]?
      current = null
      break
    current = if _.isFunction(current[part]) then current[part]() else current[part]
  return current

Notjs.deepSet = (object, pathToAttribute, value) ->
  ###
    Performs a deep set on the the value of a attributed nested within this object

    See Notjs.deepGet() above for examples.  Any value that can be fetched with deepGet
    can be set wih deepSet()
  ###
  current = object
  parts = pathToAttribute.split('.')
  lastPart = _.last(parts)
  for part in parts
    unless current[part]?
      current = null
      break
    value = if part == lastPart
      current = if _.isFunction(current[part]) then current[part]() else current[part]

  return if _.isFunction(current[lastPart])
    current[lastPart](value)
  else
    current[lastPart] = value

Notjs.keyCode =
  BACKSPACE: 8
  TAB: 9
  ENTER: 13
  ESCAPE: 27
  PAGEUP: 33
  PAGEDOWN: 34
  END: 35
  HOME: 36
  LEFT: 37
  UP: 38
  RIGHT: 39
  DOWN: 40
  INSERT: 45
  DELETE: 46



