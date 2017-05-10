# Server Info

## Table of Contents

- [Overview](#overview)
- [Connecting to the Liberac VM](#connecting-to-the-liberac-vm)
 - [Generating an SSH key](#generating-an-ssh-key)
 - [Obtaining SSH access](#obtaining-ssh-access)
- [Deployment process](#deployment-process)
 - [Pushing updates to the server](#pushing-updates-to-the-server)
 - [Updating staging](#updating-staging)
 - [Checks for deployment](#checks-for-deployment)

# Overview

The easiest place to start is just with a broad overview of what the Liberac server currently is, runs on and so on.

It's hosted on [Microsoft Azure](https://portal.azure.com) which is basically Microsoft's answer to [Amazon AWS](https://aws.amazon.com/), [Google Cloud Platform](https://cloud.google.com/) etc

What advantages does it have over its competitors you might ask?  

Nothing! We just use it (at the time of writing) because it comes with a heap of free credits. That's all so if you're in a position to change providers, go ahead.

Liberac itself is platform agnostic and just needs a Linux VM and Postgres instance to run. You could potentially just Dockerise the whole thing and deploy containers as well but that's up to you.

Anyway, the current "resources" (aka things that are running) under Azure are

| Resource Name | Resource Type | What it does |
| ------------- | ------------- | ------------ |
| liberacfilestorage | Storage Account | Database backups (files) + passport/address proofs (blobs) uploaded from the site are stored here |
| liberacdiag | Storage Account | Some auto diagnostics about the VM application are stored here. It's not really used. |
| LiberacVM | Virtual Machine | The VM which the Liberac Node application and database set up. The site is served from here using Apache2 |
| LiberacStaticIP | Public IP Address | The public IP address which is attached to the VM. The website points to this IP address which points to the VM |
| LiberacSecRules | Network Security Group | All the security rules (port white/blacklists etc) |
| LiberacVM | Disk | The storage disk for the VM. Doesn't store a lot as the database is pretty small. |
| liberacvm599 | Network Interface | Does what it says on the tin. Not really something you can actually access settings for? |
| LiberacVNET | Virtual Network | Handles virtual networks? Just ignore this

The only things you'd likely ever need to check are `liberacfilestorage`, `LiberacVM (Virtual Machine)` and `LiberacSecRules` on the odd occasion.

# Connecting to the Liberac VM

For connecting to the server, authentication is done via ssh keys.

## Generating an SSH key

I'll let Github walk you through this one. You can see their explainer [here](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

Note the operating system picker just under the title to get the correct instructions for your OS.

## Obtaining SSH access

Now that you've got an ssh key, copy your public key to your clipboard. You can find it at `~/.ssh/id_rsa.pub`. Note: It **must** be the key that ends with .pub. The copy without an extension is your private key you should never share!

You'll need someone who already has access to the server to put your key in the `authorized_keys

# Deployment process

## Pushing updates to the server

So, you wanna deploy from master to production, huh?

Presuming your `ssh` key is on the server under `authorized_keys`, you just need to add a new branch to your copy of the Github repo. To do so, run `git remote add production liberac@liberac.co.nz:~/deploy` and then run `git push production master` to push your *current* branch to production.

You should only run it on **master** after having checked that it's up to date. If your branch is behind, it'll just reject you anyway like if you were behind the Github master and tried to push.

## Updating staging

The server is home to both `staging` and `production`. Don't depair though as I've tried (both for my sanity and yours) to make it hard to accidentally update anything related to production.

There are actually two versions of the server, `servercfg.js` and `server_dummy.js`. The latter is a `dumb server` as it says on the tin, configured to just serve the public folder and the index route (which contains logic for storing front page registrations in the database)

It's not perfect but the nice thing is that since server_dummy.js never changes, both can just run off the same repo without any further configuration. Want to push a change to show off updated logins? Go ahead, `production` has no knowledge of those existing.

The only thing to watch out for is if you need to update `server_dummy.js` eg; with new modules (which won't be `npm install`ed by default)

## Checks for deployment

There should probably be an automated deployment process for all this but I never got as far as looking into any.

The main things to do after deploy are just connecting to the server and checking that nothing has gone astray.

You can run `pm2 list` to check that the server hasn't errored out. Make sure that `watching` isn't set to `disabled` because if so, you'll need to manually run `pm2 restart {environment name}` or `pm2 restart all`.

Common issues to watch out for are:

- Adding new modules
 - If this happens, you'll need to manually `cd` into the `liberac` directory and run `npm install`. On rare occasions with native modules, you might need some libraries from the package manager. For example, `bcrypt` is `make`-ed from scratch which required me to run `sudo apt-get install build-essential`. Google is your friend though!
- Updated migrations
 - By default, migrations aren't re-run each time you update. Generally, `npm run resetstaging` will fix your issues. Note that there isn't an `npm run resetproduction`.
 - If you *really* need to reset production, make sure you've got up to date backups then you can run `NODE_ENV=production knex migrate:rollback && NODE_ENV=production knex migrate:latest`