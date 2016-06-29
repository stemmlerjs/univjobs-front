import React from 'react'
import { studentSignupPage, employerSignupPage } from './styles.css'

import { Navigation, StudentSignup, EmployerSignup } from 'components'

// TODO: Hook up to state
const isAStudent = false;

const SignupContainer = React.createClass({
  // To switch between the appropriate view, lets set up an attribute in our state store
  // where we tell if the user is on the STUDENT or EMPLOYER signup page.
  // We can conditionally render the component based on this state

  render () {
    return (
      <div>
        <Navigation isAStudent={isAStudent} />
          { isAStudent === true ?
            <div className={studentSignupPage}>
              <StudentSignup/>
            </div>
            :
            <div className={employerSignupPage}>
              <EmployerSignup/>
            </div>
          }
      </div>
    )
  },
})
export default SignupContainer