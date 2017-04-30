/*Navigation
 *
 * This components is to display the Nav bar for anything that does not need a token 
 *
 * */
// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============THIRD PARTY IMPORTS========================= //
import { Link } from 'react-router'

// ================CSS IMPORTS============================== //
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
              <button className={ `${pseudoBtn} ${btnBabyBlue}` }
                    onClick={onOpenLoginModal}
               >
                    LOGIN
              </button>
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

