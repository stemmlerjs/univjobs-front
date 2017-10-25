
import React, { PropTypes } from 'react'
import { container, invitedStudentRow, invitedStudentImageContainer,
  invitedStudentDetailsContainer, invitedStudentAppliedContainer,
  invitedStudentName, invitedStudentSchool, invitationsContainer,
  special, altInvitedStudentImageContainer, altImageContainer } from '../styles/JobInvitationStyles.css'

import { attrExists } from 'helpers/utils'

import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router'
import { box } from '../styles/MyPostingsStyles.css'

import config from 'config'

export default function JobInvitations ({ students }) {
  console.log("Invited students", students)
  return (
    <div className={box}>
      {
        students.length === 0
          ? <div>You haven't invited any students to apply to this job yet. Invite some students from the <Link className={special} to="/dashboard/em">Browse Students</Link> page.</div>
          : <div className={invitationsContainer}>
              {
                students.map((student, index) => {
                  return (
                    <div className={invitedStudentRow} key={index}>
                      {
                        attrExists(student.photo_url)
                          ? <div className={invitedStudentImageContainer}><img src={config.mediaUrl + 'avatar/' + student.photo_url}/></div>
                          : <div className={altInvitedStudentImageContainer}><div className={altImageContainer}><i className={'fa fa-user'} aria-hidden="true"></i></div></div>
                      }
                      <div className={invitedStudentDetailsContainer}>
                        <div className={invitedStudentName}>{student.user_firstName + " " + student.user_lastName}</div>
                        <div className={invitedStudentSchool}>{student.school_name}</div>
                      </div>
                      <div className={invitedStudentAppliedContainer}>
                        {
                          student.applied
                            ? <div>
                                <img data-tip={`This student has applied to the job.`} src="https://image.flaticon.com/icons/svg/226/226972.svg" />
                              </div>
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


