

/*
 * ApplicantSidebar
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { craftSportsString, craftClubsString, craftLanguagesString } from 'helpers/profile'

import { applicantSidebarContainer, hide, sidebarContainer, headerContainer, imgContainer,
  headerDetailsContainer, bodyContainer, profileNameText, programNameText, schoolText, studentDetailHeader,
  studentDetailText, questionsOverview, divider, answerText } from '../styles/ApplicantSidebarStyles.css'

import StudentProfileIcons from 'modules/SharedComponents/components/StudentProfileIcons'

import config from 'config'
import moment from 'moment'

export default function ApplicantSidebar ({ selectedApplicant, lists, questions }) {
  console.log("qust", questions)
  return (
    <div className={selectedApplicant.job_id ? applicantSidebarContainer : `${applicantSidebarContainer} ${hide}`}>

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
            <img src={config.mediaUrl + "avatar/" + selectedApplicant.photo_url}/>
          </div>
          <div className={headerDetailsContainer}>
            <div className={profileNameText}>{`${selectedApplicant.user_firstName} ${selectedApplicant.user_lastName}`}</div>
            <div className={programNameText}>{lists.majors[selectedApplicant.major]}</div>
            <div className={schoolText}>{`${selectedApplicant.school_name} ${new Date(selectedApplicant.grad_date).getFullYear()}`}</div>

            
          </div>
        </div>
        
        <div className={bodyContainer}>

          <div className={questionsOverview}>Profile</div>

          <StudentProfileIcons 
              hasCar={selectedApplicant.has_car} 
              gpa={selectedApplicant.gpa}
              sportsString={craftSportsString(selectedApplicant.sports)}
              clubsString={craftClubsString(selectedApplicant.clubs)}  
              languagesString={craftLanguagesString(selectedApplicant.languages)}
            />

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

          { 

           /*
            * Questions
            */

            questions !== null && questions !== undefined
              ? <div className={divider}>
                  <div className={questionsOverview}>Answers</div>
                  {
                    questions.map((question, index) => {
                      return (
                        <div key={index}>
                          <div className={studentDetailHeader}>{question.text}</div>
                          
                          {
                            selectedApplicant.answers !== null && selectedApplicant.answers !== undefined 
                              ? selectedApplicant.answers.map((answer) => {
                                if (answer.question_id == question.question_id) {
                                  return (
                                    <div className={answerText}>"{answer.text}"</div>
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
              : 'sdfsd'
          }
        </div>
      </div>


    </div>
  )
}
