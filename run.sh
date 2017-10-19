#!/usr/bin/env bash

grunt sass
grunt cssmin
grunt babel
grunt browserify
grunt uglify
ttab grunt --force
npm start