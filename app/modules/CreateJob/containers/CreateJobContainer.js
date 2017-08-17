
// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import CreateJobFormPage1 from '../components/CreateJobFormPage1'
import CreateJobFormPage2 from '../components/CreateJobFormPage2'
import CreateJobFormPage3 from '../components/CreateJobFormPage3'
import CreateJobFormPage4 from '../components/CreateJobFormPage4'

import { JobCardModal, CompanyInfoSideBar } from 'modules/SharedComponents'

import config from 'config'

// ==============THIRD PARTY IMPORTS========================= //
import SkyLight from 'react-skylight'

// ================CSS IMPORTS============================== //
import { mainContainer, circle, selectedCircle } from '../styles/CreateJobContainerStyles.css'

// ====== REDUX AND STATE IMPORTS =======
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as createJobActionCreators from 'redux/modules/createjob/createjob'
import * as listActionCreators from 'redux/modules/list/list'
import jobAppModal from 'redux/modules/dashboard/jobAppModal'
import { authRedirectFilter } from 'config/routes'
import * as lists from 'helpers/lists'

import employerProfileModal from 'redux/modules/dashboard/employerProfileModal'

import { pageContainer, formHeader } from 'sharedStyles/sharedContainerStyles.css'
import { cancelButton, confirmButton, buttonsContainer } from 'sharedStyles/sharedComponentStyles.css'

// ============= MESSAGES ===============
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

let submitted = false;


/* =============================================================
* Circles Components
* ==============================================================
*/

const Circles = function({count, selected}) {
  let circleElements = [];

  function createElements() {
    for(var i = 1; i <= count; i++) {
      if(i === selected) {
        circleElements.push({
          key: i,
          selected: true
        })
      } else {
        circleElements.push({
          key: i,
          selected: false
        })
      }
    }
  }

  // Create list of circles elements
  createElements()

  return (
    <div>
      {circleElements.map((el) => {
        return <div className={el.key === selected ? circle + ' ' + selectedCircle : circle} key={el.key}></div>
      })}
    </div>
  )
}

/* =============================================================
* Form Header
* ==============================================================
*/

const FormHeader = function({stepNum, totalSteps, headerText}) {
  return (
    <div className={formHeader}>
      <h3>{"Steps " + stepNum + " of " + totalSteps}</h3>
      <Circles count={totalSteps} selected={stepNum} />
      <h3>{headerText}</h3>
    </div>
  )
}


/* =============================================================
* CREATE JOB CONTAINER
* ==============================================================
*/

