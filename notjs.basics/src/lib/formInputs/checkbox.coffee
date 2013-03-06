Notjs.namespace 'basics.formInputs', (x) ->

  class x.Checkbox extends Notjs.basics.FormInput
    ###
      This FormInput type displays the boolean or truthy value of the data attribute and
      presents an <input type='checkbox'...  type input on edit
    ###
    @formatForDisplay: (row, cell, value, columnDef, dataContext) =>
      checked = if value then "check='checked'" else ""
      return "<input type='checkbox' disabled='disabled' #{checked}/>"

    constructor: (args) ->
      super

    initialize: () =>
      @$input = $("<INPUT type=checkbox/>")
      .appendTo(@$element)
      .focus()
      .select()

    loadValue: (dataObject) =>
      if @getDataObjectValue(dataObject)
        @$input.attr 'checked', 'checked'
      else
        @$input.removeAttr 'checked'

    serializeValue: () =>
      @$input.attr('checked') == 'checked'
