import React, { PropTypes } from 'react'
import { pageContainer, input, textarea, saveBtnList, saveBtn, saveBtnContainer} from '../styles/CreateJobFormPageStyles.css'
import { FormField } from 'modules/CreateJob'


export default function CreateJobFormPage1 (props) {
  return (
    <div className={pageContainer}>
      
      {/* JOB TITLE */}
      <FormField title="Job title">
        <input 
          className={input} 
          type="text"
          placeholder="Muffin collector">
        </input>
      </FormField>

      <FormField title="Is it a paying job?">
        <li className={saveBtnList}>
         <button className={saveBtn}>Yes</button>
         <button className={saveBtn}>No</button>
       </li>
      </FormField>

      {/* RESPONSIBILTIES */}
      <FormField title="Responsibilities">
        <textarea rows="6" 
          className={textarea}
          placeholder="Write a short blurb about the job!">
        </textarea>
      </FormField>

      {/* QUALIFICATIONS */}
      <FormField title="Qualifications">
        <textarea rows="6" className={textarea}>
        </textarea>
      </FormField>

      {/* DESIRED SKILLS */}
      <FormField title="Desired Skills">
        <input 
          className={input} 
          type="text"
          placeholder="HTML, CSS, JavaScript, PHP">
        </input>
      </FormField>

      {/* INTERNSHIP LOCATION */}
      <FormField title="Internship Location">
        <input 
          className={input} 
          type="text"
          placeholder="Mississauga, Ontario">
        </input>
      </FormField>

      {/* COMPENSATION */}
      <FormField title="Compensation">
        <textarea rows="6" className={textarea}>
        </textarea>
      </FormField>

    </div>
  )
}