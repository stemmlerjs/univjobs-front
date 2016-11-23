import React, { PropTypes } from 'react'
import { sidebar, sidebarLogo, sidebarItemsContainer, sidebarItem, profileImg, noDecoration } from 'sharedStyles/styles.css'
import { Link } from 'react-router'

export default function SideBar ({onLogout, isAStudent}) {
  return (
    <div className={sidebar}>
      <div className={sidebarLogo}>LOGO</div>
      <div className={sidebarItemsContainer}>
        {isAStudent 
          ? <Link to="/profile/st" className={noDecoration}>
              <div className={sidebarItem}><img className={profileImg} src="https://avatars.slack-edge.com/2016-05-04/40115696260_f516537b47175c5991bd_512.jpg"></img></div>
            </Link>
          : <Link to="/profile/em" className={noDecoration}>
              <div className={sidebarItem}><img className={profileImg} src="https://avatars.slack-edge.com/2016-05-04/40115696260_f516537b47175c5991bd_512.jpg"></img></div>
            </Link>
        }
        {isAStudent 
          ? <Link to="/dashboard/st" className={noDecoration}>
              <div className={sidebarItem}><i className="fa fa-search" aria-hidden="true"></i></div>
            </Link>
          : <Link to="/dashboard/em" className={noDecoration}>
              <div className={sidebarItem}><i className="fa fa-search" aria-hidden="true"></i></div>
            </Link>
        }
        <div className={sidebarItem}><i className="fa fa-users" aria-hidden="true"></i></div>
        <div className={sidebarItem}><i className="fa fa-plus-square" aria-hidden="true"></i></div>

      {/* PINNED JOBS */}
        <div className={sidebarItem}><i className="fa fa-thumb-tack" aria-hidden="true"></i></div>
        <div className={sidebarItem} onClick={onLogout}>
          <i className="fa fa-power-off" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  )
}