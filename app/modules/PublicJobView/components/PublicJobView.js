
import React, { PropTypes } from 'react'
import config from 'config'
import moment from 'moment'
import { Link } from 'react-router'

import { publicJobViewContainerStyle, jobViewMiddleContainer, employerPicture,
  topSection, employerPictureContainer, headerInfoContainer, jobTitle, companyInfoButton,
  companyIndustry, noProfilePictureClass, bodyTitleHeader, bodySection, bodySectionContainer,
  calendar, reallyExtraComponents, calendarContainer, locationIconNoHover,
  applicantsContainer, clock_0_50, clock_51_75, clock_76_100, clock, callToActionContainer, 
  fbShareButton, socialLinksContainer, shareHeader, twitterShareButton, linkedInShareButton,
  emailShareButton, linksFlex } from '../styles/PublicJobView.css'

export default function PublicJobView ({ info, handleOpenEmployerProfileModal }) {
  return (
	  <div className={publicJobViewContainerStyle}>
      <div className={jobViewMiddleContainer}>

        {
          /*
           * [Top section]: Picture, base information.
           */
        }
        <div className={topSection}>
          <div className={employerPictureContainer}>
            { info.logo_url 
              ? info.logo_url.indexOf("null") !== -1 || info.logo_url.indexOf("avatar") === -1 || info.logo_url === undefined
                ? <div className={noProfilePictureClass}><i className={'fa fa-building-o'} aria-hidden="true"></i></div>
                : <img className={employerPicture} src={config.mediaUrl + info.logo_url}/>
              : ''
            }
          </div>
          <div className={headerInfoContainer}>
            <div className={jobTitle}>{info.title}</div>
            <div>{info.type === 1 
                      ? 'One Time Gig' :
                      info.type === 2 
                      ? 'Summer' :
                      info.type === 3 
                      ? 'Winter' :
                      info.type === 4
                      ? 'Freelance' :
                      info.type === 5
                      ? 'Campus Rep' :
                      info.type === 6
                      ? 'Part-time' :
                      ''
                }
            </div>
            <div className={companyInfoButton} onClick={() => {
              console.log("kajsdlk")

             /*
              * Opening the Employer Profile Modal
              */
                
              let employerInfo = {
                logoUrl: config.mediaUrl + info.logo_url,
                employerName: info.company_name,
                industry: info.industry,
                about: info.description,
                numEmployees: info.employee_count,
                headquarters: info.office_address + ", " + info.office_city + " " + info.office_postal_code,
                website: info.website
              }

                handleOpenEmployerProfileModal(employerInfo)

            }}>{info.company_name}</div>
            <div className={companyIndustry}>{info.industry}</div>

            {
              /*
               * Now the fancy stuff like number of applicants left,
               * location, etc, all that jazz.
               */
            }
            <div className={reallyExtraComponents}>

              <div className={calendarContainer}>
                <i className={`fa fa-calendar ${calendar}`}></i>
                <div>{'Starts ' + moment(new Date(info.start_date)).format('MMMM Do, YYYY')}</div>
              </div>

              <div className={calendarContainer}>
                <i className={`fa fa-map-marker ${locationIconNoHover}`} aria-hidden="true"></i>
                <div>{
                  info.remote_work === 0 
                    ? <a>{info.location}</a>
                    : 'Remote work'
                }</div>
              </div>

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


              {
                /*
                 * SHARE STUFF
                 */
              }

              <div className={socialLinksContainer}>
                <div className={shareHeader}>Share</div>
                <div className={linksFlex}>
                  {/* FACEBOOK */}
                  <button className={`fb-share-button ${fbShareButton}`} 
                    data-href="http://www.your-domain.com/your-page.html" 
                    data-layout="button_count" onClick={() => {

                      FB.ui({
                        method: 'share',
                        display: 'popup',
                        href: 'https://univjobs.ca/#/posting/26?_k=1nhj8f',
                      }, function(response){});

                    }}>
                  </button>

                  { /* TWITTER */}
                  <button className={twitterShareButton}></button>

                  { /* LINKEDIN */}
                  <button className={linkedInShareButton}></button>

                  { /* EMAIL */}
                  <button className={emailShareButton}></button>

                </div>
              </div>

            

            </div>

          </div>
        </div>

        {
          /*
           * [Body Section]
           */
        }
        <div className={bodySectionContainer}>

        {/*
          <div className={bodyTitleHeader}>Company Description</div>
          <div className={bodySection}>{info.description}</div>
        */}

          <div className={bodyTitleHeader}>Responsibilities</div>
          <div className={bodySection}>{info.responsibilities}</div>

          <div className={bodyTitleHeader}>Qualifications</div>
          <div className={bodySection}>{info.qualification}</div>

          <div className={bodyTitleHeader}>Desired Skills</div>
          <div className={bodySection}>{info.desired_skills}</div>

          <div className={bodyTitleHeader}>Compensation</div>
          <div className={bodySection}>{info.compensation}</div>
        </div>

        
      </div>

      <div className={callToActionContainer}>
          <h1>Interested in applying to this job?</h1>
          <div>
            <Link to="/join">
              <button>Sign up</button>
            </Link>
          </div>
          
        </div>

    </div>
  )
}




