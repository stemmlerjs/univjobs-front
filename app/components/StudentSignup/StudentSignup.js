import React, { PropTypes } from 'react'
import { centeredContainer, header, subHeader, btn, btnContainer,
 input, inputContainer, errorMessage } from './styles.css'

StudentSignup.propTypes = {
  submitSignupForm: PropTypes.func.isRequired,
  updateStudentSignupForm: PropTypes.func.isRequired,
  emailText: PropTypes.string.isRequired,
  passwordText: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired
}

export default function StudentSignup ({submitSignupForm, updateStudentSignupForm, emailText, passwordText, error}) {
  function handleUserSubmit(e) {
    e.preventDefault();
    submitSignupForm(emailText, passwordText)
      .then((actionResult) => {
        if(actionResult.type === 'CREATE_USER_ACCOUNT_SUCCESS') {
          // direct to next page!!!
        } else {
          // something went wrong creating the user
        }
      })
  }

  return (
    <div className={centeredContainer}>
      <div className={header}>
        GET HIRED
      </div>
      <div className={subHeader}>
        Connect to part time work and internships
      </div>
      <div className={inputContainer}>
        <input className={input} 
          value={emailText}
          onChange={(e) => updateStudentSignupForm('email', e.target.value)}
          type="email" 
          placeholder="Email"/>
        <input className={input} 
          value={passwordText}
          onChange={(e) => updateStudentSignupForm('password', e.target.value)}
          type="password" 
          placeholder="Password"/>
      </div>
      <div className={errorMessage}>
        { error }
      </div>
      <button className={btn} onClick={handleUserSubmit}>Sign me up</button>
    </div>
  )
}