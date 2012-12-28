// Generated by CoffeeScript 1.4.0
(function() {
  var Notjs, ROOT_NAMESPACE,
    __slice = [].slice;

  ROOT_NAMESPACE = typeof module !== 'undefined' && module.exports ? global : window;

  Notjs = (function() {

    function Notjs() {}

    /*
        This is the top level Notjs class
    
        One instance per application use is instantiated and added to the global namespace
    */


    Notjs.prototype.namespace = function(target, name, block) {
      /*
            this method is used to create a namespace for Notjs.
            See (https://github.com/jashkenas/coffee-script/wiki/FAQ)
            MODIFIED!  - if we are using namespaces let's let everything work the same in node and just add our
                    namespace to global namespace
      */

      var item, top, _i, _len, _ref, _ref1;
      if (arguments.length < 3) {
        _ref = [this].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];
      }
      top = target;
      _ref1 = name.split('.');
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        item = _ref1[_i];
        target = target[item] || (target[item] = {});
      }
      return block(target, top);
    };

    return Notjs;

  })();

  ROOT_NAMESPACE.Notjs = new Notjs();

}).call(this);


// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Notjs.namespace('basics', function(x) {
    return x.Partials = (function() {
      /*
          Partials are in page and external partial templates that are resolved and rendered into
          the page after the document is ready.  The placement of resolved partial in page is
          determined by a div with a data-not_partial attribute equal to DOM id of template or
          an external path.
      
          <b>In page partials</b>
      
            In page partials must have an element in the dom and the element must have an id.
            The inpage partial template element also must have the class "not-partial"
      
            Example:
            <code>
            |  <html>
            |    <body>
            |      <div id="authorTemplate" class="not-partial">
            |        <span class="name">Name</span><span class="genre">Genre</span>
            |      </div>
            |      Current Favorite Author:
            |      <div id="currentFavAuthor" class="favorite" data-not_partial="#authorTemplate"/>
            |      Authors List:
            |      <ul id='authorsList'>
            |        <li>
            |          <div data-not_partial="#authorTemplate"/>
            |        </li>
            |      </ul>
            |    </body>
            |  <html>
            |  <script>
            |    $(document).ready(function(){
            |      partials = new notjs.basics.Partials({removePartials: false, hidePartials: true}).initialize()
            |      partials.resolve()
            |    });
            |  </script>
            </code>
            produces this:
            <code>
            |  <html>
            |    <body>
            |      <div id="authorTemplate" style="display: none;">
            |        <span class="name">Name</span><span class="genre">Genre</span>
            |      </div>
            |      Current Favorite Author:
            |      <div id="currentFavAuthor" class="favorite" data-not_partial="#authorTemplate">
            |        <span class="name">Name</span><span class="genre">Genre</span>
            |      </div>
            |      Authors List:
            |      <ul id='authorsList'>
            |        <li>
            |          <div data-not_partial="#authorTemplate"/>
            |            <span class="name">Name</span><span class="genre">Genre</span>
            |          </div>
            |        </li>
            |      </ul>
            |    </body>
            |  <html>
            </code>
      
          <b>External partials</b>
      
            External partials are fetched from the server on resolve().  They are denoted from
            in page partials by the lack of a '#' prefix on the data-not_partial attribute.
      
            Example:
            <code>
            |  <html>
            |    <body>
            |      Current Favorite Author:
            |      <div id="currentFavAuthor" class="favorite" data-not_partial="/elements/authorTemplate.html"/>
            </code>
      
            The example above will do a get request type text/html to the server to get the
            html fragment that get's duplicated into the div with data-not_partial attribute
      */

      Partials.resolve = function(options) {
        if (options == null) {
          options = {};
        }
        return new this(options).initialize().resolve();
        /*
                Class method for one shot convienence.  See .resolve instance method
        */

      };

      function Partials(options) {
        if (options == null) {
          options = {};
        }
        this.resolve = __bind(this.resolve, this);

        this.initialize = __bind(this.initialize, this);

        this.options = _.defaults(options, {
          removePartials: true,
          hidePartials: false,
          $el: $('body')
        });
        /*
                Constructs a new Partials object
        */

        this.inPagePartials = {};
      }

      Partials.prototype.initialize = function() {
        /*
                Initialize should be called inside of a $(document).ready block
        */

        var $partials;
        $partials = this.options.$el.find('.not-partial');
        this.inPagePartials = _.groupBy($partials, 'id');
        if (this.options.removePartials) {
          $partials.remove();
        }
        if (this.options.hidePartials) {
          $partials.hide();
        }
        return this;
      };

      Partials.prototype.resolve = function() {
        /*
                Replaces contents of divs with data-not_partial attribute with the html of the partial
                referenced in the data-not_partial attribute value.
        
                data-not_partial attribute may refer to an in page partial template denoted by a hash
                mark at the beginning of the attribute value
                <code>
                |  <div data-not_partial="#anotherElementId"/>
                </code>
                would mean that there is another div on the page with the id="anotherElementId" whose
                contents used.
        
                data-not_partial can also reference server sourced data.
                <code>
                |  <div data-not_partial="/someController/someElement.html"/>
                </code>
        
                Note that any content within the data-not_partial element is replaced.
        */

        var $place, $places, hashIndex, partial, partialElement, partialId, placeEl, _i, _len, _ref;
        $places = this.options.$el.find('[data-not_partial]');
        for (_i = 0, _len = $places.length; _i < _len; _i++) {
          placeEl = $places[_i];
          $place = $(placeEl);
          partial = $place.attr('data-not_partial');
          hashIndex = partial.indexOf('#');
          if (hashIndex >= 0) {
            partialId = partial.slice(hashIndex + 1);
            partialElement = (_ref = this.inPagePartials[partialId]) != null ? _ref[0] : void 0;
            if (partialElement) {
              $(placeEl).html($(partialElement).html());
            } else {
              console.error("In page partial not found by id " + partialId + " for element: ");
              console.error(placeEl);
            }
          } else {
            console.error('sorry external partial template resolution not yet supported.  soon');
          }
        }
        return this;
      };

      return Partials;

    })();
  });

}).call(this);


// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Notjs.namespace('basics', function(x) {
    return x.Replicator = (function() {
      /*
          Replicator will clone an element once for each item in a array after calling a callback method and
          insert it immediately after the template element.
      
          Example (HTML):
          <code><pre>
          |  <html>
          |    <body>
          |      Authors List:
          |      <ul id='authorsList'>
          |        <li>
          |          <span class="name">Name</span><span class="genre">Genre</span>
          |        </li>
          |    </body>
          |  </html>
          |  <script>
          |    var authors = [
          |      {name: 'Robert Heinlein', genre: 'Science Fiction'},
          |      {name: 'J. K. Rowling',   genre: 'Fantasy'},
          |      {name: 'Malcom Gladwell', genre: 'Non fiction'}
          |    ];
          |    replicator = new notjs.basics.Replicator('#authorsList')
          |    replicator.replicate(authors, function($newElement, author, index){
          |      $newElement.find('.name').html(author.name);
          |      $newElement.find('.genre').html(author.genre);
          |    });
          |  </script>
          </pre></code>
      
          The example above will generate one li for each of authors array
      */

      Replicator.replicate = function(selector, data, callback, options) {
        return new Replicator(selector, options).initialize().replicate(data, callback);
        /*
              This class method is convenient, but note that it is effectively one shot only
              as the inner html template is removed.  If you are going to be updating the underlying
              data and want those changes, you should either contruct and initialize an instance of
              notjs.basics.replicator or you should save the return value of this method
        
              see replicate instance method for more information
        */

      };

      function Replicator(selector, options) {
        this.selector = selector;
        if (options == null) {
          options = {};
        }
        this.replicate = __bind(this.replicate, this);

        this.getTemplate = __bind(this.getTemplate, this);

        this.initialize = __bind(this.initialize, this);

        this.options = _.defaults(options, {
          data: null
        });
        /*
                I wonder if coffee doc will pickup my option defaults?  :( no, but scripts/documentor will! :)
        */

      }

      Replicator.prototype.initialize = function() {
        /*
                call this method in a document.ready block or code path
        */
        this.$element = $(this.selector);
        this.getTemplate();
        return this;
      };

      Replicator.prototype.getTemplate = function() {
        /*
                this method returns the 'template' (whatever was in the html() of the
                passed in element.  it also clears the element's html in prep for
                replication
        */
        if (this.$template) {
          return this.$template;
        }
        this.$template = this.$element.clone();
        this.$element.html("");
        return this.$template;
      };

      Replicator.prototype.replicate = function(array, callback) {
        /*
                this method is passed an <i>array</i> for which <i>callback</i> (also passed) will be called
                once for each element in <i>array</i>.
        
                Callback method:
                    <code><pre>     callback($newElement, arrayMember, index)</pre></code>
                where <code>
                  <b>$newElement</b> - newly created element for this array member
                  <b>arrayMember</b> - the array member
                  <b>index</b> - zero based index of the array member being called for
                </code>
        
                If the callback method returns true,  the $newElement will be appended to the
                selector element.   If the callback method returns false, the newElement
                will <b>not</b> be appended to the selector element
        
                Note that this method can also be called any number of times during the page
                life to "regenerate" the elements replicated into the selector passed to constructor
        
                Implementation note:   avoid text directly in the replicator element.  For example,
                <code>
                |  <div id="replicationTemplate>
                |   Some text to be cloned
                |   <h1>Whatever</h1>
                |   <h2>Wherever</h2>
                |  </div>
                |  <script>
                |    repl = new notjs.basics.replicator('#replicationTemplate').initialize()
                |    repl.replicate [1,2,3]
                |  </script>
                </code>
                results in:
                <code>
                |  <div id="replicationTemplate>
                |   <h1>Whatever</h1>
                |   <h2>Wherever</h2>
                |   <h1>Whatever</h1>
                |   <h2>Wherever</h2>
                |   <h1>Whatever</h1>
                |   <h2>Wherever</h2>
                |  </div>
                </code>
                ...without "Some text to be cloned".  To avoid that, put text in an inner element,
                like this:
                <code>
                |  <div id="replicationTemplate>
                |   <span>Some text to be cloned</span>
                |   <h1>Whatever</h1>
                |   <h2>Wherever</h2>
                |  </div>
                </code>
        */

        var $newElement, arrayMember, index, _i, _len;
        this.$element.html("");
        for (index = _i = 0, _len = array.length; _i < _len; index = ++_i) {
          arrayMember = array[index];
          $newElement = $(this.$template.html());
          if (callback($newElement, arrayMember, index)) {
            this.$element.append($newElement);
          }
        }
        return this;
      };

      return Replicator;

    }).call(this);
  });

}).call(this);


