Version of the Spin Visualizer written for the web, using BabylonJS for rendering.

Uses webpack to build/package javascipt, and Jekyll to create web pages.


## Setup instructions:

- Install [Node.js](https://nodejs.org/en/)
 - run npm install

- Jekyll
 - Install Ruby and Gem
 - Install Jekyll and bundler (gem install jekyll bundler)
 - go to ./docs and run bundle install

## Run instructions

- Get webpack watching/bundling the javascript/typescript library:
  - npm run watch
- Serve Jekyll:
  - bundle exec jekyll serve (from ./docs)

## Build instructions

- Build production version of javascript library:
  - npm run build
- Don't need to build Jekyll, github deployment will do that