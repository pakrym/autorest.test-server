#!/usr/bin/env node

require('http').request( {port: 3000, host:'localhost', method: 'POST', path: '/__admin/shutdown'} ).end()