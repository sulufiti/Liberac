$('#betasignups').submit(function(e) {
  e.preventDefault()
  $('#signup-welcome').hide()
  $('#signup-success').show()

  $('#name-input').hide()
  $('#email-input').hide()

  $('#success-message').show()
  $('#submit-interest').hide()

  console.log('completed transition')
})