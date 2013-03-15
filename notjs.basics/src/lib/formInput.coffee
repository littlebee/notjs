Notjs.namespace 'basics', (x) ->

  class x.FormInput
    ###
    The FormInput class is an abstract base class for all form input types.

    A specific type of FormInput is instantiated on a DOM element identifying a
    container.  The value of the DOM element ($().html()) is then after controlled
    by the FormInput type.   An outside party (Notjs.basics.Form or Slick.Grid)
    tells the type when to display data by calling the formatForDisplay() class
    method; and it also tells the FormInput type when to render html capable of
    taking user input.

    The FormInput classes provide an interface compatible to that of SlickGrid's
    Editor extentions and are intended to be used interchangably in that environment.

    See <a href="https://github.com/mleibman/SlickGrid/wiki/Writing-custom-cell-editors">SlickGrid: Writing custom cell editors</a> for more information.

    The Form base class defined here provides defaults  for some of the methods required by
    SlickGrid editors.   At a minimum, any extension of this class must provide the following methods:

      - a static class method called formatForDisplay (which can be used as SlickGrid
          formatter) which returns a string containing the html to render in the
          formInput element
      - an instance method called initialize() called on construction that creates the input
      - an instance method called loadValue(dataObject) that sets the current value of the
          input to the value of it's corresponding attribute in dataObject
      - an instance method called serializeValue() that returns the current value of the input

    See Notjs.basics.formInputs.Text for a simple example of creating a custom editor / formatter that can be
    used with either Notjs.basics.Form or Slick.Grid.

    In most use cases, Notjs.basics.FormInputs and children are only instantiated by either Notjs.basics.Form
    or SlickGrid.  Application code should rarely need to create an indivual FormInput.  See documentation
    for Notjs.basics.Form for an example of how the are used there.

    ###

    @formatForDisplay: (row, cell, value, columnDef, dataContext) =>
      ###
        This is class method that gets called when the data needs to be displayed in the container element
        without allowing user input
      ###
      Notjs.errors.pureVirtualMissing("FormInput", "@formatForDisplay")


    constructor: (@args) ->
      # I really don't like this argument passing model where optional args and required arguments
      # are mixed but for compat with SlickGrid... does it have a jquery object in amember named
      # container?   If so, we are being called by slick grid
      @$element = @args.container
      @attr = @args.column.field
      @options = @args.column
      ###
      Constructs a new FormInput object

      element = css selector of DOM element where input will be rendered
      attr = attribute in "item" parameter on call to loadValue or applyValue where data is read/written

      See also:   Notjs.basics.FormInput class
      ###

      $input = @initialize()
      @bindStandardKeys($input)
      return $input


    initialize: () =>
      ###
      Creates the dom elements within @$element that will take input from the user
      ###
      Notjs.errors.pureVirtualMissing("FormInput", "initialize")


    loadValue: (dataObject) =>
      ###
        displays or selects current value of the attribute associated with dataObject into
        the input element and update input UI
      ###
      Notjs.errors.pureVirtualMissing("FormInput" , "loadValue")

    serializeValue: () =>
      ###
        returns the current value of user input
      ###
      Notjs.errors.pureVirtualMissing("FormInput", "serializeValue")


    # FormInput types can optionally override these required slickgrid editor methods

    applyValue: (dataObject, value) =>
      ###
        called to update the attribute in dataObject with the value passed
      ###
      @setDataObjectValue dataObject, value

    destroy: () =>
      ###
        called when input is being removed from the DOM. remove all data, events & dom elements created in
        initialize
      ###
      @$element.html("")

    focus: () =>
      ###
        should set focus to first input control if any
      ###
      @$element.focus()



    # notjs Proprietary

    getDataObjectValue: (dataObject) =>
      ###
        gets the value from the dataObject for the associated attribute
      ###
      # TODO:  add placeholders
      return Notjs.deepGet(dataObject, @attr) || ""

    setDataObjectValue: (dataObject, value) =>
      ###
        does a deep set on the dataobject use data-not_attr as the property path
      ###
      return Notjs.deepSet(dataObject, @attr, value)


    bindStandardKeys: ($input) =>
      ###
        Binds escape = cancelChanges
              enter = commitChanges
      ###
      $input.on 'keydown.notjsFormInput', (e) =>
        switch e.keyCode
          when Notjs.keyCode.ENTER then @args.commitChanges()
          when Notjs.keyCode.ESCAPE then @args.cancelChanges()


