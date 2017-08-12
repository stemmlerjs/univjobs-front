
import React, { PropTypes } from 'react'

import MobileStudentProfileBreadCrumbs from './MobileStudentProfileBreadCrumbs'
import { Combobox, DropdownList, DateTimePicker, Calendar, Multiselect, SelectList} from 'react-widgets'


import { mobileStudentProfilePageContainer, largeHeader, profileItemsContainer, label,
  profileItem, textInput, dropdownInput, navigationButtonsContainer, nextButton, 
  longDropDown, backButton, multiselectDropdown, smallHeader, special } from '../styles/MobileStudentProfilePage.css'
import { error } from 'sharedStyles/error.css' 

export default function MobileEmployerProfilePage4 (
  { 
      resendEmail
  }) {
  
  
  return (
    <div className={mobileStudentProfilePageContainer}>
      <MobileStudentProfileBreadCrumbs totalStates={4} currentState={4} />
      <div className={largeHeader}>Profile complete!</div>
      <div className={smallHeader}>Last thing to do is to verify your email.</div>

      <div>Click <span className={special} onClick={resendEmail}>here</span> to send a new verification email.</div>
    </div>
  )
}
