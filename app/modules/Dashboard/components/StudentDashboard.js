
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

import config from 'config'
import moment from 'moment'

// ==============THIRD PARTY IMPORTS========================= //
import { SkyLightStateless } from 'react-skylight'

// ================CSS IMPORTS============================== //
import { rootComponentContainer, margins, cardContainer } from 'sharedStyles/sharedComponentStyles.css'
import { pinIcon } from 'sharedStyles/pinCards.css'
import { overflowFix } from 'sharedStyles/sharedComponentStyles.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

//**NOTE:
//  Store is accessible
export default function StudentDashboard ({
    jobs, handleCardClick, 
    handlePinJob,
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
  	                { jobs.length > 0 ? jobs.filter((job) => {
                          return job.applied == 0 && job.active == 1
                      })
                      .map((job) => (
                        <JobCard 
                          cardType={'dashboard'}
                          key={job.job_id}
                          jobId={job.job_id}
                          postedBy={job.posted_by}
                          title={job.title}
                          jobType={job.type}
                          paid={job.paid}
                          startDate={moment(job.start_date).format("MMMM Do, YYYY")}
                          responsibilities={job.responsibilities}
                          qualification={job.qualification}
                          address={job.address}
                          compensation={job.compensation}
                          createdAt={job.createdAt}
                          questions={job.questions}
                          handlePinJob={handlePinJob}
                          handleCardClick={handleCardClick}
                          jobObject={job}
                          logoUrl={config.mediaUrl + job.logo_url}
                          industry={industries[job.industry]}
                          companyName={job.company_name}
                          officeAddress={job.office_address}
                          officeCity={job.office_city}
                          pinned={job.pinned}
                        />
  	                )) : '' }
                </div>
            </div>
	    </div>
   )
}


