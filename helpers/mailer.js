const Raven = require('raven')
const mandrill = require('mandrill-api/mandrill')
const mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_API_KEY)

const sendWelcome = (name, email) => {
  const templateName = 'Welcome to Liberac'
  const templateContent = [{}]
  var message = {
    'html': null,
    'text': null,
    'subject': 'Welcome',
    'from_email': 'welcome@liberac.co.nz',
    'from_name': 'The Team at Liberac',
    'to': [{
      'email': email,
      'name': name,
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
    'inline_css': null,
    'url_strip_qs': null,
    'preserve_recipients': null,
    'view_content_link': null,
    'bcc_address': null,
    'tracking_domain': null,
    'signing_domain': null,
    'return_path_domain': null,
    'merge': false,
    'merge_language': 'mailchimp',
    'global_merge_vars': [],
    'merge_vars': [],
    'tags': [
      'sitesignup'
    ],
    'subaccount': null,
    'google_analytics_domains': [],
    'google_analytics_campaign': null,
    'metadata': {},
    'recipient_metadata': [],
    'attachments': [],
    'images': []
  }

  var async = false
  var ipPool = 'Main Pool'
  var sendAt = null

  mandrillClient.messages.sendTemplate({
    'template_name': templateName,
    'template_content': templateContent,
    'message': message,
    'async': async,
    'ip_pool': ipPool,
    'send_at': sendAt
  }, (res) => {
    console.log(res)
  }, (err) => {
    Raven.captureException(err, {
      user: {
        name: name,
        email: email
      }
    })
    console.error('A mandrill error occurred: ' + err.name + ' - ' + err.message)
  })
}

module.exports = { sendWelcome }
