base = (typeof module !== 'undefined' && module.exports) ? root : window
base.documentorData = [
  {
    "id": "dd_0",
    "name": "notjs.basics",
    "files": [],
    "classes": [
      {
        "id": "dd_1",
        "shortName": "x.Partials",
        "name": "notjs.basics.Partials",
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
          "      External partials are fetched from the server on resolve().  They are denoted from",
          "      in page partials by the lack of a '#' prefix on the data-not_partial attribute.",
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
          "      html fragment that get's duplicated into the div with data-not_partial attribute",
          ""
        ],
        "methods": [
          {
            "id": "dd_2",
            "shortName": "@resolve",
            "name": "notjs.basics.Partials.@resolve",
            "code": [
              "    @resolve: (options = {}) ->",
              "      new this(options).initialize().resolve()"
            ],
            "comment": [
              "        Class method for one shot convienence.  See .resolve instance method"
            ]
          },
          {
            "id": "dd_3",
            "shortName": "constructor",
            "name": "notjs.basics.Partials.constructor",
            "code": [
              "    constructor: (options = {}) ->",
              "      @options = _.defaults options,",
              "        removePartials:  true    # remove partial templates?  $('.not-partial').remove()",
              "        hidePartials:    false   # hide partial templates? $('.not-partial').hide()",
              "        $el:             $(document) # scope this Partials object to part of the DOM"
            ],
            "comment": [
              "        Constructs a new Partials object"
            ]
          },
          {
            "id": "dd_4",
            "shortName": "initialize",
            "name": "notjs.basics.Partials.initialize",
            "code": [
              "    initialize: () =>"
            ],
            "comment": [
              "        Initialize should be called inside of a $(document).ready block"
            ]
          },
          {
            "id": "dd_5",
            "shortName": "resolve",
            "name": "notjs.basics.Partials.resolve",
            "code": [
              "    resolve: () =>"
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
              "        Note that any content within the data-not_partial element is replaced."
            ]
          }
        ]
      },
      {
        "id": "dd_6",
        "shortName": "x.Replicator",
        "name": "notjs.basics.Replicator",
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
            "id": "dd_7",
            "shortName": "@replicate",
            "name": "notjs.basics.Replicator.@replicate",
            "code": [
              "    @replicate: (selector, data, callback, options) =>",
              "      new this(selector, options).initialize().replicate(data, callback)"
            ],
            "comment": [
              "      This class method is convenient, but note that it is effectively one shot only",
              "      as the inner html template is removed.  If you are going to be updating the underlying",
              "      data and want those changes, you should either contruct and initialize an instance of",
              "      notjs.basics.replicator or you should save the return value of this method",
              "",
              "      see replicate instance method for more information",
              ""
            ]
          },
          {
            "id": "dd_8",
            "shortName": "constructor",
            "name": "notjs.basics.Replicator.constructor",
            "code": [
              "    constructor: (@selector, options={}) ->",
              "      @options = _.defaults options,",
              "        data: null   # you can optionally pass in the initial data to render"
            ],
            "comment": [
              "        I wonder if coffee doc will pickup my option defaults?  :( no, but scripts/documentor will! :)"
            ]
          },
          {
            "id": "dd_9",
            "shortName": "initialize",
            "name": "notjs.basics.Replicator.initialize",
            "code": [
              "    initialize: () =>"
            ],
            "comment": [
              "        call this method in a document.ready block or code path"
            ]
          },
          {
            "id": "dd_10",
            "shortName": "getTemplate",
            "name": "notjs.basics.Replicator.getTemplate",
            "code": [
              "    getTemplate: () =>"
            ],
            "comment": [
              "        this method returns the 'template' (whatever was in the html() of the",
              "        passed in element.  it also clears the element's html in prep for",
              "        replication"
            ]
          },
          {
            "id": "dd_11",
            "shortName": "replicate",
            "name": "notjs.basics.Replicator.replicate",
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
            ]
          }
        ]
      },
      {
        "id": "dd_12",
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
            "id": "dd_13",
            "shortName": "namespace",
            "name": "Notjs.namespace",
            "code": [
              "  namespace: (target, name, block) ->"
            ],
            "comment": [
              "      this method is used to create a namespace for Notjs.",
              "      See (https://github.com/jashkenas/coffee-script/wiki/FAQ)"
            ]
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
          "    |      \"files\": [",
          "    |        {",
          "    |          \"name\": \"somefile.coffee\",",
          "    |          \"code\": \"          # if I want to show something like the delaration of constant, e.g.\\n          HELP = \\\"this is a really neat script that does bla\\\"\\n          # I can just put it above the block comment and it will get sucked up into that things declaration\\n# (these single # comments also get sucked up).\\n\",",
          "    |          \"comment\": \"  This block comment gets associated with the file\"",
          "    |        }",
          "    |      ],",
          "    |      \"classes\": [",
          "    |        {",
          "    |          \"fileName\": \"srcDir/somefile.coffee\",",
          "    |          \"name\": \"myAwesomeClass\",",
          "    |          \"code\": \"     class myAwesomeClass extends myAwesomeBaseClass\",",
          "    |          \"comment\": \"  This block comment gets associated with the class\",",
          "    |          \"methods\": [",
          "    |            {",
          "    |              \"name\": \"constructor\",",
          "    |              \"code\": \"      constructor: (options={}) =>\\n        @options = _.defaults options,\\n          beAwesome: true                   # will this instance be awesome?\\n          extendAwesomeness: true           # push awesomeness outward\\n          forcedAwesome: false              # can we fake it if all else fails?\\n          awesomeIcon: \\\"/img/awesome.icon\\\"\",",
          "    |              \"comment\": \"  this block comment gets associated with the constructor method.  putting it after\\n  the defaulting of options makes the options self documenting no?\\n\"",
          "    |            }",
          "    |          ]",
          "    |       }",
          "    |     ]",
          "    |   }",
          "    | ]",
          "",
          "  the output js file can then be loaded for a documentation page and a notjs script can pick it up and spit out the",
          "  API documentation (see index.html in notjs root)",
          "",
          "  Developer's note:  I really wanted to generate JSON data and pull that in from the script on the page,",
          "  but then the documentation would only be viewable if served up remotely and I'd really like people to be",
          "  able to view the API docs locally via a file:// url",
          "",
          "  see --help output for options"
        ],
        "comment": [],
        "methods": []
      }
    ],
    "classes": [],
    "methods": []
  },
  {
    "id": "dd_0",
    "name": "empty",
    "files": [],
    "classes": [],
    "methods": []
  }
];
