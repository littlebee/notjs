Notjs.namespace 'basics', (x) ->

  class x.Form
    ###
    The Notjs.basics.Form class is instantiated on a DOM element identifying the container
    of FormInput elements that will be used to display and take input.

    Depending on the formMode option to the constructor, the data displayed in the form
    and the input data collected from the user are saved in a Javascript object called
    dataObject passed to the constructor.  There is also provision for notification
    of updates via an optional callback function (updateCallback).

    Note that forms do not need to be in &lt;form&gt; tags.  The example below demonstrates
    a form constructed in a div.  If you do construct the notjs Form on a form tag, it
    will disable the form from posting back to the server and then update dataObject and
    call updateCallback.

    Simplest Example:
      <code>
      |  <html>
      |    <body>
      |      <div id="authorEditForm">
      |        <div data-not_attr="name"></div>
      |        <div data-not_attr="genre"></div>
      |        <div class='readonly' data-not_attr="modifiedAt"></div>
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

    Each element that identifies a FormInput object must, at a minimum, have
    a data-not_attr attribute that identifies where in the dataObject the value for
    this input lives.

    Another often needed attribute is the data-not_type which is defaulted to "text".
    <code>
     | <div data-not_attr="wonHugoAward" data-not_type="Checkbox"></div>
    </code>
    The example above would create a Notjs.basics.formInputs.Checkbox type that would
    display and allow input, as a checkbox.  By default the namespace to that class is
    Notjs.basics.formInputs.  You call also specify a fully namespaced class, e.g.
    <code>
     |  <div data-not_attr="wonHugoAward" data-not_type="Slick.Editors.Text"></div>
    </code>
    ... yes, you can!  Notjs FormInputs steal their creation mechanics and API from SlickGrid
    and are designed to be interchangable.

    css class reactions:
      - "readonly"  # no input will be made available regardless of all other options and settings. this
                  css class can be used on either form element or the data-not_attr form inputs.

    html5 data attributes and defaults:
      - data-not_attr=""      # the name of the data or method attribute on dataobject
      - data-not_type="Text"  # the FormInput class name to create.

    Note the this class handles switching the FormInputs between display and input mode and navigation
    between inputs with the keyboard.

    ###

    constructor: (@selector, @dataObject, options = {}) ->
      @options = _.defaults options,
        formMode:          "fullInput"    # See comment below
        # function(whatChanged) called on update with array of attribute names changed this call
        updateCallback:    @_defaultUpdateCallback
      ###
      Constructs a new Form object

      selector = css selector of DOM element containing formInputs
      dataObject = data object (hash) to get and set values on

      The formMode constructor option supports several options that govern how the form
      will accept input and when the associated dataObject is updated and updateCallback
      is called.

        <b>formMode: "fullInput"</b> - (default) Form will look and feel like a classic
          web form with all inputs turned on.  <b>The form must have either a clickable element
          with the css class 'success' or a traditional &lt;input type="submit"&gt;.</b>

          All clickable elements within the selector DOM with the class "success" will be
          overtaken (preventDefault and no propagation) by this instance of Form.

          dataObject is updated and updateCallback is called when a ".success" element is
          clicked.

        <b>formMode: "inlineEdit"</b> - form will display data from dataObject
          and when the user clicks on the displayed data, it will switch to input mode.
          dataObject attribute associated with the single input that was taken is updated
          and updateCallback method is called with the attribute name updated.

        <b>formMode: "switchToEdit"</b> - form inputs will initially be all display
          only and when any element in the form is clicked, the whole form becomes editable.
          The form must provide a submit button which is hidden until the user clicks
          to edit form.  Hidding of the button is provided by the addition and removal
          of the .hidden css class.

        <b>formMode: "readOnly"</b> - Form will only display data.

      Individual form input DOM elements can additionally declare themselves to be read only
      by including the css class "readonly".  See modifiedAt in the above example.

      See also:   Notjs.basics.FormInput class
      ###

      # array of objects with
      #   $element:         jquery element with data-not_attr attribute
      #   formInputClass:   class of FormInput to create (data-not_type)
      #   formInputObject:  if the input is on display, ref to FormInput object, else null
      @formInputs = []

      return @   # constructor()

    initialize: () =>
      ###
      The initialize() method looks in the DOM under the selector passed to the constructor
      for any elements with the data-not_attr attribute set and instantiates a
      Notjs.basics.FormInput object for element found.
      ###
      @$element = $(@selector)

      @_initializeFormInputs()
      @setFormMode(@options.formMode)

      return @

    refresh: () =>
      # setting the form mode rerenders all displayed data and inputs
      setFormMode(@options.formMode)

    setFormMode:(mode) =>
      @options.formMode = mode
      switch mode
        when "fullInput" then @_showAllInputs()
        when "inlineEdit", "switchToEdit"
          @_displayDataForAll()
          @_installClickHandlers()
        when "readOnly" then @_displayDataForAll()
        else throw Notjs.errors.InvalidArgument("formMode")


    _initializeFormInputs: () =>
      @formInputs = []   # see comment in constructor
      for element in @$element.find('[data-not_attr]')
        $element = $(element)
        type = $element.data('not_type') || "Text"
        @formInputs.push
          $element: $element
          type: type
          attr: $element.data('not_attr')
          formInputClass: @_getClassFor type
          formInputObject: null

    _installClickHandlers: () =>
      for formInput in @formInputs
        formInput.$element.click () => @_editOnClick(formInput)

    _editOnClick: (formInput) =>
      if @options.formMode == "switchToEdit"
        @_showAllInputs()
      else
        @_showInputFor(formInput)

      formInput.$element.focus().select()

    _showAllInputs: () =>
      for formInput in @formInputs
        @_showInputFor formInput

    _showInputFor: (formInput) =>
      formInput.formInputObject ||= @_instantiateFormInputFor(formInput)
      formInput.formInputObject.loadValue(@dataObject)

    _instantiateFormInputFor: (formInput) =>
      args =
        container: formInput.$element
        column: {field: formInput.attr}
        grid: this
        gridPosition: 0
        position: 0
        item: dataObject
        cancelChanges: @_cancelChanges
        commitChanges: @_commitChanges

      return new formInput.formInputClass args

    _displayDataForAll: () =>
      for formInput in @formInputs
        @_displayDataFor formInput

    _displayDataFor: (formInput) =>
      $el = formInput.$element
      klass = formInput.formInputClass
      attr = formInput.attr
      unless klass.formatForDisplay? and _.isFunction(klass.formatForDisplay)
        console.warn "FormInput type #{formInput.type} for #{attr} doesn't have a " +
                     "formatForDisplay class method. skipping"
        return;

      $el.html klass.formatForDisplay($el, $el, @dataObject[attr], null, @dataObject)


    _defaultUpdateCallback: () =>
      # called when the user doesn't provide a updateCallback method on construction.  nbd, nothing to do


    _getClassFor: (type) =>
      # does the type exists in Notjs.basics.formInputs namespace
      return Notjs.basics.formInputs[type] if Notjs.basics.formInputs[type]

      current = Notjs.globalNamespace()
      for part in type.split('.')
        if current[part]
          current = current[part]
        else
          thrown "Unable to find class for FormInput type #{type}, specifically #{part}"

      return current

    # these currently do nothing  not sure what they are suppose to do or why you have to pass them to
    # slickgrid editors
    _commitChanges: () =>
      #
    _cancelChanges: () =>
      #
