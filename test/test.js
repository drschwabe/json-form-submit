var test = require('tape'), 
    Nightmare = require('nightmare')
    nightmare = new Nightmare({
      show : true, 
      openDevTools : true
    })

test("An object containing all fields in form is supplied after clicking form's button", (t) => {
  t.plan(1)
  console.log(   'file://' + process.cwd() + '/test/example.html'  )
  nightmare
    .goto('file://' + process.cwd() + '/test/example.html')
    .type('[name="First Name"]', 'Ron')
    .type('[name="Last Name"]', 'Paul')
    .click('button')
    .wait(2500)
    .end() 
    .evaluate(() => document.getElementById('thanks').innerHTML)
    .then((result) => {
      t.equals(result, 'Thanks Ron Paul!')
    })
})
