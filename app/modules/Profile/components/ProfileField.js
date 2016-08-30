import React, { PropTypes } from 'react'
import { profileFieldName, profileFieldContent } from '../styles/ProfileFieldStyles.css'

ProfileField.propTypes = {
  title: PropTypes.string.isRequired
}

export default function ProfileField ({title, styles, children}) {
  return (
    <div className={styles}>
      <div className={profileFieldName}>{ title }</div>
      <div className={profileFieldContent}>
        { children }
      </div>
    </div>
  )
}