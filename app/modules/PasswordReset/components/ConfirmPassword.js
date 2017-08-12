
import React, { PropTypes } from 'react'

import { container, title, subtext, emailContainer, emailInput, emailLabel,
          buttonContainer, resetButton, error, resubmitText } from '../styles/PasswordResetStyles.css'

import { validateResetPasswords } from 'helpers/utils'
import { ValidPasswordVerifier } from 'modules/SharedComponents'

export default function ConfirmPassword ({ isVerifying, verifySuccess, newPassword, confirmNewPassword,
    handleSubmitNewPassword,
    handleUpdateField
}) {
  return (
    <div id="password-confirm-hero" className={container}>

      {
        !verifySuccess
          ? <h3>Something went wrong on our end. Try reloading the page. If the problem ensists, please let us know.</h3>
          : <div>
              <h1 className={title}>Password Reset</h1>
              <h4 className={subtext}>Finally, enter your new password.</h4>

              <div className={emailContainer}>
                <label className={emailLabel} htmlFor="password">Password</label>
                <input className={validateResetPasswords(newPassword, confirmNewPassword) ? emailInput : emailInput + ' ' + error} 
                  name="password" 
                  onChange={(e) => {
                    handleUpdateField('newPassword', e.target.value)

                  }}
                  type="password"/>
                  <ValidPasswordVerifier passwordText={newPassword}/>

                  <label className={emailLabel} htmlFor="confirmPassword">Confirm Password</label>
                  <input className={validateResetPasswords(newPassword, confirmNewPassword) ? emailInput : emailInput + ' ' + error} 
                  name="confirmPassword" 
                  onChange={(e) => {
                    handleUpdateField('confirmNewPassword', e.target.value)

                  }}
                  type="password"/>
              </div>

              <div className={buttonContainer}>
                <button onClick={handleSubmitNewPassword} className={resetButton}>SUBMIT</button>
              </div>

            </div>
      }
          
    </div>
  )
}



