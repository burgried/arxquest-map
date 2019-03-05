#!/bin/bash

# Serve additional files
mkdir -p dist
cd dist
rm -rf test
cp -r ../test test
cd ..
