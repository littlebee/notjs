
example = 'forms/formmode_demo.html'

describe "examples/#{example}", () ->
  beforeEach (done) ->
    loadExample example, () => done()


  it 'should load in full input mode', () ->
    window.$('input').length.should.equal 2





