
import React, { PropTypes } from 'react'

import { DropdownList, DateTimePicker } from 'react-widgets'
import Toggle from 'react-toggle'
import { ApplicantCount, StartDateComponent, PaidJobComponent, LocationComponent }  from 'modules/SharedComponents'

import { textDetailsTitle, textDetailsField, title, jobTypeText, 
  disabledInput, fieldTitleFlexContainer, charCount } from '../styles/JobDetailsStyles.css'
  
import { box, editableArea, editableAreaResizeable, editableTitleArea, standardButton, editableInput,
    standardButtonRed, standardButtonInactive, saveButtonsContainer, reactWidgetStyle, toggleContainer, 
    error, flex } from '../styles/MyPostingsStyles.css'

import { shine } from 'sharedStyles/animations.css'

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
  isSavingChanges,
  jobDetailsPropsErrorMap,

  editViewEnabled,
  wereJobDetailsEditsMade,

  handleUpdateJobDetailsField,
  handleCancelJobDetailsEdits,
  handleSaveJobDetailsEdits
}) {

  console.log(jobDetailsPropsErrorMap, "props error map")

  return (
    <div className={box}>
      
      {
        !editViewEnabled
          ? <div className={title}>{jobTitle}</div>
          : <div>
              <div className={fieldTitleFlexContainer}>
                <div className={textDetailsTitle}>Job Title</div>
                <div className={charCount}>[{jobTitle.length} / 30 chars]</div>
              </div>
              <textarea
              onChange={(e) => handleUpdateJobDetailsField(e.target.value, 'title', page)} 
              defaultValue={jobTitle} 
              className={jobDetailsPropsErrorMap.jobTitle ? `${editableTitleArea} ${error}` : editableTitleArea}></textarea>
            </div>
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
                defaultValue={jobType}
                onChange={value => {
                  handleUpdateJobDetailsField(value.type, 'type', page)
                }}
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
                defaultValue={typeof startDate === "string" ? new Date(startDate) : startDate}
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
              <div className={fieldTitleFlexContainer}>
                <div className={textDetailsTitle}>Remote Work?</div>
                {
                  location == null || location == undefined 
                    ? ''
                    : <div className={charCount}>[{location.length} / 55 chars]</div>
                }
              </div>
              <div className={flex}>
                <div className={toggleContainer}>
                  <label>
                    <Toggle
                      defaultChecked={remoteWork === 0 ? false : true}
                      onChange={(e) => {
                      handleUpdateJobDetailsField(e.target.checked === true ? 1 : 0, 'remote_work', page)
                    }} />
                  </label>
                </div>
                <input
                 className={remoteWork == 0 
                  ? jobDetailsPropsErrorMap.internshipLocation 
                      ? `${editableInput} ${error}` 
                      : editableInput
                  : `${editableInput} ${disabledInput}`} 
                 defaultValue={location}
                 value={location}
                 onChange={e => handleUpdateJobDetailsField(e.target.value, 'location', page)}
                 />
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
                      handleUpdateJobDetailsField(e.target.checked === true ? 1 : 0, 'paid', page)
                    }} />
                </label>
              </div>
            </div>
      }


      {
        /*
         * Responsibilities
         */

        !editViewEnabled
          ? <div className={textDetailsTitle}>Responsibilities</div>
          : <div className={fieldTitleFlexContainer}>
                <div className={textDetailsTitle}>Responsibilities</div>
                <div className={charCount}>[{responsibilities.length} / 5500 chars]</div>
              </div>
      }

      {
        !editViewEnabled
          ? <div className={textDetailsField}>{responsibilities}</div>
          : <textarea 
              onChange={(e) => handleUpdateJobDetailsField(e.target.value, 'responsibilities', page)} 
              defaultValue={responsibilities} 
              className={jobDetailsPropsErrorMap.responsibilities ? `${editableAreaResizeable} ${error}` : editableAreaResizeable}></textarea>
      }

      {
        /*
         * Qualifications
         */

        !editViewEnabled
          ? <div className={textDetailsTitle}>Qualifications</div>
          : <div className={fieldTitleFlexContainer}>
              <div className={textDetailsTitle}>Qualifications</div>
              <div className={charCount}>[{qualifications.length} / 1400 chars]</div>
            </div>
      }
      
      {
        !editViewEnabled
          ? <div className={textDetailsField}>{qualifications}</div>
          : <textarea onChange={(e) => handleUpdateJobDetailsField(e.target.value, 'qualification', page)} 
              defaultValue={qualifications} 
              className={jobDetailsPropsErrorMap.qualifications ? `${editableAreaResizeable} ${error}` : editableAreaResizeable}></textarea>
      }
      
      {
        /*
         * Desired Skills
         */

        !editViewEnabled
          ? <div className={textDetailsTitle}>Desired Skills</div>
          : <div className={fieldTitleFlexContainer}>
              <div className={textDetailsTitle}>Desired Skills</div>
              <div className={charCount}>[{desiredSkills.length} / 200 chars]</div>
            </div>
      }
      
      {
        !editViewEnabled
          ? <div className={textDetailsField}>{desiredSkills}</div>
          : <textarea onChange={(e) => handleUpdateJobDetailsField(e.target.value, 'desired_skills', page)} 
            defaultValue={desiredSkills} 
            className={jobDetailsPropsErrorMap.desiredSkills ? `${editableArea} ${error}` : editableArea}></textarea>
      }

      {
        /*
         * Compensation
         */
        
        !editViewEnabled
          ? <div className={textDetailsTitle}>Compensation</div>
          : <div className={fieldTitleFlexContainer}>
              <div className={textDetailsTitle}>Compensation</div>
              <div className={charCount}>[{compensation.length} / 500 chars]</div>
            </div>
      }
      
      {
        !editViewEnabled
          ? <div className={textDetailsField}>{compensation}</div>
          : <textarea onChange={(e) => handleUpdateJobDetailsField(e.target.value, 'compensation', page)} 
              defaultValue={compensation} 
              className={jobDetailsPropsErrorMap.compensation ? `${editableArea} ${error}` : editableArea}></textarea>
      }

      {
        editViewEnabled
          ? <div className={saveButtonsContainer}>
              <button onClick={handleCancelJobDetailsEdits} className={standardButtonRed}>Cancel</button>
              <button 
                onClick={wereJobDetailsEditsMade ? handleSaveJobDetailsEdits : () => {}} 
                className={wereJobDetailsEditsMade 
                            ? isSavingChanges ? `${shine} ${standardButton}` : standardButton
                            : standardButtonInactive}>Save changes</button>
            </div>
          : ''
      }
     
    </div>
  )
}


