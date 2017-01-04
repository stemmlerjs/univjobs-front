import React, { PropTypes } from 'react'
import { studentCenteredContainer, header, subHeader, btn, btnContainer,
 input, inputContainer, errorMessage } from '../styles/StudentSignupStyles.css'

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

    // SUBMIT FORM DATA TO CREATE USER
    submitSignupForm(emailText, passwordText)
      // If good, move to profile page for Students
      .then((success) => {
        if(success) {
          router.push('/profile/st')
        } 
      })
      // If error, print out the error
      .catch((err) => console.log(err))
  }

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
                        value={emailText}
                        onChange={(e) => updateStudentSignupForm('email', e.target.value)}
                        type="email" 
                        placeholder="Email"
                />
                <input className={input} 
                        value={passwordText}
                        onChange={(e) => updateStudentSignupForm('password', e.target.value)}
                        type="password" 
                        placeholder="Password"
                />
            </div>
            <div className={errorMessage}>
                { error }
            </div>
            <button className={btn} onClick={handleUserSubmit}>Sign me up</button>
        </div>
    </div>
  )
}
//      
