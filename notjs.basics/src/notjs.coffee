

class Notjs
  ###
    This is the top level Notjs class

    One instance per application use is instantiated and added to the global namespace
  ###

  # put utility functions that you want to call directly on the Notjs global instance
  namespace: (target, name, block) ->
    ###
      this method is used to create a namespace for Notjs.
      See (https://github.com/jashkenas/coffee-script/wiki/FAQ)
    ###
    [target, name, block] = [(if typeof exports isnt 'undefined' then exports else window), arguments...] if arguments.length < 3
    top    = target
    target = target[item] or= {} for item in name.split '.'
    block target, top

## and now intantiate and add our namespace to the global name space
window.Notjs = new Notjs()

