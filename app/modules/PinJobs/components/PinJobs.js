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
export default function PinJobs ({handleCardClick, jobs, industries, 
				  jobTypes, questions, onPinJob,
				  modal, onHideModal, onApplyClicked,
				  answer}) {
	console.log(modal, "Modal")
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
						           <button className={pinIcon}
							       onClick={(e) => onPinJob(e, job)}
							    >
							        <i className={rotateIcon + " fa fa-thumb-tack fa-lg " + fillIcon} 
							     	   aria-hidden="true"
							     />
							   </button>
							   <button className={applyButton}
							       onClick={(e) => handleCardClick(e, job)}
							   >
							       APPLY
							   </button>
						       </div>
						   </GenericCard>
						</div>
					      )) : '' }
		</div>
  	    	    <div className={overflowFix}></div>
  	    	    <div className={overflowFix}></div>
  	    	    <div className={overflowFix}></div>
  	    	    <div className={overflowFix}></div>
	</div>

        {/*MODAL
           The state of modal is checked first,
           if it isOpen === true then show the modal
           else, return empty
        */}
        { modal.isOpen
          ? <ReactCSSTransitionGroup 
              transitionName="cardModal"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={true}
              transitionLeaveTimeout={500}>
              <SkyLightStateless
                  isVisible={modal.isOpen}
                  onCloseClicked={(e) => onHideModal(e, modal.job.id)}
                  title=""
	      >

                <JobCardModal job={modal.job}
                  questions={modal.questions}
                  onApplyClicked={onApplyClicked}
                  industries={industries}
		  />

              </SkyLightStateless>
          </ReactCSSTransitionGroup>
          :  ""
        }

    </div>
  )
}

PinJobs.propTypes = {
}



