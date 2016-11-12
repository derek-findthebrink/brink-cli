import _ from 'lodash'
import nodepath from 'path'
import fs from 'fs-extra'
import Q from 'q'

import component from '../forms/components/component'

function getDirectory(config, name, base) {
  console.log(config, name)
  return nodepath.join(base, config.root, name)
}
function makeFileName(dir, name, key) {
  return nodepath.join(dir, `${name}.${key}`)
}
function writeBlueprint(dir, name, data, key) {
  const write = Q.nfbind(fs.writeFile)
  const fname = makeFileName(dir, name, key)
  console.log({ dir, name, data, key, fname })
  return write(fname, data)
}

export default function generate(argv, env) {
  log.verbose('Generate running!')
  log.debug('arguments', argv)
  const args = argv._.slice(1)
  const [
    type,
    name,
  ] = args

  // load config
  const {
    configFiles,
    configBase,
    configPath,
  } = env
  const config = require(configPath).generate.component
  const opts = _.omit(argv, '_')

  // handle custom
  // handle base
  const cases = {
    component,
  }
  if (!cases[type]) {
    // handle fail
    const err = 'Not Found.'
    log.info(`Could not generate ${type}: ${err}`)
    return false
  }
  return cases[type](name, args, opts)
    .then((templates) => {
      const dir = getDirectory(config, name, configBase)
      const ensure = Q.nfbind(fs.ensureDir)
      return ensure(dir)
    .then(() =>
      Q.all(_.map(templates, (t, key) =>
        writeBlueprint(dir, name, t, key)))
      )
    })
    .catch(reason => log.error('generate failed', reason))
}
