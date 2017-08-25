
import React, { PropTypes } from 'react'

import { ApplicantCount, StartDateComponent, PaidJobComponent, LocationComponent }  from 'modules/SharedComponents'

import { textDetailsTitle, textDetailsField, title, jobTypeText } from '../styles/JobDetailsStyles.css'
import { box, editableArea, editableAreaResizeable, editableTitleArea, standardButton, 
    standardButtonRed, standardButtonInactive, saveButtonsContainer } from '../styles/MyPostingsStyles.css'

export default function JobDetails ({ 
  jobTitle, 
  paid, 
  compensation, 
  desiredSkills, 
  location, 
  qualifications, 
  remoteWork, 
  responsibilities, 
  startDate, 
  createdAt, 
  updatedAt,
  jobType,
  page,

  editViewEnabled,
  handleUpdateJobDetailsField
}) {

  return (
    <div className={box}>
      
      {
        !editViewEnabled
          ? <div className={title}>{jobTitle}</div>
          : <textarea onBlur={(e) => handleUpdateJobDetailsField(e.target.value, 'title', page)} 
            defaultValue={jobTitle} className={editableTitleArea}></textarea>
      }
      
      <div className={jobTypeText}>{
          jobType === 1 
          ? 'One Time Gig' :
          jobType === 2 
          ? 'Summer' :
          jobType === 3 
          ? 'Winter' :
          jobType === 4
          ? 'Freelance' :
          jobType === 5
          ? 'Campus Rep' :
          jobType === 6
          ? 'Part-time' :
          jobType === 7 
          ? 'Full-time' :
          ''
        }
      </div>
      
      <StartDateComponent date={new Date(startDate)}/>
      <LocationComponent location={location} remoteWork={remoteWork}/>
      <PaidJobComponent paid={paid}/>

      <div className={textDetailsTitle}>Responsibilities</div>
      {
        !editViewEnabled
          ? <div className={textDetailsField}>{responsibilities}</div>
          : <textarea onBlur={(e) => handleUpdateJobDetailsField(e.target.value, 'responsibilities', page)} defaultValue={responsibilities} className={editableAreaResizeable}></textarea>
      }

      <div className={textDetailsTitle}>Qualifications</div>
      {
        !editViewEnabled
          ? <div className={textDetailsField}>{qualifications}</div>
          : <textarea onBlur={(e) => handleUpdateJobDetailsField(e.target.value, 'qualification', page)} defaultValue={qualifications} className={editableAreaResizeable}></textarea>
      }


      <div className={textDetailsTitle}>Desired Skills</div>
      {
        !editViewEnabled
          ? <div className={textDetailsField}>{desiredSkills}</div>
          : <textarea onBlur={(e) => handleUpdateJobDetailsField(e.target.value, 'desired_skills', page)} defaultValue={desiredSkills} className={editableArea}></textarea>
      }
      
      <div className={textDetailsTitle}>Compensation</div>
      {
        !editViewEnabled
          ? <div className={textDetailsField}>{compensation}</div>
          : <textarea onBlur={(e) => handleUpdateJobDetailsField(e.target.value, 'compensation', page)} defaultValue={compensation} className={editableArea}></textarea>
      }

      {
        editViewEnabled
          ? <div className={saveButtonsContainer}>
              <button className={standardButtonRed}>Cancel</button>
              <button className={standardButton}>Save changes</button>
            </div>
          : ''
      }
      
      
    </div>
  )
}


