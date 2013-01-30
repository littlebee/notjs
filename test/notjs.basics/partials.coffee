
HTML = """
  <div id="authorTemplate" class="not-partial">
    <span class="name">Name</span><span class="genre">Genre</span>
  </div>
  <div id="bookTemplate" class="not-partial">
    <span class="name">Name</span><span class="author">Author Full Name</span>
  </div>
  Current Favorite Author:
  <div id="currentFavAuthor" class="favorite" data-not_partial="#authorTemplate">test1</div>
  Authors List:
  <ul id='authorsList'>
    <li>
      <div data-not_partial="#authorTemplate">test2</div>
      <div data-not_partial="#bookTemplate">test3</div>
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
    console.log $('body').html()

  describe 'when resolving in-page partials without options', ->
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
      $('ul li span.name').should.be.of.length(4)

    it 'should remove partials by default', ->
      $('body').html()
      $('#authorTemplate').should.be.of.length(0)

  describe 'when resolving in-page partials with options', ->
    beforeEach ->
      $('body').html(HTML)

    it 'should remove partial templates when requested', ->
      partials = new Notjs.basics.Partials({removePartials: true}).initialize()
      partials.resolve()
      $('#authorTemplate').should.be.of.length(0)

    it 'should not remove or hide partial templates when requested not to', ->
      partials = new Notjs.basics.Partials({removePartials: false}).initialize()
      partials.resolve()
      $('#authorTemplate').should.be.of.length(1)
      $('#authorTemplate').should.be.visible


    it 'should not hide partial templates when requested not to', ->
      partials = new Notjs.basics.Partials({removePartials: false, hidePartials: false}).initialize()
      partials.resolve()
      $('#authorTemplate').should.be.of.length(1)
      $('#authorTemplate').should.be.visible

    it 'should hide partial templates when requested to', ->
      partials = new Notjs.basics.Partials({removePartials: false, hidePartials: true}).initialize()
      partials.resolve()
      $('#authorTemplate').should.be.of.length(1)
      $('#authorTemplate').should.not.be.visible



_shouldHaveResolved = () ->
  $('div#currentFavAuthor span.name').should.be.of.length(1)
  $('ul li span.name').should.be.of.length(2)  # one for author template and one from book template





