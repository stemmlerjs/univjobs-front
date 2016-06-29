import React from 'react'
import { centeredPage } from './styles.css'

import { Navigation, StudentSignup, EmployerSignup } from 'components'
console.log(EmployerSignup);

const SignupContainer = React.createClass({
  render () {
    return (
      <div>
        <Navigation />
          <div className={centeredPage}>
            <StudentSignup/>
          </div>
      </div>
    )
  },
})
export default SignupContainer