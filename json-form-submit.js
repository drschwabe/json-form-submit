var $ = require('jquery'),
    _ = require('underscore'),
    serialize = require('form-serialize')

module.exports = function(form, postURL, prePost, callback) {
  //^ Arguments: element, string, function, function

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

    //Run prePost function if it was supplied:
    if(_.isFunction(prePost) && _.isFunction(callback))
      //^ We assume it was supplied if the the third and fourth arguments are functions.
      prePost(formObj)
      //Otherwise if the postURL is a function, it is our callback (no prePost function was provided)
    else if(_.isFunction(postURL))
      callback = postURL
    else
      //Otherwise the callback would be the third argument:
      callback = prePost

    if(_.isString(postURL)) {
      $.post(postURL, formObj, function(res) {
        callback(res, formObj)
      }, 'json')
    } else if(_.isFunction(postURL)) {
      //If postURL is a function, we assume it's the callback:
      postURL = callback
      callback(formObj)
    }
    //(if postURL is null, nothing will be posted to server)    
    else {
      callback(formObj)
    }
  })
}
