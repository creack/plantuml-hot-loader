const { spawn } = require('child_process');
const { getOptions } = require('loader-utils');

const jarPath = (process.env || {}).PLANTUML_JAR || './plantuml.jar';

const loader = (content, { renderFormat }, callback) => {
  try {
    if (renderFormat && renderFormat !== 'svg' && renderFormat !== 'png') throw new Error('invalid renderFormat')
    const ret = spawn('java', ['-jar', '-Djava.awt.headless=true', jarPath, `-t${renderFormat}` || 'svg', '-p']);
    ret.stdin.write(content)
    ret.stdin.end()
    ret.on('exit', (code) => {
      if (code !== 0) callback(new Error(`exit code: ${code}`))
      else callback(null, ret.stdout.read())
    })
  } catch (e) {
    callback(e)
  }
}

module.exports = function asyncLoader(content) {
  const callback = this.async()
  loader(content, getOptions(this), (err, result, map, meta) => {
    if (err) return callback(err)
    return callback(null, result, map, meta)
  })
}
