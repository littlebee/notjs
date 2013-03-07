Notjs.namespace 'basics.formInputs', (x) ->

  class x.Checkbox extends Notjs.basics.FormInput
    ###
      This FormInput type displays the boolean or truthy value of the data attribute and
      presents an <input type='checkbox'...  type input on edit
    ###
    @formatForDisplay: (row, cell, value, columnDef, dataContext) =>
        @_renderInput value, true

    constructor: (args) ->
      super

    initialize: () =>
      @$input = $(x.Checkbox._renderInput(false, false))
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



    @_renderInput: (checked=false, disabled=false) =>
      checked = if checked then "checked='checked'" else ""
      disabled = if disabled then "disabled='disabled'" else ""

      return "<input type='checkbox' #{disabled} #{checked}/>"
