Notjs.namespace 'basics', (x) ->

  class x.Form
    ###
    The Notjs.basics.Form class is instantiated on a DOM element identifying the container
    of FormInput elements that will be used to display and take input.  The constructor
    parameter <i>@selector</i> identifies the DOM element and the <i>dataObject</i> parameter
    has a javascript object that is bound to this form.  Each FormInput identified by a 
    data-not_attr attribute represents an attribute within <i>dataObject</id>

    Depending on the formMode option to the constructor, the data displayed in the form
    and the input data collected from the user are saved in a Javascript object called
    <i>dataObject</i> passed to the constructor.  There is also provision for notification
    of updates via an optional callback function (updateCallback).

    Note that forms do not need to be in &lt;form&gt; tags.  The example below demonstrates
    a form constructed in a div.  If you do construct the notjs Form on a form tag, it
    will disable the form from posting back to the server and then update <i>dataObject</i> and
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
    a data-not_attr attribute that identifies where in the <i>dataObject</i> the value for
    this input lives.

    Another often needed attribute is the data-not_type which is defaulted to "Text".
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

    CSS class interactions:
      - "readonly"  # no input will be made available regardless of all other options and settings. this
                    # css class can be used on either form element or the individual data-not_attr form 
                    # input elements.
      - "hidden"    # added to submit / success buttons on form without any FormInputs in input mode
      - "success"   # any element in the form with this class will be assumed clickable and mean save
      - "cancel"    # any element in the form with this class will be assumed clickable and mean cancel edit


    HTML5 data attributes and defaults:
      - data-not_attr=""      # the name of the data or method attribute on <i>dataObject</i>
      - data-not_type="Text"  # the FormInput class name to create.

    Note the this class, Notjs.basics.Form, handles switching the FormInputs between display and input mode
    and navigation between inputs with the keyboard and mouse.

    ###

    constructor: (@selector, @dataObject, options = {}) ->
      @options = _.defaults options,
        formMode:          "fullInput"    # See comment below
        # function(whatChanged) - called on update with array of attribute names changed this call
        updateCallback:    @_defaultUpdateCallback
        # function() - called when changes are canceled
        cancelCallback:    @_defaultCancelCallback
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

        <b>formMode: "fullInputOnClick"</b> - form inputs will initially be all display
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

      return @initialize()   # end of constructor()

    initialize: () =>
      ###
      The initialize() method looks in the DOM under the selector passed to the constructor
      for any elements with the data-not_attr attribute set and instantiates a
      Notjs.basics.FormInput object for element found.
      ###
      @$element = $(@selector)
      Notjs.errors.selectorNotFound(@selector) if @$element.length <= 0

      @_initializeFormInputs()
      @_initializeSaveAndCancel()


      @setFormMode(@options.formMode)

      return @

    refresh: () =>
      # setting the form mode rerenders all displayed data and inputs
      @setFormMode(@options.formMode)

    setFormMode:(mode) =>
      mode = "readOnly" if @$element.hasClass 'readonly'

      @options.formMode = mode
      @inlineEditing = false
      @switchedToFullInput = false

      switch mode
        when "fullInput"
          @_removeClickHandlers()
          @_showAllInputs()
          @_showSaveAndCancel()
        when "inlineEdit", "fullInputOnClick"
          @_displayDataForAll()
          @_installClickHandlers()
          @_hideSaveAndCancel()
        when "readOnly"
          @_displayDataForAll()
          @_removeClickHandlers()
          @_hideSaveAndCancel()
        else Notjs.errors.invalidArgument("formMode")
        


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
      # use each here and not a for formInput in formInputs because each passes formInput as a
      # reference directly to the array element and not a local intermediate reference that is
      # updated as it iterates accross the array :(  Otherwise by the time @_editOnClick is called,
      # formInput passed to it will always be the last array element
      _.each @formInputs, (formInput) =>
        formInput.$element.on 'mouseup.notjs-form', () => @_editOnClick(formInput)

    _removeClickHandlers: () =>
      for formInput in @formInputs
        formInput.$element.off 'mouseup.notjs-form'

    _editOnClick: (formInput) =>
      if @options.formMode == "fullInputOnClick"
        @_switchToFullInput()
      else
        @_startInlineEdit(formInput)



    #     Input

    _switchToFullInput: () =>
      return if @switchedToFullInput
      @switchedToFullInput = true
      @_showAllInputs()
      @_showSaveAndCancel()


    _showAllInputs: () =>
      for formInput in @formInputs
        @_showInputFor formInput


    _showInputFor: (formInput) =>
      # css Class 'readonly' overrides
      if formInput.$element.hasClass('readonly')
        @_displayDataFor formInput
      else
        unless formInput.formInputObject
          formInput.$element.html("")
          formInput.formInputObject = @_instantiateFormInputFor(formInput)

        formInput.formInputObject.loadValue(@dataObject)

    _instantiateFormInputFor: (formInput) =>
      args =
        container: formInput.$element
        column: {field: formInput.attr}
        grid: this
        gridPosition: 0
        position: 0
        item: @dataObject
        cancelChanges: @_cancelChanges
        commitChanges: @_commitChanges

      return new formInput.formInputClass args


    #          Display

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

      @_destroyFormInputObject(formInput)
      $el.html klass.formatForDisplay($el, $el, @dataObject[attr], null, @dataObject)


    _destroyFormInputObject: (formInput) =>
      if formInput.formInputObject
        formInput.formInputObject.destroy()
        formInput.formInputObject = null


    _initializeSaveAndCancel: () =>
      @_findSaveButtons().on 'click.notjsForm', @_commitChanges
      @_findCancelButtons().on 'click.notjsForm', @_cancelChanges


    _showSaveAndCancel: () =>
