var $ = require('jquery'),
    _ = require('underscore'),
    serialize = require('form-serialize')

module.exports = function(param1, callback) {

  var jform = {}

  if(_.isString(param1)) jform.form_id = param1 //< String supplied.
  else jform = param1 //< Object supplied

  //Form handler:
  $('body').on('submit', '#' + jform.form_id, function(event) {
    event.preventDefault() //< Prevent page reload as per default HTML submit behavior.
    //Convert the form to a tidy little object:
    var formObj = serialize($('#' + jform.form_id)[0], { hash: true })

    if(jform.pre_post) {
      //Call the pre_post function and update the formObj's value to the return
      //value of said function.
      var prePostFormObj = jform.pre_post(formObj)
      //Only update the formObj if a return value was provided: 
      if(prePostFormObj) formObj = prePostFormObj
    }

    if(jform.post_url) {
      $.post(jform.post_url, formObj, function(res) {
        return callback(formObj, res)
      }, 'json')
    }

    //Else: 
    return callback(formObj)
  })
}
