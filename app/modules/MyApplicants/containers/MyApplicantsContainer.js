
import React, { Component, PropTypes } from 'react'
import { SidebarContainer } from 'modules/Main'

import config from 'config'
import SkyLight from 'react-skylight'

import MyApplicantsDashboard from '../components/MyApplicantsDashboard'
import NewApplicants from '../components/NewApplicants'
import PooledApplicants from '../components/PooledApplicants'
import HiredApplicants from '../components/HiredApplicants'

var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as jobActionCreators from 'redux/modules/job/job'
import * as listActionCreators from 'redux/modules/list/list'
import * as myApplicantsActionCreators from 'redux/modules/myapplicants/myapplicants'

import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'
import { authRedirectFilter } from 'config/routes'

const selectedJob = {
    "job_id":11,
    "posted_by":4,
    "title":"Social Machine",
    "type":2,
    "paid":1,
    "start_date":"2017-07-12T00:00:00.000Z",
    "responsibilities": "We are currently looking for a full stack Software Developer to join our Windsor team. This is a role for someone who likes to build end-to-end systems, take on whatever responsibilities are available and have an impact on the business as a whole. Our ideal candidate is well-rounded and has a thirst for continuous learning and high attention to detail.",
    "qualification":"Proficiency with LAMP(Linux, Apache, MySQL, PHP) Proficiency with Javascript & JQUERY Experience with MVC Experience with Wordpress Experience with Database administration Experience with Object-Oriented programming languages HTML/CSS experience an asset Education : Computer Science, Software Engineering, or a related technical degree or diploma  Experience : 3+ years experience",
    "compensation":"$18.00 to $25.55 /hour",
    "max_applicants":33,
    "remote_work":1,
    "location":"100 city centre, mississauga",
    "desired_skills":"lkjsdfl",
    "active":0,
    "verified":1,
    "createdAt":"2017-07-12T19:37:00.000Z",
    "updatedAt":"2017-08-09T01:01:16.000Z",
    "num_positions":1,
    "applicants": [{
      name: "Khalil Stemmler",
      student_id: 2,
      state: 'INITIAL'
    },{
      name: "Jacob LeMackker",
      student_id: 3,
      state: 'INITIAL'
    },{
      name: "Jennifer Read",
      student_id: 4,
      state: 'INITIAL'
    }]
  }

