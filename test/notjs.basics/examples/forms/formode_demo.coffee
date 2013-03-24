
example = 'forms/formmode_demo.html'

describe "examples/#{example}", () ->
  before (done) ->
    loadExample example, () => done()

  it 'should load in full input mode', () ->
    window.$('input').length.should.equal 2

  describe "in full input mode", () ->
    it 'should have visible save', () ->
      window.$('button.success').is(':visible').should.be.true
    it 'should have visible cancel', () ->
      window.$('button.cancel').is(':visible').should.be.true
    it 'should not have put inputs on readonly class elements', ()->
      window.$('.readonly input').length.should.equal 0
    it 'should have input with author name', () ->
      window.$("[data-not_attr='name'] input:text").val().should.equal window.dataObject.name
    it 'should have displayed genre (read only)', () ->
      window.$("[data-not_attr='genre']").html().should.equal window.dataObject.genre
    it 'should have a checkbox for hugo award', () ->
      window.$("[data-not_attr='wonHugo'] input:checkbox").is(':checked').should.equal window.dataObject.wonHugo

