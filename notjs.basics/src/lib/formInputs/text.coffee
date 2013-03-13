Notjs.namespace 'basics.formInputs', (x) ->

  class x.Text extends Notjs.basics.FormInput
    ###
      This FormInput type displays the string value of the data attribute and
      presents an <input type='text'...  type input on edit
    ###
    @formatForDisplay: (row, cell, value, columnDef, dataContext) =>
      value?.toString()

    constructor: (args) ->
      super

    initialize: () =>
      @$input = $("<INPUT type=text/>")
      .appendTo(@$element)
      .bind "keydown.nav", (e) =>
        if (e.keyCode == Notjs.keyCode.LEFT || e.keyCode == Notjs.keyCode.RIGHT)
          e.stopImmediatePropagation()
      .focus()
      .select()

    destroy: () =>
      @$input.remove()

    loadValue: (dataObject) =>
      @$input.val(@getDataObjectValue(dataObject))

    serializeValue: () =>
      @$input.val()