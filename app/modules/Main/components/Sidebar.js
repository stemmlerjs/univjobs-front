/*Sidebar
 *
 * This components is to display a bar on the left side with numerous buttons 
 *
 * */

// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============THIRD PARTY IMPORTS========================= //
import { Link } from 'react-router'

// ================CSS IMPORTS============================== //
import { sidebar, sidebarLogo, sidebarItemsContainer, 
        sidebarItem, profileImg, noDecoration, 
        animateItem1, profileTxt, animateLine1,
        animationItem2, animateLine2, animationTxt2, 
        animationItem3, animationTxt3, 
        animationItem4, animationTxt4, animationItem5, 
        animationTxt5, animationItem6, animationTxt6, 
        animationItem7, animationTxt7, animationItem8, 
        animationTxt8 } from 'sharedStyles/sidebar.css'

export default function SideBar ({onLogout, isAStudent}) {
  return (
    <div className={sidebar}>
      <div className={sidebarLogo}>LOGO</div>
      <div className={sidebarItemsContainer}>
        {isAStudent 
          ? <Link to="/profile/st" className={noDecoration}>
              <div className={sidebarItem}>
                <img className={profileImg + " " + animationItem8} src="https://avatars.slack-edge.com/2016-05-04/40115696260_f516537b47175c5991bd_512.jpg"></img>
                <div className={animationTxt8}>Profile</div>
                <div className={animateLine1}></div>
              </div>
            </Link>
          : <Link to="/profile/em" className={noDecoration}>
              <div className={sidebarItem}>
                <img className={profileImg + " " + animationItem8} src="https://avatars.slack-edge.com/2016-05-04/40115696260_f516537b47175c5991bd_512.jpg"></img>
                <div className={animationTxt8}>Profile</div>
                <div className={animateLine1}></div>
              </div>
            </Link>
        }

        {isAStudent 
          ? <Link to="/dashboard/st" className={noDecoration}>
              <div className={sidebarItem}>
                <i className={animationItem2 + " fa fa-search"} aria-hidden="true"></i>
                <div className={animationTxt2}>Dashboard</div>
                <div className={animateLine2}></div>
              </div>
            </Link>
          : <Link to="/dashboard/em" className={noDecoration}>
              <div className={sidebarItem}>
                <i className={animationItem2 + " fa fa-search"} aria-hidden="true"></i>
                <div className={animationTxt2}>Dashboard</div>
                <div className={animateLine2}></div>
              </div>
            </Link>
        }

        {isAStudent
          ? <Link to="/myapplications/st" className={noDecoration}>
              <div className={sidebarItem}>
                <i className={animationItem3 + " fa fa-file-text"} aria-hidden="true"></i>
                <div className={animationTxt3}>My Applications</div>
                <div className={animateLine2}></div>
              </div>
            </Link>
          : <Link to="/myapplicants/em" className={noDecoration}>
              <div className={sidebarItem}>
                <i className={animationItem3 + " fa fa-address-card-o"} aria-hidden="true"></i>
                <div className={animationTxt3}>My Applicants</div>
                <div className={animateLine2}></div>
              </div>
            </Link>
        }

      {/* PINNED JOBS */}
      {isAStudent
        ? <Link to="/pinnedjobs" className={noDecoration}>
            <div className={sidebarItem}>
              <i className={animationItem5 + " fa fa-thumb-tack"} aria-hidden="true"></i>
              <div className={animationTxt5}>My Pinned Jobs</div>
              <div className={animateLine2}></div>
            </div>
          </Link>
        : <span></span>
      }

      {/* INVITATIONS / POST A LISTING */}
      { isAStudent
        ? <Link to="/invitations" className={noDecoration}>
            <div className={sidebarItem}>
              <i className={animationItem7 + " fa fa-envelope"} aria-hidden="true"></i>
              <div className={animationTxt7}>Invitations</div>
              <div className={animateLine2}></div>
            </div>
          </Link>
        : <Link to="/categories" className={noDecoration}>
            <div className={sidebarItem}>
              <i className={animationItem7 + " fa fa-plus"} aria-hidden="true"></i>
              <div className={animationTxt7}>New Listing</div>
              <div className={animateLine2}></div>
            </div>
          </Link>
      }
        
        <Link to="/settings" className={noDecoration}>
          <div className={sidebarItem}>
            <i className={animationItem4 + " fa fa-cog"} aria-hidden="true"></i>
            <div className={animationTxt4}>Settings</div>
            <div className={animateLine2}></div>
          </div>
        </Link>


        
        
        <div className={sidebarItem} onClick={onLogout}>
          <i className={animationItem6 + " fa fa-power-off"} aria-hidden="true"></i>
          <div className={animationTxt6}>Logout</div>
          <div className={animateLine2}></div>
        </div>
      </div>
    </div>
  )
}
