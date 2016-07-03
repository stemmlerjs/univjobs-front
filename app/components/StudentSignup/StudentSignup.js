import React, { PropTypes } from 'react'
import { centeredContainer, header, subHeader, btn, btnContainer,
 input, inputContainer, errorMessage } from './styles.css'

 //

StudentSignup.propTypes = {
  submitSignupForm: PropTypes.func.isRequired,
  updateStudentSignupForm: PropTypes.func.isRequired,
  emailText: PropTypes.string.isRequired,
  passwordText: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired
}

export default function StudentSignup ({submitSignupForm, updateStudentSignupForm, emailText, passwordText, error, router}) {
  function handleUserSubmit(e) {
    e.preventDefault();
    submitSignupForm(emailText, passwordText)
      .then((actionResult) => {
        if(actionResult) {
          router.push('/createaccount/st')
        } 
      }).catch((err) => console.log(err))
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