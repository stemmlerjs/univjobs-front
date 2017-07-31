
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
import { Combobox } from 'react-widgets'
import { GenericCard, DASHBOARD_CARD_TYPE, Title, JobCard, LoadingCards } from 'modules/SharedComponents'
import { flexibleCardContainer, ghostFlexibleCardContainer } from 'sharedStyles/cardContainer.css'

import { filtersContainer, filterJobTypeContainer, filterTitle, filterJobTypeColumnContainer, filterJobTypeColumn, 
    filterKeywordAndCityContainer, filterKeyWordContainer, filterButtonsContainer, searchButton, cancelButton, 
    filterInputField, filterInputFieldContainer, filterContainerMain, filterJobsOpenButton, filterContainerMainHidden,
    comboBoxContainer, comboBox, comboBoxTitle } from '../styles/StudentDashboardStyles.css'

import config from 'config'
import moment from 'moment'

import { getGoogleMapsLink } from 'helpers/dashboard'

// ==============THIRD PARTY IMPORTS========================= //
import { SkyLightStateless } from 'react-skylight'

// ================CSS IMPORTS============================== //
import { rootComponentContainer, margins, cardContainer } from 'sharedStyles/sharedComponentStyles.css'
import { pinIcon } from 'sharedStyles/pinCards.css'
import { overflowFix } from 'sharedStyles/sharedComponentStyles.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const defaultFilterConfig = {
  jobType: {
    'otg': true,
    'summer': true,
    'winter': true,
    'rep': true,
    'freelance': true,
    'pt': true
  },
  keyword: '',
  city: '',
  industry: ''
}

