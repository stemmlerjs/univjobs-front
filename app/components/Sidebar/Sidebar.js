import React, { PropTypes } from 'react'
import { sidebar, sidebarLogo, sidebarItemsContainer, sidebarItem, profileImg } from 'sharedStyles/styles.css'

export default function SideBar (props) {
  return (
    <div className={sidebar}>
      <div className={sidebarLogo}>LOGO</div>
      <div className={sidebarItemsContainer}>
        <div className={sidebarItem}><img className={profileImg} src="https://avatars.slack-edge.com/2016-05-04/40115696260_f516537b47175c5991bd_512.jpg"></img></div>
        <div className={sidebarItem}><i className="fa fa-search" aria-hidden="true"></i></div>
        <div className={sidebarItem}><i className="fa fa-users" aria-hidden="true"></i></div>
        <div className={sidebarItem}><i className="fa fa-plus-square" aria-hidden="true"></i></div>
        <div className={sidebarItem}><i className="fa fa-thumb-tack" aria-hidden="true"></i></div>
        <div className={sidebarItem}><i className="fa fa-power-off" aria-hidden="true"></i></div>
      </div>
    </div>
  )
}