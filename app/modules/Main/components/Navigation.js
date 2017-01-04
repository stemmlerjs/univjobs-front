import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { nav, leftsideNavItems, rightsideNavItems, 
  logoText, noDeco, btn, btnBabyBlue, pseudoBtn, loginIcon} from '../styles/NavigationStyles.css'

Navigation.propTypes = {
  isAStudent: PropTypes.bool.isRequired,
  onSwitchUserType: PropTypes.func.isRequired,
  onOpenLoginModal: PropTypes.func.isRequired
}

export default function Navigation ({isAStudent, onSwitchUserType, onOpenLoginModal}) {
  return (

    <div className={nav}>
        <Link to="/join" className={noDeco}>
            <span className={logoText}>UNIVJOBS</span>
        </Link>

      { isAStudent === true ? 
          <div className={nav}>
              <div>
                  <i 
                    className={'fa fa-user login-icon' + ' ' + loginIcon} 
                    aria-hidden="true"
                  >
                  </i>
              </div>
              <div className={ `${pseudoBtn} ${btnBabyBlue}` }
                    onClick={onOpenLoginModal}
               >
                    LOGIN
              </div>
              <button onClick={onSwitchUserType} 
                    className={btn}
              >
                  EMPLOYER
              </button>
          </div>
        : 
        <div className={nav}>
          <div>
              <i className={'fa fa-user login-icon' + ' ' + loginIcon} 
                aria-hidden="true">
              </i>
          </div>
          <div className={ `${pseudoBtn} ${btnBabyBlue}` }
                onClick={onOpenLoginModal}
           >
              LOGIN
          </div>
          <button onClick={onSwitchUserType} 
                  className={btn}
          >
              STUDENT
          </button>
        </div>
      }
    </div>
  )
}

