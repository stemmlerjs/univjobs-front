
import React, { PropTypes } from 'react'
//import { } from '../styles/JobInfoSidebar.css'

import { slide as Menu } from 'react-burger-menu'

import ReactTooltip from 'react-tooltip'
import config from 'config'

import { logoContainer, bodyContainer, detailsContainer,
    titleText, altTitleText, aboutTitleText, expandIconSpan, expandIcon, expandIconClosed,
    aboutTextHidden, detailItem, iconContainer, detail, detailDivider, link } from '../styles/CompanyInfoSideBar.css'

import  { topContainer, imgContainer, titleContainer, logo, iconsSectionContainer,
  applicantsContainer, clock, clock_0_50, clock_51_75, clock_76_100, paidContainer, moneyIcon,
  calendarIcon, locationIconNoHover, locationIcon, startDateContainer, aboutContainer, aboutText
 } from '../styles/JobInfoSidebar.css'

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

export default function JobCardModal({ isOpen, onStateChange, logoUrl, info,

  handleToggleResponsibilitiesSection,
  responsibilitiesSectionExpanded,

  handleToggleQualificationsSection,
  qualificationsSectionExpanded,

  handleToggleDesiredSkillsSection,
  desiredSkillsSectionExpanded,

  handleToggleCompensationSection,
  compensationSectionExpanded

 }) { 
  return (
    <Menu onStateChange={onStateChange} width={ 400 } pageWrapId={ "page-wrap" } right styles={ styles } isOpen={isOpen}>
      <div className={topContainer}>
        <div className={imgContainer}>
          { 
            logoUrl.indexOf("avatar") === -1 
              ? <div className={altImageContainer}><i className={'fa fa-building-o'} aria-hidden="true"></i></div>
              : <img className={logo} src={logoUrl ? config.mediaUrl + logoUrl : ''} />
            }
        </div>
        <div className={titleContainer}>
            <div className={titleText}>{info.title}</div>
            <div className={altTitleText}>{info.jobType === 1 
                      ? 'One Time Gig' :
                      info.jobType === 2 
                      ? 'Summer' :
                      info.jobType === 3 
                      ? 'Winter' :
                      info.jobType === 4
                      ? 'Freelance' :
                      info.jobType === 5
                      ? 'Campus Rep' :
                      info.jobType === 6
                      ? 'Part-time' :
                      info.jobType === 7
                      ? 'Full-time' :
                      ''}
            </div>
          
        </div>

      </div>
      <div className={iconsSectionContainer}>

        {
          /*
           * PAID
           */
        }

        <div className={paidContainer}>
          <i className={`fa fa-usd ${moneyIcon}`} aria-hidden="true"></i> 
          <span>{info.paid === 0 ? 'Not paid' : 'Paid job'}</span>
        </div> 

        {
          /*
           * START DATE
           */
        }

        <div className={startDateContainer}>
          <i className={`fa fa-calendar ${calendarIcon}`} aria-hidden="true"></i> 
          <span>{info.startDate}</span>
        </div>

        {
          /*
           * LOCATION
           */
        }

        <div className={applicantsContainer}>
            <div><i className={`fa fa-map-marker ${ locationIconNoHover}`} aria-hidden="true"></i></div>
            <div><span>{info.remote_work === 0 
              ? info.location 
              : 'Remote work'}</span></div>
          </div>

        {
          /*
           * APPLICANTS
           */
        }
        <div className={applicantsContainer}>
          <i className={`fa fa-clock-o ${clock} ${
              ((info.applicant_count / info.max_applicants) * 100) >= 0 && ((info.applicant_count / info.max_applicants) * 100) <= 50
                  ? clock_0_50 :
              
              ((info.applicant_count / info.max_applicants) * 100) >= 51 && ((info.applicant_count / info.max_applicants) * 100) <= 75
                  ? clock_51_75 :
              
                ((info.applicant_count / info.max_applicants) * 100) >= 76 && ((info.applicant_count / info.max_applicants) * 100) <= 100
                  ? clock_76_100 :
              ''   
          }`} aria-hidden="true"></i>
          {`${info.max_applicants - info.applicant_count} of ${info.max_applicants} applicants left.`}
        </div>
        
      </div>
      <div className={bodyContainer}>

        {
          /*
          * RESPONSIBILITIES
          */
        }

        <div className={aboutContainer}>

            <div onClick={handleToggleResponsibilitiesSection} className={aboutTitleText}>Responsibilities <span className={expandIconSpan}>
              <i className={`fa fa-angle-right ${responsibilitiesSectionExpanded ? expandIcon  : expandIcon + " " + expandIconClosed}`} aria-hidden="true">
              </i>
              </span>
            </div>
            <div className={`${aboutText} ${responsibilitiesSectionExpanded ? aboutTextHidden : ''}`}>{info.responsibilities}</div>
            
        </div>

        {
          /*
          * QUALIFICATIONS
          */
        }

        <div className={aboutContainer}>

            <div onClick={handleToggleQualificationsSection} className={aboutTitleText}>Qualifications <span className={expandIconSpan}>
              <i className={`fa fa-angle-right ${qualificationsSectionExpanded ? expandIcon  : expandIcon + " " + expandIconClosed}`} aria-hidden="true">
              </i>
              </span>
            </div>
            <div className={`${aboutText} ${qualificationsSectionExpanded ? aboutTextHidden : ''}`}>{info.qualification}</div>
            
        </div>

        {
          /*
          * DESIRED SKILLS
          */
        }

        <div className={aboutContainer}>

            <div className={aboutTitleText}>Desired Skills <span className={expandIconSpan}>
              <i className={`fa fa-angle-right ${desiredSkillsSectionExpanded ? expandIcon  : expandIcon + " " + expandIconClosed}`} aria-hidden="true">
              </i>
              </span>
            </div>
            <div className={`${aboutText} ${desiredSkillsSectionExpanded ? aboutTextHidden : ''}`}>{info.desiredSkills}</div>
            
        </div>

        {
          /*
          * COMPENSATION
          */
        }

        <div className={aboutContainer}>

            <div onClick={handleToggleCompensationSection} className={aboutTitleText}>Compensation <span className={expandIconSpan}>
              <i className={`fa fa-angle-right ${compensationSectionExpanded ? expandIcon  : expandIcon + " " + expandIconClosed}`} aria-hidden="true">
              </i>
              </span>
            </div>
            <div className={`${aboutText} ${compensationSectionExpanded ? aboutTextHidden : ''}`}>{info.compensation}</div>
            
        </div>
      </div>
    </Menu>
  )
}


/*

        <div className={logoContainer}>
          <img src={logoUrl} />
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


*/