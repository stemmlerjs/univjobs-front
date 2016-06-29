import React, { PropTypes } from 'react'
import { nav, leftsideNavItems, rightsideNavItems, 
  logo, btn, pseudoBtn, loginIcon } from './styles.css'

export default function Navigation () {
  return (
    <div className={nav}>
      <div className={leftsideNavItems}>
          <div className={logo}>
            <img src="https://github.com/UnivJobs/univjobs-front/blob/01-KhalilSetup/images/front/defaultlogo.PNG?raw=true"></img>
          </div>
      </div>
      <div className={rightsideNavItems}>
          <div><i className={'fa fa-user login-icon' + ' ' + loginIcon} aria-hidden="true"></i></div>
          <div className={pseudoBtn}>LOGIN</div>
          <button className={btn}>EMPLOYER</button>
      </div>
    </div>
  )
}