
import React, { PropTypes } from 'react'

import MobileStudentProfileBreadCrumbs from './MobileStudentProfileBreadCrumbs'
import { Combobox, DropdownList, DateTimePicker, Calendar, Multiselect, SelectList} from 'react-widgets'
import { scrollToY } from 'helpers/utils'

import { mobileStudentProfilePageContainer, largeHeader, profileItemsContainer, label,
  profileItem, textInput, dropdownInput, navigationButtonsContainer, nextButton, 
  longDropDown, backButton, multiselectDropdown } from '../styles/MobileStudentProfilePage.css'

import { error } from 'sharedStyles/error.css' 
import { shine } from 'sharedStyles/animations.css'

export default function MobileStudentProfilePage7 (
  { 
    emailPreferences,
    emailPrefList,
    personalEmail,
    propsErrorMap, 
    updateProfileField,
    isSubmittingForm,
    next,
    back
  }) {
  
  scrollToY(0, 1500, 'easeInOutQuint');
  return (
    <div className={mobileStudentProfilePageContainer}>
      <MobileStudentProfileBreadCrumbs totalStates={8} currentState={7} />
      <div className={largeHeader}>One final thing- your notification preferences</div>
      <div className={profileItemsContainer}>

        <div className={profileItem}>
          <div className={label}>Do you have a preferred email you'd like us to notify you through instead of your school email? <span>(optional)</span></div>
          <input className={propsErrorMap.personalEmail ? `${error} ${textInput}` : `${textInput}`} type="email" placeholder="leslieknope@pawneeparks.com"
            onBlur={(e)=> updateProfileField('personalEmail', e.target.value, true)}/>
        </div>

        <div className={profileItem}>
          <div className={label}>How should we notify you about new jobs?</div>

          <DropdownList
            className={propsErrorMap.gender ? `${dropdownInput} ${error}` : `${dropdownInput}`}
            valueField="id" textField="description"
            data={emailPrefList}
            value={emailPreferences}
            defaultValue={1}
            onChange={value => updateProfileField('emailPreferences', value.id, true)}
          />	
        </div>

        <div className={navigationButtonsContainer}>
          <div onClick={back} className={backButton}>Back</div>
          <div onClick={next} className={isSubmittingForm ? `${nextButton} ${shine}` : `${nextButton} `}>Complete Profile</div>
        </div>
      </div>
    </div>
  )
}
