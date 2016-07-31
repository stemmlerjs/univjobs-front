import React, { PropTypes } from 'react'
import { profileFieldName, profileFieldContent } from '../styles/ProfileFieldStyles.css'

ProfileField.propTypes = {
  title: PropTypes.string.isRequired
}

export default function ProfileField ({title, children}) {
  return (
    <div>
      <div className={profileFieldName}>{ title }</div>
      <div className={profileFieldContent}>
        { children }
      </div>
    </div>
  )
}