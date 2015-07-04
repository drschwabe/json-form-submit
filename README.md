Client-side form handler that converts them into a tidy little object you can more easily work with.

Install: 
```
npm install formObj
```


Usage:

```
HTML: 
<form id="myForm">
    <input name="first_name" required />
    <input name="last_name" />
    <button>Submit</button>                
</form>

JS: 
formObj( '#myForm', function(form) {
    console.log(form) //< { first_name: 'Mario', last_name: 'Lemieux' }
    //Do stuff with form (custom validation, post to server, etc)
})
```

Optional: If no selector is provided, your callback function will apply to all forms.

formObj overrides the default behavior of form submit, preventing page reload - while still triggering the browser's built-in validation (ie- prompting the user to "Please fill in this field" for required fields).  In this way, standard form validation is already taken care of by the time your callback is invoked.
