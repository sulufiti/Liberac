# To Do

## Table of Contents

- [Overview](#overview)
- [Application](#application)
 - [Front Page](#front-page)
 - [Login](#login)
 - [Registration](#registration)
 - [Dashboard](#dashboard)
 - [Routes](#routes)
 - [Templates](#templates)
- [Server](#server)
# Overview

A list of things that should be done or at least considered if you want to deploy this application in production.

It's as comprehensive as I can make it (eg; everything I can think of/remember) but there may also be a number of other things to check out too

Let me also get "Write more tests" out of the way. Most of the stuff I used eg; knex, stripe are already tested by their developers so integration tests were the only thing that I got around to.

I haven't looked in a while but those are probably broken by now with the route revamp. Oh, and you should look into [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) instead of using Nightmarejs.

# Application

## Front Page
* Reject emails if they're already in the database and tell the user they've already signed up

## Login

* Protect against [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) attacks
* Move user sessions server side into something like [Redis](https://redis.io/)
 - There's nothing stopping you just exporting your cookies, logging out then importing them again to find yourself logged back in.
 - I guess that's expected but we can't time out sessions etc as is
* Provide the ability to reset your password
 - Pretty straightforward, just a form that salts their new password and overwrites the current hashes in the database
* Consider increasing salt rounds for hashing
 - You can never be secure enough (until it costs you in CPU utilization)
* Log the user in straight away after registration
 - This was something that came up in a meeting but personally, I can't think off the top of my head how to just generate a session like that for a user.
 - One of the downsides of abstracting away authentication from the developer (that I don't *really* know how it works)
* If you're logged out, you sometimes have an empty session letting you visit auth routes
 - I think this is still a bug? Your session would equal something like `[]` which still evaluates to true, and as such, you could visit pages like `/dashboard`.
* Logging out doesn't clear flash
 - Your last error message says on `/login` as its stored in via cookie

## Registration

* Client side validation of users details before they can click continue
* Actually show users error messages

## Dashboard

* Client side validation of users details before they can click continue
* Pattern matching on bank account numbers
* Probably want a more informative idea of who the receiver is

## Routes

* Updating `req.flash` feels wonky and should probably be re-implemented better
* Database inserts for front page in `/routes/index.js` should probably be abstracted out
* Abstract Stripe processing out into its own file

## Templates

* Look more into [Swag](https://github.com/elving/swag)
 - I successfully used this before to swap the hacky `{ indexjs: true }` objects for `{ scripts: 'index'  }` which is easier to parse visually but it failed to render on the server for some reason. It makes more sense that using a boolean (short of writing your own Handlebars helper)
 
# Server

* Find a nicer way of deploying to the Liberac VM
 - The current process works but you still have to manually perform `npm install`, check that nothing has errored out etc
* [Sentry](https://sentry.io) is fine for reporting errors but there's nothing for checking server logs (if that's even needed) or reporting general server errors like if pm2 errors out.
* Renew [Pushover](http://pushover.net) if you want to keep using it
* Consider piping signups into Slack rather than sending User Signup emails
