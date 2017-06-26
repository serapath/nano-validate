
module.exports = validate

function validate (spec, opts) {
  var errmsg = ['\n\nargument object needs to contain:\n']
  var result = check([], opts, spec)
  if (result.length) throw new Error(errmsg.concat(result).join('\n')+'\n\n')
}
function check (path, opts, spec) {
  var parameter = Object.keys(spec)
  for (var i = 0, len = parameter.length, msg = [], param, type, value; i < len; i++) {
    param = parameter[i]
    if (opts.hasOwnProperty(param)) {
      type = spec[param], value = opts[param]
      if (type === '*' || typeof value === type && value !== null) msg = msg.concat([])
      else if (typeof type === 'function') {
        msg = msg.concat(type(value) ? [] : ` .${path.concat(param).join('.')}: ${type.name}()`)
      } else if (typeof type === 'object' && typeof opts === 'object') {
        msg = msg.concat(check(path.concat(param), value, type))
      } else msg = msg.concat(` .${path.concat(param).join('.')}: ${type} (was: ${value})`)
    } else msg = msg.concat(` .${path.concat(param).join('.')}: (missing)`)
  }
  return msg
}