const CreateJobContainer = React.createClass({
  propTypes: {
      user: PropTypes.object,
      emailVerified: PropTypes.bool, 
      currentPage: PropTypes.number,
      industry: PropTypes.number,
      industryList: PropTypes.array,
      companyName: PropTypes.string,
      logoUrl: PropTypes.string,
      page1: PropTypes.object,
      jobTitle: PropTypes.string,
      isPayingJob: PropTypes.bool,
      //startDate assumes that is a number, not a string
      startDate: PropTypes.number,
      responsibilities: PropTypes.string,
      qualifications: PropTypes.string,
      desiredSkills: PropTypes.string,
      internshipLocation: PropTypes.string,
      remoteWork: PropTypes.bool,
      compensation: PropTypes.string,
      MAX_CHARS_responsibilities: PropTypes.number,
      MAX_CHARS_qualifications: PropTypes.number,
      MAX_CHARS_desiredSkills: PropTypes.number,
      MAX_CHARS_compensation: PropTypes.number,
      page1PropsErrorMap: PropTypes.object,
      page2: PropTypes.object,
      question1: PropTypes.string,
      question2: PropTypes.string,
      MAX_CHARS_question: PropTypes.number,
      page2PropsErrorMap: PropTypes.object,
      page3: PropTypes.object,
      maxApplicants: PropTypes.number,
      page3PropsErrorMap: PropTypes.object,
      page4: PropTypes.object,
      errorExist: PropTypes.bool,
      errors: PropTypes.array,
      submitSucess: PropTypes.bool
  },

  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  },

 /*
  * componentWillMount()
  *
  * We're using this React lifecycle method to:
  * 1) Close the Overlay when we visit the page from a direct URL
  *
  * @void
  *
  */
  componentWillMount() {
      this.doRedirectionFilter()
        .then(this.props.handleGetIndustries())
        .then(this.props.handleGetJobTypes())
  	    .then(this.props.closeOverlay())
  },

  componentDidMount() {
    window.onbeforeunload = this.confirmExit;
  },


  componentWillUnmount() {
    window.onbeforeunload = null;
  },

 /*
  * componentWillReceiveProps
  *
  * When props come in, lets do the following:
  * - check for error messages to display an error message
  * - check for a success message to display a success message
  *
  * @param (Object) newProps
  */

  componentWillReceiveProps(newProps) {
    let error = newProps.errorsExist;
    let submitSuccess = newProps.submitSuccess;

    if(error) {
      this.refs.container.error(
        error,
        "Blank or invalid values found on form. Please correct errors to continue.", {
        timeOut: 3000
      });
    }

  },

  confirmExit() {
    console.log("confirm exit")
    if(this.userMadeChanges()) {
      console.log("made changes")
      return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
    } else {
      console.log("user made no changes")
    }
  },

  /** doRedirectionFilter
  *
  * The redirection filter is the process that occurs each time we enter this container.
  * Used in every higher order component and supplied with a config, it ensures that the
  * user is redirected to the appropriate page based on their authentication status and
  * user type.
  *
  * ADDITIONALLY IMPORTANT. The authRedirectFilter gets PROFILE INFO for the current user.
  *
  * @return (Promise)
  *
  */

  doRedirectionFilter(){
    const config = {
      failureRedirect: {
        student: '/join',         // if not logged in, go here (student)
        employer: '/join'         // if not logged in, go here (employer)
      },
      restricted: {
        to: 'EMPLOYERS',          // employers only on this route
        redirectTo: '/profile/st' // if not an employer, redirect to the student equivalent
      }
    }

    return authRedirectFilter(config, this.context.store, this.context.router)
  },

 /*
  * userMadeChanges()
  *
  * Returns true if any of the default values from page1 have been altered.
  * @return boolean
  *
  */

  userMadeChanges() {
    let p = this.props.page1
    // All fields on page1
    if(p.jobTitle !== "" || p.isPayingJob !== false || p.responsibilities !== ""
      || p.qualifications !== "" || p.desiredSkills !== "" || p.internshipLocation !== "" || p.remoteWork !== false
      || p.compensation !== "") {
      return true
    } else {
      return false
    }
  },

  /*
  * next()
  *
  * Advance to the next page in the form. Submit the form on Page 4 ( the last page ).
  * @void
  *
  */

  next() {
    switch(this.props.currentPage) {
      case 1:
        this.context.store.dispatch(
          createJobActionCreators.nextPage(1, this.props.page1)
        )
        return;
      case 2:
        this.context.store.dispatch(
          createJobActionCreators.nextPage(2, this.props.page2)
        )
        return;
      case 3:
        this.context.store.dispatch(
          createJobActionCreators.nextPage(3, this.props.page3)
        )
        return;
      case 4:
       
       /*
        * We should lock the user out if they've already
        * tried to submit so they don't submit multiple times.
        */

        if (!this.props.isSubmitting && !this.props.submitSuccess) {

          this.context.store.dispatch(
            createJobActionCreators.createNewJob(this.props, this.props.params.jobtype,

            /*
             * Success Callback
             */
            
            () => {

              this.refs.container.success(
                "We'll send you an email shortly after we process it.",
                "Job submitted for approval!",
                {
                  timeout: 4000
              });

             /*
              * After the success, we need to clear the form so that if we
              * want to create a job new job again, we start over from scratch.
              * We will also redirect back to the employer dashboard.
              */

              setTimeout(() => {
                this.props.clearForm()
                this.context.router.push('/dashboard/em')
              }, 4000)

            },

            /*
             * Failure Callback
             */
            
            (errorCode) => {

              this.refs.container.error(
                "Something broke :(",
                "Looks like we encountered an error somehow. Please let us know.",
                {
                  timeout: 3000
              });

            })
          )

        }

        return;
      default:
        return;
    }
  },

  /*
  * handleConfirmDiscardChanges()
  *
  * Called after pressing submit to discard changes and go back to the categories
  * screen.
  *
  * @void
  * @see Skylight component in 'this.render()' function
  */

  handleConfirmDiscardChanges() {
    this.context.store.dispatch(
      createJobActionCreators.clearForm()
    )
    this.context.router.goBack()
  },

  /*
  * goBack()
  *
  * The 'Back' button. Simply goes backwards through the pages of the form.
  * If the user is on the first page and there were changes made, they are first
  * asked if they want to discard their changes. Otherwise, they are just routed
  * back to the /categories page.
  *
  * @param (Object) - props
  * @void
  *
  */

  goBack(props) {
    switch(this.props.currentPage) {
      case 1:
        if(this.userMadeChanges()) {
          // Ask them if they're sure they want to go to lose their changes
          this.refs.confirmDiscard.show()
        } else {
          // Route them back to /categories
          this.context.router.goBack()
        }
        return;
      case 2:
      case 3:
      case 4:
        // Go back a page
        this.context.store.dispatch(
          createJobActionCreators.prevPage(this.props.currentPage)
        )
        return;
      default:
        return;
    }
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
  * openJobAppModal
  *
  * Opens the job app modal that contains all of the job
  * details, questions and answers fields so that students 
  * may apply to a job.
  */

  openJobAppModal(e, selectedJob) {
    e.preventDefault()

    this.props.openJobAppModal(selectedJob)
    this.refs.jobAppModal.show()
  },

 /*
  * closeJobAppModal
  *
  * Closes the job app modal.
  */

  closeJobAppModal() {
    this.refs.jobAppModal.hide()
  },

  closeConfirmDiscardModal () {
    console.log(this.refs)
    this.refs.confirmDiscard.hide()
  },

  render () {

    var jobType;

    var route = window.location.href.substring(window.location.href.indexOf("create/") + 7);
    
    if (route.indexOf("otg") !== -1) {
      jobType = 1;
    } else if (route.indexOf("summer") !== -1) {
      jobType = 2;
    } else if (route.indexOf("winter") !== -1) {
      jobType = 3;
    } else if (route.indexOf("freelance") !== -1) {
      jobType = 4;
    } else if (route.indexOf("rep") !== -1) {
      jobType = 5;
    } else if (route.indexOf("pt") !== -1) {
      jobType = 6;
    } else if (route.indexOf("ft") !== -1) {
      jobType = 7;
    }

    return (
      <div>
                {
         /*
          * CompanyInfoSideBar
          *
          * When a student clicks on Company Info on a Job Card, the Company Info
          * sidebar component opens up.
          */
        }
        <CompanyInfoSideBar 
          onStateChange={ this.handleCompanyInfoSidebarStateChange }
          isOpen={this.props.employerProfileModal.isOpen ? this.props.employerProfileModal.isOpen : false}
          employerName={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.employerName : null}
          industry={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.industry : null}
          logoUrl={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.logoUrl : null}
          headquarters={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.headquarters : null}
          website={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.website : null}
          numEmployees={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.numEmployees : null}
          aboutSectionExpanded={this.props.employerProfileModal.isAboutSectionOpen ? this.props.employerProfileModal.isAboutSectionOpen : false}
          handleToggleAboutSection={this.props.toggleAboutSection}
          about={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.about : null}/>

        {
         /*
          * The rest of the page.
          */
        }
        
        <div id="page-wrap" className={pageContainer}>
          <SidebarContainer isMobile={this.props.isMobile} isAStudent={false} profilePicture={typeof this.props.profile.logoUrl == "object" && this.props.profile.logoUrl !== null
            ? this.props.profile.logoUrl.preview
            : config.mediaUrl + this.props.profile.logoUrl}/>
            {(() => {
              switch(this.props.currentPage) {
                case 1:
                  return <div>
                  <FormHeader stepNum={this.props.currentPage} totalSteps={4} headerText="Enter basic job details"/>
                  <CreateJobFormPage1
                    page={this.props.page1}
                    next={this.next}
                    back={this.goBack}
                    updateFormField={this.props.updateFormField}/>
                  </div>
                case 2:
                  return <div>
                  <FormHeader stepNum={this.props.currentPage} totalSteps={4} headerText="Have a question for the applicant? (optional)"/>
                  <CreateJobFormPage2
                    page={this.props.page2}
                    next={this.next}
                    back={this.goBack}
                    updateFormField={this.props.updateFormField}/>
                  </div>
                case 3:
                  return <div>
                  <FormHeader stepNum={this.props.currentPage} totalSteps={4} headerText="Choose which students can view your job listings"/>
                  <CreateJobFormPage3
                    page={this.props.page3}
                    next={this.next}
                    back={this.goBack}
                    updateFormField={this.props.updateFormField}/>
                  </div>
                case 4:
                  return <div>
                  <FormHeader stepNum={this.props.currentPage} totalSteps={4} headerText="Review your listing"/>
                  <CreateJobFormPage4
                    page={this.props.page4}
                    next={this.next}
                    back={this.goBack}
                    
                    jobType={jobType}
                    jobTitle={this.props.page1.jobTitle}
                    industries={this.props.industriesObj ? this.props.industriesObj : {}}
                    startDate={this.props.page1.startDate}
                    internshipLocation={this.props.page1.internshipLocation}
                    companyName={this.props.companyName}
                    logoUrl={this.props.logoUrl}
                    maxApplicants={this.props.page3.maxApplicants}
                    numPositions={this.props.page3.numPositions}
                    updateFormField={this.props.updateFormField}

                    responsibilities={this.props.page1 ? this.props.page1.responsibilities : ''}
                    qualification={this.props.page1 ? this.props.page1.qualification : ''}
                    address={this.props.page1 ? this.props.page1.internshipLocation : '' }
                    compensation={this.props.page1 ? this.props.page1.compensation : ''}
                    createdAt={this.props.page1 ? this.props.page1.createdAt : ''}
                    questions={this.props.page2 ? { question1: this.props.page2.question1, question2: this.props.page2.question2 } : {}}
                    industry={this.props.industryList[this.props.industry].industry}
                    remoteWork={this.props.page1 ? this.props.page1.remoteWork : false}
                    paid={this.props.page1 ? this.props.page1.isPayingJob : false}
                    employerProfile={this.props.profile ? this.props.profile : {}}
                    handleOpenEmployerProfileModal={this.props.employerProfileModalOpened}
                    handleCardClick={this.openJobAppModal}
                    
                    />
                  </div>
                default:
                  return <CreateJobFormPage1
                    page={this.props.page1}
                    next={this.next}
                    back={this.goBack}
                    updateFormField={this.props.updateFormField}/>
              }
            })()}

          {/* CONFIRM DISCARD MODAL*/}
            <SkyLight
              hideOnOverlayClicked
              ref="confirmDiscard"
              title="Are you sure you want to discard this job?">
              All changes will be lost

              <div className={buttonsContainer}>
                <button className={cancelButton} onClick={this.closeConfirmDiscardModal}>Cancel</button>
                <button className={confirmButton} onClick={this.handleConfirmDiscardChanges}>Yes, I'm sure</button>
              </div>
            </SkyLight>

          {/* ERROR MESSAGES */}
            <ToastContainer ref="container"
              toastMessageFactory={ToastMessageFactory}
              className="toast-top-right" />
              

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
                    >

                    { this.props.jobAppModal.selectedJob 
                      ? <JobCardModal
                          cardType={'createjob'}
                          title={this.props.page1 ? this.props.page1.jobsTitle : ''}
                          job={{
                            applicant_count: 0,
                            max_applicants: this.props.page3 ? this.props.page3.maxApplicants : 0,
                            location: this.props.page1 ? this.props.page1.internshipLocation : '',
                            start_date: this.props.page1 ? this.props.page1.startDate : '',
                            desired_skills: this.props.page1 ? this.props.page1.desiredSkills : '',
                            compensation: this.props.page1 ? this.props.page1.compensation : '',
                            qualification: this.props.page1 ? this.props.page1.qualifications : '',
                            responsibilities: this.props.page1 ? this.props.page1.responsibilities : '',
                            description: this.props.profile ? this.props.profile.description : '',
                            industry: this.props.profile ? this.props.profile.industry : '',
                            company_name: this.props.profile ? this.props.profile.companyName : '',
                            type: jobType,
                            logo_url: this.props.profile ? this.props.profile.logoUrl : '',
                            website: this.props.profile ? this.props.profile.website : '',
                            employee_count: this.props.profile ? this.props.profile.employeeCount : 1,
                            office_address: this.props.profile ? this.props.profile.officeAddress : '',
                            office_city: this.props.profile ? this.props.profile.officeCity : '',
                            office_postal_code: this.props.profile ? this.props.profile.officePostalCode : ''
                            
                          }}
                          startDate={this.props.page1 ? this.props.page1.startDate : ''}
                          logoUrl={this.props.profile ? this.props.profile.logoUrl : ''}
                          title={this.props.page1 ? this.props.page1.jobTitle : ''}
                          industry={this.props.profile ? this.props.profile.industry : ''}
                          industries={this.props.industriesObj}
                          closeJobAppModal={this.closeJobAppModal}
                          questions={{
                            question1: this.props.page2 ? this.props.page2.question1 : '',
                            question2: this.props.page2 ? this.props.page2.question2 : ''
                          }}
                          page={this.props.route.page}
                          handleOpenEmployerProfileModal={this.props.employerProfileModalOpened}
                          />
                      : ''
                    }
                    
                </SkyLight>
              </div>

        </div>
      </div>
    )
  },
})

