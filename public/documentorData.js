base = (typeof module !== 'undefined' && module.exports) ? root : window
base.documentorData = [
  {
    "id": "dd_0",
    "name": "notjs.basics",
    "files": [
      {
        "id": "dd_1",
        "name": "array.coffee",
        "code": [],
        "comment": [
          "  javascript Array class extensions and monkeys"
        ],
        "methods": [
          {
            "id": "dd_2",
            "code": [
              "Notjs.addPrototypeUnlessExists Array, \"remove\", (from, to) ->"
            ],
            "comment": [
              "    removes an element from an array",
              "",
              "    by John Resig (MIT Licensed) (http://ejohn.org/blog/javascript-array-remove/)"
            ],
            "shortName": "Array.remove",
            "name": "Array.remove(from, to)"
          }
        ]
      },
      {
        "id": "dd_30",
        "name": "string.coffee",
        "code": [],
        "comment": [
          "  javascript String class extensions and monkeys"
        ],
        "methods": [
          {
            "id": "dd_31",
            "code": [
              "Notjs.addPrototypeUnlessExists String, \"startsWith\", (anotherString) ->"
            ],
            "comment": [
              "    returns true if string starts with anotherString",
              "",
              "    example:",
              "     &quot;this string&quot;.startsWith(&quot;this&quot;)",
              "     -&gt; true"
            ],
            "shortName": "String.startsWith",
            "name": "String.startsWith(anotherString)"
          },
          {
            "id": "dd_32",
            "code": [
              "Notjs.addPrototypeUnlessExists String, \"endsWith\", (anotherString) ->"
            ],
            "comment": [
              "    returns true if string ends with anotherString",
              "",
              "    example:",
              "     &quot;this string&quot;.endsWith(&quot;string&quot;)",
              "     -&gt; true"
            ],
            "shortName": "String.endsWith",
            "name": "String.endsWith(anotherString)"
          },
          {
            "id": "dd_33",
            "code": [
              "Notjs.addPrototypeUnlessExists String, \"isBlank\", () ->"
            ],
            "comment": [
              "    returns true if this string is blank",
              "",
              "    examples (all return true):",
              "     &quot;&quot;.isBlank()",
              "     &quot;   &quot;.isBlank()",
              "     &quot;\\n\\r  &quot;.isBlank()"
            ],
            "shortName": "String.isBlank",
            "name": "String.isBlank()"
          },
          {
            "id": "dd_34",
            "code": [
              "Notjs.addPrototypeUnlessExists String, \"trim\", () ->"
            ],
            "comment": [
              "    returns copy of this string with white spaces and line end chars removed"
            ],
            "shortName": "String.trim",
            "name": "String.trim()"
          },
          {
            "id": "dd_35",
            "code": [
              "Notjs.addPrototypeUnlessExists String, \"elipsize\",  (maxLength) ->"
            ],
            "comment": [
              "    returns a copy of this string truncated to maxLength - 3 and \"...\" appended"
            ],
            "shortName": "String.elipsize",
            "name": "String.elipsize(maxLength)"
          },
          {
            "id": "dd_36",
            "code": [
              "Notjs.addPrototypeUnlessExists String, \"decamelize\", () ->"
            ],
            "comment": [
              "    returns a decamelized copy of this string",
              "",
              "    example:",
              "     &quot;dropCamelCase&quot;.decamelize()",
              "     =&gt; &quot;Drop Camel Case&quot;"
            ],
            "shortName": "String.decamelize",
            "name": "String.decamelize()"
          },
          {
            "id": "dd_37",
            "code": [
              "Notjs.addPrototypeUnlessExists String, \"dropCamelize\", () ->"
            ],
            "comment": [
              "    returns a copy of this string camel cased with first char lower case",
              "",
              "    example:",
              "     &quot;Camel Case My Ass&quot;.dropCamelize()",
              "     =&gt; &quot;camelCaseMyAss&quot;"
            ],
            "shortName": "String.dropCamelize",
            "name": "String.dropCamelize()"
          }
        ]
      },
      {
        "id": "dd_38",
        "name": "utility.coffee",
        "code": [
          "###"
        ],
        "comment": [
          "",
          "",
          "# I really wanted to extend Object.prototype and add the methods but jQuery clone and",
          "# other things break if you modify Object like that see,",
          "# <a href=\"http://stackoverflow.com/questions/9138161/javascript-clone-function-breaks-with-jquery\"> this stack overflow </a>",
          "",
          "Notjs.deepGet = (object, pathToAttribute) ->"
        ],
        "methods": []
      }
    ],
    "classes": [
      {
        "id": "dd_3",
        "shortName": "x.Form",
        "name": "basics.Form",
        "code": [
          "  class x.Form"
        ],
        "comment": [
          "    The Notjs.basics.Form class is instantiated on a DOM element identifying the container",
          "    of FormInput elements that will be used to display and take input.  The constructor",
          "    parameter <i>@selector</i> identifies the DOM element and the <i>dataObject</i> parameter",
          "    has a javascript object that is bound to this form.  Each FormInput identified by a ",
          "    data-not_attr attribute represents an attribute within <i>dataObject</id>",
          "",
          "    Depending on the formMode option to the constructor, the data displayed in the form",
          "    and the input data collected from the user are saved in a Javascript object called",
          "    <i>dataObject</i> passed to the constructor.  There is also provision for notification",
          "    of updates via an optional callback function (updateCallback).",
          "",
          "    Note that forms do not need to be in &lt;form&gt; tags.  The example below demonstrates",
          "    a form constructed in a div.  If you do construct the notjs Form on a form tag, it",
          "    will disable the form from posting back to the server and then update <i>dataObject</i> and",
          "    call updateCallback.",
          "",
          "    Simplest Example:",
          "      <code>",
          "        &lt;html&gt;",
          "          &lt;body&gt;",
          "            &lt;div id=&quot;authorEditForm&quot;&gt;",
          "              &lt;div data-not_attr=&quot;name&quot;&gt;&lt;/div&gt;",
          "              &lt;div data-not_attr=&quot;genre&quot;&gt;&lt;/div&gt;",
          "              &lt;div class=&#39;readonly&#39; data-not_attr=&quot;modifiedAt&quot;&gt;&lt;/div&gt;",
          "              &lt;button class=&quot;success&quot;&gt;Save it!&lt;/button&gt;&lt;button class=&quot;cancel&quot;&gt;Nevermind&lt;/button&gt;",
          "            &lt;/div&gt;",
          "          &lt;/body&gt;",
          "        &lt;/html&gt;",
          "        &lt;script&gt;",
          "          var dataObject = {name: &quot;Arthur C. Clark&quot;, genre: &quot;science fiction&quot;, modifiedAt: &quot;6/15/2012&quot;};",
          "          var form = new Notjs.basics.Form(&quot;#authorEditForm&quot;, dataObject, {",
          "              updateCallback: function(whatUpdated){ alert(&quot;You updated &quot; + whatUpdated + &quot;. I&#39;m telling&quot;);}",
          "          });",
          "          form.initialize();",
          "      </code>",
          "",
          "    Produces this:",
          "      <code>",
          "        &lt;html&gt;",
          "          &lt;body&gt;",
          "            &lt;div id=&quot;authorEditForm&quot;&gt;",
          "              &lt;div data-not_attr=&quot;name&quot;&gt;&lt;input type=&quot;text&quot; value=&quot;Arthur C. Clark&quot;&gt;&lt;/div&gt;",
          "              &lt;div data-not_attr=&quot;genre&quot;&gt;&lt;input type=&quot;text&quot; value=&quot;science fiction&quot;&gt;&lt;/div&gt;",
          "              &lt;div class=&#39;readonly&#39; data-not_attr=&quot;modifiedAt&quot;&gt;6/15/2012&lt;/div&gt;",
          "              &lt;button class=&quot;success&quot;&gt;Save it!&lt;/button&gt;&lt;button class=&quot;cancel&quot;&gt;Nevermind&lt;/button&gt;",
          "            &lt;/div&gt;",
          "          &lt;/body&gt;",
          "        &lt;/html&gt;",
          "      </code>",
          "",
          "    Each element that identifies a FormInput object must, at a minimum, have",
          "    a data-not_attr attribute that identifies where in the <i>dataObject</i> the value for",
          "    this input lives.",
          "",
          "    Another often needed attribute is the data-not_type which is defaulted to \"Text\".",
          "    <code>",
          "      &lt;div data-not_attr=&quot;wonHugoAward&quot; data-not_type=&quot;Checkbox&quot;&gt;&lt;/div&gt;",
          "    </code>",
          "    The example above would create a Notjs.basics.formInputs.Checkbox type that would",
          "    display and allow input, as a checkbox.  By default the namespace to that class is",
          "    Notjs.basics.formInputs.  You call also specify a fully namespaced class, e.g.",
          "    <code>",
          "       &lt;div data-not_attr=&quot;wonHugoAward&quot; data-not_type=&quot;Slick.Editors.Text&quot;&gt;&lt;/div&gt;",
          "    </code>",
          "    ... yes, you can!  Notjs FormInputs steal their creation mechanics and API from SlickGrid",
          "    and are designed to be interchangable.",
          "",
          "    CSS class interactions:",
          "      - \"readonly\"  # no input will be made available regardless of all other options and settings. this",
          "                    # css class can be used on either form element or the individual data-not_attr form ",
          "                    # input elements.",
          "      - \"hidden\"    # added to submit / success buttons on form without any FormInputs in input mode",
          "      - \"success\"   # any element in the form with this class will be assumed clickable and mean save",
          "      - \"cancel\"    # any element in the form with this class will be assumed clickable and mean cancel edit",
          "",
          "",
          "    HTML5 data attributes and defaults:",
          "      - data-not_attr=\"\"      # the name of the data or method attribute on <i>dataObject</i>",
          "      - data-not_type=\"Text\"  # the FormInput class name to create.",
          "",
          "    Note the this class, Notjs.basics.Form, handles switching the FormInputs between display and input mode",
          "    and navigation between inputs with the keyboard and mouse.",
          ""
        ],
        "methods": [
          {
            "id": "dd_4",
            "code": [
              "    constructor: (@selector, @dataObject, options = {}) ->",
              "      @options = _.defaults options,",
              "        formMode:          \"fullInput\"    # See comment below",
              "        # function(whatChanged) called on update with array of attribute names changed this call",
              "        updateCallback:    @_defaultUpdateCallback"
            ],
            "comment": [
              "      Constructs a new Form object",
              "",
              "      selector = css selector of DOM element containing formInputs",
              "      dataObject = data object (hash) to get and set values on",
              "",
              "      The formMode constructor option supports several options that govern how the form",
              "      will accept input and when the associated dataObject is updated and updateCallback",
              "      is called.",
              "",
              "        <b>formMode: \"fullInput\"</b> - (default) Form will look and feel like a classic",
              "          web form with all inputs turned on.  <b>The form must have either a clickable element",
              "          with the css class 'success' or a traditional &lt;input type=\"submit\"&gt;.</b>",
              "",
              "          All clickable elements within the selector DOM with the class \"success\" will be",
              "          overtaken (preventDefault and no propagation) by this instance of Form.",
              "",
              "          dataObject is updated and updateCallback is called when a \".success\" element is",
              "          clicked.",
              "",
              "        <b>formMode: \"inlineEdit\"</b> - form will display data from dataObject",
              "          and when the user clicks on the displayed data, it will switch to input mode.",
              "          dataObject attribute associated with the single input that was taken is updated",
              "          and updateCallback method is called with the attribute name updated.",
              "",
              "        <b>formMode: \"switchToFullInput\"</b> - form inputs will initially be all display",
              "          only and when any element in the form is clicked, the whole form becomes editable.",
              "          The form must provide a submit button which is hidden until the user clicks",
              "          to edit form.  Hidding of the button is provided by the addition and removal",
              "          of the .hidden css class.",
              "",
              "        <b>formMode: \"readOnly\"</b> - Form will only display data.",
              "",
              "      Individual form input DOM elements can additionally declare themselves to be read only",
              "      by including the css class \"readonly\".  See modifiedAt in the above example.",
              "",
              "      See also:   Notjs.basics.FormInput class"
            ],
            "shortName": "constructor",
            "name": "basics.Form.constructor"
          },
          {
            "id": "dd_5",
            "code": [
              "    initialize: () =>"
            ],
            "comment": [
              "      The initialize() method looks in the DOM under the selector passed to the constructor",
              "      for any elements with the data-not_attr attribute set and instantiates a",
              "      Notjs.basics.FormInput object for element found."
            ],
            "shortName": "initialize",
            "name": "basics.Form.initialize"
          },
          {
            "id": "dd_6",
            "code": [
              "    _editOnClick: (formInput) =>",
              "      if @options.formMode == \"switchToFullInput\"",
              "        @_showAllInputs()",
              "      else",
              "        @_startInlineEdit(formInput)",
              "",
              "      formInput.$element.focus().select()",
              "",
              ""
            ],
            "comment": [
              "",
              "",
              "    _showAllInputs: () =>",
              "      for formInput in @formInputs",
              "        @_showInputFor formInput",
              "",
              "    _showInputFor: (formInput) =>",
              "      # css Class 'readonly' overrides",
              "      if formInput.$element.hasClass('readonly')",
              "        @_displayDataFor formInput",
              "      else",
              "        formInput.formInputObject ||= @_instantiateFormInputFor(formInput)",
              "        formInput.formInputObject.loadValue(@dataObject)",
              "",
              "    _instantiateFormInputFor: (formInput) =>",
              "      args =",
              "        container: formInput.$element",
              "        column: {field: formInput.attr}",
              "        grid: this",
              "        gridPosition: 0",
              "        position: 0",
              "        item: dataObject",
              "        cancelChanges: @_cancelChanges",
              "        commitChanges: @_commitChanges",
              "",
              "      return new formInput.formInputClass args",
              "",
              ""
            ],
            "shortName": "_editOnClick",
            "name": "basics.Form._editOnClick"
          }
        ]
      },
      {
        "id": "dd_7",
        "shortName": "x.FormInput",
        "name": "basics.FormInput",
        "code": [
          "  class x.FormInput"
        ],
        "comment": [
          "    The FormInput class is an abstract base class for all form input types.",
          "",
          "    A specific type of FormInput is instantiated on a DOM element identifying a",
          "    container.  The value of the DOM element ($().html()) is then after controlled",
          "    by the FormInput type.   An outside party (Notjs.basics.Form or Slick.Grid)",
          "    tells the type when to display data by calling the formatForDisplay() class",
          "    method; and it also tells the FormInput type when to render html capable of",
          "    taking user input.",
          "",
          "    The FormInput classes provide an interface compatible to that of SlickGrid's",
          "    Editor extentions and are intended to be used interchangably in that environment.",
          "",
          "    See <a href=\"https://github.com/mleibman/SlickGrid/wiki/Writing-custom-cell-editors\">SlickGrid: Writing custom cell editors</a> for more information.",
          "",
          "    The Form base class defined here provides defaults  for some of the methods required by",
          "    SlickGrid editors.   At a minimum, any extension of this class must provide the following methods:",
          "",
          "      - a static class method called formatForDisplay (which can be used as SlickGrid",
          "          formatter) which returns a string containing the html to render in the",
          "          formInput element",
          "      - an instance method called initialize() called on construction that creates the input",
          "      - an instance method called loadValue(dataObject) that sets the current value of the",
          "          input to the value of it's corresponding attribute in dataObject",
          "      - an instance method called serializeValue() that returns the current value of the input",
          "",
          "    See Notjs.basics.formInputs.Text for a simple example of creating a custom editor / formatter that can be",
          "    used with either Notjs.basics.Form or Slick.Grid.",
          "",
          "    In most use cases, Notjs.basics.FormInputs and children are only instantiated by either Notjs.basics.Form",
          "    or SlickGrid.  Application code should rarely need to create an indivual FormInput.  See documentation",
          "    for Notjs.basics.Form for an example of how the are used there.",
          ""
        ],
        "methods": [
          {
            "id": "dd_8",
            "code": [
              "    @formatForDisplay: (row, cell, value, columnDef, dataContext) =>"
            ],
            "comment": [
              "        This is class method that gets called when the data needs to be displayed in the container element",
              "        without allowing user input"
            ],
            "shortName": "@formatForDisplay",
            "name": "basics.FormInput.@formatForDisplay"
          },
          {
            "id": "dd_9",
            "code": [
              "    constructor: (@args) ->",
              "      # I really don't like this argument passing model where optional args and required arguments",
              "      # are mixed but for compat with SlickGrid... does it have a jquery object in amember named",
              "      # container?   If so, we are being called by slick grid",
              "      @$element = @args.container",
              "      @attr = @args.column.field",
              "      @options = @args.column"
            ],
            "comment": [
              "      Constructs a new FormInput object",
              "",
              "      element = css selector of DOM element where input will be rendered",
              "      attr = attribute in \"item\" parameter on call to loadValue or applyValue where data is read/written",
              "",
              "      See also:   Notjs.basics.FormInput class"
            ],
            "shortName": "constructor",
            "name": "basics.FormInput.constructor"
          },
          {
            "id": "dd_10",
            "code": [
              "    initialize: () =>"
            ],
            "comment": [
              "      Creates the dom elements within @$element that will take input from the user"
            ],
            "shortName": "initialize",
            "name": "basics.FormInput.initialize"
          },
          {
            "id": "dd_11",
            "code": [
              "    loadValue: (dataObject) =>"
            ],
            "comment": [
              "        displays or selects current value of the attribute associated with dataObject into",
              "        the input element and update input UI"
            ],
            "shortName": "loadValue",
            "name": "basics.FormInput.loadValue"
          },
          {
            "id": "dd_12",
            "code": [
              "    serializeValue: () =>"
            ],
            "comment": [
              "        returns the current value of user input"
            ],
            "shortName": "serializeValue",
            "name": "basics.FormInput.serializeValue"
          },
          {
            "id": "dd_13",
            "code": [
              "    applyValue: (dataObject, value) =>"
            ],
            "comment": [
              "        called to update the attribute in dataObject with the value passed"
            ],
            "shortName": "applyValue",
            "name": "basics.FormInput.applyValue"
          },
          {
            "id": "dd_14",
            "code": [
              "    destroy: () =>"
            ],
            "comment": [
              "        called when input is being removed from the DOM. remove all data, events & dom elements created in",
              "        initialize"
            ],
            "shortName": "destroy",
            "name": "basics.FormInput.destroy"
          },
          {
            "id": "dd_15",
            "code": [
              "    focus: () =>"
            ],
            "comment": [
              "        should set focus to first input control if any"
            ],
            "shortName": "focus",
            "name": "basics.FormInput.focus"
          },
          {
            "id": "dd_16",
            "code": [
              "    getDataObjectValue: (dataObject) =>"
            ],
            "comment": [
              "        gets the value from the dataObject for the associated attribute"
            ],
            "shortName": "getDataObjectValue",
            "name": "basics.FormInput.getDataObjectValue"
          }
        ]
      },
      {
        "id": "dd_17",
        "shortName": "x.Checkbox",
        "name": "basics.formInputs.Checkbox",
        "code": [
          "  class x.Checkbox extends Notjs.basics.FormInput"
        ],
        "comment": [
          "      This FormInput type displays the boolean or truthy value of the data attribute and",
          "      presents an <input type='checkbox'...  type input on edit"
        ],
        "methods": []
      },
      {
        "id": "dd_18",
        "shortName": "x.Text",
        "name": "basics.formInputs.Text",
        "code": [
          "  class x.Text extends Notjs.basics.FormInput"
        ],
        "comment": [
          "      This FormInput type displays the string value of the data attribute and",
          "      presents an <input type='text'...  type input on edit"
        ],
        "methods": []
      },
      {
        "id": "dd_19",
        "shortName": "x.Partials",
        "name": "basics.Partials",
        "code": [
          "  class x.Partials"
        ],
        "comment": [
          "    Partials are in page and external partial templates that are resolved and rendered into",
          "    the page after the document is ready.  The placement of resolved partial in page is",
          "    determined by a div with a data-not_partial attribute equal to DOM id of template or",
          "    an external path.",
          "",
          "    <b>In page partials</b>",
          "",
          "      In page partials must have an element in the dom and the element must have an id.",
          "      The inpage partial template element also must have the class \"not-partial\"",
          "",
          "      Example:",
          "      <code>",
          "        &lt;html&gt;",
          "          &lt;body&gt;",
          "            &lt;div id=&quot;authorTemplate&quot; class=&quot;not-partial&quot;&gt;",
          "              &lt;span class=&quot;name&quot;&gt;Name&lt;/span&gt;&lt;span class=&quot;genre&quot;&gt;Genre&lt;/span&gt;",
          "            &lt;/div&gt;",
          "            Current Favorite Author:",
          "            &lt;div id=&quot;currentFavAuthor&quot; class=&quot;favorite&quot; data-not_partial=&quot;#authorTemplate&quot;/&gt;",
          "            Authors List:",
          "            &lt;ul id=&#39;authorsList&#39;&gt;",
          "              &lt;li&gt;",
          "                &lt;div data-not_partial=&quot;#authorTemplate&quot;/&gt;",
          "              &lt;/li&gt;",
          "            &lt;/ul&gt;",
          "          &lt;/body&gt;",
          "        &lt;html&gt;",
          "        &lt;script&gt;",
          "          $(document).ready(function(){",
          "            partials = new notjs.basics.Partials({removePartials: false, hidePartials: true}).initialize()",
          "            partials.resolve()",
          "          });",
          "        &lt;/script&gt;",
          "      </code>",
          "      produces this:",
          "      <code>",
          "        &lt;html&gt;",
          "          &lt;body&gt;",
          "            &lt;div id=&quot;authorTemplate&quot; style=&quot;display: none;&quot;&gt;",
          "              &lt;span class=&quot;name&quot;&gt;Name&lt;/span&gt;&lt;span class=&quot;genre&quot;&gt;Genre&lt;/span&gt;",
          "            &lt;/div&gt;",
          "            Current Favorite Author:",
          "            &lt;div id=&quot;currentFavAuthor&quot; class=&quot;favorite&quot; data-not_partial=&quot;#authorTemplate&quot;&gt;",
          "              &lt;span class=&quot;name&quot;&gt;Name&lt;/span&gt;&lt;span class=&quot;genre&quot;&gt;Genre&lt;/span&gt;",
          "            &lt;/div&gt;",
          "            Authors List:",
          "            &lt;ul id=&#39;authorsList&#39;&gt;",
          "              &lt;li&gt;",
          "                &lt;div data-not_partial=&quot;#authorTemplate&quot;/&gt;",
          "                  &lt;span class=&quot;name&quot;&gt;Name&lt;/span&gt;&lt;span class=&quot;genre&quot;&gt;Genre&lt;/span&gt;",
          "                &lt;/div&gt;",
          "              &lt;/li&gt;",
          "            &lt;/ul&gt;",
          "          &lt;/body&gt;",
          "        &lt;html&gt;",
          "      </code>",
          "",
          "    <b>External partials</b>",
          "",
          "      External partials are fetched asynchronously from the server on resolve().  They are",
          "      denoted from in page partials by the lack of a '#' prefix on the data-not_partial",
          "      attribute.",
          "",
          "      Example:",
          "      <code>",
          "        &lt;html&gt;",
          "          &lt;body&gt;",
          "            Current Favorite Author:",
          "            &lt;div id=&quot;currentFavAuthor&quot; class=&quot;favorite&quot; data-not_partial=&quot;/elements/authorTemplate.html&quot;/&gt;",
          "      </code>",
          "",
          "      The example above will do a get request type text/html to the server to get the",
          "      html fragment that get's duplicated into the div with the data-not_partial attribute",
          ""
        ],
        "methods": [
          {
            "id": "dd_20",
            "code": [
              "    @resolve: (options = {}) ->",
              "      new this(options).initialize().resolve()"
            ],
            "comment": [
              "        Class method for one shot convienence.  See .resolve instance method"
            ],
            "shortName": "@resolve",
            "name": "basics.Partials.@resolve"
          },
          {
            "id": "dd_21",
            "code": [
              "    constructor: (options = {}) ->",
              "      @options = _.defaults options,",
              "        removePartials:      true      # remove partial templates?  $('.not-partial').remove()",
              "        hidePartials:        false     # hide partial templates? $('.not-partial').hide()",
              "        selector:            'body'    # scope this Partials object to part of the DOM",
              "        onPartialsResolved:  null      # function() called after all inpage and external partials are resolved",
              "        onPartialRendered:   null      # function($newElement) - called after a partial is rendered into the DOM"
            ],
            "comment": [
              "        Constructs a new Partials object"
            ],
            "shortName": "constructor",
            "name": "basics.Partials.constructor"
          },
          {
            "id": "dd_22",
            "code": [
              "    initialize: () =>"
            ],
            "comment": [
              "        Initialize should be called inside of a $(document).ready block"
            ],
            "shortName": "initialize",
            "name": "basics.Partials.initialize"
          },
          {
            "id": "dd_23",
            "code": [
              "    resolve: (options={}) =>",
              "      options = _.defaults options,",
              "        onPartialsResolved: null  # optional callback method on completion",
              ""
            ],
            "comment": [
              "        Replaces contents of divs with data-not_partial attribute with the html of the partial",
              "        referenced in the data-not_partial attribute value.",
              "",
              "        data-not_partial attribute may refer to an in page partial template denoted by a hash",
              "        mark at the beginning of the attribute value",
              "        <code>",
              "          &lt;div data-not_partial=&quot;#anotherElementId&quot;/&gt;",
              "        </code>",
              "        would mean that there is another div on the page with the id=\"anotherElementId\" whose",
              "        contents used.",
              "",
              "        data-not_partial can also reference server sourced data.",
              "        <code>",
              "          &lt;div data-not_partial=&quot;/someController/someElement.html&quot;/&gt;",
              "        </code>",
              "",
              "        Notes:",
              "          - any content within the data-not_partial element is replaced.",
              "          - external partials are retrieved asynchronously (as one might expect).  If you have",
              "            other client code depending on resolved partials you should use the",
              "            onPartialsResolved option to this method like this:",
              "            <code>",
              "            Notjs.basics.Partials.resolve({onPartialsResolved: function(){",
              "              Notjs.basics.Replicator.replicate('#moduleTemplate', documentorData, replicateModule)",
              "              Notjs.basics.Replicator.replicate('#apiDocs', documentorData, replicateModule)",
              "            }});",
              "            </code>"
            ],
            "shortName": "resolve",
            "name": "basics.Partials.resolve"
          }
        ]
      },
      {
        "id": "dd_24",
        "shortName": "x.Replicator",
        "name": "basics.Replicator",
        "code": [
          "  class x.Replicator"
        ],
        "comment": [
          "    Replicator will clone an element once for each item in a array after calling a callback method and",
          "    insert it immediately after the template element.",
          "",
          "    Example (HTML):",
          "    <code><pre>",
          "      &lt;html&gt;",
          "        &lt;body&gt;",
          "          Authors List:",
          "          &lt;ul id=&#39;authorsList&#39;&gt;",
          "            &lt;li&gt;",
          "              &lt;span class=&quot;name&quot;&gt;Name&lt;/span&gt;&lt;span class=&quot;genre&quot;&gt;Genre&lt;/span&gt;",
          "            &lt;/li&gt;",
          "        &lt;/body&gt;",
          "      &lt;/html&gt;",
          "      &lt;script&gt;",
          "        var authors = [",
          "          {name: &#39;Robert Heinlein&#39;, genre: &#39;Science Fiction&#39;},",
          "          {name: &#39;J. K. Rowling&#39;,   genre: &#39;Fantasy&#39;},",
          "          {name: &#39;Malcom Gladwell&#39;, genre: &#39;Non fiction&#39;}",
          "        ];",
          "        replicator = new notjs.basics.Replicator(&#39;#authorsList&#39;)",
          "        replicator.replicate(authors, function($newElement, author, index){",
          "          $newElement.find(&#39;.name&#39;).html(author.name);",
          "          $newElement.find(&#39;.genre&#39;).html(author.genre);",
          "        });",
          "      &lt;/script&gt;",
          "    </pre></code>",
          "",
          "    The example above will generate one li for each of authors array"
        ],
        "methods": [
          {
            "id": "dd_25",
            "code": [
              "    @replicate: (selector, data, callback) =>",
              "      new this(selector).initialize().replicate(data, callback)"
            ],
            "comment": [
              "      This class method is convenient, but note that it is effectively one shot only",
              "      as the inner html template is removed.  If you are going to be updating the underlying",
              "      data and want those changes, you should either contruct and initialize an instance of",
              "      notjs.basics.replicator or you should save the return value of this method",
              "",
              "      see replicate instance method for more information",
              ""
            ],
            "shortName": "@replicate",
            "name": "basics.Replicator.@replicate"
          },
          {
            "id": "dd_26",
            "code": [
              "    constructor: (@selector, options={}) ->",
              "      @options = _.defaults options,",
              "        data: null   # you can optionally pass in the initial data to render"
            ],
            "comment": [
              "        I wonder if coffee doc will pickup my option defaults?  :( no, but scripts/documentor will! :)"
            ],
            "shortName": "constructor",
            "name": "basics.Replicator.constructor"
          },
          {
            "id": "dd_27",
            "code": [
              "    initialize: () =>"
            ],
            "comment": [
              "        call this method in a document.ready block or code path"
            ],
            "shortName": "initialize",
            "name": "basics.Replicator.initialize"
          },
          {
            "id": "dd_28",
            "code": [
              "    getTemplate: () =>"
            ],
            "comment": [
              "        this method returns the a jQuery clone of the template (whatever was in the html of the",
              "        selector passed on construction)"
            ],
            "shortName": "getTemplate",
            "name": "basics.Replicator.getTemplate"
          },
          {
            "id": "dd_29",
            "code": [
              "    replicate: (array, callback) =>"
            ],
            "comment": [
              "        this method is passed an <i>array</i> for which <i>callback</i> (also passed) will be called",
              "        once for each element in <i>array</i>.",
              "",
              "        Callback method:",
              "            <code><pre>     callback($newElement, arrayMember, index)</pre></code>",
              "        where <code>",
              "          <b>$newElement</b> - newly created element for this array member",
              "          <b>arrayMember</b> - the array member",
              "          <b>index</b> - zero based index of the array member being called for",
              "        </code>",
              "",
              "        If the callback method returns true,  the $newElement will be appended to the",
              "        selector element.   If the callback method returns false, the newElement",
              "        will <b>not</b> be appended to the selector element",
              "",
              "        Note that this method can also be called any number of times during the page",
              "        life to \"regenerate\" the elements replicated into the selector passed to constructor",
              "",
              "        Implementation note:   avoid text directly in the replicator element.  For example,",
              "        <code>",
              "          &lt;div id=&quot;replicationTemplate&gt;",
              "           Some text to be cloned",
              "           &lt;h1&gt;Whatever&lt;/h1&gt;",
              "           &lt;h2&gt;Wherever&lt;/h2&gt;",
              "          &lt;/div&gt;",
              "          &lt;script&gt;",
              "            repl = new notjs.basics.replicator(&#39;#replicationTemplate&#39;).initialize()",
              "            repl.replicate [1,2,3]",
              "          &lt;/script&gt;",
              "        </code>",
              "        results in:",
              "        <code>",
              "          &lt;div id=&quot;replicationTemplate&gt;",
              "           &lt;h1&gt;Whatever&lt;/h1&gt;",
              "           &lt;h2&gt;Wherever&lt;/h2&gt;",
              "           &lt;h1&gt;Whatever&lt;/h1&gt;",
              "           &lt;h2&gt;Wherever&lt;/h2&gt;",
              "           &lt;h1&gt;Whatever&lt;/h1&gt;",
              "           &lt;h2&gt;Wherever&lt;/h2&gt;",
              "          &lt;/div&gt;",
              "        </code>",
              "        ...without \"Some text to be cloned\".  To avoid that, put text in an inner element,",
              "        like this:",
              "        <code>",
              "          &lt;div id=&quot;replicationTemplate&gt;",
              "           &lt;span&gt;Some text to be cloned&lt;/span&gt;",
              "           &lt;h1&gt;Whatever&lt;/h1&gt;",
              "           &lt;h2&gt;Wherever&lt;/h2&gt;",
              "          &lt;/div&gt;",
              "        </code>"
            ],
            "shortName": "replicate",
            "name": "basics.Replicator.replicate"
          }
        ]
      },
      {
        "id": "dd_39",
        "shortName": "Notjs",
        "name": "Notjs",
        "code": [
          "class Notjs"
        ],
        "comment": [
          "    This is the top level Notjs class",
          "",
          "    One instance per application use is instantiated and added to the global namespace"
        ],
        "methods": [
          {
            "id": "dd_40",
            "code": [
              "  namespace: (target, name, block) ->"
            ],
            "comment": [
              "      this method is used to create a namespace for Notjs.",
              "      See (https://github.com/jashkenas/coffee-script/wiki/FAQ)",
              "      MODIFIED!  - if we are using namespaces let's let everything work the same in node and just add our",
              "              namespace to global namespace"
            ],
            "shortName": "namespace",
            "name": "Notjs.namespace"
          },
          {
            "id": "dd_41",
            "code": [
              "  globalNamespace: () =>"
            ],
            "comment": [
              "      returns the object representing the global namespace (window in browser and global in node.js"
            ],
            "shortName": "globalNamespace",
            "name": "Notjs.globalNamespace"
          },
          {
            "id": "dd_42",
            "code": [
              "  addPrototypeUnlessExists: (klass, protoName, method) ->"
            ],
            "comment": [
              "      convenience method for adding a prototype to a class if it doesn't exist.   Useful for things",
              "      like adding methods to String and Array that another library may have already loaded.",
              "",
              "      example:",
              "        Notjs.addPrototypeUnlessExists(String, &#39;startsWith&#39;, function(&#39;str&#39;){",
              "          this.slice(0, str.length) == str;",
              "        });"
            ],
            "shortName": "addPrototypeUnlessExists",
            "name": "Notjs.addPrototypeUnlessExists"
          }
        ]
      }
    ],
    "methods": []
  },
  {
    "id": "dd_0",
    "name": "notjs/scripts",
    "files": [
      {
        "id": "dd_1",
        "name": "documentor.coffee",
        "code": [
          "#!/usr/bin/env coffee",
          "",
          "HELP = \"\"\"",
          "  This script walks a tree of coffeescript and pulls out any ### comments and",
          "  associates them with the next indent level out and up.  A .js file containing",
          "  an array with the structure below is produced.",
          "\"\"\"",
          "MORE_HELP = \"\"\"",
          "  Example  (src/somefile.coffee):",
          "    | # if I want to show something like the delaration of constant, e.g.",
          "    | HELP = \"this is a really neat script that does bla\"",
          "    | # I can just put it above the block comment and it will get sucked up into",
          "    | # that thing's declaration (these single # comments also get sucked up).",
          "    | ###",
          "    |   This block comment will be associated with the file it could be empty",
          "    |   if for example you wanted to just document that the file existed",
          "    | ###",
          "    |",
          "    | class myAwesomeClass extends myAwesomeBaseClass",
          "    |   ###",
          "    |     This block comment gets associated with the class",
          "    |   ###",
          "    |",
          "    |   constructor: (options={}) =>",
          "    |     @options = _.defaults options,",
          "    |       beAwesome: true                   # will this instance be awesome?",
          "    |       extendAwesomeness: true           # push awesomeness outward",
          "    |       forcedAwesome: false              # can we fake it if all else fails?",
          "    |       awesomeIcon: \"/img/awesome.icon\"",
          "    |     ###",
          "    |       this block comment gets associated with the constructor method.  putting it after",
          "    |       the defaulting of options makes the options self documenting no?",
          "    |     ###",
          "",
          "  From the root notjs directory:",
          "",
          "    |  scripts/documentor.coffee ./src",
          "",
          "  generates documentorData.js file in current directory that contains:",
          "",
          "    |  var documentorData = [",
          "    |    {",
          "    |      \"moduleName\": \"optional name given when running documentor or the path given to document\",",
          "    |      // both files and classes only have information in here if they are documented (have ###",
          "    |      // comments at the same indentation level",
          "    ...",
          "",
          "  the output js file can then be loaded for a documentation page and a notjs script can pick it up and spit out the",
          "  API documentation (see index.html in notjs root)",
          "",
          "  Developer's note:  I really wanted to generate JSON data and pull that in from the script on the page,",
          "  but then the documentation would only be viewable if served up remotely and I'd really like people to be",
          "  able to view the API docs locally via a file:// url",
          "",
          "  see --help output for options",
          "\"\"\""
        ],
        "comment": [
          "",
          "  Generates public/documentorData.js which is used for Notjs API docs.",
          "",
          "  ...and...  shut the front door!... Generates documentation for itself too.   I'm pretty sure this is how Skynet starts."
        ],
        "methods": []
      }
    ],
    "classes": [],
    "methods": []
  }
];
