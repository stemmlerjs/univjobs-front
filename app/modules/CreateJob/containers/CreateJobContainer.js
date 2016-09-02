import React, { PropTypes } from 'react'
import { mainContainer, circle, selectedCircle } from '../styles/CreateJobContainerStyles.css'
import { SidebarContainer } from 'modules/Main'
import SkyLight from 'react-skylight'

import CreateJobFormPage1 from '../components/CreateJobFormPage1'

// ====== REDUX AND STATE IMPORTS =======
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as createJobActionCreators from 'redux/modules/createjob/createjob'
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
    this.props.closeOverlay()
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
    if(p.jobTitle !== "" || p.isPayingJob !== false || p.startDate !== "" || p.responsibilities !== ""
      || p.qualifications !== "" || p.desiredSkills !== "" || p.internshipLocation !== "" || p.remoteWork !== false 
      || p.compensation !== "") {
      return true
    } else {
      return false
    }
  },

  next() {
    switch(this.props.currentPage) {
      case 1:
        this.context.store.dispatch(
          createJobActionCreators.nextPage(1, this.props.page1)
        )
        return;
      default:
        return;
    }
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
      default:
        return;
    }
  },

  render () {
    const jobType = this.props.params.jobtype;
    return (
      <div className={mainContainer}>
        <SidebarContainer/>
        <FormHeader stepNum={this.props.currentPage} totalSteps={4} headerText="Enter basic job details"/>
        {(() => {
          switch(this.props.currentPage) {
            case 1:
              return <CreateJobFormPage1 
                page={this.props.page1} 
                propsErrorMap={this.props.page1PropsErrorMap}
                next={this.next}
                back={this.goBack}
                updateFormField={this.props.updateFormField}/>
            default:
              return <CreateJobFormPage1 
                page={this.props.page1} 
                propsErrorMap={this.props.page1PropsErrorMap}
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

          <button onClick={() => this.context.router.goBack()}>I'm sure</button>
        </SkyLight>
        
      </div>
    )
  },
})

function mapStateToProps({createJob}) {
  console.log(createJob, "NEW PROPS")
  return {
    currentPage: createJob.currentPage ? createJob.currentPage : 1,
    page1: {
      jobTitle: createJob.page1.jobTitle ? createJob.page1.jobTitle : '',
      isPayingJob: createJob.page1.isPayingJob ? true : false ,
      startDate: createJob.page1.startDate ? createJob.page1.startDate : '',
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
    page2: createJob.page2 ? createJob.page2 : {},
    page3: createJob.page3 ? createJob.page3 : {},
    page4: createJob.page4 ? createJob.page4 : {},
    errorsExist: createJob.errorsExist ? createJob.errorsExist : false,
    errors: createJob.errors ? createJob.errors : ''
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(CreateJobContainer)