//**NOTE:
//  Store is accessible
export default function StudentDashboard ({
    jobs, isFetchingJobs,
    modal, jobTypes, industriesList, industries,
    answerOne, answerTwo, page, pin, filterConfig, filterMenuOpen, schoolAddress,
    handleToggleFilterMenu,
    handleCardClick, 
    handleOpenEmployerProfileModal,
    handlePinJob,
    updateFilterSettings,
    filterStudentJobs,
    handleOpenShareModal,
    industryFilterOpen
}) {
  console.log(jobs, "jobs")
        return (
            <div className={rootComponentContainer}>

                {/* TITLE */}
                <Title 
                    titleName="Let's get you hired"
                    subHeading="Apply to a job now, so we can help you land one!"/>
                <div className={filterJobsOpenButton} >
                {
                  !filterMenuOpen
                    ? <span onClick={handleToggleFilterMenu}>+ Filter Jobs</span>
                    : <span onClick={handleToggleFilterMenu}>- Filter Jobs</span>
                  }
                </div>
                <div id="delayed-overflow-hidden" className={ filterMenuOpen ? filterContainerMain : filterContainerMainHidden }>
                  <div className={filtersContainer}>
                    <div className={filterJobTypeContainer}>
                      <div className={filterTitle}>Job Type</div>
                      <div className={filterJobTypeColumnContainer}>
                        <div className={filterJobTypeColumn}>
                          <div>
                            <input 
                              type="checkbox" 
                              name="otg" 
                              defaultChecked={filterConfig ? filterConfig.jobType.otg : true} 
                              onChange={() => {
                                let newFilter = filterConfig;
                                newFilter.jobType.otg = !filterConfig.jobType.otg
                                updateFilterSettings(newFilter, true)
                              }}
                            />One Time Gig
                          </div>
                          <div>
                            <input 
                              type="checkbox" 
                              name="summer"
                              defaultChecked={filterConfig ? filterConfig.jobType.summer : true} 
                              onChange={() => {
                                let newFilter = filterConfig;
                                newFilter.jobType.summer = !filterConfig.jobType.summer
                                updateFilterSettings(newFilter, true)
                              }}
                            />Summer 2017
                          </div>
                          <div>
                            <input 
                              type="checkbox" 
                              name="winter"
                              defaultChecked={filterConfig ? filterConfig.jobType.winter : true} 
                              onChange={() => {
                                let newFilter = filterConfig;
                                newFilter.jobType.winter = !filterConfig.jobType.winter
                                updateFilterSettings(newFilter, true)
                              }}
                            />Winter 2017
                          </div>
                        </div>
                        <div className={filterJobTypeColumn}>
                          <div>
                            <input 
                              type="checkbox" 
                              name="rep"
                              defaultChecked={filterConfig ? filterConfig.jobType.rep : true} 
                              onChange={() => {
                                let newFilter = filterConfig;
                                newFilter.jobType.rep = !filterConfig.jobType.rep
                                updateFilterSettings(newFilter, true)
                              }}
                            />Campus Rep
                          </div>
                          <div>
                            <input 
                              type="checkbox" 
                              name="freelance"
                              defaultChecked={filterConfig ? filterConfig.jobType.freelance : true} 
                              onChange={() => {
                                let newFilter = filterConfig;
                                newFilter.jobType.freelance = !filterConfig.jobType.freelance
                                updateFilterSettings(newFilter, true)
                              }}
                            />Freelance
                          </div>
                          <div>
                            <input 
                              type="checkbox" 
                              name="pt"
                              defaultChecked={filterConfig ? filterConfig.jobType.pt : true} 
                              onChange={() => {
                                let newFilter = filterConfig;
                                newFilter.jobType.pt = !filterConfig.jobType.pt
                                updateFilterSettings(newFilter, true)
                              }}
                            />Part Time Work
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    <div className={comboBoxContainer}>
                        <div className={comboBoxTitle}>Industry</div>
                        <Combobox
                            className={`${comboBox}`}
                            textField='industry_text'
                            valueField='id'
                            filter='contains'
                            data={industriesList}
                            onChange={(industry) => {
                              let newFilter = filterConfig;
                                newFilter.industry = industry.id
                                updateFilterSettings(newFilter, true)
                            }}
                            defaultValue={''}
                            onToggle={(even) => {
                              /*
                               * Update if industry filter is open 
                               * and whether or not to put the overflow hidden on or
                               * not.
                               */
                            }}
                          />
                      </div>


                    <div className={filterKeywordAndCityContainer}>
                      <div className={filterKeyWordContainer}>
                        <div className={filterTitle}>Keyword</div>
                        <div className={filterInputFieldContainer}>
                          <input className={filterInputField} 
                            onChange={(e) => {
                            let newFilter = filterConfig;
                            newFilter.keyword = e.target.value
                            updateFilterSettings(newFilter, true)
                          }}/>
                        </div>
                      </div>
                      <div className={filterKeyWordContainer}>
                        <div className={filterTitle}>City</div>
                        <div className={filterInputFieldContainer}>
                          <input className={filterInputField}
                            onChange={(e) => {
                              let newFilter = filterConfig;
                              newFilter.city = e.target.value
                              updateFilterSettings(newFilter, true)
                            }}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={filterButtonsContainer}>
                    <button className={searchButton} onClick={filterStudentJobs}>Search</button>
                    <button className={cancelButton} onClick={handleToggleFilterMenu}>Cancel</button>
                  </div>
                </div>

                
                
                <div className={flexibleCardContainer}>
  	                { 

                      /*
                       * [GHOST (Loading) CARDS]
                       * 
                       * While we're fetching cards, we want to show some sort of Ghost
                       * Card like Facebook has when things are loading.
                       */

                      isFetchingJobs 
                        ? (<div className={ghostFlexibleCardContainer}>
                            <LoadingCards/>
                            <LoadingCards/>
                            <LoadingCards/>
                          </div>
                          )
                        : 

                      /*
                       * [Mandatory] filter.
                       * All jobs are to pass through this filter.
                       * 
                       * If the job has already been applied to and is active - then show it
                       * If the job has the filter saying not to show it - don't show it.
                       * If the job has already met the max number of applicants - don't show it.
                       */

                      jobs.length > 0 ? jobs.filter((job) => {
                        var hasntAppliedToAndIsActive = job.applied == 0 && job.active == 1;
                        var shouldFilterOut = job.filter_show === undefined 
                                                ? false 
                                                : job.filter_show === true 
                                                    ? false 
                                                    : true;
                        var isMaxApplicantsReached = job.max_applicants == job.applicant_count ? true : false;

                        return hasntAppliedToAndIsActive && !shouldFilterOut && !isMaxApplicantsReached
                      })

                      .map((job) => (
                        <JobCard 
                          cardType={'dashboard'}
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
                          startDate={moment(job.start_date).format('MMMM Do, YYYY')}
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
                          handleOpenEmployerProfileModal={handleOpenEmployerProfileModal}
                          location={job.location}
                          remoteWork={job.remote_work}
                          paid={job.paid}
                          mapsLink={getGoogleMapsLink(schoolAddress, job.location)}
                          handleOpenShareModal={handleOpenShareModal}
                        />
  	                )) : '' }

                    {

                     /*
                      * If the filter isn't being used and no jobs are returned, just return 
                      * 'No more jobs yet' because there are actually no new jobs for them.
                      */

                      (JSON.stringify(defaultFilterConfig) === JSON.stringify(filterConfig) && !isFetchingJobs &&
                      jobs.filter((job) => {
                          return job.applied == 0 && job.active == 1
                      }).length == 0)
                        ? <h2>No more jobs yet! Check back soon.</h2>
                        : !isFetchingJobs && (
                          
                     /*
                      * Otherwise, if the filter IS being used and we don't render any jobs, 
                      * we should inform the user to adjust their filter preferences because no jobs
                      * are showing up.
                      */
                          
                           jobs.filter((job) => {
                              var hasntAppliedToAndIsActive = job.applied == 0 && job.active == 1;
                              var shouldFilterOut = job.filter_show === undefined 
                                                      ? false 
                                                      : job.filter_show === true 
                                                          ? false 
                                                          : true;
                              return hasntAppliedToAndIsActive && !shouldFilterOut
                            }).length == 0)
                        ? <h2>No jobs found. You can try adjusting your filters.</h2>
                        : ''
                    }
                    
                </div>
	    </div>
   )
}


