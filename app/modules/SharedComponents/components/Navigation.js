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
  logoText, noDeco, btn, btnBabyBlue, pseudoBtn, loginIcon, navItem, univjobsLogo,
  navContainer } from '../styles/NavigationStyles.css'

  import { material_1 } from 'sharedStyles/material.css'

Navigation.propTypes = {
  isAStudent: PropTypes.bool,
  onSwitchUserType: PropTypes.func,
  onOpenLoginModal: PropTypes.func
}

export default function Navigation ({isAStudent, onSwitchUserType, onOpenLoginModal, logoOnly}) {
  return (

    <div className={`${nav} ${navContainer}`}>
        <Link to="/join" className={noDeco}>
            <img className={univjobsLogo} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMTY3LjM4IDIxNS42NSI+PHRpdGxlPkFzc2V0IDI8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8yLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PHBhdGggZD0iTTE2MC4zMywxMzMuNDhjLTcuNzcsNDguNzMtMzUuMzEsNjYuMTYtNzkuODEsNjYuMTYtNDQuNzMsMC03MS4xLTE3LTYzLjMzLTY1LjkyTDMxLjc4LDQwSDc4LjYzTDY0LDEzMi43OGMtMy4zLDIxLjQyLDYuODMsMzAuMzcsMjMuNTQsMzAuMzcsMTQuMzYsMCwyMi4zNy05LjQyLDI1LjY2LTMwLjEzbDE0LjYtOTNoNDcuMDlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUuODQgLTM2LjAyKSIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxwYXRoIGQ9Ik0zMzcuMzYsMTk2LjgxSDI5MS40NUwyNDQuNiw5OS41OGwtMTQuODMsOTUuNThIMTg2LjkyTDIxMS4xNyw0MGg0OWw0NC4yNiw5My43TDMxOSw0MGg0Mi44NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNS44NCAtMzYuMDIpIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTQyNC40NiwxOTUuNEgzNzcuMzhMNDAxLjg2LDQwaDQ3LjA4WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1Ljg0IC0zNi4wMikiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBkPSJNNTQyLjQsMTk1LjRINTA0TDQ2OC43Miw0MGg0OS4ybDE3LjQyLDg3LjU4TDU3Ni4wNyw0MGg0OVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNS44NCAtMzYuMDIpIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTY3NC40NywxOTAuNjljLTQsMjUuNDMtMTMuMTgsNjEtNjkuNDUsNjEtMTEuNzcsMC0xOC4xMy0xLjQxLTQxLjY3LTguOTVsMTQuMTMtMzZjMy41MywxLjQxLDcuNzcsMy41MywxMi4yNCw1LjQyYTQ3LDQ3LDAsMCwwLDE2LjcxLDMuNTNjOS4xOCwwLDE0LjYtOC4yNCwxNy44OS0xNy42NmE4MS44Niw4MS44NiwwLDAsMCw0LTE0LjM2Yy43MS00LjcxLDEuNDEtOC45NSwxLjg4LTExLjc3TDY1MS4xNyw0MEg2OThaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUuODQgLTM2LjAyKSIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxwYXRoIGQ9Ik03ODEuNTksMTk5LjY0Yy01Ni43NCwwLTgyLjg3LTQxLTc2LTg0LjI4QzcxMi4zNyw3MS41Nyw3NDUuMzMsMzYsODAyLjc4LDM2YzU3LDAsODIuNCw0Mi42MSw3NS44MSw4NEM4NzIsMTYxLjczLDgzOC4wOSwxOTkuNjQsNzgxLjU5LDE5OS42NFpNNzk2LjY1LDczYy0yMC40OCwwLTM2LjI2LDEyLjQ4LTQxLDQyLjE0LTQuNzEsMzAuMTMsMTEuMDYsNDcuNTYsMzIsNDcuNTYsMjAuMjUsMCwzNi0xMi40OCw0MC43My00Mi4zOFM4MTcuMzcsNzMsNzk2LjY1LDczWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1Ljg0IC0zNi4wMikiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBkPSJNMTAwMy4zNSwxMTMuNDdjMTQuODMsNC45NCwyNy4zMSwxOS4wNywyMy43OCw0MC43My00LDI1LjktMjUsNDEuMi02My41Nyw0MS4yaC03Mkw5MTYsNDBoNjcuMzNjMjYuNiwwLDUzLjkxLDEwLjEyLDQ4LjczLDQzLjA4QzEwMjkuMjUsMTAxLjQ2LDEwMTguMTksMTA5Ljk0LDEwMDMuMzUsMTEzLjQ3Wm0tNDIuMTQsMTQuNkg5NTAuNjJMOTQ1LDE2My42Mkg5NTUuOGMxMC4xMiwwLDIwLjQ4LTQuMjQsMjIuMzctMTZTOTczLDEyOC4wNyw5NjEuMjEsMTI4LjA3Wm04LjcxLTU2LjVIOTU5LjU2bC01LjE4LDMyLjcyaDguOTVjOS44OSwwLDE3Ljg5LTQuMjQsMTkuNTQtMTUuM0M5ODQuNTIsNzguNjMsOTc4LjE2LDcxLjU3LDk2OS45Miw3MS41N1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNS44NCAtMzYuMDIpIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTExNjIuNSw4Ny41N2MtMTIuMjQtOC4yNC0yMy4zMS0xMy44OS00MS0xMy44OS04LjcxLDAtMTcuMTksNC43MS0xNy44OSwxMC4zNi0uOTQsNC45NCwzLjc3LDguOTUsOS44OSwxMi40OCw2LjM2LDMuNzcsMTUuMDcsNy41MywyMy41NCwxMi4yNCwxNi43Miw5LjE4LDMyLjQ5LDIyLjEzLDI3Ljc4LDQ1LjY3LTUuMTgsMjcuMzEtMjcuMDcsNDUuMi02OC41MSw0NS4yLTMzLjQzLDAtNDYuMTQtOC4yNC02My4wOS0xOS43OGwyMS0zNi4yNmMxNS4wNywxMS43NywyNy4wNywxNy40Miw0MS45MSwxNy40Miw3LjUzLDAsMTguODMtMy4zLDIwLTEwLjEyLjk0LTUuODktMy41My0xMC4zNi05Ljg5LTE0LjEycy0xNS4wNy03LjMtMjMuNTQtMTEuNTRjLTE3LjE5LTguNzEtMzMuNDMtMjAuNDgtMjkuNjYtNDQuMjYsNS40Mi0zNC42MSw0Mi4xNC00NC43Myw3MC42My00NC43MywzMC4zNywwLDQzLjc5LDUuODksNTkuNTYsMTQuNloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNS44NCAtMzYuMDIpIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9nPjwvZz48L3N2Zz4=" />
        </Link>


        {
          !logoOnly
            ? isAStudent === true ? 
                <div className={nav}>
                    <div className={navItem}>
                        <i 
                          className={'fa fa-user login-icon' + ' ' + loginIcon} 
                          aria-hidden="true"
                        >
                        </i>
                    </div>
                    <button className={ `${pseudoBtn} ${btnBabyBlue} ${navItem} ${material_1}` }
                          onClick={onOpenLoginModal}
                    >
                          LOGIN
                    </button>
                    <button onClick={onSwitchUserType} 
                          className={`${btn} ${navItem} ${material_1}`}
                    >
                        EMPLOYER
                    </button>
                </div>
              : 
              <div className={nav}>
                <div className={navItem}>
                    <i className={'fa fa-user login-icon' + ' ' + loginIcon} 
                      aria-hidden="true">
                    </i>
                </div>
                <div className={ `${pseudoBtn} ${btnBabyBlue} ${navItem} ${material_1}` }
                      onClick={onOpenLoginModal}
                >
                    LOGIN
                </div>
                <button onClick={onSwitchUserType} 
                        className={btn + ' ' + navItem + ' ' + material_1}
                >
                    STUDENT
                </button>
              </div>
      
            : ''
        }
      
    </div>
  )
}

