#!/usr/bin/env node
p = require('child_process').spawn( process.execPath ,[`${__dirname}/../node_modules/wiremock/jdeploy-bundle/jdeploy.js`,'--root-dir', '.', '--port', '3000'],{ detatched: true,   stdio: 'ignore'} ) ; 
setTimeout( () => { p.unref(); process.exit()},1000 )  