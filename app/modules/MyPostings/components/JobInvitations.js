
import React, { PropTypes } from 'react'
import { container, invitedStudentRow, invitedStudentImageContainer,
  invitedStudentDetailsContainer, invitedStudentAppliedContainer,
  invitedStudentName, invitedStudentSchool, invitationsContainer } from '../styles/JobInvitationStyles.css'

import { box } from '../styles/MyPostingsStyles.css'

export default function JobInvitations ({ students }) {

  return (
    <div className={box}>
      {
        students.length === 0
          ? "You haven't invited any students to apply to this job yet. Visit 'Browse Students' to start."
          : <div className={invitationsContainer}>
              {
                students.map((student, index) => {
                  return (
                    <div className={invitedStudentRow} key={index}>
                      <div className={invitedStudentImageContainer}><img src={student.profilePictureUrl}/></div>
                      <div className={invitedStudentDetailsContainer}>
                        <div className={invitedStudentName}>{student.name}</div>
                        <div className={invitedStudentSchool}>{student.school}</div>
                      </div>
                      <div className={invitedStudentAppliedContainer}>
                        {
                          student.applied
                            ? <img src="https://image.flaticon.com/icons/svg/226/226972.svg" />
                            : ''
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
      }
    </div>
  )
}


