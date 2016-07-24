import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { nav, leftsideNavItems, rightsideNavItems, 
  logoText, noDeco, btn, pseudoBtn, loginIcon} from './styles.css'


Navigation.ropTypes = {
  isAStudent: PropTypes.bool.isRequired,
  onSwitchUserType: PropTypes.func.isRequired,
  onOpenLoginModal: PropTypes.func.isRequired
}

export default function Navigation ({isAStudent, onSwitchUserType, onOpenLoginModal}) {
  return (
    <div className={nav}>
      <div className={leftsideNavItems}>
          <Link to="/" className={noDeco}>
            <span className={logoText}>UNIVJOBS</span>
          </Link>
      </div>

      { isAStudent === true ? 
        
        <div className={rightsideNavItems}>
          <div><i className={'fa fa-user login-icon' + ' ' + loginIcon} aria-hidden="true"></i></div>
          <div className={pseudoBtn} onClick={onOpenLoginModal}>LOGIN</div>
          <button onClick={onSwitchUserType} className={btn}>EMPLOYER</button>
        </div>
        : 
        <div className={rightsideNavItems}>
          <div><i className={'fa fa-user login-icon' + ' ' + loginIcon} aria-hidden="true"></i></div>
          <div className={pseudoBtn} onClick={onOpenLoginModal}>LOGIN</div>
          <button onClick={onSwitchUserType} className={btn}>STUDENT</button>
        </div>
      }
    </div>
  )
}

