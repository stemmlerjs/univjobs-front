// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============THIRD PARTY IMPORTS========================= //
import { Combobox, DropdownList, DateTimePicker, Calendar} from 'react-widgets'

// ================CSS IMPORTS============================== //
import { pageContainerAlt, input, textarea, pageContainer,
        saveBtnList, saveBtn, saveBtnContainer, 
        selectedSaveBtn, inlineDate, navSaveBtn, 
        navBackBtn, error, leftDivider, 
        rightDivider, sectionHeader, sectionBody, sectionBodyRight, applicantsjobsCountHeader,
        applicantsjobsCount, divide, red, sectionBodyPremium,
        italics, specialInput, sectionText, sectionText2 } from '../styles/CreateJobFormPageStyles.css'
import { rootComponentContainer } from 'sharedStyles/sharedComponentStyles.css'

export default function CreateJobFormPage3 (props) {
  return (
    <div className={pageContainer}>
      <div className={pageContainerAlt}>

        {/* LEFTSIDE */}
        <div className={leftDivider}>

          {/* SECTION 1 */}
          <div className={sectionHeader}>AUDIENCE TARGETING</div>
          <div className={sectionBody}>
            <div>
              <div className={sectionText}>Maximum number of resumes you want to receive?</div>
              <input type="number" 
                defaultValue={20}
                className={props.page.page3PropsErrorMap.maxApplicants ? specialInput + ' ' + error : specialInput}
                
                onChange={(e) => props.updateFormField('maxApplicants', e.target.value, 3)}/>
                <span className={italics}> (Minimum 20) </span>
            </div>
            <div>
              <div className={sectionText2}>Maximum number of positions available?</div>
              <input type="number" 
                defaultValue={1}
                className={props.page.page3PropsErrorMap.numPositions ? specialInput + ' ' + error : specialInput}
                onChange={(e) => props.updateFormField('numPositions', e.target.value, 3)}
              />
            </div>
          </div>

          <br></br>

          {/* SECTION 2 */}
          <div className={sectionHeader}>PREMIUM FILTERS</div>
          <div className={sectionBodyPremium}>
            <p>Premium filters and features coming soon!</p>
          </div>
        </div>

      {/* RIGHTSIDE */}
        <div className={rightDivider}>
          <div className={sectionHeader}>YOUR ORDER</div>
          <div className={sectionBodyRight}>
            <div className={applicantsjobsCountHeader}>
              <div>Applicant Slots</div>
              <div># of Jobs</div>
            </div>
            <div className={applicantsjobsCount}>
              {
                props.page.maxApplicants >= 20 
                  ? <div>{props.page.maxApplicants}</div>
                  : <div className={red}>{props.page.maxApplicants}</div> 
              }
              <div className={divide}>{" / "}</div>
              { props.page.numPositions > 0 
                  ? <div>{props.page.numPositions}</div>
                  : <div className={red}>{props.page.numPositions}</div>
              }
            </div>
          </div>
        </div>
      </div>

      <button onClick={(e) => props.back(props)} className={saveBtn + " " + navBackBtn}>Back</button>
      <button onClick={(e) => props.next(props)} className={saveBtn + " " + navSaveBtn}>Next</button>
    </div>
  )
}
