
HTML = """
  <div id="authorTemplate" class="not-partial">
    <span class="name">Name</span><span class="genre">Genre</span>
  </div>
  Current Favorite Author:
  <div id="currentFavAuthor" class="favorite" data-not_partial="#authorTemplate">test1</div>
  Authors List:
  <ul id='authorsList'>
    <li>
      <div data-not_partial="#authorTemplate">test2</div>
    </li>
  </ul>
"""

require '../../public/notjs.basics.js'

describe 'notjs.partials', ->
  beforeEach ->
    $('body').html(HTML)

  it 'should resolve partials via class method', ->
    Notjs.basics.Partials.resolve()
    _shouldHaveResolved()

  describe 'when resolving in-page partials ', ->
    partials = null

    beforeEach ->
      $('body').html(HTML)
      partials = new Notjs.basics.Partials().initialize()
      partials.resolve()

    it 'should resolve first time', ->
      _shouldHaveResolved()

    # the act of calling resolve() multiple times without any new dom being added should be benign
    it 'should be able to resolve muliple times', ->
      partials.resolve()
      _shouldHaveResolved()

    it 'should be able to resolve partials in newly added DOM', ->
      _shouldHaveResolved()
      $('body').append(HTML)
      partials.resolve()
      $('div#currentFavAuthor span.name').should.be.of.length(2)
      $('ul li span.name').should.be.of.length(2)


_shouldHaveResolved = () ->
  $('div#currentFavAuthor span.name').should.be.of.length(1)
  $('ul li span.name').should.be.of.length(1)





