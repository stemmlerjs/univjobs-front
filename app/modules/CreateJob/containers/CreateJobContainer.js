import React from 'react'
import { mainContainer, circle, selectedCircle } from '../styles/CreateJobContainerStyles.css'
import { SidebarContainer } from 'modules/Main'

import CreateJobFormPage1 from '../components/CreateJobFormPage1'

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

  // will require:
  // - current page prop
  // - errorPropsValidation object for Page1, Page2 and Page 3

  componentWillMount() {
    // Hide the overlay on mount if coming from direct URL
    this.props.closeOverlay()
  },
  render () {
    const jobType = this.props.params.jobtype;
    return (
      <div className={mainContainer}>
        <SidebarContainer/>
        <FormHeader stepNum={1} totalSteps={4} headerText="Enter basic job details"/>
        <CreateJobFormPage1/>
      </div>
    )
  },
})

export default CreateJobContainer
