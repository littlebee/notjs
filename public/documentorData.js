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
        "id": "dd_14",
        "name": "string.coffee",
        "code": [],
        "comment": [
          "  javascript String class extensions and monkeys"
        ],
        "methods": [
          {
            "id": "dd_15",
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
            "id": "dd_16",
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
            "id": "dd_17",
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
            "id": "dd_18",
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
            "id": "dd_19",
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
            "id": "dd_20",
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
            "id": "dd_21",
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
      }
    ],
    "classes": [
      {
        "id": "dd_3",
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
            "id": "dd_4",
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
            "id": "dd_5",
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
            "id": "dd_6",
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
            "id": "dd_7",
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
        "id": "dd_8",
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
            "id": "dd_9",
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
            "id": "dd_10",
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
            "id": "dd_11",
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
            "id": "dd_12",
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
            "id": "dd_13",
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
        "id": "dd_22",
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
            "id": "dd_23",
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
            "id": "dd_24",
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
