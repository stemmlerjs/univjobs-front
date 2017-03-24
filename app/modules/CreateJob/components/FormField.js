import React, { PropTypes } from 'react'
import { fieldContainer, formFieldName, formFieldContent } from '../styles/FormFieldStyles.css'

ProfileField.propTypes = {
  title: PropTypes.string.isRequired
}

export default function ProfileField ({title, children}) {
  return (
    <div className={fieldContainer}>
      <div className={formFieldName}>{ title }</div>
      <div className={formFieldContent}>
        { children }
      </div>
    </div>
  )
}
