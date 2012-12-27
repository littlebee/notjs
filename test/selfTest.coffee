
describe 'testing the test system', ->
  it 'should be sane', ->
    assert(true)
    assert.equal(true, true)
    assert.notEqual(true, false)


  it 'should support jquery testing', ->
    $('body').should.exist
    $('body').html("what")
    $('body').html().should.equal('what')

