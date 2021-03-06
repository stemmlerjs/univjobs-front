
// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import { StudentDashboard } from 'modules/Dashboard'
import { PinJobs } from 'modules/PinJobs'
import { Invites } from 'modules/Invites'
import { Applications } from 'modules/Applications'
import { JobCardModal, CompanyInfoSideBar, ShareJobModal } from 'modules/SharedComponents'

import config from 'config'

import { getGoogleMapsLink } from 'helpers/dashboard'

// ==============THIRD PARTY IMPORTS========================= //
import SkyLight from 'react-skylight'

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as dashboardActionCreators from 'redux/modules/dashboard/dashboard'
import * as jobActionCreators from 'redux/modules/job/job'
import jobAppModal from 'redux/modules/dashboard/jobAppModal'
import employerProfileModal from 'redux/modules/dashboard/employerProfileModal'
import shareJobModal from 'redux/modules/dashboard/shareJobModal'
import * as list from 'helpers/lists'
import * as fetch from 'helpers/dashboard'

import { authRedirectFilter } from 'config/routes'

// ==================MESSAGES============================== //

var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

// ================CSS IMPORTS============================== //
import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'
import { applyButton, cancelBtn, applyButtonsContainer, companyInfoSidebarWrapper, 
  studentDashboardComponentWrapper } from '../styles/StudentDashboardStyles.css'


let reloadJobs = ""

