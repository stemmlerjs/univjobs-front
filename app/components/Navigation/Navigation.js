import React, { PropTypes } from 'react'
import { nav, leftsideNavItems, rightsideNavItems, 
  logo, btn, pseudoBtn, loginIcon } from './styles.css'

Navigation.PropTypes = {
  isAStudent: PropTypes.bool.isRequired
}

export default function Navigation ({isAStudent}) {
  // we can conditionally render this navigation page as well
  console.log("Is a student?", isAStudent);

  return (
    <div className={nav}>
      <div className={leftsideNavItems}>
          <div className={logo}>
            <img src="https://github.com/UnivJobs/univjobs-front/blob/01-KhalilSetup/images/front/defaultlogo.PNG?raw=true"></img>
          </div>
      </div>

      { isAStudent === true ? 
        <div className={rightsideNavItems}>
          <div><i className={'fa fa-user login-icon' + ' ' + loginIcon} aria-hidden="true"></i></div>
          <div className={pseudoBtn}>LOGIN</div>
          <button className={btn}>EMPLOYER</button>
        </div>
        : 
        <div className={rightsideNavItems}>
          <div><i className={'fa fa-user login-icon' + ' ' + loginIcon} aria-hidden="true"></i></div>
          <div className={pseudoBtn}>LOGIN</div>
          <button className={btn}>STUDENT</button>
        </div>
      }
    </div>
  )
}