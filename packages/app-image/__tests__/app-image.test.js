'use strict';

const appImage = require('..');
const assert = require('assert').strict;

assert.strictEqual(appImage(), 'Hello from appImage');
console.info('appImage tests passed');
