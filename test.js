var tape = require('tape')

var validate = require('.')

tape('validate foobar', function validateFoobar (t) {
  t.plan(1)
  
  var a = {
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
  
  var b = {
    x : { y: { z: [1,2,3,4] } },
    y : function () {}
  }
  
  t.equal(foobar(a, b), true)
  
})

function foobar (a, b) {
  
  var aX = (
    validate({ x: '*' }, a), // property x must exist, but can be anything
    a.x
  )
  var aY = (
    validate({ y: {
      b: 'boolean',
      x: 'number',
      z: 'string',
      o: 'object',
      f: 'function',
      a: Array.isArray, // type is function name
      u: 'undefined',
      n: function isNull (val) { return val === null }
    }}, a),
    a.y
  )
  var b = (
    validate({
      x: { y: { z: arr => Array.isArray(arr) && arr.length > 3 } },
      y: '*' // anything
    }, b),
    b
  )

  return true
}
