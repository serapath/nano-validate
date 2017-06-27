
module.exports = object

var errmsg = ['\n\nargument object needs to contain:\n']

function object (spec) {
  // @TODO: maybe validate `spec`
  // @TODO: maybe `spec` can be a function to be recursively applied to every level ob a given object
  return function validate (object) {
    var result = check([], object, spec)
    if (result.length) throw new Error(errmsg.concat(result).join('\n')+'\n\n')
  }
}
function check (path, object, spec) {
  var msg = [], parameters = Object.keys(spec)
  for (var i = 0, len = parameters.length, nest, param, type, value; i < len; i++) {
    param = parameters[i]
    if (object.hasOwnProperty(param)) {
      type = spec[param], value = object[param]
      nest = typeof type === 'object' && typeof object === 'object'
      if (nest) msg = msg.concat(check(path.concat(param), value, type))
      else if (typeof type !== 'function') throw new Error(`\`spec.${path.concat(param).join('.')}\` is not a function`)
      else if (!type(value)) msg = msg.concat(` .${path.concat(param).join('.')}: ${type.name}`)
    } else msg = msg.concat(` .${path.concat(param).join('.')}: (missing)`)
  }
  return msg
}
