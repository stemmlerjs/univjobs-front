/*Applications
 *
 * This components is to display the applications that the students applied to, to a particular job 
 *
 * */

// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //


// ==============THIRD PARTY IMPORTS========================= //
import { SkyLightStateless } from 'react-skylight'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { StudentCard } from 'modules/Dashboard'
import { Title, JobCard, LoadingCards } from 'modules/SharedComponents'
import { flexibleCardContainer, ghostFlexibleCardContainer } from 'sharedStyles/cardContainer.css'

import config from 'config'
import moment from 'moment'

import { getGoogleMapsLink } from 'helpers/dashboard'

// ================CSS IMPORTS============================== //
import { rootComponentContainer, margins, title } from 'sharedStyles/sharedComponentStyles.css'
import { crossHair } from 'sharedStyles/widgets.css'


export default function Applications ({jobs,
    industries, 
    isFetchingJobs,
    page,
    schoolAddress,
    handlePinJob,
    handleCardClick,
    handleRemoveJob,
    handleOpenEmployerProfileModal,
    handleOpenShareModal
}) {
  return (
	<div className={rootComponentContainer}>
        
        {/* TITLE */}
        <Title 
            titleName="My Applications"
            subHeading="This is where all the jobs you've applied to are saved."
        />

        <div className={flexibleCardContainer}>
            { 
                
                /*
                 * If we're fetching jobs, then show the loading cards
                 */

                isFetchingJobs 
                    ? (<div className={ghostFlexibleCardContainer}>
                          <LoadingCards/>
                          <LoadingCards/>
                          <LoadingCards/> 
                        </div>)
                    : 
                
                jobs.length > 0 ? jobs.filter((job) => {
                  return job.applied == 1 && job.hidden == 0
                })
                .map((job) => (
                <JobCard 
                  cardType={'applications'}
                  key={job.job_id}
                  jobId={job.job_id}
                  postedBy={job.posted_by}
                  title={job.title}
                  jobType={job.type === 1 
                    ? 'One Time Gig' :
                    job.type === 2 
                    ? 'Summer' :
                    job.type === 3 
                    ? 'Winter' :
                    job.type === 4
                    ? 'Freelance' :
                    job.type === 5
                    ? 'Campus Rep' :
                    job.type === 6
                    ? 'Part-time' :
                    job.type === 7
                    ? 'Full-time' :
                    ''
                  }
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
                    handleOpenEmployerProfileModal={handleOpenEmployerProfileModal}
                    location={job.location}
                    remoteWork={job.remote_work}
                    paid={job.paid}
                    mapsLink={getGoogleMapsLink(schoolAddress, job.location)}
                    handleOpenShareModal={handleOpenShareModal}
                />
            )) : '' }

            {
             !isFetchingJobs && jobs.filter((job) => {
                    return job.applied == 1 && job.hidden == 0
                }).length == 0
                ? <h2>You haven't applied to any jobs yet.</h2>
                : ''
            }
        </div>

    </div>
  )
}
