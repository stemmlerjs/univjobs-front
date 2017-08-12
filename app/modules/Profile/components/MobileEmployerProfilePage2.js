
import React, { PropTypes } from 'react'

import MobileStudentProfileBreadCrumbs from './MobileStudentProfileBreadCrumbs'
import { Combobox, DropdownList, DateTimePicker, Calendar, Multiselect, SelectList} from 'react-widgets'
import { mobileStudentProfilePageContainer, largeHeader, profileItemsContainer, label,
  profileItem, textInput, dropdownInput, navigationButtonsContainer, nextButton, smallHeader,
  multiselectDropdown, textAreaInput, backButton } from '../styles/MobileStudentProfilePage.css'

import { error } from 'sharedStyles/error.css' 
import InputSelector from 'modules/SharedComponents/components/InputSelector'

export default function MobileEmployerProfilePage2 (
  { 
    website,
    employeeCount,
    description,
    industry,
    industryList,
    propsErrorMap, 
    updateProfileField,
    next,
    back
  }) {

  return (
    <div className={mobileStudentProfilePageContainer}>

      <MobileStudentProfileBreadCrumbs totalStates={4} currentState={2}/>

      <div className={largeHeader}>Let's setup your business profile!</div>
      
      <div className={profileItemsContainer}>
        
        <div className={profileItem}>
          <div className={label}>Tell applicants a little bit about your company</div>
          <textarea className={propsErrorMap.description ? `${error} ${textAreaInput}` : `${textAreaInput}`} 
            type="text" placeholder="We are a company"
            defaultValue={description}
            maxLength="140" onBlur={(e)=> updateProfileField('description', e.target.value, true)}/>
        </div>

        <div className={profileItem}>
          <div className={label}>Industry</div>
          <DropdownList
            className={propsErrorMap.industry ? `${multiselectDropdown} ${error}` : `${multiselectDropdown}`}
            textField="industry_text"
            valueField="id"
            filter="contains"
            data={industryList}
            onChange={value => updateProfileField('industry', value, false)}
            defaultValue={industry}
          /> 	
        </div>

        <div className={profileItem}>
          <div className={label}>Website</div>
          <input 
            className={propsErrorMap.website ? `${error} ${textInput}` : `${textInput}`} 
            defaultValue={website}
            type="text" placeholder="https://yourcompanyname.ca"
            onBlur={(e)=> updateProfileField('website', e.target.value, true)}/>
        </div>


        <div className={navigationButtonsContainer}>
          <div onClick={back} className={backButton}>Back</div>
          <div onClick={next} className={nextButton}>Next</div>
        </div>


      </div>
    </div>
  )
}
