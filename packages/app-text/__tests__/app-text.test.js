'use strict';

const appText = require('..');
const assert = require('assert').strict;

assert.strictEqual(appText(), 'Hello from appText');
console.info('appText tests passed');
