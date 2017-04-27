const Raven = require('raven')
const moment = require('moment')
const mandrill = require('mandrill-api/mandrill')
const mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_API_KEY)

module.exports.sendWelcome = function (firstName, lastName, email) {
  const templateName = 'Welcome to Liberac'
  const templateContent = [{}]
  let message = {
    'subject': 'Welcome',
    'from_email': 'welcome@liberac.co.nz',
    'from_name': 'The Liberac team',
    'to': [{
      'email': email,
      'name': `${firstName} ${lastName}`,
      'type': 'to'
    }],
    'headers': {
      'Reply-To': 'noreply@liberac.co.nz'
    },
    'important': false,
    'track_opens': true,
    'track_clicks': true,
    'auto_text': true,
    'auto_html': null,
    'merge': true,
    'merge_language': 'mailchimp',
    'global_merge_vars': [{
      "name": "FIRSTNAME",
      "content": firstName
    }]
  }

  mandrillClient.messages.sendTemplate({
    'template_name': templateName,
    'template_content': templateContent,
    'message': message,
  }, (res) => {
    console.log(res)
  }, (err) => {
    Raven.captureException(err, {
      user: {
        name: `${firstName} ${lastName}`,
        email: email
      }
    })
    console.error('A mandrill error occurred: ' + err.name + ' - ' + err.message)
  })
}

module.exports.notifyTeam = function (name, email) {
  let message = {
    "text": `New User: ${name} <${email}>`,
    "subject": `${name} is now onboard`,
    "from_email": "usersignups@liberac.co.nz",
    "from_name": "User Signups",
    "to": [
      {
        "email": "contact@liberac.co.nz",
        "name": "Liberac",
        "type": "to"
      }
    ]
  }

  mandrillClient.messages.send({ "message": message }, (res) => {}, (err) => {
    Raven.captureException(err, {
      user: {
        name: name,
        email: email
      }
    })
    console.error('A mandrill error occurred: ' + err.name + ' - ' + err.message);
  })
}

module.exports.sendActivation = function (id, firstName, lastName, email) {
  const templateName = 'Activation Email'
  const templateContent = [{}]
  let root = ''

  switch(process.env.NODE_ENV) {
    case 'development':
      root = 'http://localhost:3000'
      break
    case 'staging':
      root = 'https://staging.liberac.co.nz'
      break
    case 'production':
      root = 'https://liberac.co.nz'
      break
    default:
      root = 'https://liberac.co.nz'
      Raven.captureMessage("NODE_ENV hasn't been configured")
  }

  let message = {
    'subject': 'Welcome',
    'from_email': 'welcome@liberac.co.nz',
    'from_name': 'The Liberac team',
    'to': [{
      'email': email,
      'name': `${firstName} ${lastName}`,
      'type': 'to'
    }],
    'headers': {
      'Reply-To': 'noreply@liberac.co.nz'
    },
    'important': false,
    'track_opens': true,
    'track_clicks': true,
    'auto_text': true,
    'auto_html': null,
    'merge': true,
    'merge_language': 'mailchimp',
    'global_merge_vars': [{
      "name": "FIRSTNAME",
      "content": firstName
    }, {
      "name": "ACTIVATION_LINK",
      "content": `${root}/activate/${id}`
    }]
  }

  mandrillClient.messages.sendTemplate({
    'template_name': templateName,
    'template_content': templateContent,
    'message': message,
  }, (res) => {
    console.log(res)
  }, (err) => {
    Raven.captureException(err, {
      user: {
        name: `${firstName} ${lastName}`,
        email: email
      }
    })
    console.error('A mandrill error occurred: ' + err.name + ' - ' + err.message)
  })
}

module.exports.sendSenderReceipt = function (session) {
  const templateName = 'Receipt for Sender'
  const templateContent = [{}]
  let message = {
    'subject': `Receipt for Transaction ${session.transaction.id}`,
    'from_email': 'noreply@liberac.co.nz',
    'from_name': 'The Liberac team',
    'to': [{
      'email': session.user.email,
      'name': `${session.user.firstName} ${session.user.lastName}`,
      'type': 'to'
    }],
    'headers': {
      'Reply-To': 'noreply@liberac.co.nz'
    },
    'important': false,
    'track_opens': true,
    'track_clicks': true,
    'auto_text': true,
    'auto_html': null,
    'merge': true,
    'merge_language': 'mailchimp',
    'global_merge_vars': [{
      "name": "FIRSTNAME",
      "content": session.user.first_name
    }, {
      "name": "TRANSACTION_ID",
      "content": session.transaction.id
    }, {
      "name": "TRANSACTION_TIME",
      "content": moment(session.transaction.time).format("dddd, MMMM Do YYYY, h:mm:ss a")
    }, {
      "name": "TRANSACTION_RECEIVER",
      "content": session.transaction.receiver
    }, {
      "name": "TRANSACTION_DELIVERY_METHOD",
      "content": session.transaction.delivery_method
    }, {
      "name": "TRANSACTION_HANDLING_FEE",
      "content": session.transaction.handling_fee
    }, {
      "name": "TRANSACTION_AMOUNT",
      "content": session.transaction.amount
    }, {
      "name": "TRANSACTION_EXCHANGE_RATE",
      "content": session.transaction.exchange_rate
    }, {
      "name": "TRANSACTION_CONVERSION_AMOUNT",
      "content": session.transaction.conversion_amount
    }, {
      "name": "TRANSACTION_TOTAL",
      "content": session.transaction.total
    }]
  }

  mandrillClient.messages.sendTemplate({
    'template_name': templateName,
    'template_content': templateContent,
    'message': message,
  }, (res) => {
    console.log(res)
  }, (err) => {
    Raven.captureException(err, {
      user: session
    })
    console.error('A mandrill error occurred: ' + err.name + ' - ' + err.message)
  })
}