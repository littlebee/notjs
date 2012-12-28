Notjs.namespace 'basics', (x) ->

  class x.Replicator
    ###
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
    ###
    @replicate: (selector, data, callback, options) =>
      new this(selector, options).initialize().replicate(data, callback)
      ###
      This class method is convenient, but note that it is effectively one shot only
      as the inner html template is removed.  If you are going to be updating the underlying
      data and want those changes, you should either contruct and initialize an instance of
      notjs.basics.replicator or you should save the return value of this method

      see replicate instance method for more information

      ###

    constructor: (@selector, options={}) ->
      @options = _.defaults options,
        data: null   # you can optionally pass in the initial data to render
      ###
        I wonder if coffee doc will pickup my option defaults?  :( no, but scripts/documentor will! :)
      ###

    initialize: () =>
      ###
        call this method in a document.ready block or code path
      ###
      @$element = $(@selector)
      @getTemplate()
      @

    getTemplate: () =>
      ###
        this method returns the 'template' (whatever was in the html() of the
        passed in element.  it also clears the element's html in prep for
        replication
      ###
      return @$template if @$template
      @$template = @$element.clone()
      @$element.html("")
      return @$template

    replicate: (array, callback) =>
      ###
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
      ###
      @$element.html("")
      for arrayMember, index in array
        $newElement = $(@$template.html())
        if callback($newElement, arrayMember, index)
          @$element.append($newElement)
      @