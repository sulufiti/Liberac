# Liberac

## Prerequisites

It requires that you have [Node](https://nodejs.org/en/) installed on your system.

For Mac users, the easiest way is using [Homebrew](https://brew.sh/). If you don't have it installed, you can do so by pasting the ruby script into your terminal.

Following that, you simply need to use brew like so

```
brew install node@7
```

You can also use [nvm](https://github.com/creationix/nvm) for managing Node versions but we're only using Node v7 which is just above the current LTS so you'll be fine for a while with the Brew version.

Once that's done, double check that your terminal returns 'v7.0.0' when you run `node -v`

## Launching it

Now that you've got Node set up, navigate to the liberac repo and run `npm start` which will start the web server. By default, it will available at [http://localhost:3000](http://localhost:3000) when it's running.

If you're wanting to contribute assets such as HTML or images, all you need to do is place them in the public folder.

The contents of the public folder is served at `/`. If you were to place an image called `logo.png` inside, it would appear at `http://localhost:3000/logo.png` and ultimately at `http://liberac.co.nz/logo.png` when committed and deployed.

## Something broke and I need help!

Node should spit out a file called npm-debug.log into the liberac folder upon any issues, as well as outputting those errors to the terminal.

If you're unable to figure out what the error means, feel free to log it as an [issue](https://github.com/adiraj/liberac#issues) or send it to the #liberac-team channel on Slack since presumably someone else might have the error sooner or later as well.