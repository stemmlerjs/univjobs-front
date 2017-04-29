import React, { PropTypes } from 'react'
import { DropdownList } from 'react-widgets'
import { StudentCard } from 'modules/Dashboard'
import { JobCard, JobCardModal } from 'modules/Dashboard'
import { GenericCard, DASHBOARD_CARD_TYPE, Title } from 'modules/SharedComponents'
import { SkyLightStateless } from 'react-skylight'
import { hideModal } from 'redux/modules/dashboard/dashboard'
import { rootComponentContainer, margin, pageHeaderSection,
	pageTitle, title} from 'sharedStyles/styles.css'
import { pageContainer, cardContainer, card, cardHeader,
	jobTitleContainer, jobTitle, industryTitle,
	tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	maxButton, editButton,cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader, pageMainJobCards,
	buttonContainers, pinIcon, fillIcon, unFillIcon, rotateIcon} from '../styles/MyListings.css'

import { overflowFix } from 'sharedStyles/sharedComponentStyles.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactTooltip from 'react-tooltip'


const data = [
    { 
        'id': 0, 'button_name': 'EDIT SETTINGS ⬇',
        'id': 1, 'button_name': 'MAX APPLICANTS',
        'id': 2, 'button_name': 'EDIT LISTINGS',
    }
]

//**NOTE:
//  Store is accessible
export default function MyListings ({jobs, handleCardClick, industries, jobTypes, profile}) {
    //console.log(jobs)
    //console.log(industries)
    //console.log(jobTypes)
    return (
            <div className={rootComponentContainer}>
	            <div className={margin}>

  	            {/* TITLE */}
                <Title 
                    titleName="MY LISTINGS"
                    subHeading="Once an applicant applies to your listing, you can no longer edit."
                />
        
  	            {/*MAIN (Cards List)
  	                NOTE: Reference for iterating using map
  	                https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
                */}

  	            <div className={pageMainJobCards}>
                    { jobs.length > 0 ? jobs.map((job) => (
                        <div key={job.job_id}>
  		                    <GenericCard
                                handleCardClick={handleCardClick}
                                cardType={DASHBOARD_CARD_TYPE}
                                job={job}
                                jobTypes={jobTypes}
                                industries={industries}
                                profile={profile}>
		                        <div className={buttonContainers}>
      			                    <button className={maxButton} onClick={(e) => handleCardClick(e, job)}>
      			                        MAX APPLICANTS
      			                      </button>
      			                    <button className={editButton} onClick={(e) => handleCardClick(e, job)}>
      			                        EDIT LISTING
      			                      </button>
                                </div>
                            </GenericCard>
                         </div>
                    )) : ''} 
               </div>
  	            <div className={overflowFix}></div>
  	            <div className={overflowFix}></div>
  	            <div className={overflowFix}></div>
  	            <div className={overflowFix}></div>
            </div>
          </div>
    )
}

MyListings.propTypes = {}



