'use strict';

const appList = require('..');
const assert = require('assert').strict;

assert.strictEqual(appList(), 'Hello from appList');
console.info('appList tests passed');
