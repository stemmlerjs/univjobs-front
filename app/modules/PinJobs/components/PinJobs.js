import React, { PropTypes } from 'react'

/*NOTE: JobCardModal most likely can be reused*/
import { JobCardModal } from 'modules/Dashboard'
import { GenericCard, PINNED_JOBS_CARD_TYPE } from 'modules/SharedComponents'
import { SkyLightStateless } from 'react-skylight'
import { rootComponentContainer, margin, pageHeaderSection,
	pageTitle, title} from 'sharedStyles/styles.css'

/*NOTE: styles/StudentDashboard.css can be reused */
import { pageContainer, cardContainer, card, cardHeader,
	jobTitleContainer, jobTitle, industryTitle,
	tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader, overflowFix, pageMainJobCards,
	buttonContainers, pinIcon, fillIcon, unFillIcon, rotateIcon} from '../styles/StudentDashboard.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactTooltip from 'react-tooltip'

//**NOTE:
//  Store is accessible
//  Follow Dasboard StudentDashbaord for Job & Pin functionality and display
export default function PinJobs ({handleCardClick, jobs, industries, jobTypes}) {
	console.log(jobs)
  return (
	<div className={rootComponentContainer}>
	    <div className={margin}>
  	        {/* TITLE */}
  	        <div className={pageHeaderSection}>
  	    	    <div className={pageTitle}>
  	      	        <h1 className={title}>MY PINNED JOBS</h1>
  	             </div>
  	         </div>
  	   	<div className={pageMainJobCards}>
		      {jobs ? jobs.map((job) => (
					      <div key={job.id}>
					          <GenericCard
						      handleCardClick={handleCardClick}
						      cardType={PINNED_JOBS_CARD_TYPE}
						      job={job}
						      jobTypes={jobTypes}
						      industries={industries}
						   >
						       <div className={buttonContainers}>
						           <button className={pinIcon}/>
							   <button className={applyButton}/>
						       </div>
						   </GenericCard>
						</div>
					      )) : '' }
		</div>
	</div>
    </div>
  )
}

PinJobs.propTypes = {
}