function mapStateToProps({dashboard, createJob, profile, user, list}) {
  //console.log(createJob, "NEW PROPS")
  return {
    employerProfileModal: dashboard.employerProfileModal ? dashboard.employerProfileModal : {},
    jobAppModal: dashboard.studentDashboard.jobAppModal ? dashboard.studentDashboard.jobAppModal : {},
    user: {
      emailVerified: user.emailVerified ? user.emailVerified : false
    },
    profile: profile.employerProfile ? profile.employerProfile : {},
    currentPage: createJob.currentPage ? createJob.currentPage : 1,
    industry: profile.employerProfile.industry ? profile.employerProfile.industry : 0,
    industryList: list.industries ? list.industries : [],
    industriesObj: list.industries ? list.industries : {},
    companyName: profile.employerProfile.companyName ? profile.employerProfile.companyName : '',
    logoUrl: profile.employerProfile.logoUrl ? profile.employerProfile.logoUrl : '',
    page1: {
      jobTitle: createJob.page1.jobTitle ? createJob.page1.jobTitle : '',
      isPayingJob: createJob.page1.isPayingJob ? true : false ,
      startDate: createJob.page1.startDate ? createJob.page1.startDate : new Date(),
      responsibilities: createJob.page1.responsibilities ? createJob.page1.responsibilities : '',
      qualifications: createJob.page1.qualifications ? createJob.page1.qualifications : '',
      desiredSkills: createJob.page1.desiredSkills ? createJob.page1.desiredSkills : '',
      internshipLocation: createJob.page1.internshipLocation ? createJob.page1.internshipLocation : '',
      remoteWork: createJob.page1.remoteWork ? createJob.page1.remoteWork : false,
      compensation: createJob.page1.compensation ? createJob.page1.compensation : '',
      MAX_CHARS_jobTitle: createJob.MAX_CHARS_jobTitle ? MAX_CHARS_jobTitle : 30,
      MAX_CHARS_responsibilities: createJob.MAX_CHARS_responsibilities ? MAX_CHARS_responsibilities : 5500,
      MAX_CHARS_qualifications: createJob.MAX_CHARS_qualifications ? MAX_CHARS_qualifications : 1400,
      MAX_CHARS_desiredSkills: createJob.MAX_CHARS_desiredSkills ? MAX_CHARS_desiredSkills : 100,
      MAX_CHARS_compensation: createJob.MAX_CHARS_compensation ? MAX_CHARS_compensation : 380,
      page1PropsErrorMap: createJob.page1.page1PropsErrorMap ? createJob.page1.page1PropsErrorMap : {
        jobTitle: false,
        isPayingJob: false,
        startDate: false,
        responsibilities: false,
        qualifications: false,
        desiredSkills: false,
        internshipLocation: false,
        remoteWork: false,
        compensation: false
      }
    },
    page2: {
      question1: createJob.page2.question1 ? createJob.page2.question1 : '',
      question2: createJob.page2.question2 ? createJob.page2.question2 : '',
      MAX_CHARS_question: createJob.page2.MAX_CHARS_question ? createJob.page2.MAX_CHARS_question : 150,
      page2PropsErrorMap: createJob.page2.page2PropsErrorMap ? createJob.page2.page2PropsErrorMap : {
        question1: false,
        question2: false
      }
    },
    page3: {
      maxApplicants: createJob.page3.maxApplicants ? createJob.page3.maxApplicants : 20,
      numPositions: createJob.page3.numPositions ? createJob.page3.numPositions : 1,
      page3PropsErrorMap: createJob.page3.page3PropsErrorMap ? createJob.page3.page3PropsErrorMap : {
        maxApplicants: false
      }
    },
    page4: createJob.page4 ? createJob.page4 : {},
    errorsExist: createJob.errorsExist ? createJob.errorsExist : false,
    errors: createJob.errors ? createJob.errors : [],
    submitSuccess: createJob.submitSuccess ? createJob.submitSuccess : false,
    isSubmitting: createJob.isSubmitting ? createJob.isSubmitting : false
  }
}


function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators({
      ...createJobActionCreators,
      ...listActionCreators,
    ...employerProfileModal.actionCreators,
    ...jobAppModal.actionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(CreateJobContainer)
