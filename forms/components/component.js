import fs from 'fs-extra'
import _ from 'lodash'
import Q from 'q'

export default function (name, args, opts) {
  const jsTemplate = fs.readFileSync(
    `${__dirname}/__component.js`,
    { encoding: 'utf8' })
  const scssTemplate = fs.readFileSync(
    `${__dirname}/__component.scss`,
    { encoding: 'utf8' })

  const jsCompiled = _.template(jsTemplate)
  const scssCompiled = _.template(scssTemplate)

  return Q({
    script: jsCompiled({ name }),
    style: scssCompiled({ name }),
  })
}
