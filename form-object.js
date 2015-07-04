var $ = require('jquery'), 
    _ = require('underscore')

module.exports = function(form, callback) {

  //If the first argument is a function...
  if(_.isFunction(form)) {
    callback = form
    form = $('form') //< capture all forms.
  }

  //Form handler: 
  $(form).submit(function(event) {
    event.preventDefault() //< Prevent page reload as per default HTML submit behavior.
    //Convert the form to a tidy little object: 
    var formObj = {}  
    $(form).serializeArray().forEach(function(element) {
      formObj[element.name] = element.value
    })
    callback(formObj)
  })
}
