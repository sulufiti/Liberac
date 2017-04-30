# Liberac

## Table of Contents

- [The short version aka tl;dr](#the-short-version)
- [Prerequisites](#prerequisites)
  - [Node](#node)
    - [Mac Users](#mac)
    - [Linux Users](#linux)
  - [Environment Variables](#environment-variables)
    - [Azure Storage](#azure-storage)
    - [Express Session](#express-session)
    - [Mandrill](#mandrill)
    - [PostgreSQL](#postgresql)
    - [Sentry](#sentry)
  - [Docker](#docker)
    - [Mac](#docker-for-mac)
- [Populating the database](#populating-the-database)
- [Launching Liberac](#launching-liberac)
- [Contributing static assets](#contributing-static-assets)
- [Something broke! I'm stuck!](#something-broke-im-stuck)

## The short version

I'll assume you know exactly what you're doing:

```
brew install node@7
node -v (check that the output is 'v7.0.0')
git clone https://github.com/adiraj22/liberac
cd liberac
npm install
create .env file and fill with the appropriate keys
npm start
navigate to http://localhost:3000
```

## Prerequisites

### Node

Liberac is served from an [Express](https://github.com/expressjs/express) server which requires that you have [Node](https://nodejs.org/en/) installed on your system.

#### Mac

For Mac users, the easiest way is using [Homebrew](https://brew.sh/). If you don't have it installed, you can do so by pasting the ruby install script into your terminal.

Following that, you can install Node using Homebrew like so

```
brew install node@7
```

Once that's done, double check that your terminal outputs 'v7.0.0' by running `node -v`

#### Linux

If you're a Linux user, consult your package manager but be wary that your distro has a recent version of Node available.

In place of that, I recommend checking out [nvm](https://github.com/creationix/nvm) or [n](https://github.com/tj/n) for version management.

### Environment Variables

Coming soon...

Check example.env

#### Azure Storage

#### Mandrill

#### PostgreSQL

#### Sentry

### Docker

In order to deploy the database, you'll need a PostgreSQL instance. You can install it using `brew` but initially setup can be a bit fiddly.

To simplify things, we'll be using [Docker](https://www.docker.com/) which allows us to host a PostgreSQL instance without actually installing it on our machine directly. It's basically a tiny virtual machine.

#### Docker for Mac

Docker community edition is available [here](https://store.docker.com/editions/community/docker-ce-desktop-mac?tab=description) by clicking the Get Docker button which will download `Docker.dmg`.

Instructions and screenshots are also included on the Community Edition page for further reference.

Install like you would any application and then launch it. A cute whale carrying cargo containers will appear in your dock. It should prompt you once it's finished first time setup.

I highly recommend picking up Kitematic by clicking on the Docker icon in the top taskbar and clicking Kitematic which should direct you to download it.

Upon opening Kitematic, you'll be presented with a list of popular containers. You should see an entry for PostgreSQL so click `CREATE` and wait for the image to download.

Once it's done, you should see 'Postgres' at the top of the window with `RUNNING` in green beside it. We've still got a few more bits of setup left.

Hit `Settings` in the top right and then `Ports` which should display `DOCKER PORT` on the left and `PUBLISHED IP:PORT` on the right. On older Macs, `PUBLISHED IP` may also be called something like `MAC PORT`.

Click on the `PUBLISHED IP/MAC PORT` number and it'll change into a text box. Change it to `5432` which should now be identical to the Docker port on the left.

Once that's done, Postgres is ready for you to start populating the database!

## Populating the database

Now that you've got Node and Docker set up, clone the liberac repo, navigate to it and run `npm install` to install all the required modules.

Now that we have everything you need, all that's needed is to run `npm run resetdb` which will apply the migration and seed files to the database giving us some fake users and a running example of the Liberac production app

## Launching Liberac

Once that's completed, run `npm start` which will start the web server. By default, it will available at [http://localhost:3000](http://localhost:3000) when it's running.

## Contributing static assets

If you're wanting to contribute static assets such as HTML or images, all you need to do is place them in the public folder.

The contents of the public folder is served at `/`. If you were to place an image called `logo.png` inside, it would appear at `http://localhost:3000/logo.png` and ultimately at `http://liberac.co.nz/logo.png` when committed and deployed.

## Something broke! I'm stuck!

If you've just generally lost or need help setting up Node, Docker or the repo, you can email [marcus](mailto:marcus@thingsima.de) or message him on Slack

If it's an actual error that you're wanting to report, Node should spit out a file called npm-debug.log into the liberac folder upon any issues, as well as outputting those errors to the terminal.

If you're unable to figure out what the error means, feel free to log it as an [issue](https://github.com/adiraj/liberac#issues) or send it to the #liberac-team channel on Slack since presumably someone else might have the error sooner or later as well.