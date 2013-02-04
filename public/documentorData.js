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
            "comment": [],
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
            "comment": [],
            "shortName": "String.startsWith",
            "name": "String.startsWith(anotherString)"
          },
          {
            "id": "dd_16",
            "code": [
              "Notjs.addPrototypeUnlessExists String, \"endsWith\", (anotherString) ->"
            ],
            "comment": [],
            "shortName": "String.endsWith",
            "name": "String.endsWith(anotherString)"
          },
          {
            "id": "dd_17",
            "code": [
              "Notjs.addPrototypeUnlessExists String, \"isBlank\", () ->"
            ],
            "comment": [],
            "shortName": "String.isBlank",
            "name": "String.isBlank()"
          },
          {
            "id": "dd_18",
            "code": [
              "Notjs.addPrototypeUnlessExists String, \"trim\", () ->"
            ],
            "comment": [],
            "shortName": "String.trim",
            "name": "String.trim()"
          },
          {
            "id": "dd_19",
            "code": [
              "Notjs.addPrototypeUnlessExists String, \"elipsize\",  (maxLength) ->"
            ],
            "comment": [],
            "shortName": "String.elipsize",
            "name": "String.elipsize(maxLength)"
          },
          {
            "id": "dd_20",
            "code": [
              "Notjs.addPrototypeUnlessExists String, \"decamelize\", () ->"
            ],
            "comment": [],
            "shortName": "String.decamelize",
            "name": "String.decamelize()"
          },
          {
            "id": "dd_21",
            "code": [
              "Notjs.addPrototypeUnlessExists String, \"dropCamelize\", () ->"
            ],
            "comment": [],
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
          "      The example above will do a get request type text/html to the server to get the"
        ],
        "methods": [
          {
            "id": "dd_4",
            "code": [
              "    @resolve: (options = {}) ->",
              "      new this(options).initialize().resolve()"
            ],
            "comment": [],
            "shortName": "@resolve",
            "name": "basics.Partials.@resolve"
          },
          {
            "id": "dd_5",
            "code": [
              "    constructor: (options = {}) ->",
              "      @options = _.defaults options,",
              "        removePartials:  true    # remove partial templates?  $('.not-partial').remove()",
              "        hidePartials:    false   # hide partial templates? $('.not-partial').hide()",
              "        $el:             $('body') # scope this Partials object to part of the DOM"
            ],
            "comment": [],
            "shortName": "constructor",
            "name": "basics.Partials.constructor"
          },
          {
            "id": "dd_6",
            "code": [
              "    initialize: () =>"
            ],
            "comment": [],
            "shortName": "initialize",
            "name": "basics.Partials.initialize"
          },
          {
            "id": "dd_7",
            "code": [
              "    resolve: () =>"
            ],
            "comment": [],
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
          "    </pre></code>"
        ],
        "methods": [
          {
            "id": "dd_9",
            "code": [
              "    @replicate: (selector, data, callback) =>",
              "      new this(selector).initialize().replicate(data, callback)"
            ],
            "comment": [],
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
            "comment": [],
            "shortName": "constructor",
            "name": "basics.Replicator.constructor"
          },
          {
            "id": "dd_11",
            "code": [
              "    initialize: () =>"
            ],
            "comment": [],
            "shortName": "initialize",
            "name": "basics.Replicator.initialize"
          },
          {
            "id": "dd_12",
            "code": [
              "    getTemplate: () =>"
            ],
            "comment": [],
            "shortName": "getTemplate",
            "name": "basics.Replicator.getTemplate"
          },
          {
            "id": "dd_13",
            "code": [
              "    replicate: (array, callback) =>"
            ],
            "comment": [],
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
        "comment": [],
        "methods": [
          {
            "id": "dd_23",
            "code": [
              "  namespace: (target, name, block) ->"
            ],
            "comment": [],
            "shortName": "namespace",
            "name": "Notjs.namespace"
          },
          {
            "id": "dd_24",
            "code": [
              "  addPrototypeUnlessExists: (klass, protoName, method) ->"
            ],
            "comment": [],
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
