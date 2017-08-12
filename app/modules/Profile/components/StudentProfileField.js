import React, { PropTypes } from 'react'
import { profileFieldContent, flexContainer, flexTitle, flexContent, optionalStyle } from '../styles/ProfileFieldStyles.css'

StudentProfileField.propTypes = {
  title: PropTypes.string.isRequired
}

export default function StudentProfileField ({title, required, optional, message, children}) {
  return (
    <div>
      <ul className={flexContainer}>
       <li className={flexTitle}>
         <p>{ title }</p>
         {
           required === true
            ? <p className={optionalStyle}>{`(${message !== undefined ? message : 'required'})`}</p>
            : ''
         }
         {
           optional === true 
            ? <p className={optionalStyle}>{`(${message !== undefined ? message : 'optional'})`}</p>
            : ''
         }
       </li>
       { children }
      </ul>
    </div>
  )
}
