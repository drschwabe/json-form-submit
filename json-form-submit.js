var $ = require('jquery'), 
    _ = require('underscore'), 
    serialize = require('form-serialize')

module.exports = function(form, callback) {

  //If the first argument is a function...
  if(_.isFunction(form)) {
    callback = form
    form = $('form') //< If none specified, assume just the one form.
  //Otherwise it's a string..
  } else if( form.substr(0, 1) != '#' ) {
    //if there's no hash on the form ID add it now:      
    form = '#' + form
  }

  //Form handler: 
  $(form).submit(function(event) {
    event.preventDefault() //< Prevent page reload as per default HTML submit behavior.
    //Convert the form to a tidy little object: 
    var formObj = serialize($(form)[0], { hash: true })
    callback(formObj)
  })
}
