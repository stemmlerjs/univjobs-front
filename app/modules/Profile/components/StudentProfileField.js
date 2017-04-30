import React, { PropTypes } from 'react'
import { profileFieldContent, flexContainer, flexTitle, flexContent } from '../styles/ProfileFieldStyles.css'

StudentProfileField.propTypes = {
  title: PropTypes.string.isRequired
}

export default function StudentProfileField ({title, children}) {
  return (
    <div>
      <ul className={flexContainer}>
       <li className={flexTitle}>
         <p>{ title }</p>
       </li>
       { children }
      </ul>
    </div>
  )
}
