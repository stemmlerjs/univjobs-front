
import React, { PropTypes } from 'react'

import { DropdownList, DateTimePicker } from 'react-widgets'
import Toggle from 'react-toggle'
import { ApplicantCount, StartDateComponent, PaidJobComponent, LocationComponent }  from 'modules/SharedComponents'

import { textDetailsTitle, textDetailsField, title, jobTypeText } from '../styles/JobDetailsStyles.css'
import { box, editableArea, editableAreaResizeable, editableTitleArea, standardButton, editableInput,
    standardButtonRed, standardButtonInactive, saveButtonsContainer, reactWidgetStyle, toggleContainer, flex } from '../styles/MyPostingsStyles.css'

import InputSelector from 'modules/SharedComponents/components/InputSelector'

const jobTypeList = [
{
  type: 1,
  text: 'One Time Gig'
},{
  type: 2,
  text: 'Summer'
},{
  type: 3,
  text: 'Winter'
},{
  type: 4,
  text: 'Freelance'
},{
  type: 5,
  text: 'Campus Rep'
},{
  type: 6,
  text: 'Part-time'
},{
  type: 7,
  text: 'Full-time'
},]

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

      {
        !editViewEnabled
          ?  <div className={jobTypeText}>{
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
          : <div>
              <div className={textDetailsTitle}>Job Type</div>
              <DropdownList
                className={reactWidgetStyle}
                valueField="type" textField="text"
                data={jobTypeList}
                value={jobType}
                defaultValue={jobType}
                onChange={value => handleUpdateJobDetailsField(value.type, 'type', page)}
              />
            </div>
      }

      {
        !editViewEnabled
          ? <StartDateComponent date={new Date(startDate)}/>
          : <div>
              <div className={textDetailsTitle}>Start Date</div>
              <DateTimePicker
                className={reactWidgetStyle}
                time={false}
                format='LL'
                onChange={value => handleUpdateJobDetailsField(value, 'start_date', page)}
                value={typeof startDate === "string" ? new Date(startDate) : startDate}
              />
          </div>
      }
      
      
      {
        /*
         * Remote work
         */

        !editViewEnabled
          ? <LocationComponent location={location} remoteWork={remoteWork}/>
          : <div>
              <div className={textDetailsTitle}>Remote Work?</div>
              <div className={flex}>
                <div className={toggleContainer}>
                  <label>
                    <Toggle
                      defaultChecked={remoteWork === 0 ? false : true}
                      onChange={(e) => {
                        console.log(e.target.value)
                      }} />
                  </label>
                </div>
                <input className={editableInput} defaultValue={location}/>
              </div>
            </div>
      }

      {
        /*
         *  Paid job
         */

        !editViewEnabled
          ? <PaidJobComponent paid={paid}/>
          : <div>
              <div className={textDetailsTitle}>Paid job?</div>
              <div className={toggleContainer}>
                <label>
                  <Toggle
                    defaultChecked={paid === 0 ? false : true}
                    onChange={(e) => {
                      console.log(e.target.value)
                    }} />
                </label>
              </div>
            </div>
      }

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


