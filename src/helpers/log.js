/* eslint-disable no-console, class-methods-use-this */
import 'colors'
import _ from 'lodash'

const stringify = function stringify(obj) {
  return JSON.stringify(obj, null, '  ')
}

export default class logger {
  constructor(argv) {
    this.opts = {}
    this.opts.verbose = argv.verbose || false
    this.opts.debug = argv['deep-debug']
    if (this.opts.debug) {
      this.opts.verbose = true
    }
    _.bindAll(this, [
      'debug',
      'verbose',
      'error',
      'info',
    ])
  }
  debug(msg, obj) {
    if (this.opts.verbose) {
      console.log(`${'DEBUG:'.red} ${msg}`)
      if (obj) {
        console.log(JSON.stringify(obj, null, '  '))
      }
    }
  }
  verbose(msg, obj) {
    if (this.opts.verbose) {
      console.log(`${'VERBOSE:'.blue} ${msg}`)
      if (obj) {
        console.log(stringify(obj, null, '  '))
      }
    }
  }
  error(msg, err) {
    console.log(`${'ERROR:'.red} ${msg}`)
    if (err) {
      console.error(err)
    }
  }
  info(msg, data) {
    console.log(`${'INFO:'.cyan} ${msg}`)
    if (data) {
      console.log(stringify(data))
    }
  }
}
