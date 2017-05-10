# To Do

## Table of Contents

- [Overview](#overview)
- [Application](#application)
 - [Login](#login)

# Overview

A list of things that should be done or at least considered if you want to deploy this application in production.
It's as comprehensive as I can make it (eg; everything I can think of/remember) but there may also be a number of other things to check out too

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