
HTML = """
  <html>
    <body>
      <ul id='list'>
        <li>
          <span class="data"></span>
        </li>
    </body>
  </html>
"""

# this only looks odd :)  we are only interested in testing the replicator which is agnostic to the data passed as
# it just passes it one item at a time into your callback
TEST_DATA = [[
    # semi normal test data - 3 or more elements
    1,2,3
  ],[
    # fence post - 1 element
    1
  ],[
    # edge case: no data or empty array passed
  ]
]

require '../../public/notjs.basics.js'

describe 'notjs.basics.replicator', ->
  beforeEach ->
    $('body').html(HTML)

  it 'should replicate via class method without callback', ->
    Notjs.basics.Replicator.replicate('#list', TEST_DATA[0])
    console.log "\n#{$('body').html()}"
    _shouldHaveReplicatedFor(TEST_DATA[0])

_shouldHaveReplicatedFor = (testData) ->
  $('#list li').should.be.of.length(testData.length)
  $('#list li span').should.be.of.length(testData.length)





