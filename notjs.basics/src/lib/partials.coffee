Notjs.namespace 'basics', (x) ->

  class x.Partials
    ###
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

    ###

    @resolve: (options = {}) ->
      new this(options).initialize().resolve()
      ###
        Class method for one shot convienence.  See .resolve instance method
      ###


    constructor: (options = {}) ->
      @options = _.defaults options,
        removePartials:  true    # remove partial templates?  $('.not-partial').remove()
        hidePartials:    false   # hide partial templates? $('.not-partial').hide()
        $el:             $('body') # scope this Partials object to part of the DOM
      ###
        Constructs a new Partials object
      ###
      @inPagePartials = {}

    initialize: () =>
      ###
        Initialize should be called inside of a $(document).ready block
      ###
      $partials = @options.$el.find('.not-partial')
      @inPagePartials = _.groupBy($partials, 'id')
      $partials.remove() if @options.removePartials
      $partials.hide() if @options.hidePartials
      return @

    resolve: () =>
      ###
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
      ###
      $places = @options.$el.find('[data-not_partial]')

      for placeEl in $places
        $place = $(placeEl)
        partial = $place.attr('data-not_partial')
        hashIndex = partial.startsWith '#'
        if hashIndex >= 0    # in page partial found
          partialId = partial.slice(hashIndex+1)
          partialElement = @inPagePartials[partialId]?[0]
          if partialElement
            $(placeEl).html($(partialElement).html())
          else
            console.error "In page partial not found by id #{partialId} for element: "
            console.error placeEl
        else # external partial
          return if partial.trim() == ""



      return @

