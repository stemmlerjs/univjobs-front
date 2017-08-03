// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

// ================CSS IMPORTS============================== //
import { studentCenteredContainer, header, subHeader, btn, btnContainer, inputContainerClosed,
 input, inputContainer, errorMessage } from '../styles/StudentSignupStyles.css'
import { legal, white, passwordContainer } from '../styles/SignupContainerStyles.css'

import { ValidPasswordVerifier } from 'modules/SharedComponents'

import { material_1 } from 'sharedStyles/material.css'
import { shine } from 'sharedStyles/animations.css'
import { detectEnterPress } from 'helpers/utils'

StudentSignup.propTypes = {
  submitSignupForm: PropTypes.func.isRequired,
  updateStudentSignupForm: PropTypes.func.isRequired,
  emailText: PropTypes.string.isRequired,
  passwordText: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired
}

export default function StudentSignup ({ submitSignupForm, updateStudentSignupForm, onSubmitSignup, emailText, passwordText, error, router, isCreatingAccount, 
  studentSignupFormOpen,
  handleOpenStudentSignupForm }) {

  console.log(studentSignupFormOpen, "student signup")

  return (
      <div>
        <div className={studentCenteredContainer}>
            <div className={header}>
                GET HIRED
            </div>
            <div className={subHeader}>
                Connect to part time work and internships
            </div>

            <div className={studentSignupFormOpen ? inputContainer : inputContainerClosed}>
                <input className={input} 
                        name="student[email]"
                        value={emailText}
                        onChange={(e) => updateStudentSignupForm('email', e.target.value)}
                        type="email" 
                        placeholder="Email"
                        onKeyUp={(e) => detectEnterPress(e, onSubmitSignup)}/>
                <div className={passwordContainer}>
                  <input className={input} 
                          name="student[password]"
                          value={passwordText}
                          onChange={(e) => updateStudentSignupForm('password', e.target.value)}
                          type="password" 
                          placeholder="Password"
                          onKeyUp={(e) => detectEnterPress(e, onSubmitSignup)}
                  />
                  <ValidPasswordVerifier passwordText={passwordText}/>

                  <p className={`${legal}`}>By registering you agree to our 
                      <Link to="/terms" className={white}> Terms & Services </Link> 
                      and 
                      <Link to="/privacy" className={white}> Private Policy</Link>
                  </p>
                </div>
            </div>


              <div>
                <div className={error == "" ? '' : errorMessage}>
                    { error }
                </div>
                <button className={isCreatingAccount ? `${btn} ${material_1} ${shine}` : btn + ' ' + material_1} onClick={()=> {

                  console.log(studentSignupFormOpen)

                  if (studentSignupFormOpen) {
                    submitSignupForm(null)
                  }

                  else {
                    handleOpenStudentSignupForm()
                  }
                }}>Sign me up</button>
              </div>
        </div>
    </div>
  )
}
//      
