import React, { PropTypes } from 'react'
import { pageContainer, input, textarea, saveBtnList, saveBtn, saveBtnContainer, selectedSaveBtn, inlineDate,
  navSaveBtn, navBackBtn, error } from '../styles/CreateJobFormPageStyles.css'
import { FormField } from 'modules/CreateJob'
import { Combobox, DropdownList, DateTimePicker, Calendar} from 'react-widgets'


export default function CreateJobFormPage1 (props) {
  console.log(props)
  /*
  * setSelectedButton()
  * 
  * This selects the isPayingJob button and binds it to the redux store.
  */
  function setSelectedPayingJobButton(e) {
    switch(e.target.getAttribute('data-selection')) {
      case "0":
        props.updateFormField('isPayingJob', true, 1)
        return
      case "1":
        props.updateFormField('isPayingJob', false, 1)
        return
      default:
        return;
    }
  }

  return (
    <div className={pageContainer}>
      
      {/* JOB TITLE */}
      <FormField title="Job title">
        <input 
          className={props.page.page1PropsErrorMap.jobTitle ? input + ' ' + error : input} 
          type="text"
          placeholder="Muffin collector"
          value={props.page.jobTitle}
          onChange={(e) => props.updateFormField('jobTitle', e.target.value, 1)}
          >
        </input>
      </FormField>  


      {/* IS PAYING JOB */}
      <FormField title="Is it a paying job?">
        <li className={saveBtnList}>
         <button className={props.page.isPayingJob ? selectedSaveBtn : saveBtn} data-selection="0" onClick={setSelectedPayingJobButton}>Yes</button>
         <button className={props.page.isPayingJob === false ? selectedSaveBtn : saveBtn} data-selection="1" onClick={setSelectedPayingJobButton}>No</button>
       </li>
      </FormField>

      {/* START DATE */}
      <FormField title="Start date for job">
        <DateTimePicker
          className={props.page.page1PropsErrorMap.startDate ? error + ' ' + inlineDate : inlineDate}
          time={false}
          format='LL'
          value={props.page.startDate}
          onChange={(date, dateStr) => props.updateFormField('startDate', date, 1)}
        />  
      </FormField>

      {/* RESPONSIBILTIES */}
      <FormField title="Responsibilities">
        <textarea rows="6" 
          className={props.page.page1PropsErrorMap.responsibilities ? textarea + ' ' + error : textarea}
          placeholder="Write a short blurb about the job!"
          maxLength={props.page.MAX_CHARS_responsibilities}
          value={props.page.responsibilities}
          onChange={(e) => props.updateFormField('responsibilities', e.target.value, 1)}>
        </textarea>
        {props.page.MAX_CHARS_responsibilities - props.page.responsibilities.length + " characters left"}
      </FormField>

      {/* QUALIFICATIONS */}
      <FormField title="Qualifications">
        <textarea rows="6" className={props.page.page1PropsErrorMap.qualifications ? error + ' ' + textarea : textarea}
          value={props.page.qualifications}
          maxLength={props.page.MAX_CHARS_qualifications}
          onChange={(e) => props.updateFormField('qualifications', e.target.value, 1)}>
        </textarea>
        {props.page.MAX_CHARS_qualifications - props.page.qualifications.length + " characters left"}
      </FormField>

      {/* DESIRED SKILLS */}
      <FormField title="Desired Skills">
        <input 
          className={props.page.page1PropsErrorMap.desiredSkills ? error + ' ' + input : input} 
          type="text"
          placeholder="HTML, CSS, JavaScript, PHP"
          maxLength={props.page.MAX_CHARS_desiredSkills}
          value={props.page.desiredSkills}
          onChange={(e) => props.updateFormField('desiredSkills', e.target.value, 1)}>
        </input>
        {props.page.MAX_CHARS_desiredSkills - props.page.desiredSkills.length + " characters left"}
      </FormField>

      {/* INTERNSHIP LOCATION */}
      <FormField title="Internship Location">
        <input 
          className={props.page.page1PropsErrorMap.internshipLocation ? error + ' ' + input : input} 
          type="text"
          placeholder="Mississauga, Ontario"
          value={props.page.internshipLocation}
          onChange={(e) => props.updateFormField('internshipLocation', e.target.value, 1)}
          >
        </input>
      </FormField>

      {/* REMOTE WORK*/}
      <FormField title="">
        Remote work?
        <input 
          type="checkbox"
          onClick={(e) => props.updateFormField('remoteWork', e.target.checked, 1)}>
        </input>
      </FormField>


      {/* COMPENSATION */}
      <FormField title="Compensation">
        <textarea rows="6" className={props.page.page1PropsErrorMap.compensation ? error + ' ' + textarea : textarea}
          value={props.page.compensation}
          maxLength={props.page.MAX_CHARS_compensation}
          onChange={(e) => props.updateFormField('compensation', e.target.value, 1)}>
        </textarea>
        {props.page.MAX_CHARS_compensation - props.page.compensation.length + " characters left"}
      </FormField>

      <button onClick={(e) => props.back(props)} className={saveBtn + " " + navBackBtn}>Back</button>
      <button onClick={(e) => props.next(props)} className={saveBtn + " " + navSaveBtn}>Save</button>

    </div>
  )
}