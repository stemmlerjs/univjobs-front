import React, { PropTypes } from 'react'
import { pageContainerAlt, input, textarea, saveBtnList, saveBtn, saveBtnContainer, selectedSaveBtn, inlineDate,
  navSaveBtn, navBackBtn, error, leftDivider, rightDivider, sectionHeader, sectionBody, italics, specialInput } from '../styles/CreateJobFormPageStyles.css'
import { FormField } from 'modules/CreateJob'
import { Combobox, DropdownList, DateTimePicker, Calendar} from 'react-widgets'

export default function CreateJobFormPage3 (props) {
  return (
    <div>
      <div className={pageContainerAlt}>

        {/* LEFTSIDE */}
        <div className={leftDivider}>

          {/* SECTION 1 */}
          <div className={sectionHeader}>AUDIENCE TARGETING</div>
          <div className={sectionBody}>
            <p>Maximum number of resumes you want to receive? </p>
            <input type="text" 
              className={props.page.page3PropsErrorMap.maxApplicants ? specialInput + ' ' + error : specialInput}
              value={props.page.maxApplicants}
              onChange={(e) => props.updateFormField('maxApplicants', e.target.value, 3)}/>
              <span className={italics}> (Minimum 20) </span>
            <p className={italics}>This job posting will be removed once you receive the number of resumes you desire.</p>
          </div>

          <br></br>

          {/* SECTION 2 */}
          <div className={sectionHeader}>PREMIUM FILTERS</div>
          <div className={sectionBody}>
            <p>Premium filters and features coming soon!</p>
          </div>
        </div>

      {/* RIGHTSIDE */}
        <div className={rightDivider}>
          <h3>YOUR ORDER</h3>
          <h3>-</h3>
          <h3>Max Applicants</h3>
          <h3>{props.page.maxApplicants}</h3>
        </div>
      </div>

      <button onClick={(e) => props.back(props)} className={saveBtn + " " + navBackBtn}>Back</button>
      <button onClick={(e) => props.next(props)} className={saveBtn + " " + navSaveBtn}>Save</button>
    </div>
  )
}