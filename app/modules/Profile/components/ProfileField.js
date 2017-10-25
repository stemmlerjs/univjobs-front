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

export default function ProfileField ({title, contentStyles, children}) {
  return (
    <div className={flexContainer}>
      <div className={profileFieldName}>{ title }</div>
      <div className={contentStyles != undefined ? `${profileFieldContent} ${contentStyles}` : profileFieldContent}>
        { children }
      </div>
    </div>
  )
}
