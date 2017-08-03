
import React, { PropTypes } from 'react'

import MobileStudentProfileBreadCrumbs from './MobileStudentProfileBreadCrumbs'
import { Combobox, DropdownList, DateTimePicker, Calendar, Multiselect, SelectList} from 'react-widgets'

import { mobileStudentProfilePageContainer, largeHeader, profileItemsContainer, label,
  profileItem, textInput, dropdownInput, navigationButtonsContainer, nextButton, smallHeader,
  multiselectDropdown } from '../styles/MobileStudentProfilePage.css'
import { error } from 'sharedStyles/error.css' 
import { scrollToY } from 'helpers/utils'

import InputSelector from 'modules/SharedComponents/components/InputSelector'

export default function MobileStudentProfilePage1 (
  { 
    firstName,
    lastName,
    gender,
    hometown,
    gendersList, 
    languages,
    languagesList,
    propsErrorMap, 
    updateProfileField,
    next
  }) {

    scrollToY(0, 1500, 'easeInOutQuint');

  return (
    <div className={mobileStudentProfilePageContainer}>

      <MobileStudentProfileBreadCrumbs totalStates={8} currentState={1} />

      <div className={largeHeader}>Let's setup your profile!</div>
      <div className={smallHeader}>It'll only take a moment, promise.</div>
      <div className={profileItemsContainer}>

        <div className={profileItem}>
          <div className={label}>First name</div>
          <input className={propsErrorMap.firstName ? `${error} ${textInput}` : `${textInput}`} 
            defaultValue={firstName}
            type="text" placeholder="Erlich"
            onBlur={(e)=> updateProfileField('firstName', e.target.value, true)}/>
        </div>

        <div className={profileItem}>
          <div className={label}>Last name</div>
          <input className={propsErrorMap.lastName ? `${error} ${textInput}` : `${textInput}`} 
            defaultValue={lastName}
            type="text" placeholder="Bachman"
          onBlur={(e)=> updateProfileField('lastName', e.target.value, true)}/>
        </div>

        <div className={profileItem}>
          <div className={label}>Gender</div>
            <DropdownList
              className={propsErrorMap.gender ? `${dropdownInput} ${error}` : `${dropdownInput}`}
              valueField="id" textField="gender_description"
              data={gendersList}
              value={gender}
              defaultValue={1}
              onChange={value => updateProfileField('gender', value.id, true)}
            />	
        </div>

        <div className={profileItem}>
          <div className={label}>What languages do you speak?</div>

          <Multiselect
            className={propsErrorMap.languages? `${multiselectDropdown} ${error}` : `${multiselectDropdown}`}
            valueField='id' textField='sport'
            textField='language'
			      valueField='id'
            placeholder='English, French, Spanish'
            data={languagesList}
            value={languages}
            onChange={ value => updateProfileField('languages', value, true)}
          /> 	
        </div>

        <div className={profileItem}>
          <div className={label}>Hometown</div>
          <input className={propsErrorMap.hometown ? `${error} ${textInput}` : `${textInput}`} type="text" placeholder="Oakville"
            defaultValue={hometown}
            onBlur={(e) => updateProfileField('hometown', e.target.value, true)}/>
        </div>
        


        <div className={navigationButtonsContainer}>
          <div onClick={next} className={nextButton}>Next</div>
        </div>


      </div>
    </div>
  )
}
