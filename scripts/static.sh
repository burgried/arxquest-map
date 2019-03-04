#!/bin/bash

# Serve additional files
mkdir -p dist
cd dist
rm -rf test
ln -s ../test test
cd ..
