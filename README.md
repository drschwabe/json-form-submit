##  JSON Form Submit

Client-side form handler that simplifies submissions while giving you control.  Converts forms into a tidy little object and will optionally post said object to your server.

It leverages the browser's default behavior of handling form submissions (free UI for basic field validation like email or required fields) while preventing the actual submission itself until you after you have run the first callback. 

So in this way you have less work to do with your own custom validation or for example you could simply not do any extra validation but maybe do some UI changes in that first callback - and tweak the UI again when the response arrives. 

Install: 
```
npm install json-form-submit
```


Usage:

```
<!-- HTML: -->
<form id="myForm">
    <input name="first_name" required />
    <input name="last_name" />
    <button>Register</button>                
</form>
```

```
\\JS (via browserify)
var jsonForm = require('json-form-submit')

jsonForm('register', 'http://localhost:4550/register', function(form) {
    console.log(form) //< { first_name: 'Mario', last_name: 'Lemieux' }    
    //Do stuff before form submitted to server (custom validation, change DOM to relfect "submitting" state, etc):    
    $('button').html('registering...')
    $('#spinner').show()
}, function(res) {
    //Do stuff after form submitted to server (reset DOM state, handle response, etc):
    $('button').html('Register')
    $('#spinner').hide()
    if(res.ok) alert('Your account was created!')
    else alert('It broke.')
})
```

