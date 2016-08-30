import React, { PropTypes } from 'react'
import { profileFieldContent, flexContainer, flexTitle, flexContent } from '../styles/ProfileFieldStyles.css'

StudentContainer.propTypes = {
  title: PropTypes.string.isRequired
}

export default function StudentContainer ({title, children}) {
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
