
import React, { PropTypes } from 'react'

import MobileStudentProfileBreadCrumbs from './MobileStudentProfileBreadCrumbs'
import { Combobox, DropdownList, DateTimePicker, Calendar, Multiselect, SelectList} from 'react-widgets'
import { mobileStudentProfilePageContainer, largeHeader, profileItemsContainer, label,
  profileItem, textInput, dropdownInput, navigationButtonsContainer, nextButton, smallHeader,
  multiselectDropdown } from '../styles/MobileStudentProfilePage.css'

import { error } from 'sharedStyles/error.css' 
import InputSelector from 'modules/SharedComponents/components/InputSelector'

export default function MobileEmployerProfilePage1 (
  { 
    companyName,
    officeAddress,
    officeCity,
    officePostalCode,
    propsErrorMap, 
    updateProfileField,
    next
  }) {
    
  return (
    <div className={mobileStudentProfilePageContainer}>

      <MobileStudentProfileBreadCrumbs totalStates={4} currentState={1} />

      <div className={largeHeader}>Let's setup your business profile!</div>
      <div className={smallHeader}>It'll only take a moment, promise.</div>
      <div className={profileItemsContainer}>
      
        <div className={profileItem}>
          <div className={label}>Company Name</div>
          <input className={propsErrorMap.companyName ? `${error} ${textInput}` : `${textInput}`} 
            defaultValue={companyName}
            type="text" placeholder="Pied Piper"
            onBlur={(e)=> updateProfileField('companyName', e.target.value, true)}/>
        </div>

        <div className={profileItem}>
          <div className={label}>Office Address</div>
          <input className={propsErrorMap.officeAddress ? `${error} ${textInput}` : `${textInput}`} 
            defaultValue={officeAddress}
            type="text" placeholder="100 City Centre Dr"
          onBlur={(e)=> updateProfileField('officeAddress', e.target.value, true)}/>
        </div>

        <div className={profileItem}>
          <div className={label}>Office City</div>
          <input 
            className={propsErrorMap.officeCity ? `${error} ${textInput}` : `${textInput}`} 
            defaultValue={officeCity}
            type="text" placeholder="Mississauga"
          onBlur={(e)=> updateProfileField('officeAddress', e.target.value, true)}/>
        </div>

        <div className={profileItem}>
          <div className={label}>Office Postal Code</div>
          <input 
            className={propsErrorMap.officePostalCode ? `${error} ${textInput}` : `${textInput}`} type="text" 
            placeholder="L5B 2C9"
            defaultValue={officePostalCode}
            onBlur={(e) => updateProfileField('officePostalCode', e.target.value, true)}/>
        </div>

        <div className={navigationButtonsContainer}>
          <div onClick={next} className={nextButton}>Next</div>
        </div>


      </div>
    </div>
  )
}
