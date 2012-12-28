
ROOT_NAMESPACE = if (typeof module != 'undefined' && module.exports) then global else window

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
      MODIFIED!  - if we are using namespaces let's let everything work the same in node and just add our
              namespace to global namespace
    ###
    [target, name, block] = [this, arguments...] if arguments.length < 3
    top    = target
    target = target[item] or= {} for item in name.split '.'
    block target, top

# TODO : reinvestigate if this is still necessary
## and now instantiate and add our namespace to the global name space
#if (typeof module != 'undefined' && module.exports)
#  global.Notjs = new Notjs()
#else
#  window.Notjs = new Notjs()
ROOT_NAMESPACE.Notjs = new Notjs()
