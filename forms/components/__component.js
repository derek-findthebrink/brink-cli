import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './${styleImport}.scss'

@CSSModules(styles)
export default class ${name} extends React.Component {
  render() {
    return (
      <div styleName="container">
        {/* add content here */}
      </div>
    )
  }
}
${name}.propTypes = {
  children: PropTypes.element.isRequired,
}
