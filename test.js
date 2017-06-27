var tape = require('tape')

var validate = require('.')

var spec_Ax = {
  x: function isAnything (x) { return true } // property x must exist, but can be anything
}

var spec_Ay = {
  y: {
    b: function isFunction (x) { return typeof x === 'boolean'},
    x: function isFunction (x) { return typeof x === 'number'},
    z: function isFunction (x) { return typeof x === 'string'},
    o: function isObject (x) { return typeof x === 'object' && x !== null },
    f: function isFunction (x) { return typeof x === 'function'},
    a: Array.isArray, // type is function name
    u: function isUndefined (x) { return x === undefined },
    n: function isNull (x) { return x === null }
  }
}

var spec_B = {
  x: { y: { z: function array3 (x) { return Array.isArray(x) && x.length > 3 } } },
  y: function isAnything (x) { return true }
}

tape('validate foobar', function validateFoobar (t) {
  t.plan(3)
  
  var A = {
    x: undefined,
    y: {
      b: false,
      x: 0,
      z: '',
      o: {},
      f: function () {},
      a: [],
      n: null,
      u: undefined
    }
  }

  var B = {
    x : { y: { z: [1,2,3,4] } },
    y : function () {}
  }

  var typeAx = validate(spec_Ax)
  var typeAy = validate(spec_Ay)
  var typeB = validate(spec_B)
  
  t.doesNotThrow(_ => typeAx(A))
  t.doesNotThrow(_ => typeAy(A))
  t.doesNotThrow(_ => typeB(B))
  
})