const StudentDashboardContainer = React.createClass({
    propTypes: {
	  user: PropTypes.object,
	  jobs: PropTypes.array,
	  modal : PropTypes.object,
	  answer : PropTypes.object,
	  pin: PropTypes.object
    },

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
    	  student: '/join',	     // if not logged in, go here (student)
    	  employer: '/join'      // if not logged in, go here (employer)
      },
      restricted: {
        to: 'STUDENTS',		              // STUDENTS only on this route
	      redirectTo: '/dashboard/em'    // if not an EMPLOYER, redirect to the employer equivalent
      },
      profileIncompleteRedirect: true
    }
     return authRedirectFilter(config, this.context.store, this.context.router)
  },

  clearJobStore() {
  	this.context.store.getState().dashboard.jobs = this.context.store.getState().dashboard.studentDashboard.jobs.filter((k) => {
  		return k.id != this.context.store.getState().dashboard.modal.jobId ? k : ''
  	})
  },

  /*
   * pinJob
   *
   * This will actually pin or unpin the job based on the current
   * status of the job.
   */

  pinJob(e, job) {

      e.preventDefault()
      e.stopPropagation()

     /*
      * Lockout
      */

      if (!this.props.isPinningJob) {

        if(job.pinned == 0) {

         /*
          * PIN the job and display the
          * toaster based on the success of it.
          */

          this.props.pinJob(job.job_id,

         /*
          * Success Callback
          */

          () => {

            this.refs.container.success(
              "Job saved to My Pinned Jobs.",
              "Pinned!",
              {
                timeout: 3000
              });

          },

         /*
          * Failure Callback
          */

          () => {

            this.refs.container.error(
              "Whoops.",
              "Something went wrong pinning this job.", {
                timeout: 3000
            });

          })


        } else {

         /*
          * UNPIN the job and display the
          * toaster based on the success of it.
          */

          this.props.unpinJob(job.job_id,

         /*
          * Success Callback
          */

          () => {

            this.refs.container.success(
              "Removed this job from your Pinned Jobs.",
              "Unpinned!",
              {
                timeout: 3000
              });

          },

         /*
          * Failure Callback
          */

          () => {

            this.refs.container.error(
              "Whoops.",
              "Something went wrong unpinning this job.", {
                timeout: 3000
              });

          })

        }

      }

  },

  /*
   * applyToJob
   *
   *  This event is pressed the button inside JobCardModal
   *  It should passed the two answers given by the user and it's student id
   */

  applyToJob () {
    const _this = this;
    const jobAppModal = this.props.jobAppModal
    const questions = jobAppModal.selectedJob.questions

    const answerOneText = jobAppModal.answerOne
    const answerTwoText = jobAppModal.answerTwo
    const jobId = jobAppModal.selectedJob.job_id
    const question_one_id = questions[0] ? questions[0].question_id : null
    const question_two_id = questions[1] ? questions[1].question_id : null

    if (questions.length !== 0) {

     /*
      * The user didnt answer all the questions asked.
      */

      if ((answerOneText == "" && question_one_id !== null) || (answerTwoText == "" && question_two_id !== null)) {

        this.refs.container.error(
          "Hold up.",
          "✋ You need to answer the employer's question if you want to apply to this job.", {
            timeout: 3000
          });

      }

      /*
      * The user answered all the questions or it's not necessary to answer
      * questions because there isn't any.
      */

      else {

        doApplyToJob()

      }
    }

   /*
    * This job didn't have any questions, lets apply!
    */

    else {

      doApplyToJob()

    }

   /*
    * applyToJob
    *
    * Do the actual application of the job.
    */

    function doApplyToJob () {

     /*
      * Lockout. Don't allow them to click to apply again if we're currently applying.
      */

      if (!_this.props.isApplying) {

        _this.props.submitJobApplication(jobId, question_one_id, answerOneText, question_two_id, answerTwoText,

       /*
        * Success Callback
        */

        () => {

          _this.refs.container.success(
          "Nice work on applying to that job.",
          "Done!",
          {
            timeout: 3000
          });

          /*
          * Remove that job from the dashboard now.
          */

          _this.props.updateAppliedJob(jobId)

          /*
          * Close the apply and job modal
          */

          _this.closeConfirmApplyModal()
          _this.closeJobAppModal()

        },

       /*
        * Failure Callback
        */

        (error) => {

          if (error.status == 409) {
             _this.refs.container.error(
              "",
              "You already applied to this job posting.", {
                timeout: 3000
              });
          }

          else {
            console.log(error)

            _this.refs.container.error(
              "Please try again later or let us know if the error persists.",
              "Something went wrong trying to apply to this job :(", {
                timeout: 3000
            });

          }

          _this.closeConfirmApplyModal()


        })

      }

    }



  },

 /*
  * openJobAppModal
  *
  * Opens the job app modal that contains all of the job
  * details, questions and answers fields so that students
  * may apply to a job.
  *
  * We also need to change the url when we OPEN a job app modal.
  *
  * When a job app modal is closed, we also need to change the modal.
  */

  openJobAppModal(e, selectedJob) {
    debugger;
    if (e !== null) e.preventDefault()

    var jobId = selectedJob.job_id;
    var jobTitle = selectedJob.title;

    // var url;
    // if (window.CURRENT_ENV == "dev") {
    //   url = window.location.href.substring(0, window.location.href.indexOf("?")) + "/" + jobId
    // }

    // else {
    //   url = window.location.href + "/" + jobId
    // }
    
    document.title = jobTitle + " - Univjobs";
    
    var path = this.props.route.path 
    var newPath = path + "/" + jobId

    this.context.router.push(newPath)

    this.props.openJobAppModal(selectedJob)
    this.refs.jobAppModal.show()
  },

  /*
   * afterJobAppModalClose
   * 
   * After we close the job modal, we need to 
   * remove the jobId from the route.
   */

  afterJobAppModalClose() {

    var path = this.props.route.path;
    var newPath = path.substring(path, path.indexOf(":") - 1)

    console.log('new path', newPath)

    this.context.router.push(newPath)
  },

 /*
  * removeApplication
  *
  * Used by students to remove the application that they've been notified
  * that they did not get hired to.
  */

  removeApplication (e, selectedJob) {
    e.preventDefault()

    if (!this.props.isRemovingJob) {

     /*
      * This won't actually open the job app modal,
      * but it will set the selected job for us which is what we want.
      */

      this.props.openJobAppModal(selectedJob)

      this.props.removeJobFromApplicants(selectedJob.job_id,

     /*
      * Success callback
      */

      () => {

        this.refs.deletetoastr.success(
          "Removed old application.",
          "Done!",
          {
            timeout: 3000
        });

      },

     /*
      * Failure callback
      */

      () => {

         this.refs.deletetoastr.error(
            "Whoops.",
            "Something went wrong trying to remove this.",
            {
              timeout: 3000
          });


      })

    }


  },

  undoRemoveApplication () {

    var jobId = this.props.removedJobId

    if (!this.props.isUndoingRemove) {

      this.props.undoRemoveJobFromApplicants(jobId,

     /*
      * Success Callback
      */

      () => {

        this.refs.deletetoastr.success(
          "Successfully un-did that for you.",
          "Brought it back.",
          {
            timeout: 3000
        });

      },

     /*
      * Failure Callback
      */

      () => {

        this.refs.deletetoastr.error(
          "Something went wrong trying to bring that back.",
          "Whoops.",
          {
            timeout: 3000
        });

      })

    }

  },

 /*
  * closeJobAppModal
  *
  * Closes the job app modal.
  */

  closeJobAppModal() {
    this.refs.jobAppModal.hide()
  },

  handleUpdateAnswerText (index, val) {
    this.props.updateAnswerText(index, val)
  },

 /*
  * openConfirmApplyModal
  *
  * When a student finally clicks Apply, they are presented with this
  * confirmation modal to make sure that the student really wants
  * to submit their application.
  *
  * This pops up overtop of the job app modal.
  */

  openConfirmApplyModal () {
    this.refs.confirmApplyModal.show()
  },

 /*
  * closeConfirmApplyModal
  *
  * Close the confirm apply modal that pops up overtop of the
  * job app modal.
  */

  closeConfirmApplyModal () {
    this.refs.confirmApplyModal.hide()
  },

  componentDidMount () {
    console.log("OK, component mounted")
  },

 /*
  * componentDidMount
  * 
  * In this lifecycle component, we need to check to see if 
  * we need to open the job card modal or not.
  *
  * If we see :jobId in the path, then we should get it and open 
  * the modal with that job card.
  */

  componentWillMount() {
    document.title = `Univjobs - Land Your Summer Job Today`;

    var shouldOpenModal = false;
    var jobId = ""
    if (this.props.route.path.indexOf(':jobId') !== -1) {
      shouldOpenModal = true;
      jobId = this.props.params.jobId;
    }

  	this.doRedirectionFilter()
      .then(() => {
        return new Promise((resolve, reject) => {

          this.props.getAllJobsStudentJobView(

           /*
            * Callback after getting all jobs.
            */ 

            () => {

             /*
              * If :jobId is present in the request, then we're going to have to
              * find the job that this id belongs to from the view and then we're 
              * going to have to open the modal for it.
              */
               
                if (shouldOpenModal) {
                  var jobFound = false;
                  console.log(`[Univjobs]: About to attempt to open job_id=${jobId} from external link.`)

                /*
                 * Find the job that we need to open.
                 */
    
                  this.props.jobs.forEach((job) => {
                    
                    /*
                     * Found the job.
                     * Open the job modal and set the current selected job.
                     */

                    if (job.job_id == jobId) {
                      
                      console.log(`[Univjobs]:Found job job_id=${jobId} on componentWillMount. We should load this into the job app modal on componentDidMount().`)
                      jobFound = true;
                      this.props.openJobAppModal(job)
                      this.refs.jobAppModal.show()

                    }

                  });

                  /*
                  * If we were unable to find the job from a link,
                  * alert a toastr saying that we couldn't find that job id.
                  * 
                  * Also say change the url to the basic non params link.
                  */

                  if (!jobFound) {

                    this.refs.container.error(
                      "It may not exist anymore... or maybe it never did! Spooky.",
                      "Hmm. We don't know where that job is.", {
                        timeout: 3000
                    });

                    var path = this.props.route.path;
                    var newPath = path.substring(path, path.indexOf(":") - 1)

                    this.context.router.push(newPath)
                    
                  }

                }

            }

          )

          /*
           * Always resolve so that we don't stop the 
           * page from loading.
           */

          resolve()

        })
      })
      .then(this.props.handleGetIndustries())
      .then(this.props.handleGetJobTypes())
      .then(this.props.closeOverlay())

  },

  componentWillReceiveProps (nextProps) {

   /*
    * This is the logic that dictates whether we should reload
    * the jobs or not.
    *
    * We only reload when we switch pages right now. We should change
    * this logic in the future to only reload jobs when we go to the
    * DASHBOARD view instead; this would require every other page to
    * only make mutations to the store.jobs attribute for any API calls
    * made.
    */

    if (reloadJobs == "") {
        reloadJobs = this.props.route.page
      }

      if (nextProps.route.page !== reloadJobs) {
        console.log("[Univjobs]: Changed Jobs view. We should update jobs.")
        reloadJobs = nextProps.route.page

        this.props.getAllJobsStudentJobView()
      }

  },

  /*
   * filterStudentJobs
   *
   * Students are able to filter jobs. When the student changes the default filter
   * config object, we have to edit the student's view of all jobs that have come in.
   *
   * This function is TEMPORARY for now as we will do front end filtering at this point.
   *
   * It works by iterating over all of the jobs and checking the filter config to see if it
   * should be rendered or not.
   *
   * Jobs that are to be filtered should have an attribute added to them called "filter_show".
   * If true, we set to true and if false, we set to false.
   */

  filterStudentJobs () {

    console.log('filtering jobs')

    let filterConfig = this.props.filterConfig
    let jobs = this.props.jobs
    let filteredJobs = {}

    /*
     * Filter by job type
     */

    for(var i = 0; i < jobs.length; i++) {

      if (jobs[i].type === 1 && filterConfig.jobType.otg === true) {
        filteredJobs[i] = jobs[i]
        continue
      }

      if (jobs[i].type === 2 && filterConfig.jobType.summer === true) {
        filteredJobs[i] = jobs[i]
        continue
      }

      if (jobs[i].type === 3 && filterConfig.jobType.winter === true) {
        filteredJobs[i] = jobs[i]
        continue
      }

      if (jobs[i].type === 4 && filterConfig.jobType.freelance === true) {
        filteredJobs[i] = jobs[i]
        continue
      }

      if (jobs[i].type === 5 && filterConfig.jobType.rep === true) {
        filteredJobs[i] = jobs[i]
        continue
      }

      if (jobs[i].type === 6 && filterConfig.jobType.pt === true) {
        filteredJobs[i] = jobs[i]
        continue
      }
    }

    /*
     * Filter by keyword and city
     */

    if (filterConfig.keyword !== "" || filterConfig.city !== "" || filterConfig.industry !== "" || filterConfig.industry == undefined) {
      for (var j = 0; j < jobs.length; j++) {

        if (filterConfig.keyword !== "") {
          if (jobs[j].responsibilities.toUpperCase().indexOf(filterConfig.keyword.toUpperCase()) !== -1) {
            filteredJobs[j] = jobs[j]
            continue
          }

          if (jobs[j].qualification.toUpperCase().indexOf(filterConfig.keyword.toUpperCase()) !== -1) {
            filteredJobs[j] = jobs[j]
            continue
          }

          if (jobs[j].title.toUpperCase().indexOf(filterConfig.keyword.toUpperCase()) !== -1) {
            filteredJobs[j] = jobs[j]
            continue
          }
        }

        if (filterConfig.city !== "") {
          if (jobs[j].location.toUpperCase().indexOf(filterConfig.city.toUpperCase()) !== -1) {
            filteredJobs[j] = jobs[j]
            continue
          }
        }

        if (filterConfig.industry !== "" && filterConfig.industry == jobs[j].industry) {
          filteredJobs[j] = jobs[j]
          continue
        }

        // We need to add this case for when we erase the industry filter. When it's erased,
        // industry becomes undefined. If it's undefined, we want to return all results.

        if (filterConfig.industry == undefined) {
          filteredJobs[j] = jobs[j]
          continue
        }

        delete filteredJobs[j]
      }
    }



    /*
     * [ADD MORE FILTERS HERE]
     */

    /*
     * Now, we will alter the store to show only the filtered jobs.
     * First, set all jobs to false (don't show).
     */

    jobs = jobs.map((job) => {
      job.filter_show = false;
      return job
    })

    /*
     * Then, only show all the jobs that made it through the filter.
     */

    for (var key in filteredJobs) {
      jobs[Number(key)].filter_show = true
    }

    /*
     * Update the store.
     */

    this.props.updateFilteredJobs(jobs)
  },

  componentWillUnmount() {

  },

  /*
   * handleCompanyInfoSidebarStateChange
   *
   * We need this function to update Redux when the modal is closed so it doesn't
   * open up again anytime new props are loaded in and this.props.employerProfileModal.isOpen
   * still === true.
   */

  handleCompanyInfoSidebarStateChange (state) {
    if (!state.isOpen) {
      this.props.employerProfileModalClosed()
    }
  },

  /*
   * handleOpenShareModal
   * 
   * Open the share modal and put the job info
   * for this job into redux.
   */

  handleOpenShareModal (jobObject) {

    var path = this.props.route.path 
    var newPath = path + "/" + jobObject.job_id

    this.context.router.push(newPath)

    this.props.openShareJobModal(jobObject)
    this.refs.shareJobModal.show();

    /*
     * And then, select the target to copy and paste.
     */
    
    setTimeout(() => {
      document.getElementById("share-job-target").focus();
      document.getElementById("share-job-target").select();
    }, 50)

  },

  render () {
    return (
      <div className={studentDashboardComponentWrapper}>

        {
         /*
          * CompanyInfoSideBar
          *
          * When a student clicks on Company Info on a Job Card, the Company Info
          * sidebar component opens up.
          */
        }
        <div className={companyInfoSidebarWrapper}>
          <CompanyInfoSideBar
            onStateChange={ this.handleCompanyInfoSidebarStateChange }
            isOpen={this.props.employerProfileModal.isOpen}
            employerName={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.employerName : null}
            industry={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.industry : null}
            logoUrl={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.logoUrl : null}
            headquarters={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.headquarters : null}
            website={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.website : null}
            numEmployees={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.numEmployees : null}
            aboutSectionExpanded={this.props.employerProfileModal.isAboutSectionOpen ? this.props.employerProfileModal.isAboutSectionOpen : false}
            handleToggleAboutSection={this.props.toggleAboutSection}
            about={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.about : null}/>
        </div>

        {
         /*
          * The rest of the page.
          */
        }

        <div id="page-wrap" className={pageContainer} >
            <SidebarContainer isAStudent={true} isMobile={this.props.isMobile} profilePicture={typeof this.props.profile.photo !== "object" 
              ? config.mediaUrl + 'avatar/' + this.props.profile.photo
              : this.props.profile.photo ? this.props.profile.photo.preview : ''  }
              page={this.props.route.page}
            />

            {
              this.props.route.page === "dashboard"
                ? <StudentDashboard
                    handleCardClick={this.openJobAppModal}
                    handlePinJob={this.pinJob}
                    jobs={this.props.jobs ? this.props.jobs : []}
                    isFetchingJobs={this.props.isFetchingJobs}
                    industries={this.props.industries ? this.props.industries : {}}
                    industriesList={this.props.industryList ? this.props.industryList : []}
                    jobTypes={this.props.jobTypes ? this.props.jobTypes : []}
                    refreshJobs={this.props.getAllJobsStudentJobView}
                    page={this.props.route.page}
                    updateFilter={this.props.updateFilterSettings}
                    filterStudentJobs={this.filterStudentJobs}
                    filterConfig={this.props.filterConfig}
                    updateFilterSettings={this.props.updateFilterSettings}
                    handleToggleFilterMenu={() => {

                      if (!this.props.filterMenuOpen) {
                        setTimeout(() => {
                          this.props.toggleFilterMenu(true)
                        },300)
                      }

                      else {
                         this.props.toggleFilterMenu(true)
                      }
                      
                    }}
                    filterMenuOpen={this.props.filterMenuOpen}
                    handleOpenEmployerProfileModal={this.props.employerProfileModalOpened}
                    schoolAddress={this.props.profile ? this.props.profile.schoolAddress : ''}
                    handleOpenShareModal={this.handleOpenShareModal}
                    industryFilterOpen={this.props.industryFilterOpen}
                  />
                : ''
            }

            {
              this.props.route.page === "pinnedjobs"
                ? <PinJobs
                    handleCardClick={this.openJobAppModal}
                    handlePinJob={this.pinJob}
                    jobs={this.props.jobs ? this.props.jobs : ''}
                    isFetchingJobs={this.props.isFetchingJobs}
                    industries={this.props.industries ? this.props.industries : {}}
                    jobTypes={this.props.jobTypes ? this.props.jobTypes : []}
                    refreshJobs={this.props.getAllJobsStudentJobView}
                    page={this.props.route.page}
                    handleOpenEmployerProfileModal={this.props.employerProfileModalOpened}
                    schoolAddress={this.props.profile ? this.props.profile.schoolAddress : ''}
                    handleOpenShareModal={this.handleOpenShareModal}
                  />
                : ''
            }

            {
              this.props.route.page === "applications"
                ? <Applications
                    handleCardClick={this.openJobAppModal}
                    handleRemoveJob={this.removeApplication}
                    handlePinJob={this.pinJob}
                    jobs={this.props.jobs ? this.props.jobs : ''}
                    isFetchingJobs={this.props.isFetchingJobs}
                    industries={this.props.industries ? this.props.industries : {}}
                    jobTypes={this.props.jobTypes ? this.props.jobTypes : []}
                    refreshJobs={this.props.getAllJobsStudentJobView}
                    page={this.props.route.page}
                    handleOpenEmployerProfileModal={this.props.employerProfileModalOpened}
                    schoolAddress={this.props.profile ? this.props.profile.schoolAddress : ''}
                    handleOpenShareModal={this.handleOpenShareModal}
                  />
                : ''
            }

            {
              this.props.route.page === "invitations"
                ? <Invites
                    handleCardClick={this.openJobAppModal}
                    handlePinJob={this.pinJob}
                    jobs={this.props.jobs ? this.props.jobs : ''}
                    isFetchingJobs={this.props.isFetchingJobs}
                    industries={this.props.industries ? this.props.industries : {}}
                    jobTypes={this.props.jobTypes ? this.props.jobTypes : []}
                    refreshJobs={this.props.getAllJobsStudentJobView}
                    page={this.props.route.page}
                    handleOpenEmployerProfileModal={this.props.employerProfileModalOpened}
                    schoolAddress={this.props.profile ? this.props.profile.schoolAddress : ''}
                    handleOpenShareModal={this.handleOpenShareModal}
                  />
                : ''
            }



            {
            /*
              * ========================================
              *           jobAppModal
              * ========================================
              *
              * This is the main modal for this screen.
              * It's purpose is to allow the student to see
              * the details for a job and apply to the job
              * after filling in any answers to questions if necessary.
              */
            }
            <div id="job-app-modal-wrapper">
              <SkyLight
                    ref="jobAppModal"
                    afterClose={this.afterJobAppModalClose}
                    >

                    { this.props.jobAppModal.selectedJob
                      ? <JobCardModal
                          cardType={this.props.route.page}
                          title={this.props.jobAppModal.selectedJob.title}
                          questions={this.props.jobAppModal.selectedJob.questions}
                          job={this.props.jobAppModal.selectedJob}
                          updateAnswerText={this.props.updateAnswerText}
                          closeJobAppModal={this.closeJobAppModal}
                          openConfirmApplyModal={this.openConfirmApplyModal}
                          updateAnswerText={this.handleUpdateAnswerText}
                          industries={this.props.industries}
                          handlePinJob={this.pinJob}
                          handleOpenEmployerProfileModal={this.props.employerProfileModalOpened}
                          page={this.props.route.page}
                          mapsLink={getGoogleMapsLink(this.props.profile.schoolAddress, this.props.jobAppModal.selectedJob.location)}
                          />
                      : ''
                    }

                </SkyLight>
              </div>

          {
            /*
              * ========================================
              *           Confirm Apply to job
              * ========================================
              *
              * This is the main modal for this screen.
              * It's purpose is to allow the student to see
              * the details for a job and apply to the job
              * after filling in any answers to questions if necessary.
              *
              */
            }
            <div id="apply-to-job-modal-wrapper">
              <SkyLight
                    ref="confirmApplyModal"
                    title="Apply to job?">
                    <div>Position: {this.props.jobAppModal.selectedJob ? this.props.jobAppModal.selectedJob.title : ''}</div>
                    <div className={applyButtonsContainer}>
                      <button className={applyButton} onClick={this.applyToJob}>YES, APPLY</button>
                      <button className={cancelBtn} onClick={this.closeConfirmApplyModal}>CANCEL</button>
                    </div>
              </SkyLight>
            </div>

          
          {
            /*
              * ========================================
              *           Share Job Modal
              * ========================================
              *
              * This job allows users to share jobs.
              *
              */
            }
            <div id="share-modal-wrapper">
              <SkyLight
                    ref="shareJobModal"
                    title="Sharing is caring"
                    afterClose={this.afterJobAppModalClose}
                    >
                    
                    <ShareJobModal
                      job={this.props.shareJobModal ? this.props.shareJobModal.job : {}}
                    />
              </SkyLight>
            </div>

          <ToastContainer ref="container"
              toastMessageFactory={ToastMessageFactory}
              className="toast-top-right" />

          <ToastContainer ref="deletetoastr"
              toastMessageFactory={ToastMessageFactory}
              className="toast-top-right"
              onClick={this.undoRemoveApplication}>
          </ToastContainer>

      </div>
    </div>
    )
  },
})

