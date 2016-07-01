import React, { PropTypes } from 'react'

import { centeredContainer, header, subHeader, btn } from './styles.css'

export default function EmployerSignup ({onOpenSignupModal}) {
  return (
      <div className={centeredContainer}>
        <div className={header}>
          HIRE STUDENTS
        </div>
        <div className={subHeader}>
          Post jobs for students at any Canadian college/university
        </div>
          <button className={btn} onClick={onOpenSignupModal}>Employers - Post a job now</button>
      </div>
    )
}

