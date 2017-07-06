
import React, { PropTypes } from 'react'

import { tooltip, hidden, tooltiptext, good, bad, passwordQualifications } from '../styles/ValidPasswordVerifier.css'

const ValidPasswordVerifier = ({passwordText}) => (
    <div className={tooltip}>
      <div className={passwordText == "" ? hidden : tooltiptext}>
        <div>Password must be:</div>
        <div className={passwordQualifications}>
          <div>
            {
              passwordText.length >= 8
                ? <i className={`fa fa-check ${good}`} aria-hidden="true"></i>
                : <i className={`fa fa-times ${bad}`} aria-hidden="true"></i>
            }        
            Minimum 8 characters long
          </div>
          <div>
            {
              /^(.*[A-Z].*)$/.test(passwordText)
                ? <i className={`fa fa-check ${good}`} aria-hidden="true"></i>
                : <i className={`fa fa-times ${bad}`} aria-hidden="true"></i>
            }
            Include one uppercase character
          </div>

          <div>
            {
              /^(.*[a-z].*)$/.test(passwordText)
                ? <i className={`fa fa-check ${good}`} aria-hidden="true"></i>
                : <i className={`fa fa-times ${bad}`} aria-hidden="true"></i>
            }
            Include one lowercase character
          </div>
          <div>
            {
              /^(.*[0-9].*)$/.test(passwordText)
                ? <i className={`fa fa-check ${good}`} aria-hidden="true"></i>
                : <i className={`fa fa-times ${bad}`} aria-hidden="true"></i>
            }
            Include one digit
          </div>
          <div>
            {
              /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(passwordText)
                ? <i className={`fa fa-check ${good}`} aria-hidden="true"></i>
                : <i className={`fa fa-times ${bad}`} aria-hidden="true"></i>
            }
          Include one symbol
          </div>
        </div>
      </div>
    </div>
)

export default ValidPasswordVerifier
