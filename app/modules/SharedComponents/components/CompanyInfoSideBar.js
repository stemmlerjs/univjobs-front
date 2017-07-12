
import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import config from 'config'
import { slide as Menu } from 'react-burger-menu'

import { logoContainer, bodyContainer, titleContainer, aboutContainer, detailsContainer,
    titleText, altTitleText, aboutText, aboutTitleText, expandIconSpan, expandIcon, expandIconClosed,
    aboutTextHidden, detailItem, iconContainer, detail, detailDivider, link, 
    efimClass } from '../styles/CompanyInfoSideBar.css'

import { altImageContainer } from '../styles/JobCard.css'

let styles = {
  bmMenu: {
    background: 'white',
    padding: '0',
    fontSize: '1.15em',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
  bmMenuWrap: {
    zIndex: '400',
    top: '0px'
  },
  bmOverlay: {
    zIndex: '399',
    top: '0px'
  }
}

export default function CompanyInfoSideBar ({ isOpen, logoUrl, employerName, industry, about, numEmployees, headquarters, website, 
  aboutSectionExpanded,
  handleToggleAboutSection,
  onStateChange
}) {

  return (
      <Menu onStateChange={onStateChange} width={ 400 } pageWrapId={ "page-wrap" } right styles={ styles } isOpen={isOpen}>
        <div className={logoContainer}>
           { 
             logoUrl 
              ? logoUrl.indexOf("null") === -1 || logoUrl.indexOf("avatar") === -1 || logoUrl === undefined
                ? <div className={efimClass}><i className={'fa fa-building-o'} aria-hidden="true"></i></div>
                : <img src={logoUrl}/> 
              : ''
            }
        </div>
        <div className={bodyContainer}>
          <div className={titleContainer}>

            <div className={titleText}>{employerName}</div>
            <div className={altTitleText}>{industry}</div>

          </div>

          <div className={detailsContainer}>
            <div className={detailItem}>
              <div className={iconContainer}>
                <i className={`fa fa-users`} aria-hidden="true"></i>
              </div>
              <div className={`${detail} ${detailDivider}`}>
                <div>{numEmployees}</div>
                <div className={altTitleText}># of employees</div>
              </div>
            </div>
            <div className={detailItem}>
              <div className={iconContainer}>
                <i className={`fa fa-building`} aria-hidden="true"></i>
              </div>
              <div className={`${detail} ${detailDivider}`}>
                <div>{headquarters}</div>
                <div className={altTitleText}>Headquarters</div>
              </div>
            </div>
            <div className={detailItem}>
              <div className={iconContainer}>
                <i className={`fa fa-globe`} aria-hidden="true"></i>
              </div>
              { website !== "" && website !== undefined 
                ? <div className={detail}>
                    <div><a className={link} href={website}>{website}</a></div>
                    <div className={altTitleText}>Website</div>
                  </div>
                : ''
              }
              
            </div>
          </div>

          <div className={aboutContainer}>

            <div onClick={handleToggleAboutSection} className={aboutTitleText}>About <span className={expandIconSpan}>
              <i className={`fa fa-angle-right ${aboutSectionExpanded ? expandIcon  : expandIcon + " " + expandIconClosed}`} aria-hidden="true">
              </i>
              </span>
            </div>
            <div className={`${aboutText} ${aboutSectionExpanded ? aboutTextHidden : ''}`}>{about}</div>
          
          </div>
  
        </div>
      </Menu>
  )
}