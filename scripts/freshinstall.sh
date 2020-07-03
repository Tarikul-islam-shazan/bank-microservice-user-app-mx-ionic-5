#!/usr/bin/env bash

npm install
ionic cordova platform remove android --save
ionic cordova platform remove ios --save
rm -rf ./platforms
rm -rf ./plugins
ionic cordova platform add android@latest --save
ionic cordova platform add ios@latest --save
cd platforms/ios && pod install && pod update
cd ../../
