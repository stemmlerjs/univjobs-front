
import React, { PropTypes } from 'react'

import { validatePersonalEmail } from 'helpers/utils'

import { container, title, subtext, emailContainer, emailInput, emailLabel,
          buttonContainer, resetButton, error, resubmitText } from '../styles/PasswordResetStyles.css'

export default function ResetPassword ({ handleSubmit, handleUpdateField, email, submitSuccess, isSubmitting }) {
  return (
    <div id="password-reset-hero" className={container}>

      <h1 className={title}>Password Reset</h1>
      {
        !submitSuccess
          ? <div>

              <h4 className={subtext}>Enter your email address. <br/>We'll send a code to your email so that you can reset your password.</h4>

              <div className={emailContainer}>
                <label className={emailLabel} htmlFor="email">Email</label>
                <input className={validatePersonalEmail(email) ? emailInput : emailInput + ' ' + error} 
                  name="email" 
                  onChange={(e) => {
                    handleUpdateField('email', e.target.value)

                  }}
                  type="email"/>
              </div>
              <div className={buttonContainer}>
                <button onClick={handleSubmit} className={resetButton}>Reset</button>
              </div>

            </div>
          : <div>
              <h4 className={subtext}>You should be receiving an email with instructions shortly.</h4>
              <p>Didn't get the email? Click <span className={resubmitText} onClick={handleSubmit}>here</span> to resend.</p>
            </div>
      }
      
          
    </div>
  )
}