/* The entire redux store is passed in here,
// Return an object defining which values you want to bind to props
//
// @params ({user}) contains BaseUser & Employer attributes
// */

function mapStateToProps({user, dashboard, job, profile, list}) {
  return {
	  user: user ? user : {},
    profile: profile.studentProfile ? profile.studentProfile : {},
	  jobs: job.studentJobsView ? job.studentJobsView : [],
    isFetchingJobs: job.isFetching ? job.isFetching : false,
	  jobAppModal: dashboard.studentDashboard.jobAppModal ? dashboard.studentDashboard.jobAppModal : {},
	  industries : list.industries ? list.industries : {},
    industryList: list.industriesArray ? list.industriesArray : [],
	  jobTypes : list.jobTypes ? list.jobTypes : [],
    isApplying: dashboard.studentDashboard.jobAppModal ? dashboard.studentDashboard.jobAppModal.isApplying : false,
    applySuccess: dashboard.studentDashboard.jobAppModal ? dashboard.studentDashboard.jobAppModal.applySuccess : false,
    isPinningJob: job.isPinningJob ? job.isPinningJob : false,
    pinJobSuccess: job.pinJobSuccess ? job.pinJobSuccess : false,
    isRemovingJob: job.isRemovingJob ? job.isRemovingJob : false,
    removeJobSuccess: job.removeJobSuccess ? job.removeJobSuccess: false,
    isUndoingRemove: job.isUndoingRemove ? job.isUndoingRemove : false,
    undoRemoveSuccess: job.undoRemoveSuccess ? job.undoRemoveSuccess : false,
    removedJobId: job.removedJobId ? job.removedJobId : false,
    filterConfig: dashboard.studentDashboard.filterConfig ? dashboard.studentDashboard.filterConfig : {
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
    },
    filterMenuOpen: dashboard.studentDashboard.filterMenuOpen ? dashboard.studentDashboard.filterMenuOpen : false,
    industryFilterOpen: dashboard.studentDashboard.industryFilterOpen ? dashboard.studentDashboard.industryFilterOpen :false,
    employerProfileModal: dashboard.employerProfileModal ? dashboard.employerProfileModal : {},
    shareJobModal: dashboard.shareJobModal ? dashboard.shareJobModal : {}
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
    ...userActionCreators,
    ...dashboardActionCreators,
    ...jobActionCreators,
    ...jobAppModal.actionCreators,
    ...employerProfileModal.actionCreators,
    ...shareJobModal.actionCreators
  }, dispatch)
}

// connect(specify_what_keys_you_want_from_store, wraps_dispatch_around_action_creators)(container)

export default connect(mapStateToProps, mapActionCreatorsToProps)(StudentDashboardContainer)
