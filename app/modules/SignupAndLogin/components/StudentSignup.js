// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

// ================CSS IMPORTS============================== //
import { studentCenteredContainer, header, subHeader, btn, btnContainer,
 input, inputContainer, errorMessage } from '../styles/StudentSignupStyles.css'
import { legal, white, passwordContainer } from '../styles/SignupContainerStyles.css'

import { ValidPasswordVerifier } from 'modules/SharedComponents'

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
                <div className={passwordContainer}>
                  <input className={input} 
                          name="student[password]"
                          value={passwordText}
                          onChange={(e) => updateStudentSignupForm('password', e.target.value)}
                          type="password" 
                          placeholder="Password"
                  />
                  <ValidPasswordVerifier passwordText={passwordText}/>
                </div>
                <p className={`${legal}`}>By registering you agree to our 
                    <Link to="/terms" className={white}> Terms & Services </Link> 
                    and 
                    <Link to="/privacy" className={white}> Private Policy</Link>
                </p>
            </div>
              <div>
                <div className={error == "" ? '' : errorMessage}>
                    { error }
                </div>
                <button className={btn + ' ' + material_1} onClick={onSubmitSignup}>Sign me up</button>
              </div>
        </div>
    </div>
  )
}
//      
