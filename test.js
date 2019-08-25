/*!
 * defaults-deep <https://github.com/jonschlinkert/defaults-deep>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert.
 * Licensed under the MIT License
 */

'use strict';

/* deps: mocha */
require('should');
var deepDefaults = require('./');

describe('deep-defaults', function () {
  it('should copy only missing properties defaults', function () {
    deepDefaults({a: 'c'}, {a: 'bbb', d: 'c'}).should.eql({a: 'c', d: 'c'});
  });

  it('should copy properties from multiple objects', function () {
    deepDefaults({a: 'b'}, {c: 'd'}, {e: 'f'}).should.eql({a: 'b', c: 'd', e: 'f'});
  });

  it('should fill in values that are null', function () {
    deepDefaults({a: null}, {a: 'c', d: 'c'}).should.eql({a: 'c', d: 'c'});
  });

  it('should copy nested values.', function () {
    deepDefaults({a: {b: 'c'}}, {a: {d: 'e'}}).should.eql({a: {b: 'c', d: 'e'}});
  });

  it('should clone when an empty object is passed as the first arg.', function () {
    var obj = {};
    deepDefaults(obj, {a: {b: 'c'}}, {a: {d: 'e'}});
    obj.should.eql({a: {b: 'c', d: 'e'}});
  });

  it('should return an empty object when the first arg is null.', function () {
    deepDefaults(null).should.eql({});
  });

  it('should prevent prototype pollution by disallowing construct properties access', function() {
    var obj = { prototype: Object.prototype };

    deepDefaults(obj, {
      constructor: {
        prototype: { isAdmin: true },
        a: 'b'
      },
      __proto__: { a: 'b' },
      prototype: { a: 'b' }
    });
    obj.constructor.should.not.have.property('a');
    obj.__proto__.should.not.have.property('a');
    obj.prototype.should.not.have.property('a');
    ({}).should.not.have.property('isAdmin');
  });
});
