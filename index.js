/*!
 * defaults-deep <https://github.com/jonschlinkert/defaults-deep>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var isObject = require('is-plain-object');
var slice = require('array-slice');
var forOwn = require('for-own');

module.exports = function defaults(o, objects) {
  if (o == null) return {};
  if (objects == null) return o;
  forEach(slice(arguments, 1), function (obj) {
    forOwn(obj, function (value, key) {
      var val = o[key];
      if (val == null) {
        o[key] = value;
      } else if (isObject(val) && isObject(value)) {
        defaults(val, value);
      }
    });
  });
  return o;
};

function forEach(arr, cb) {
  if (arr == null) return;
  var len = arr.length;
  var i = -1;

  while (++i < len) {
    if (cb(arr[i], i, arr) === false) {
      break;
    }
  }
}