import _ from 'lodash'

import component from '../forms/components/component'

export default function generate(argv) {
  log.verbose('Generate ran!')
  log.debug('arguments', argv)
  const args = argv._.slice(1)
  const [
    type,
    name,
  ] = args
  const opts = _.omit(argv, '_')
  // handle custom
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
      console.log(templates)
    })
    .catch(reason => log.error(reason))
}
