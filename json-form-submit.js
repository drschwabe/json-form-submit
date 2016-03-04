var $ = require('jquery'),
    _ = require('underscore'),
    serialize = require('form-serialize')

module.exports = function(form_id, callback) {
  //Form handler:
  $('#' + form_id).submit(function(event) {
    event.preventDefault() //< Prevent page reload as per default HTML submit behavior.
    //Convert the form to a tidy little object:
    var formObj = serialize($('#' + form_id)[0], { hash: true })
    return callback(formObj)
  })
}
