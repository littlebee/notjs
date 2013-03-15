
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
    # console.log "\n#{$('body').html()}"
    _shouldHaveReplicatedFor(TEST_DATA[0])

  it 'should replicate via class method with callback', ->
    callCount = 0
    Notjs.basics.Replicator.replicate '#list', TEST_DATA[0], ($newElement, arrayMember, index) ->
      callCount++
      arrayMember.should.equal TEST_DATA[0][index]
      true
    callCount.should.equal TEST_DATA[0].length
    _shouldHaveReplicatedFor(TEST_DATA[0])

  # this test verifys that the replicator will REreplicate on succesive calls so that if, for example,
  # the rows in your collection change completely, the previous replicated section of the dom is replaced
  # with the newly replicated data
  it 'should replicate multiple times per instance', ->
    replicator = new Notjs.basics.Replicator('#list')
    for testData in TEST_DATA
      replicator.replicate testData
      _shouldHaveReplicatedFor(testData)


_shouldHaveReplicatedFor = (testData) ->
  $('#list li').should.be.of.length(testData.length)
  $('#list li span').should.be.of.length(testData.length)





