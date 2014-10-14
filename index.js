/*!
 * defaults-deep <https://github.com/jonschlinkert/defaults-deep>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var isObject = require('is-plain-object');
var forOwn = require('for-own');

module.exports = function defaultsDeep(o, objects) {
  if (o == null) {
    return {};
  }
  if (objects == null) {
    return o;
  }

  function copy(o, current) {
    forOwn(current, function (value, key) {
      var val = o[key];
      if (val == null) {
        o[key] = value;
      } else if (isObject(val) && isObject(value)) {
        defaultsDeep(val, value);
      }
    });
  }

  var len = arguments.length;
  var current;
  var i = 0;

  while (++i < len) {
    current = arguments[i];
    if (current) {
      copy(o, current);
    }
  }
  return o;
};
