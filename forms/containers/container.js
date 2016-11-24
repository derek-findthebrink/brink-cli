import fs from 'fs-extra'
import _ from 'lodash'
import Q from 'q'

export default function (name, args, opts) {
  const jsTemplate = fs.readFileSync(
    `${__dirname}/__container.js`,
    { encoding: 'utf8' })

  const jsCompiled = _.template(jsTemplate)
  // strings for type
  const camelName = _.camelCase(name)
  const upperName = _.upperFirst(camelName)

  const js = jsCompiled({
    name: upperName,
    styleImport: `${name}.scss`,
  })

  return Q({
    js,
  })
}
