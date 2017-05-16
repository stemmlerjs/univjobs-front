// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ================CSS IMPORTS============================== //
import { studentCenteredContainer, header, subHeader, btn, btnContainer,
 input, inputContainer, errorMessage } from '../styles/StudentSignupStyles.css'

import { material_1 } from 'sharedStyles/material.css'

StudentSignup.propTypes = {
  submitSignupForm: PropTypes.func.isRequired,
  updateStudentSignupForm: PropTypes.func.isRequired,
  emailText: PropTypes.string.isRequired,
  passwordText: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired
}

export default function StudentSignup ({submitSignupForm, updateStudentSignupForm, onSubmitSignup, emailText, passwordText, error, router}) {

  return (
      <div>
        <div className={studentCenteredContainer}>
            <div className={header}>
                GET HIRED
            </div>
            <div className={subHeader}>
                Connect to part time work and internships
            </div>
            <div className={inputContainer}>
                <input className={input} 
                        name="student[email]"
                        value={emailText}
                        onChange={(e) => updateStudentSignupForm('email', e.target.value)}
                        type="email" 
                        placeholder="Email"
                />
                <input className={input} 
                        name="student[password]"
                        value={emailText}
                        value={passwordText}
                        onChange={(e) => updateStudentSignupForm('password', e.target.value)}
                        type="password" 
                        placeholder="Password"
                />
            </div>
            <div className={errorMessage}>
                { error }
            </div>
            <button className={btn + ' ' + material_1} onClick={onSubmitSignup}>Sign me up</button>
        </div>
    </div>
  )
}
//      
