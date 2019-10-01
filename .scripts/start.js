#!/usr/bin/env node
const { existsSync } = require('fs');
const { resolve } = require('path');

require('http').request( {port: 3000, host:'localhost', method: 'POST', path: '/__admin/shutdown'} , (i,j) => {
    // shutdown running server if it is running.
}).end()

var here = __dirname;
while(! existsSync( `${here}/node_modules/wiremock/jdeploy-bundle/jdeploy.js`)) {
  here = resolve( `${here}/..`);
  if( here === '/' || here.endsWith('\\')) {
    throw new Error('Unable to start test-server.')
  }
}
p = require('child_process').spawn( process.execPath ,[`${here}/node_modules/wiremock/jdeploy-bundle/jdeploy.js`,'--root-dir', resolve(`${__dirname}/..`), '--port', '3000'],{ detatched: true,   stdio: 'ignore'} ) ; 
setTimeout( () => { 
  if( p.pid )  {
      console.log('Starting autorest test-server.')
      p.unref(); process.exit()
  }
  throw new Error(`Unable to start autorest test-server`);
},1000 )  