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
  // strings for type
  const dashName = _.kebabCase(name)
  const camelName = _.camelCase(name)
  const upperName = _.upperFirst(camelName)

  const js = jsCompiled({
    name: upperName,
    styleImport: `${name}.scss`,
  })
  const scss = scssCompiled({ name: dashName })

  return Q({
    js,
    scss,
  })
}
