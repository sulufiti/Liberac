# Liberac

## Table of Contents

- [The short version aka tl;dr](#the-short-version)
- [Prerequisites](#prerequisites)
  - [Node](#node)
    - [Mac Users](#mac)
    - [Linux Users](#linux)
  - [Environment Variables](#environment-variables)
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

![A screenshot of a terminal showing Node is running version 7.0.0](/docs/img/node_version.png?raw=true)

#### Linux

If you're a Linux user, consult your package manager but be wary that your distro has a recent version of Node available.

In place of that, I recommend checking out [nvm](https://github.com/creationix/nvm) or [n](https://github.com/tj/n) for version management.

### Environment Variables

In order to connect to the database and a few other bits, you'll need to set some locally required keys.

We also use some external services which are all documented below. 

You'll need to acquire API keys for those services (by contacting [marcus](mailto:marcuscrane@liberac.co.nz) for a copy of the development `.env`. I've also linked URLs for the sites if you want to acquire your own (eg; if this repo ever becomes public)

#### Locally required keys

| Variable | What it does |
| -------- | ------------ |
| DEV_DB   | Specifies the name of the development database to use |
| DEV_USER | Specifies the name of the postgres user to use for development |
| DEV_PASS | Same deal as above but for the development user's password |
| EXPRESS_SESSION_SECRET | The name of the key used to protect user cookies |
| NODE_ENV | Specifies the current environment. eg; `DEVELOPMENT` disables sending of emails and requiring user activation |

#### Externally required keys

| Variable | What it does | Website |
| -------- | ------------ | ------- |
| AZURE_STORAGE_ACCOUNT | Account to use for Azure storage (used for passport and address proof files) | [Azure File Storage](https://azure.microsoft.com/en-us/services/storage/files/) |
| AZURE_STORAGE_ACCESS_KEY | Same as above, the access key to use for, y'know, accessing storage | [Azure File Storage](https://azure.microsoft.com/en-us/services/storage/files/) |
| MANDRILL_API_KEY | Used for sending activation/welcome emails etc. Alternatively, use a test key to simulate sending | [Mandrill](http://kb.mailchimp.com/mandrill/add-or-remove-mandrill) |
| PUSHOVER_USER | Used to send notifications to team members phones upon new signups. Currently, all team members are assigned under one account (this one) | [Pushover](https://pushover.net/) |
| PUSHOVER_TOKEN | Same as above. The token to use for sending notifications | [Pushover](https://pushover.net/) |
| SENTRY_DSN | Equivalent of an API token for Sentry which is used for error logging on the server. Disabled under development environment | [Sentry](https://sentry.io/welcome/) |

### Docker

In order to deploy the database, you'll need a PostgreSQL instance. You can install it using `brew` but initially setup can be a bit fiddly.

To simplify things, we'll be using [Docker](https://www.docker.com/) which allows us to host a PostgreSQL instance without actually installing it on our machine directly. Put simply, think of it like a tiny virtual machine.

#### Docker for Mac

Docker community edition is available [here](https://store.docker.com/editions/community/docker-ce-desktop-mac?tab=description) by clicking the Get Docker button which will download `Docker.dmg`.

![A screenshot of the Get Docker button](/docs/img/get_docker_button.png?raw=true)

Instructions and screenshots are also included on the Community Edition page for further reference.

Install like you would any application and then launch it. A cute whale carrying cargo containers will appear in your dock. It should prompt you once it's finished first time setup.

I highly recommend picking up Kitematic by clicking on the Docker icon in the top taskbar and clicking Kitematic which should direct you to download it.

![A screenshot of the Docker menu with the Kitematic menu entry highlighted](/docs/img/get_kitematic.png?raw=true)

Upon opening Kitematic, you'll be presented with a list of popular containers. You should see an entry for PostgreSQL so click `CREATE` and wait for the image to download.

![A screenshot of the Docker container selection menu](/docs/img/docker_main_menu.png?raw=true)

Once it's done, you should see 'Postgres' at the top of the window with `RUNNING` in green beside it. We've still got a few more bits of setup left.

![A screenshot showing Postgres is running](/docs/img/docker_postgres_container.png?raw=true)

Hit `Settings` in the top right and then `Ports` which should display `DOCKER PORT` on the left and `PUBLISHED IP:PORT` on the right. On older Macs, `PUBLISHED IP` may also be called something like `MAC PORT`.

![A screenshot of the Docker settings tab](/docs/img/docker_settings.png?raw=true)

Click on the `PUBLISHED IP/MAC PORT` number and it'll change into a text box.

![A screenshot of the Docker Published IP section](/docs/img/docker_ports.png?raw=true)

Change it to `5432` which should now be identical to the Docker port on the left.

![A screenshot of the Docker ports successfully set up](/docs/img/docker_configured_ports.png?raw=true)

Once that's done, you can close or minimise Docker. It'll stay running in the taskbar. Postgres is now ready for you to start populating the database!

## Populating the database

Now that you've got Node and Docker set up, clone the liberac repo, navigate to it and run `npm install` to install all the required modules.

Now that we have everything you need, all that's needed is to run `npm run resetdb` which will apply the migration and seed files to the database giving us some fake users and a running example of the Liberac production app

## Launching Liberac

Once that's completed, run `npm start` which will start the web server. By default, it will available at [http://localhost:3000](http://localhost:3000) when it's running.

## Contributing static assets

If you're wanting to contribute static assets such as HTML or images, all you need to do is place them in the public folder.

The contents of the public folder is served at `/`. If you were to place an image called `logo.png` inside, it would appear at `http://localhost:3000/logo.png` and ultimately at `http://liberac.co.nz/logo.png` when committed and deployed.

## Something broke! I'm stuck!

If you've just generally lost or need help setting up Node, Docker or the repo, you can email [marcus](mailto:marcuscrane@liberac.co.nz) or [message him on Slack](https://liberac.slack.com/messages/@marcus)

If it's an actual error that you're wanting to report, Node should spit out a file called npm-debug.log into the liberac folder upon any issues, as well as outputting those errors to the terminal.

If you're unable to figure out what the error means, feel free to log it as an [issue](https://github.com/adiraj/liberac#issues) or send it to the #liberac-team channel on Slack since presumably someone else might have the error sooner or later as well.