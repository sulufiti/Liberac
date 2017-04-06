require('dotenv').config()
const sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY)
const helper = require('sendgrid').mail

from_email = new helper.Email('noreply@liberac.co.nz')
to_email = new helper.Email('contact@liberac.co.nz')
subject = "Sendgrid Test Email"
content = new helper.Content('text/plain', 'Sendgrid is working')

mail = new helper.Mail(from_email, subject, to_email, content)

let request = sendgrid.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON()
})

sendgrid.API(request, (err, res) => {
  console.log(res.statusCode)
  console.log(res.body)
  console.log(res.headers)
})