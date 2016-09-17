
import React, { PropTypes } from 'react'
import { mainContainer, circle, selectedCircle } from '../styles/CreateJobContainerStyles.css'
import { SidebarContainer } from 'modules/Main'
import SkyLight from 'react-skylight'
import { authRedirectFilter } from 'config/routes'
import * as lists from 'helpers/lists'

import CreateJobFormPage1 from '../components/CreateJobFormPage1'
import CreateJobFormPage2 from '../components/CreateJobFormPage2'
import CreateJobFormPage3 from '../components/CreateJobFormPage3'
import CreateJobFormPage4 from '../components/CreateJobFormPage4'

// ====== REDUX AND STATE IMPORTS =======
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as createJobActionCreators from 'redux/modules/createjob/createjob'
// ======================================

// ============= MESSAGES ===============
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
// ======================================

const actionCreators = {
  ...createJobActionCreators
}

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
    <div>
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
      .then(lists.getIndustries(this.context.store))
      .then(lists.getJobTypes(this.context.store))
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
    
    // if(submitSuccess) {
    //   this.refs.container.success(
    //     "Woohoo :)",
    //     "Profile successfully updated!", {
    //     timeOut: 3000
    //   });
    // }

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
        this.context.store.dispatch(
          createJobActionCreators.createNewJob(this.props, this.props.params.jobtype)
        )
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

  render () {
    const jobType = this.props.params.jobtype;
    return (
      <div className={mainContainer}>
        <SidebarContainer/>
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
                industry={this.props.industryList[this.props.industry].industry}
                startDate={this.props.page1.startDate}
                internshipLocation={this.props.page1.internshipLocation}
                companyName={this.props.companyName}
                logoUrl={this.props.logoUrl}
                maxApplicants={this.props.page3.maxApplicants}
                updateFormField={this.props.updateFormField}/>
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

          <button onClick={this.handleConfirmDiscardChanges}>I'm sure</button>
        </SkyLight>

      {/* ERROR MESSAGES */}
        <ToastContainer ref="container"
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right" />
        
      </div>
    )
  },
})

function mapStateToProps({createJob, profile, user}) {
  console.log(createJob, "NEW PROPS")
  return {
    user: {
      emailVerified: user.emailVerified ? user.emailVerified : false
    },
    currentPage: createJob.currentPage ? createJob.currentPage : 1,
    industry: profile.employerProfile.industry ? profile.employerProfile.industry : 0,
    industryList: profile.lists.industries ? profile.lists.industries : [],
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
      maxApplicants: createJob.page3.maxApplicants ? createJob.page3.maxApplicants : '',
      page3PropsErrorMap: createJob.page3.page3PropsErrorMap ? createJob.page3.page3PropsErrorMap : {
        maxApplicants: false
      }
    },
    page4: createJob.page4 ? createJob.page4 : {},
    errorsExist: createJob.errorsExist ? createJob.errorsExist : false,
    errors: createJob.errors ? createJob.errors : ''
  }
}


function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(CreateJobContainer)
