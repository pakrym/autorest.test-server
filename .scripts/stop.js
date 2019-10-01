#!/usr/bin/env node

console.log('Sending shutdown command to test-server');
try { 
  const p = require('http').request( {port: 3000, host:'localhost', method: 'POST', path: '/__admin/shutdown'} , () => {
  // shutdown running server if it is running.
}, ()=> {});
    p.on('error', ()=>console.log('Test-server not running.'));
    p.end();
} catch(E) { 
}