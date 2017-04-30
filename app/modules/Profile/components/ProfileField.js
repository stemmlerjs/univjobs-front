/*ProfileField
 *
 * This components is the input field from the form 
 *
 * */

// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ================CSS IMPORTS============================== //
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
