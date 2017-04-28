// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { FormField } from 'modules/CreateJob'

// ==============THIRD PARTY IMPORTS========================= //
import { Combobox, DropdownList, DateTimePicker, Calendar} from 'react-widgets'

// ================CSS IMPORTS============================== //
import { pageContainer, input, textArea, 
        saveBtnList, saveBtn, saveBtnContainer, 
        selectedSaveBtn, inlineDate, navSaveBtn, 
        navBackBtn, error, alignLeft, 
        sampleQuestionsContainer } from '../styles/CreateJobFormPageStyles.css'

export default function CreateJobFormPage2 (props) {
  return (
    <div className={pageContainer}>

      {/* SAMPLE QUESTIONS CONTAINER*/}
      <div className={sampleQuestionsContainer}>
        <h4>Some sample questions include:</h4>
        <ul className={alignLeft}>
          <li>Have you ever bartended before?</li>
          <li>Which of our products have you used before, and what do you like most about them?</li>
          <li>If you were to start this Winter break, how would you be able to juggle school?</li>
        </ul>
        <h4>Tip:</h4>
          <ul className={alignLeft}>
            <li className={alignLeft}>Pause and think to decide carefully! You may not have a chance to change these questions
        without contacting us once applicants have begun answering them</li>
          </ul>
      </div>

      {/* QUESTION 1 */}
      <FormField title="Question 1 of 2">
        <textarea rows="6" 
          className={props.page.page2PropsErrorMap.question1 ? textArea + ' ' + error : textArea}
          placeholder="Question 1"
          maxLength={props.page.MAX_CHARS_question}
          value={props.page.question1}
          onChange={(e) => props.updateFormField('question1', e.target.value, 2)}>
        </textarea>
        {props.page.MAX_CHARS_question - props.page.question1.length + " characters left"}
      </FormField>

      {/* QUESTION 2 */}
      <FormField title="Question 2 of 2">
        <textarea rows="6" 
          className={props.page.page2PropsErrorMap.question2 ? textArea + ' ' + error : textArea}
          placeholder="Question 2"
          maxLength={props.page.MAX_CHARS_question}
          value={props.page.question2}
          onChange={(e) => props.updateFormField('question2', e.target.value, 2)}>
        </textarea>
        {props.page.MAX_CHARS_question - props.page.question2.length + " characters left"}
      </FormField>

      <div className={saveBtnContainer}>
          <button onClick={(e) => props.back(props)} className={saveBtn + " " + navBackBtn}>Back</button>
          <button onClick={(e) => props.next(props)} className={saveBtn + " " + navSaveBtn}>Save</button>
      </div>

    </div>
  )
}
