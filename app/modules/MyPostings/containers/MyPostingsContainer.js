// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import { MyPostings, MyClosedPostings, MyAwaitingPostings } from 'modules/MyPostings'

import config from 'config'
import SkyLight from 'react-skylight'

var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as jobActionCreators from 'redux/modules/job/job'
import * as listActionCreators from 'redux/modules/list/list'
import * as mypostingsActionCreators from 'redux/modules/mypostings/mypostings'
import * as fetch from 'helpers/dashboard'

// ==================OTHER IMPORTS============================== //
import { authRedirectFilter } from 'config/routes'

// ==============CSS IMPORTS============================= //
import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'

var jobs = [
  {
    jobId: 1,
    title: 'Marketing Street Team - Brampton'
  },
  {
    jobId: 2,
    title: 'Post-Punk Guitarist'
  }
]

const MyPostingsContainer = React.createClass({
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

  getPageType () {
    if (this.props.route.page == "postings-open") {
      return "open"
    }

    else if (this.props.route.page == "postings-closed") {
      return "closed"
    }

    else {
      return "awaiting"
    }
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
      .then(this.props.getAllJobsMyPostings(currentJobId, this.getPageType()))
      .then(this.props.handleGetIndustries)
      .then(this.props.handleGetJobTypes)
      .then(this.props.closeOverlay)
  },

  /*
   * componentDidMount
   */

  componentDidMount() {

  },


  /*
   * changeUrlAndSetSelectedJob
   * 
   * This function will change the url to the url of the job,
   * but it will also change the view to show that respective job.
   * 
   * @param {Number} the job id that we want to change to.
   */

  changeUrlAndSetSelectedJob (jobId) {
    
    console.log("[Univjobs]: changeUrlAndSetSelectedJob() to jobId=", jobId)
    var newUrl = ""
    var jobType = ""
    var newCurrentJob = null;

    /*
     * Get the job id of the new page and find the
     * Open job pbject to set as the new job.
     */

    if (this.props.route.page == "postings-open") {
      newUrl = `/mypostings/open/${jobId}`;
      jobType = "open"

      this.props.openJobs.map((job) => {
        if (jobId == job.job_id) {
          newCurrentJob = job;
        }
      })
    }

    /*
     * Get the job id of the new page and find the
     * Closed job pbject to set as the new job.
     */

    if (this.props.route.page == "postings-closed") {
      newUrl = `/mypostings/closed/${jobId}`;
      jobType = "closed"

      this.props.closedJobs.map((job) => {
        if (jobId == job.job_id) {
          newCurrentJob = job;
        }
      })
    }

    /*
     * Get the job id of the new page and find the
     * Awaiting job pbject to set as the new job.
     */

    if (this.props.route.page == "postings-approval") {
      newUrl = `/mypostings/approval/${jobId}`;
      jobType = "awaiting"

      this.props.awaitingJobs.map((job) => {
        if (jobId == job.job_id) {
          newCurrentJob = job;
        }
      })
    }

    this.context.router.push(newUrl)
    this.props.changeSelectedJob(newCurrentJob, jobType)
  },

  openCloseJobModal () {
    this.refs.confirmCloseOpenJobModal.show();
  },

  closeCloseJobModal () {
    this.refs.confirmCloseOpenJobModal.hide();
  },

  /*
   * closeJob
   * 
   * Calls redux and HTTP to actually close the job 
   * and show a toastr message after.
   */

  closeJob () {
    const jobIdOfJobToClose = this.props.selectedOpenJob.job_id;
    this.props.closeJob(jobIdOfJobToClose, 

      /*
       * Success callback
       */

      () => {
        this.closeCloseJobModal();

        this.refs.container.success(
          "Applicants notified of closure",
          "Job closed.",
          {
            timeout: 3000
        });

        setTimeout(() => {
          window.location.reload()
          this.context.router.push('/mypostings/open')
        }, 3000)
      },

      /*
       * Failure callback
       */

      () => {
        this.closeCloseJobModal();

        this.refs.container.error(
          "Please reach out to us for help.",
          "Error closing job.",
          {
            timeout: 3000
        });
      }
    )
  },

  render () {
    return (
      <div className={pageContainer} >
        <SidebarContainer isMobile={this.props.isMobile} isAStudent={false} 
          page={this.props.route.page}
          profilePicture={config.mediaUrl + this.props.profile.employerProfile.logoUrl}
        />

        {

          /*
           * My Open Postings
           * My Closed Postings
           * My Awaiting Postings
           */

          this.props.route.page === "postings-open"
            ? <MyPostings 
                jobs={this.props.openJobs}
                selectedJob={this.props.selectedOpenJob}
                selectedOpenJobInvites={this.props.selectedOpenJobInvites}
                jobSelectDropdownIsOpen={this.props.jobSelectDropdownIsOpen}
                editViewEnabled={this.props.editViewEnabled}

                handleChangeSelectedJob={this.props.changeSelectedJob}
                handleOpenJobSelect={this.props.openJobSelect}
                handleChangeSelectedJob={this.changeUrlAndSetSelectedJob}
                handleCloseJob={this.openCloseJobModal}
                handleEnterEditJobDetailsView={this.props.enterEditJobDetailsView}
                handleUpdateJobDetailsField={this.props.updateJobDetailsField}
              />
            : this.props.route.page === "postings-closed"
            ? <MyClosedPostings 
                jobs={this.props.closedJobs}
                selectedJob={this.props.selectedClosedJob}
                jobSelectDropdownIsOpen={this.props.jobSelectDropdownIsOpen}

                handleChangeSelectedJob={this.props.changeSelectedJob}
                handleOpenJobSelect={this.props.openJobSelect}
                handleChangeSelectedJob={this.changeUrlAndSetSelectedJob}
              />
            : this.props.route.page === "postings-approval"
            ? <MyAwaitingPostings 
                jobs={this.props.awaitingJobs}
                selectedJob={this.props.selectedAwaitingJob}
                jobSelectDropdownIsOpen={this.props.jobSelectDropdownIsOpen}

                handleChangeSelectedJob={this.props.changeSelectedJob}
                handleOpenJobSelect={this.props.openJobSelect}
                handleChangeSelectedJob={this.changeUrlAndSetSelectedJob}
              />
            : ''
        }

        {
          /*
            * ========================================
            *        Confirm Close Open job 
            * ========================================
            *
            * This modal asks if you really want to close
            * the job or not and it also notifies you of 
            * the repercussions to doing that.
            */
          }
          <div id="confirm-close-open-job-modal-wrapper">
            <SkyLight
                  ref="confirmCloseOpenJobModal"
                  title="Close job?">
                  <div>Do you really want to close {this.props.selectedOpenJob ? this.props.selectedOpenJob.title : ''}</div>
                  <div>
                    <button onClick={this.closeJob}>Close job</button>
                    <button onClick={this.closeCloseJobModal}>Cancel</button>
                  </div>
            </SkyLight>
          </div>

          <ToastContainer ref="container"
            toastMessageFactory={ToastMessageFactory}
            className="toast-bottom-left" />
        
    </div>
    )
  },
})

