import React, { PropTypes } from 'react'
import classNames from 'classnames/bind'

import styles from './${styleImport}'

const cx = classNames.bind(styles)

const ${className} = (props) => {
  return (
    <div className={cx('container')}>
      {/* add content here */}
    </div>
  )
}
${className}.propTypes = {
  // children: PropTypes.element.isRequired,
}

export default ${className}
