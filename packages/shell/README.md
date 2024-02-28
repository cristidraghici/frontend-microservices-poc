# shell

> A shell app that combines all the other 4 apps in the project

## Usage

- `yarn shell-apps`
- `yarn shell-dev`

It is mandatory to run the `shell-apps` command, otherwise the modules will not be available.

## About

The current implementation is rather fragile and is quite tightly coupled with the `manifest.json` file provided by the vite bundler. The next iteration will be an attempt to move more of the loading logic in the module itself, rather than keeping everything in the central shell app.
