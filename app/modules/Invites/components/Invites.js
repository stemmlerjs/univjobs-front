
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
/*NOTE: JobCardModal most likely can be reused*/

// ==============THIRD PARTY IMPORTS========================= //
import { SkyLightStateless } from 'react-skylight'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactTooltip from 'react-tooltip'

import { StudentCard } from 'modules/Dashboard'
import { Title, JobCard, LoadingCards } from 'modules/SharedComponents'
import { flexibleCardContainer, ghostFlexibleCardContainer } from 'sharedStyles/cardContainer.css'

import config from 'config'
import moment from 'moment'

// ================CSS IMPORTS============================== //
/*NOTE: styles/StudentDashboard.css can be reused */
import { rootComponentContainer, margins, title } from 'sharedStyles/sharedComponentStyles.css'
import { pageMainJobCards } from 'sharedStyles/jobCard.css'
import { pinIcon, fillIcon, unFillIcon, rotateIcon } from 'sharedStyles/pinCards.css'
import { buttonContainers } from 'sharedStyles/widgets.css'
import { overflowFix } from 'sharedStyles/sharedComponentStyles.css'

export default function Invites ({jobs,
    isFetchingJobs,
    industries,
    handlePinJob,
    handleCardClick,
    handleOpenEmployerProfileModal
}) {
  return (
	<div className={rootComponentContainer}>
        
        {/* TITLE */}
        <Title 
            titleName="Invitations"
            subHeading="These are jobs that employers have invited you to apply to!"
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
                        </div>
                        )
                    : 

                jobs.length > 0 ? jobs.filter((job) => {
                    return (job.invited == 1 && job.applied == 0)
                })
                .map((job) => (
                    <JobCard 
                        cardType={'invites'}
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
                        jobObject={job}
                        logoUrl={config.mediaUrl + job.logo_url}
                        industry={industries[job.industry]}
                        companyName={job.company_name}
                        officeAddress={job.office_address}
                        officeCity={job.office_city}
                        pinned={job.pinned}
                        handleOpenEmployerProfileModal={handleOpenEmployerProfileModal}
                    />
            )) : '' }

            {
              !isFetchingJobs && jobs.filter((job) => {
                    return (job.invited == 1 && job.applied == 0)
                }).length == 0
                ? <h2>You haven't been invited to any jobs yet.</h2>
                : ''
            }

        </div>

    </div>
  )
}

Invites.propTypes = {
}
