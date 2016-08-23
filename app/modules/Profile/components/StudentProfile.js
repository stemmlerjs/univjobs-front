import React, { PropTypes } from 'react'
import { ProfileField } from 'modules/Profile'
import { profileContainer, profileHeader, profileField, profileFieldName, profileFieldContent } from '../styles/EmployerProfileStyles.css'
import { }

const StudentProfile = React.createClass({
  render () {
    return (
      <div className={profileContainer}>
      	<div className={profileHeader}>Complete your profile so we can find you a job today!
	</div>
      </div>
    )
  },
})
export default StudentProfile
