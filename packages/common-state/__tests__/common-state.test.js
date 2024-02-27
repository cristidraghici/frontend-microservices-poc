'use strict';

const commonState = require('..');
const assert = require('assert').strict;

assert.strictEqual(commonState(), 'Hello from commonState');
console.info('commonState tests passed');
