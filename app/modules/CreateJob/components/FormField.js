import React, { PropTypes } from 'react'
import { formFieldName, formFieldContent } from '../styles/FormFieldStyles.css'

ProfileField.propTypes = {
  title: PropTypes.string.isRequired
}

export default function ProfileField ({title, styles, children}) {
  return (
    <div className={styles}>
      <div className={formFieldName}>{ title }</div>
      <div className={formFieldContent}>
        { children }
      </div>
    </div>
  )
}
