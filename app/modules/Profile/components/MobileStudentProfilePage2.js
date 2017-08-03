
import React, { PropTypes } from 'react'

import MobileStudentProfileBreadCrumbs from './MobileStudentProfileBreadCrumbs'
import { Combobox, DropdownList, DateTimePicker, Calendar, Multiselect, SelectList} from 'react-widgets'
import { scrollToY } from 'helpers/utils'


import { mobileStudentProfilePageContainer, largeHeader, profileItemsContainer, label,
  profileItem, textInput, dropdownInput, navigationButtonsContainer, nextButton, 
  longDropDown, backButton } from '../styles/MobileStudentProfilePage.css'
import { error } from 'sharedStyles/error.css' 

import InputSelector from 'modules/SharedComponents/components/InputSelector'

 const messages = {
    emptyFilter: "Can't find your major? Let us know at support@univjobs.ca."
 }

export default function MobileStudentProfilePage2 (
  { 
    studentStatus,
    studentStatusList,
    educationLevel,
    educationLevelList,
    school,
    major,
    majorsList,
    propsErrorMap, 
    updateProfileField,
    next,
    back
  }) {

  scrollToY(0, 1500, 'easeInOutQuint'); 
  return (
    <div className={mobileStudentProfilePageContainer}>

      <MobileStudentProfileBreadCrumbs totalStates={8} currentState={2} />

      <div className={largeHeader}>Tell us a little bit about your schooling</div>
      <div className={profileItemsContainer}>

        <div className={profileItem}>
          <div className={label}>What type of student are you?</div>
          
          <InputSelector data={studentStatusList} 
            valueField={'status_text'}
            selectedId={studentStatus} 
            maxCol={2} 
            idField="id"
            onSelect={(id) => {
                console.log(id)
              updateProfileField('studentStatus', id, true)
          }}/>

        </div>

        <div className={profileItem}>
          <div className={label}>{studentStatus == 3 ? 'What education level did you achieve?' : 'What education level are you pursuing?'}</div>
          <InputSelector 
            data={educationLevelList} 
            selectedId={educationLevel} 
            valueField={'description'} 
            idField="id"
            maxCol={2} 
            onSelect={(id) => {
                console.log(id)
              updateProfileField('educationLevel', id, true)
          }}/>
        </div>

        <div className={profileItem}>
          <div className={label}>{studentStatus == 3 ? 'What did you study?' : 'What are you studying?'}</div>
            <Combobox
                className={propsErrorMap.major ? `${dropdownInput} ${error}` : `${dropdownInput}`} 
                textField="major_text"
                valueField="id" 
                filter="contains"
                data={majorsList}
                messages={messages}
                onChange={value => updateProfileField('major', value, true)}
                value={major}
                />
        </div>


        <div className={navigationButtonsContainer}>
          <div onClick={back} className={backButton}>Back</div>
          <div onClick={next} className={nextButton}>Next</div>
        </div>


      </div>
    </div>
  )
}
