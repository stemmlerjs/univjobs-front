import React, { PropTypes } from 'react'
import { flexContainer, profileFieldName, profileFieldContent } from '../styles/ProfileFieldStyles.css'

ProfileField.propTypes = {
  title: PropTypes.string.isRequired
}

export default function ProfileField ({title, styles, children}) {
  return (
    <div className={flexContainer}>
      <div className={profileFieldName}>{ title }</div>
      <div className={profileFieldContent}>
        { children }
      </div>
    </div>
  )
}