const MyApplicantsContainer = React.createClass({
	contextTypes: {
		router: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired
  },
  
  /** doRedirectionFilter
   *
   * The redirection filter is the process that occurs each time we enter this container.
   * Used in every higher order component and supplied with a config, it ensures that the
   * user is redirected to the appropriate page based on their authentication status and
   * user type.
   *
   * @ return (Promise)
   *
   */

  doRedirectionFilter() {
    const config = {
      failureRedirect: {
    	  student: '/join',	            // if not logged in, go here (student)
    	  employer: '/join'             // if not logged in, go here (employer)
      },
      restricted: {
        to: 'EMPLOYERS',		          // STUDENTS only on this route
	      redirectTo: '/dashboard/st'   // if not an EMPLOYER, redirect to the student equivalent
		 			                            // This might change to employer categories
      }
    }
     return authRedirectFilter(config, this.context.store, this.context.router)
  },

  componentWillMount() {

    var currentJobId = null

    /*
     * Check if a job id was preset in the route parameters.
     */

    if (this.props.route.path.indexOf(':jobId') !== -1) {
      currentJobId = this.props.params.jobId;
    }

    this.doRedirectionFilter()
      .then(this.props.getAllJobsMyApplicants(currentJobId))
      .then(this.props.handleGetIndustries)
      .then(this.props.handleGetJobTypes)
      .then(this.props.closeOverlay)
  },

  componentWillReceiveProps(nextProps) {

    // Deselect all applicants
    // Remove current applicant details
    let shouldClearDetails = false;

    if (this.props.route.page !== nextProps.route.page) {
      shouldClearDetails = true;
    }

    if (this.props.params.jobId !== undefined && nextProps.params.jobId !== undefined) {
      if (this.props.params.jobId !== nextProps.params.jobId) {
        shouldClearDetails = true;
      }
    }

    if (shouldClearDetails) {
      this.props.multiSelectDeselectAll();
      this.props.clearCurrentApplicantDetails();
    }

  },

  componentDidMount () {

    try {
      // We want to hide the drift widget when the student profile thingy is open.
      drift.on('ready', () => {
        drift.api.widget.hide();
      })
    }

    catch (e) {
      console.log(e)
    }

  },

  render () {
    console.log(this.props)
    return (
      <div className={pageContainer} >
        <SidebarContainer isMobile={this.props.isMobile} isAStudent={false} 
          page={this.props.route.page}
          profilePicture={config.mediaUrl + this.props.profile.employerProfile.logoUrl}
        />

        {
          (() => {
            switch (this.props.route.page) {
              case "applicants-dash":
                return <MyApplicantsDashboard 
                        jobs={this.props.jobs} 
                        selectedJob={this.props.selectedJob} 
                        page={this.props.route.page}
                        handleChangeSelectedJob={this.props.changeSelectedJob}
                        handleOpenJobSelect={this.props.openJobSelect}
                        jobSelectDropdownIsOpen={this.props.jobSelectDropdownIsOpen}/>
              case "applicants-new":
                return <NewApplicants 
                        jobs={this.props.jobs} 
                        selectedJob={this.props.selectedJob} 
                        page={this.props.route.page}
                        lists={this.props.lists}

                        handleChangeSelectedJob={this.props.changeSelectedJob}
                        handleOpenJobSelect={this.props.openJobSelect}
                        jobSelectDropdownIsOpen={this.props.jobSelectDropdownIsOpen}

                        selectedApplicant={this.props.selectedApplicant}
                        multiSelectViewActive={this.props.multiSelectViewActive}
                        multiSelectedApplicantIds={this.props.multiSelectedApplicantIds}

                        handleViewApplicantDetails={this.props.viewApplicantDetails}
                        handleClearCurrentApplicantDetails={this.props.clearCurrentApplicantDetails}
                        handleMultiSelectAddApplicant={this.props.multiSelectAdd}
                        handleMultiSelectRemoveApplicant={this.props.multiSelectRemove}
                        handleMultiSelectDeselectAll={this.props.multiSelectDeselectAll}
                        handleMultiSelectAll={() => {

                          var ids = this.props.selectedJob.applicants.map((applicant) => {
                            return applicant.student_id
                          })

                          this.props.multiSelectSelectAll(ids)
                        }}
                        handleClearSelectedJob={this.props.clearSelectedJob}
                        />
              case "applicants-pool":
                return <PooledApplicants
                        jobs={this.props.jobs} 
                        selectedJob={this.props.selectedJob} 
                        page={this.props.route.page}
                        lists={this.props.lists}

                        handleChangeSelectedJob={this.props.changeSelectedJob}
                        handleOpenJobSelect={this.props.openJobSelect}
                        jobSelectDropdownIsOpen={this.props.jobSelectDropdownIsOpen}

                        selectedApplicant={this.props.selectedApplicant}
                        multiSelectViewActive={this.props.multiSelectViewActive}
                        multiSelectedApplicantIds={this.props.multiSelectedApplicantIds}

                        handleViewApplicantDetails={this.props.viewApplicantDetails}
                        handleClearCurrentApplicantDetails={this.props.clearCurrentApplicantDetails}
                        handleMultiSelectAddApplicant={this.props.multiSelectAdd}
                        handleMultiSelectRemoveApplicant={this.props.multiSelectRemove}
                        handleMultiSelectDeselectAll={this.props.multiSelectDeselectAll}
                        handleMultiSelectAll={() => {

                          var ids = this.props.selectedJob.applicants.map((applicant) => {
                            return applicant.student_id
                          })

                          this.props.multiSelectSelectAll(ids)
                        }}
                        handleClearSelectedJob={this.props.clearSelectedJob}
                  />
              case "applicants-hired":
                return <HiredApplicants
                        jobs={this.props.jobs} 
                        selectedJob={this.props.selectedJob} 
                        page={this.props.route.page}
                        lists={this.props.lists}

                        handleChangeSelectedJob={this.props.changeSelectedJob}
                        handleOpenJobSelect={this.props.openJobSelect}
                        jobSelectDropdownIsOpen={this.props.jobSelectDropdownIsOpen}

                        selectedApplicant={this.props.selectedApplicant}
                        multiSelectViewActive={this.props.multiSelectViewActive}
                        multiSelectedApplicantIds={this.props.multiSelectedApplicantIds}

                        handleViewApplicantDetails={this.props.viewApplicantDetails}
                        handleClearCurrentApplicantDetails={this.props.clearCurrentApplicantDetails}
                        handleMultiSelectAddApplicant={this.props.multiSelectAdd}
                        handleMultiSelectRemoveApplicant={this.props.multiSelectRemove}
                        handleMultiSelectDeselectAll={this.props.multiSelectDeselectAll}
                        handleMultiSelectAll={() => {

                          var ids = this.props.selectedJob.applicants.map((applicant) => {
                            return applicant.student_id
                          })

                          this.props.multiSelectSelectAll(ids)
                        }}
                        handleClearSelectedJob={this.props.clearSelectedJob}
                  />
            }
          })()
        }
        
        <ToastContainer ref="container"
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right" />
        
    </div>
    )
  },
})

/* The entire redux store is passed in here,
// Return an object defining which values you want to bind to props
//
// @params ({user}) contains BaseUser & Employer attributes
// */

function mapStateToProps({user, job, list, profile, myapplicants}) {
  return {
	  user: user ? user : {},
    jobs: myapplicants.jobs ? myapplicants.jobs : [],
    profile: profile ? profile : {},
    industryList: list.industries ? list.industries : [],
    jobTypes: list.jobTypes ? list.jobTypes : [],
    selectedJob: myapplicants.selectedJob ? myapplicants.selectedJob : {},
    lists: list ? list : {},

    selectedApplicant: myapplicants.selectedApplicant ? myapplicants.selectedApplicant : {},
    multiSelectViewActive: myapplicants.multiSelectViewActive ? myapplicants.multiSelectViewActive : false,
    multiSelectedApplicantIds: myapplicants.multiSelectedApplicantIds ? myapplicants.multiSelectedApplicantIds : [],
    jobSelectDropdownIsOpen: myapplicants.jobSelectDropdownIsOpen ? myapplicants.jobSelectDropdownIsOpen : false
  }
}

/**
  * mapActionCreatorsToProps
  *
  * This function grabs all of the Action Creators on the object of the first parameter in the bindActionCreators function
  * and makes them available to us through THIS component's props (SignupContainer, this.props). We can then pass these to our child
  * components to use. DON'T MAKE A HABIT of doing this too deeply (drilling prop holes).
  *
  **/

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators({
    ...jobActionCreators,
    ...listActionCreators,
    ...userActionCreators,
    ...myApplicantsActionCreators
  }, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(MyApplicantsContainer)
