/*Applications
 *
 * This components is to display the applications that the students applied to, to a particular job 
 *
 * */

// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import {  } from '../../SharedComponents'

// ==============THIRD PARTY IMPORTS========================= //
import { SkyLightStateless } from 'react-skylight'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { StudentCard } from 'modules/Dashboard'
import { Title, JobCard } from 'modules/SharedComponents'
import { flexibleCardContainer } from 'sharedStyles/cardContainer.css'

import config from 'config'
import moment from 'moment'

// ================CSS IMPORTS============================== //
import { rootComponentContainer, margins, title } from 'sharedStyles/sharedComponentStyles.css'
import { crossHair } from 'sharedStyles/widgets.css'


export default function Applications ({jobs,
    industries,
    page,
    handlePinJob,
    handleCardClick,
    handleRemoveJob
}) {
  return (
	<div className={rootComponentContainer}>
        
        {/* TITLE */}
        <Title 
            titleName="My Applications"
            subHeading="This is where all the jobs you've applied to are saved."
        />

        <div className={flexibleCardContainer}>
            { jobs.length > 0 ? jobs.filter((job) => {
                    return job.applied == 1
                })
                .map((job) => (
                <JobCard 
                    cardType={'applications'}
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
                    handleRemoveJob={handleRemoveJob}
                    jobObject={job}
                    logoUrl={config.mediaUrl + job.logo_url}
                    industry={industries[job.industry]}
                    companyName={job.company_name}
                    officeAddress={job.office_address}
                    officeCity={job.office_city}
                    pinned={job.pinned}
                    state={job.state}
                    page={page}
                />
            )) : '' }
        </div>

    </div>
  )
}
