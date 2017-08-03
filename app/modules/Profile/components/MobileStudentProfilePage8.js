
import React, { PropTypes } from 'react'

import MobileStudentProfileBreadCrumbs from './MobileStudentProfileBreadCrumbs'
import { Combobox, DropdownList, DateTimePicker, Calendar, Multiselect, SelectList} from 'react-widgets'


import { mobileStudentProfilePageContainer, largeHeader, profileItemsContainer, label,
  profileItem, textInput, dropdownInput, navigationButtonsContainer, nextButton, 
  longDropDown, backButton, multiselectDropdown, smallHeader, special } from '../styles/MobileStudentProfilePage.css'
import { error } from 'sharedStyles/error.css' 

export default function MobileStudentProfilePage8 (
  { 
      resendEmail
  }) {
  
  
  return (
    <div className={mobileStudentProfilePageContainer}>
      <MobileStudentProfileBreadCrumbs totalStates={8} currentState={8} />
      <div className={largeHeader}>Profile complete! That wasn't so bad, was it?</div>
      <div className={smallHeader}>Now you just need to verify your student email so we know you're a student.</div>

      <div>Click <span className={special} onClick={resendEmail}>here</span> to send a new verification email.</div>
    </div>
  )
}
