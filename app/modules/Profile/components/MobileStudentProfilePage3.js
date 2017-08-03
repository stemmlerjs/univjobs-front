
import React, { PropTypes } from 'react'

import MobileStudentProfileBreadCrumbs from './MobileStudentProfileBreadCrumbs'
import { Combobox, DropdownList, DateTimePicker, Calendar, Multiselect, SelectList} from 'react-widgets'

import { mobileStudentProfilePageContainer, largeHeader, profileItemsContainer, label,
  profileItem, textInput, dropdownInput, navigationButtonsContainer, nextButton, 
  longDropDown, backButton } from '../styles/MobileStudentProfilePage.css'
import { error } from 'sharedStyles/error.css' 

export default function MobileStudentProfilePage3 (
  { 
    enrollmentDate,
    graduationDate,
    gpa,
    studentStatus,
    propsErrorMap, 
    updateProfileField,
    next,
    back
  }) {
  return (
    <div className={mobileStudentProfilePageContainer}>

      <MobileStudentProfileBreadCrumbs totalStates={8} currentState={3} />

      <div className={largeHeader}>And few more school things</div>
      <div className={profileItemsContainer}>

        <div className={profileItem}>
          <div className={label}>When did you enroll?</div>
            <DateTimePicker
			  className={propsErrorMap.enrollmentDate ? `${dropdownInput} ${error}` :  `${dropdownInput}`}
			  time={false}
			  format='LL'
			  onChange={value => updateProfileField('enrollmentDate', value, true)}
			  value={enrollmentDate}
			 />		
        </div>

        <div className={profileItem}>
          <div className={label}>{studentStatus == 3 ? 'When did you graduate?' : 'When do you expect to graduate?'}</div>
            <DateTimePicker
			  className={propsErrorMap.graduationDate ? `${dropdownInput} ${error}` : `${dropdownInput} `}
			  time={false}
			  format='LL'
			  onChange={value => updateProfileField('graduationDate', value, true)}
			  value={graduationDate}
			/>	
        </div>

        <div className={profileItem}>
          <div className={label}>GPA <span>(optional)</span></div>
          <input className={propsErrorMap.gpa ? `${error} ${textInput}` : `${textInput}`} 
              defaultValue={gpa}
              type="number"
              step="0.01"
              max="4"
              placeholder="GPA(0.00 - 4.00)" 
              onBlur={(e)=> updateProfileField('gpa', e.target.value, true)}/>
        </div>

        <div className={navigationButtonsContainer}>
          <div onClick={back} className={backButton}>Back</div>
          <div onClick={next} className={nextButton}>Next</div>
        </div>


      </div>
    </div>
  )
}
