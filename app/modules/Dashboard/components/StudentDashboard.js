
/*StudentDashboard
 *
 * This component is to display numerous job cards for each employer,
 * where students can start applying to jobs employers listed.
 *
 * */

// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { StudentCard } from 'modules/Dashboard'
import { JobCardModal } from 'modules/Dashboard'
import { GenericCard, DASHBOARD_CARD_TYPE, Title, JobCard } from 'modules/SharedComponents'
import { flexibleCardContainer } from 'sharedStyles/cardContainer.css'

// ==============THIRD PARTY IMPORTS========================= //
import { SkyLightStateless } from 'react-skylight'


// ================CSS IMPORTS============================== //
import { rootComponentContainer, margins, cardContainer } from 'sharedStyles/sharedComponentStyles.css'
import { pinIcon } from 'sharedStyles/pinCards.css'
import { overflowFix } from 'sharedStyles/sharedComponentStyles.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

//**NOTE:
//  Store is accessible
export default function StudentDashboard ({jobs, handleCardClick, 
  onPinJob,
	modal, jobTypes, industries,
	answerOne, answerTwo, 
    pin
}) {
        return (
            <div className={rootComponentContainer}>
	            <div className={margins}>

                {/* TITLE */}
                <Title 
                    titleName="Let's get you hired"
                    subHeading="Apply to a job now, so we can help you land one!"/>


                <div className={flexibleCardContainer}>
  	                { jobs.length > 0 ? jobs.map((job) => (
                        <JobCard 
                          key={job.job_id}
                          jobId={job.job_id}
                          postedBy={job.posted_by}
                          title={job.title}
                          jobType={job.type}
                          paid={job.paid}
                          startDate={job.start_date}
                          responsibilities={job.responsibilities}
                          qualification={job.qualification}
                          address={job.address}
                          compensation={job.compensation}
                          createdAt={job.createdAt}
                          questions={job.questions}
                          handlePinJob={onPinJob}
                          handleCardClick={handleCardClick}
                        />
  	                )) : '' }
                </div>
            </div>
	    </div>
   )
}


