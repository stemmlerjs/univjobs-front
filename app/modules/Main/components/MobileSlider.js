
// =================== REACT BUILTIN ========================= //
import React, { PropTypes } from 'react'

// ================CSS IMPORTS============================== //
import { mobileNav, menuClass, menuSectionClass, panelClass, burgerMenuClass, univjobsLogo,noticeHeader,
    noticeHeaderCloseButton } from '../styles/MobileSlider.css'
import { Link } from 'react-router'

export default function MobileSlider ({ onSelectMenuItem, onToggleMenu, page, 
  isAStudent, closeMenuOnRouteChange, logout, children, 
  showMobileNotificationHeader,
  hideMobileNotificationHeader }) {

  let pageTitle = ""

  function setPageTitle () {
    switch (page) {
      case "/dashboard/st":
        return "Dashboard"
      case "/dashboard/em":
        return "Dashboard"
      case "/profile/st":
        return "My Profile"
      case "/profile/em":
        return "My Profile"
      case "/myapplications/st":
        return "My Applications"
      case "/myapplicants/em":
        return "My Applicants"
      case "/pinnedjobs":
        return "Pinned Jobs"
      case "/categories":
        return "New Job"
      case "/settings/st":
        return "Settings"
      default:
        return ""
    }
  }
  
  pageTitle = setPageTitle()

  return (
    <div className={mobileNav}>
      <nav id="menu" className={menuClass}>
        <section className={`menu-section ${menuSectionClass}`}>
          <h3>Univjobs</h3>
            <ul>
            <li>
              {
                isAStudent
                  ? <Link onClick={closeMenuOnRouteChange} to="/dashboard/st">Dashboard</Link>
                  : <Link onClick={closeMenuOnRouteChange} to="/dashboard/em">Dashboard</Link>
              }
            </li>
            <li>
              {
                isAStudent
                  ? <Link onClick={closeMenuOnRouteChange} to="/profile/st">Profile</Link>
                  : <Link onClick={closeMenuOnRouteChange} to="/profile/em">Profile</Link>
              }
            </li>
            {
              isAStudent
                ? <li><Link onClick={closeMenuOnRouteChange} to="/myapplications/st">My Applications</Link></li>
                : <li><Link onClick={closeMenuOnRouteChange} to="/myapplicants/em">My Applicants</Link></li>
            }

            {
              isAStudent
                ? <li><Link onClick={closeMenuOnRouteChange} to="/pinnedjobs">Pinned Jobs</Link></li>
                : ''
            }

            {
              !isAStudent
                ? <li><Link onClick={closeMenuOnRouteChange} to="/categories">Categories</Link></li>
                : ''
            }

            {
              isAStudent
                ? <li><Link onClick={closeMenuOnRouteChange} to="/settings/st">Settings</Link></li>
                : ''
            }

            <li onClick={logout}>Logout</li>

 
          </ul>
        </section>
      </nav>

      <main id="panel" className={panelClass}>
        <header>
          <button onClick={onToggleMenu} className={`toggle-button ${burgerMenuClass}`}><i className={"fa fa-bars"} aria-hidden="true"></i></button>

          <img className={univjobsLogo} src='data:image/png;base64,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' />

          <div>{pageTitle}</div>
        </header>

        {
          /*
           * [MOBILE NOTIFICATION HEADER]
           *
           * Use this section here to show a mobile notification header.
           */

          showMobileNotificationHeader && (page !== "/profile/st" && page !== "/profile/em")
            ? <div className={noticeHeader}>
                <div className={noticeHeaderCloseButton} 
                  onClick={hideMobileNotificationHeader}><i className={"fa fa-times"} aria-hidden="true"></i></div>
                <div>Hey, just a heads up. The mobile version of the site is still under construction.</div>
                <div>For the current best experience, check out the site from your laptop.</div>
              </div>
            : ''
        }
        

        {
          /*
           * RENDER THE REST OF THE ENTIRE APP
           * IN MOBILE VIEW
           */
        }

          {children}

      </main>
    </div>
  )
}
