$('#betasignups').submit(function(e) {
  e.preventDefault()

  $.ajax({ type: 'POST', url: '/', data: { 'firstName': $('#firstName').val(), 'lastName': $('#lastName').val(), 'email': $('#emailAddress').val() }})

  $('#signup-welcome').hide()
  $('#signup-success').fadeIn(300)

  $('#name-input').hide()
  $('#email-input').hide()

  $('#success-message').fadeIn(300)
  $('#submit-interest').hide()

  console.log('completed transition')
})