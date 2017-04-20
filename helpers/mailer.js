require('dotenv').config({ path: '../.env' })
const mandrill = require('mandrill-api/mandrill')
const mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_API_KEY)

const sendWelcome = (name, email) => {
  const template_name = "Welcome to Liberac"
  const template_content = [{}]
  var message = {
    "html": null,
    "text": null,
    "subject": "Welcome",
    "from_email": "welcome@liberac.co.nz",
    "from_name": "The Team at Liberac",
    "to": [{
      "email": email,
      "name": name,
      "type": "to"
    }],
    "headers": {
      "Reply-To": "message.reply@example.com"
    },
    "important": false,
    "track_opens": true,
    "track_clicks": true,
    "auto_text": true,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "bcc_address": null,
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    "merge": false,
    "merge_language": "mailchimp",
    "global_merge_vars": [],
    "merge_vars": [],
    "tags": [
        "sitesignup"
    ],
    "subaccount": null,
    "google_analytics_domains": [],
    "google_analytics_campaign": null,
    "metadata": {},
    "recipient_metadata": [],
    "attachments": [],
    "images": []
  }

  var async = false
  var ip_pool = "Main Pool"
  var send_at = null

  mandrill_client.messages.sendTemplate({
    "template_name": template_name,
    "template_content": template_content,
    "message": message,
    "async": async,
    "ip_pool": ip_pool,
    "send_at": send_at
  }, (res) => {
    console.log(res)
  }, function(e) {
    console.error('A mandrill error occurred: ' + e.name + ' - ' + e.message);
  })
}

module.exports = { sendWelcome }