
/*
 * Applications
 *
 * This components is to display the jobs pinned by the students
 *
 * */
// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
/*NOTE: JobCardModal most likely can be reused*/

// ==============THIRD PARTY IMPORTS========================= //
import { SkyLightStateless } from 'react-skylight'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactTooltip from 'react-tooltip'

import { StudentCard } from 'modules/Dashboard'
import { Title, JobCard } from 'modules/SharedComponents'
import { flexibleCardContainer } from 'sharedStyles/cardContainer.css'

import config from 'config'
import moment from 'moment'

// ================CSS IMPORTS============================== //
/*NOTE: styles/StudentDashboard.css can be reused */
import { rootComponentContainer, margins, title } from 'sharedStyles/sharedComponentStyles.css'
import { pageMainJobCards } from 'sharedStyles/jobCard.css'
import { pinIcon, fillIcon, unFillIcon, rotateIcon } from 'sharedStyles/pinCards.css'
import { buttonContainers } from 'sharedStyles/widgets.css'
import { overflowFix } from 'sharedStyles/sharedComponentStyles.css'

export default function PinJobs ({jobs,
    industries,
    page,
    handlePinJob,
    handleCardClick
}) {
  return (
	<div className={rootComponentContainer}>
        
        {/* TITLE */}
        <Title 
            titleName="My Pinned Jobs"
            subHeading="This is where all the job you pinned are displayed"
        />

        <div className={flexibleCardContainer}>
            { jobs.length > 0 ? jobs.filter((job) => {
                    return job.pinned == 1
                })
                .map((job) => (
                    <JobCard 
                        cardType={'pinjobs'}
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
                        page={page}
                    />
            )) : '' }

            {
              jobs.length == 0
                ? <h2>You haven't pinned any jobs yet.</h2>
                : ''
            }

        </div>

    </div>
  )
}

PinJobs.propTypes = {
}



