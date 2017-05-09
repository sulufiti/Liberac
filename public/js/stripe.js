var handler = StripeCheckout.configure({
  key: 'pk_test_TltGDaGUDuxznboucS0lI2z6',
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  name: 'Liberac Ltd',
  currency: 'nzd',
  panelLabel: 'Send',
  email: 'marcus@thingsima.de',
  allowRememberMe: true,
  description: 'Send funds to USER',
  locale: 'auto',
  zipCode: true,
  token: function(token) {
    let amount = $('input#amount_to_send').val()
    amount = amount.replace(/\$/g, '').replace(/\,/g, '')
    amount = Math.round(amount * 100) // Needs to be an integer!

    fetch("/charge", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stripe: token, receiver: $('#receiver_name').val(), account: $('#bank_account').val(), amount: amount })
    })
    .then(response => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
    .then(output => {
      $('#collapseTwo').collapse('hide')
      $('#collapseThree').collapse('show')
      $('#receipt').html(
        '<p>' + output.outcome.seller_message +'</p>' +
        '<p>Successfully paid $' + (parseFloat(output.amount) / 100).toFixed(2) + ' ' + output.currency.toUpperCase() + '</p>' +
        '<p>Transaction ID: ' + output.id + '</p>'
      )
      console.log('nice', output)
    })
    .catch(err => {
      $('#error_explanation').html('<p>Purchase failed</p>')
      console.error('error', err)
    })
  }
})

$('#paymentButton').on('click', function(e) {
  e.preventDefault()

  $('#error_explanation').html('')

  var amount = $('input#amount_to_send').val()
  amount = amount.replace(/\$/g, '').replace(/\,/g, '')
  amount = parseFloat(amount)

  if (isNaN(amount)) {
    $('#error_explanation').html('<p>Please go back and enter an amount to send.</p>');
  }
  else {
    amount = amount * 100; // Needs to be an integer!
    handler.open({
      amount: Math.round(amount)
    })
  }
})

window.addEventListener('popstate', function() {
  handler.close()
})