#      @_findSaveButtons().removeClass('hidden')
#      @_findCancelButtons().removeClass('hidden')
      @_findSaveButtons().delay(0).fadeIn()
      @_findCancelButtons().delay(0).fadeIn()


    _hideSaveAndCancel: () =>
#      @_findSaveButtons().addClass('hidden')
#      @_findCancelButtons().addClass('hidden')
      @_findSaveButtons().delay(0).fadeOut()
      @_findCancelButtons().delay(0).fadeOut()

    _focusOnSave: () =>
      @_findSaveButtons().first().focus()

    _focusOnCancel: () =>
      @_findCancelButtons().first().focus()

    _findSaveButtons: () =>
      @$element.find("input[type='submit'], .success")

    _findCancelButtons: () =>
      @$element.find(".cancel")

    _startInlineEdit: (formInput) =>
      return if formInput.$element.hasClass('readonly')
      return if formInput == @inlineEditing
      @_commitChanges() if @inlineEditing

      @_showInputFor(formInput)
      @_showSaveAndCancel()
      @inlineEditing = formInput


    _defaultUpdateCallback: () =>
      # called when the user doesn't provide a updateCallback method on construction.  nbd, nothing to do

    _defaultCancelCallback: () =>
      # called when the user doesn't provide a updateCallback method on construction.  nbd, nothing to do


    _getClassFor: (type) =>
      # does the type exist in Notjs.basics.formInputs namespace
      return Notjs.basics.formInputs[type] if Notjs.basics.formInputs[type]

      current = Notjs.globalNamespace()
      for part in type.split('.')
        if current[part]
          current = current[part]
        else
          throw "Unable to find class for FormInput type #{type}, specifically #{part}"

      return current


    _commitChanges: () =>
      if @inlineEditing
        formInputs = [@inlineEditing]
        @inlineEditing = false
      else
        formInputs = @formInputs

      whatChanged = []
      for formInput in formInputs
        continue unless formInput.formInputObject?
        formInput.formInputObject.applyValue(@dataObject, formInput.formInputObject.serializeValue())
        whatChanged.push formInput.attr

      # had to defer this because it was somehow triggering a second click on the save button
      _.defer @_focusOnSave

      # TODO : the callback should have the ability to cancel the changes (for validation or whatever)
      @options.updateCallback(whatChanged);
      @refresh()


    _cancelChanges: () =>
      @inlineEditing = false
      @refresh()    # restores input and display values to unmodified dataObject values
      @_focusOnCancel()
      # TODO : the callback should have the ability to cancel the cancel but only if it explicitly returns false
      @options.cancelCallback()
