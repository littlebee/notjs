Notjs.namespace 'basics', (x) ->

  class x.FormInput
    ###
    The FormInput class is a abstract base class for all form input types.  The
    class factory method can be used to generate a specific type of FormInput class
    (an extension).

    A specific type of FormInput is instantiated on a DOM element identifying a
    container where the value of the data attribute associated with this FormInput
    will be rendered on display, and a type of input control or other html will
    be rendered to take the user's input.

    The FormInput classes provides an interface compatible to that of SlickGrid's
    Editor extentions and are intended to be used interchangably in that environment.

    See <a href="https://github.com/mleibman/SlickGrid/wiki/Writing-custom-cell-editors">SlickGrid: Writing custom cell editors</a> for more information.

    For Notjs Forms, this class is the base class for all form inputs and provides defaults
    for some of the methods required by SlickGrid editors.   At a minimum, any extension
    of this class must provide the following methods:
      - a static class method called formatForDisplay (which can be used as SlickGrid
          formatter) which returns a string containing the html to render in the
          formInput element
      - an instance method called initialize() called on construction that creates the input
      - an instance method called loadValue(dataObject) that sets the current value of the
          input to the value of it's corresponding attribute in dataObject
      - an instance method called serializeValue() that returns the current value of the input

    Simplest Example:
      <code>
      |  <html>
      |    <body>
      |      <div id="authorEditForm">
      |        <div data-not_attr="name"></div>
      |        <div data-not_attr="genre"></div>
      |        <button class="success">Save it!</button><button class="cancel">Nevermind</button>
      |      </div>
      |    </body>
      |  </html>
      |  <script>
      |    var dataObject = {name: "Arthur C. Clark", genre: "science fiction", modifiedAt: "6/15/2012"};
      |    var form = new Notjs.basics.Form("#authorEditForm", dataObject, {
      |        updateCallback: function(whatUpdated){ alert("You updated " + whatUpdated + ". I'm telling");}
      |    });
      |    form.initialize();
      </code>

    Produces this:
      <code>
      |  <html>
      |    <body>
      |      <div id="authorEditForm">
      |        <div data-not_attr="name"><input type="text" value="Arthur C. Clark"></div>
      |        <div data-not_attr="genre"><input type="text" value="science fiction"></div>
      |        <div class='readonly' data-not_attr="modifiedAt">6/15/2012</div>
      |        <button class="success">Save it!</button><button class="cancel">Nevermind</button>
      |      </div>
      |    </body>
      |  </html>
      </code>
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

      # slick grid constructs anew each edit session so go for it.
      return @initialize()

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

    # FormInput types can optionally override these
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


    getDataObjectValue: (dataObject) =>
      ###
        gets the value from the dataObject for the associated attribute
      ###
      # TODO:  add placeholders
      return Notjs.deepGet(dataObject, @attr) || ""

    setDataObjectValue: (dataObject, value) =>
      return Notjs.deepSet(dataObject, @attr, value)