/* The entire redux store is passed in here,
// Return an object defining which values you want to bind to props
//
// @params ({user}) contains BaseUser & Employer attributes
// */

function mapStateToProps({user, job, list, profile, mypostings}) {
  return {
	  user: user ? user : {},
    job: job ? job.employerJobs.jobs : [],
    profile: profile ? profile : {},
    industryList: list.industries ? list.industries : [],
    jobTypes: list.jobTypes ? list.jobTypes : [],
    openJobs: mypostings.openJobs ? mypostings.openJobs : [],
    closedJobs: mypostings.closedJobs ? mypostings.closedJobs : [],
    awaitingJobs: mypostings.awaitingJobs ? mypostings.awaitingJobs : [],
    selectedOpenJob: mypostings.selectedOpenJob ? mypostings.selectedOpenJob : {},
    selectedOpenJobInvites: mypostings.selectedOpenJobInvites ? mypostings.selectedOpenJobInvites : [],
    selectedClosedJob: mypostings.selectedClosedJob ? mypostings.selectedClosedJob : {},
    selectedAwaitingJob: mypostings.selectedAwaitingJob ? mypostings.selectedAwaitingJob : {},
    jobSelectDropdownIsOpen: mypostings.jobSelectDropdownIsOpen ? mypostings.jobSelectDropdownIsOpen : false,
    editViewEnabled: mypostings.editViewEnabled ? mypostings.editViewEnabled : false
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
    ...mypostingsActionCreators
  }, dispatch)
}

// connect(specify_what_keys_you_want_from_store, wraps_dispatch_around_action_creators)(container)

export default connect(mapStateToProps, mapActionCreatorsToProps)(MyPostingsContainer)
