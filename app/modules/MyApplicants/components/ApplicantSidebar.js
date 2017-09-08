

/*
 * ApplicantSidebar
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { attrExists } from 'helpers/utils'

import { craftSportsString, craftClubsString, craftLanguagesString } from 'helpers/profile'

import { applicantSidebarContainer, hide, sidebarContainer, headerContainer, imgContainer,
  headerDetailsContainer, bodyContainer, profileNameText, programNameText, schoolText, studentDetailHeader,
  studentDetailText, questionsOverview, divider, answerText, multiSelectActive, sectionHeader,
  contactSectionOmmitted, sectionContainer, altImageContainer } from '../styles/ApplicantSidebarStyles.css'

import { univjobsButton, univjobsButtonInactive, whiteTxt } from 'sharedStyles/widgets.css'

import StudentProfileIcons from 'modules/SharedComponents/components/StudentProfileIcons'

import config from 'config'
import moment from 'moment'

export default function ApplicantSidebar ({ selectedApplicant, lists, questions, multiSelectViewActive }) {
  return (
    <div className={selectedApplicant.job_id 
      ? multiSelectViewActive
        ? `${applicantSidebarContainer} ${multiSelectActive}`
        : applicantSidebarContainer 
      : multiSelectViewActive
        ? `${applicantSidebarContainer} ${hide} ${multiSelectActive}`
        : `${applicantSidebarContainer} ${hide}`}>

      {
        /*
         * This is the Applicant sidebar section. 
         *
         * It should look similar to the StudentCardModal and should have all 
         * of that applicant information available.
         * 
         * It needs to have the student details, questions, answers, etc
         * for this job
         */
      }
      <div className={sidebarContainer}>
        <div className={headerContainer}>
          <div className={imgContainer}>
            {
              attrExists(selectedApplicant.photo_url)
                ? <img src={config.mediaUrl + "avatar/" + selectedApplicant.photo_url}/>
                : <div className={altImageContainer}><i className={'fa fa-user'} aria-hidden="true"></i></div>
            }
            
          </div>
          <div className={headerDetailsContainer}>
            <div>
              <div className={profileNameText}>{`${selectedApplicant.user_firstName} ${selectedApplicant.user_lastName}`}</div>
              <div className={programNameText}>{lists.majors[selectedApplicant.major]}</div>
              <div className={schoolText}>{`${selectedApplicant.school_name} ${new Date(selectedApplicant.grad_date).getFullYear()}`}</div>
            </div>
            
            <div>
              {
                attrExists(selectedApplicant.resume_url)
                  ? <button onClick={() => window.open(`${config.mediaUrl}res/${selectedApplicant.resume_url}`, "_blank")} className={univjobsButton}>VIEW RESUME</button>
                  : <button className={univjobsButtonInactive}>No resume</button>
              }
            </div>
          </div>
        </div>
        
        <div className={bodyContainer}>

          {/* Contact Details (omitted on the first state) */}
          <div className={sectionHeader}>Contact Details</div>
          {
            attrExists(selectedApplicant.preferred_email) 
              ? <div className={sectionContainer}>
                  <div className={contactSectionOmmitted}>Email: { selectedApplicant.preferred_email }</div>
                </div>
              : <div className={sectionContainer}>
                  <div className={contactSectionOmmitted}>Omitted until you express intent to Contact this applicant.</div>
                </div>
          }
          
          
          { 

           /*
            * Questions
            */

            questions !== null && questions !== undefined
              ? <div>
                  { questions.length !== 0 
                    ? <div>
                        <div className={sectionHeader}>Answers</div>
                          <div className={sectionContainer}>
                            {
                              questions.map((question, index) => {
                                return (
                                  <div key={index}>
                                    <div className={studentDetailHeader}>{`Q${index + 1}: ${question.text}`}</div>
                                    
                                      {
                                        selectedApplicant.answers !== null && selectedApplicant.answers !== undefined 
                                          ? selectedApplicant.answers.map((answer, index) => {
                                            if (answer.question_id == question.question_id) {
                                              return (
                                                <div key={index} className={answerText}>"{answer.text}"</div>
                                              )
                                            }
                                          })
                                        : ''
                                      }

                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      : ''
                  }
                </div>
              : ''
          }

          {/* Profile Details */}
          <div className={sectionHeader}>Profile Details</div>
          <div className={sectionContainer}>
            <div className={studentDetailHeader}>Previous Work Experience</div>
            <div className={studentDetailText}>{selectedApplicant.recent_company_position} at {selectedApplicant.recent_company_name}</div>

            <div className={studentDetailHeader}>Hometown</div>
            <div className={studentDetailText}>{selectedApplicant.hometown}</div>

            {
              selectedApplicant.fun_fact !== "" && selectedApplicant.fun_fact !== undefined
                ? <div>
                    <div className={studentDetailHeader}>Fun Fact</div>
                    <div className={studentDetailText}>{selectedApplicant.fun_fact}</div>
                  </div>
                : ''
            }
            
            <div className={studentDetailHeader}>Hobbies</div>
            <div className={studentDetailText}>{selectedApplicant.hobbies}</div>

            <div className={studentDetailHeader}>Degree Type</div>
            <div className={studentDetailText}>{lists.educationLevels[selectedApplicant.edu_level]}</div>

            <div className={studentDetailHeader}>Graduation Date</div>
            <div className={studentDetailText}>{moment(selectedApplicant.grad_date).format('MMMM Do, YYYY')}</div>

            <div className={studentDetailHeader}>Student Status</div>
            <div className={studentDetailText}>{lists.studentStatus[selectedApplicant.status]}</div>
          </div>

          {/* Other */}
          <div className={sectionHeader}>Other</div>
          <div className={sectionContainer}>
            <StudentProfileIcons 
              hasCar={selectedApplicant.has_car} 
              gpa={selectedApplicant.gpa}
              sportsString={craftSportsString(selectedApplicant.sports)}
              clubsString={craftClubsString(selectedApplicant.clubs)}  
              languagesString={craftLanguagesString(selectedApplicant.languages)}
            />
          </div>


          
        </div>
      </div>


    </div>
  )
}
