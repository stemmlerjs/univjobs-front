import React, { PropTypes } from 'react'
import { StudentCard } from 'modules/Dashboard'
import { JobCard, JobCardModal } from 'modules/Dashboard'
import { GenericCard, DASHBOARD_CARD_TYPE } from 'modules/SharedComponents'
import { SkyLightStateless } from 'react-skylight'
import { hideModal } from 'redux/modules/dashboard/dashboard'
import { rootComponentContainer, margin, pageHeaderSection,
	pageTitle, title} from 'sharedStyles/styles.css'
import { pageContainer, cardContainer, card, cardHeader,
	jobTitleContainer, jobTitle, industryTitle,
	tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader, overflowFix, pageMainJobCards,
	buttonContainers, pinIcon, fillIcon, unFillIcon, rotateIcon} from '../styles/MyListings.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactTooltip from 'react-tooltip'

//**NOTE:
//  Store is accessible
export default function MyListings ({jobs, handleCardClick, industries, jobTypes, profile}) {
    //console.log(jobs)
    console.log(industries)
    console.log(jobTypes)
    return (
            <div className={rootComponentContainer}>
	            <div className={margin}>

  	            {/* TITLE */}
  	            <div className={pageHeaderSection}>
  	                <div className={pageTitle}>
  	                    <h1 className={title}>MY LISTINGS</h1>
  	                </div>
  	            </div>
        
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
      			                    <button>
      			                        APPLY
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



