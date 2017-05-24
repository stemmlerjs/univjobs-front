/*Sidebar
 *
 * This components is to display a bar on the left side with numerous buttons 
 *
 * */

// =================== REACT BUILTIN ========================= //
import React, { PropTypes } from 'react'

// ============== THIRD PARTY IMPORTS ====================== //
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
        animationTxt8, sidebarUnivjobsLogo } from 'sharedStyles/sidebar.css'

export default function SideBar ({onLogout, isAStudent, profilePicture}) {
  return (
    <div className={sidebar}>
      <img className={sidebarUnivjobsLogo} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMTY3LjM4IDIxNS42NSI+PHRpdGxlPkFzc2V0IDI8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8yLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PHBhdGggZD0iTTE2MC4zMywxMzMuNDhjLTcuNzcsNDguNzMtMzUuMzEsNjYuMTYtNzkuODEsNjYuMTYtNDQuNzMsMC03MS4xLTE3LTYzLjMzLTY1LjkyTDMxLjc4LDQwSDc4LjYzTDY0LDEzMi43OGMtMy4zLDIxLjQyLDYuODMsMzAuMzcsMjMuNTQsMzAuMzcsMTQuMzYsMCwyMi4zNy05LjQyLDI1LjY2LTMwLjEzbDE0LjYtOTNoNDcuMDlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUuODQgLTM2LjAyKSIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxwYXRoIGQ9Ik0zMzcuMzYsMTk2LjgxSDI5MS40NUwyNDQuNiw5OS41OGwtMTQuODMsOTUuNThIMTg2LjkyTDIxMS4xNyw0MGg0OWw0NC4yNiw5My43TDMxOSw0MGg0Mi44NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNS44NCAtMzYuMDIpIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTQyNC40NiwxOTUuNEgzNzcuMzhMNDAxLjg2LDQwaDQ3LjA4WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1Ljg0IC0zNi4wMikiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBkPSJNNTQyLjQsMTk1LjRINTA0TDQ2OC43Miw0MGg0OS4ybDE3LjQyLDg3LjU4TDU3Ni4wNyw0MGg0OVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNS44NCAtMzYuMDIpIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTY3NC40NywxOTAuNjljLTQsMjUuNDMtMTMuMTgsNjEtNjkuNDUsNjEtMTEuNzcsMC0xOC4xMy0xLjQxLTQxLjY3LTguOTVsMTQuMTMtMzZjMy41MywxLjQxLDcuNzcsMy41MywxMi4yNCw1LjQyYTQ3LDQ3LDAsMCwwLDE2LjcxLDMuNTNjOS4xOCwwLDE0LjYtOC4yNCwxNy44OS0xNy42NmE4MS44Niw4MS44NiwwLDAsMCw0LTE0LjM2Yy43MS00LjcxLDEuNDEtOC45NSwxLjg4LTExLjc3TDY1MS4xNyw0MEg2OThaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUuODQgLTM2LjAyKSIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxwYXRoIGQ9Ik03ODEuNTksMTk5LjY0Yy01Ni43NCwwLTgyLjg3LTQxLTc2LTg0LjI4QzcxMi4zNyw3MS41Nyw3NDUuMzMsMzYsODAyLjc4LDM2YzU3LDAsODIuNCw0Mi42MSw3NS44MSw4NEM4NzIsMTYxLjczLDgzOC4wOSwxOTkuNjQsNzgxLjU5LDE5OS42NFpNNzk2LjY1LDczYy0yMC40OCwwLTM2LjI2LDEyLjQ4LTQxLDQyLjE0LTQuNzEsMzAuMTMsMTEuMDYsNDcuNTYsMzIsNDcuNTYsMjAuMjUsMCwzNi0xMi40OCw0MC43My00Mi4zOFM4MTcuMzcsNzMsNzk2LjY1LDczWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1Ljg0IC0zNi4wMikiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBkPSJNMTAwMy4zNSwxMTMuNDdjMTQuODMsNC45NCwyNy4zMSwxOS4wNywyMy43OCw0MC43My00LDI1LjktMjUsNDEuMi02My41Nyw0MS4yaC03Mkw5MTYsNDBoNjcuMzNjMjYuNiwwLDUzLjkxLDEwLjEyLDQ4LjczLDQzLjA4QzEwMjkuMjUsMTAxLjQ2LDEwMTguMTksMTA5Ljk0LDEwMDMuMzUsMTEzLjQ3Wm0tNDIuMTQsMTQuNkg5NTAuNjJMOTQ1LDE2My42Mkg5NTUuOGMxMC4xMiwwLDIwLjQ4LTQuMjQsMjIuMzctMTZTOTczLDEyOC4wNyw5NjEuMjEsMTI4LjA3Wm04LjcxLTU2LjVIOTU5LjU2bC01LjE4LDMyLjcyaDguOTVjOS44OSwwLDE3Ljg5LTQuMjQsMTkuNTQtMTUuM0M5ODQuNTIsNzguNjMsOTc4LjE2LDcxLjU3LDk2OS45Miw3MS41N1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNS44NCAtMzYuMDIpIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTExNjIuNSw4Ny41N2MtMTIuMjQtOC4yNC0yMy4zMS0xMy44OS00MS0xMy44OS04LjcxLDAtMTcuMTksNC43MS0xNy44OSwxMC4zNi0uOTQsNC45NCwzLjc3LDguOTUsOS44OSwxMi40OCw2LjM2LDMuNzcsMTUuMDcsNy41MywyMy41NCwxMi4yNCwxNi43Miw5LjE4LDMyLjQ5LDIyLjEzLDI3Ljc4LDQ1LjY3LTUuMTgsMjcuMzEtMjcuMDcsNDUuMi02OC41MSw0NS4yLTMzLjQzLDAtNDYuMTQtOC4yNC02My4wOS0xOS43OGwyMS0zNi4yNmMxNS4wNywxMS43NywyNy4wNywxNy40Miw0MS45MSwxNy40Miw3LjUzLDAsMTguODMtMy4zLDIwLTEwLjEyLjk0LTUuODktMy41My0xMC4zNi05Ljg5LTE0LjEycy0xNS4wNy03LjMtMjMuNTQtMTEuNTRjLTE3LjE5LTguNzEtMzMuNDMtMjAuNDgtMjkuNjYtNDQuMjYsNS40Mi0zNC42MSw0Mi4xNC00NC43Myw3MC42My00NC43MywzMC4zNywwLDQzLjc5LDUuODksNTkuNTYsMTQuNloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNS44NCAtMzYuMDIpIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9nPjwvZz48L3N2Zz4="/>
      <div className={sidebarItemsContainer}>
        {isAStudent 
          ? <Link to="/profile/st" className={noDecoration}>
              <div className={sidebarItem}>
                { profilePicture.indexOf("undefined") === -1
                    ? <img className={profileImg + " " + animationItem8} src={profilePicture}></img>
                    : ''
                }
                <div className={animationTxt8}>Profile</div>
                <div className={animateLine1}></div>
              </div>
            </Link>
          : <Link to="/profile/em" className={noDecoration}>
              <div className={sidebarItem}>
                { profilePicture.indexOf("undefined") === -1
                    ? <img className={profileImg + " " + animationItem8} src={profilePicture}></img>
                    : ''
                }
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
        {/*
          SETTINGS

            - we don't need this at all right now.

        <Link to="/settings" className={noDecoration}>
          <div className={sidebarItem}>
            <i className={animationItem4 + " fa fa-cog"} aria-hidden="true"></i>
            <div className={animationTxt4}>Settings</div>
            <div className={animateLine2}></div>
          </div>
        </Link>
        */}

        
        
        <div className={sidebarItem} onClick={onLogout}>
          <i className={animationItem6 + " fa fa-power-off"} aria-hidden="true"></i>
          <div className={animationTxt6}>Logout</div>
          <div className={animateLine2}></div>
        </div>
      </div>
    </div>
  )
}
