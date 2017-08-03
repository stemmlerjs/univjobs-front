
import React, { PropTypes } from 'react'

import MobileStudentProfileBreadCrumbs from './MobileStudentProfileBreadCrumbs'
import { Combobox, DropdownList, DateTimePicker, Calendar, Multiselect, SelectList} from 'react-widgets'

import { mobileStudentProfilePageContainer, largeHeader, profileItemsContainer, label,
  profileItem, textInput, dropdownInput, navigationButtonsContainer, nextButton, 
  longDropDown, backButton, multiselectDropdown, radioButtonsInput, container, radio, containersContainer, textAreaInput } from '../styles/MobileStudentProfilePage.css'

import { error } from 'sharedStyles/error.css' 

export default function MobileStudentProfilePage4 (
  { 
    companyName,
    position,
    funFacts,
    hasCar,
    hobbies,
    propsErrorMap, 
    updateProfileField,
    onCreateNewTag,
    next,
    back
  }) {

  return (
    <div className={mobileStudentProfilePageContainer}>

      <MobileStudentProfileBreadCrumbs totalStates={8} currentState={4} />

      <div className={largeHeader}>Tell us about your experiences!</div>
      <div className={profileItemsContainer}>

        <div className={profileItem}>
          <div className={label}>What's the last place you worked? <span>(optional)</span></div>
          <input className={propsErrorMap.companyName ? `${error} ${textInput}` : `${textInput}`} type="text" placeholder="Pied Piper"
            onBlur={(e)=> updateProfileField('companyName', e.target.value, true)}/>
        </div>
        
        <div className={profileItem}>
          <div className={label}>What did you do there? <span>(optional)</span></div>
          <input className={propsErrorMap.position ? `${error} ${textInput}` : `${textInput}`} type="text" placeholder="CEO"
            onBlur={(e)=> updateProfileField('position', e.target.value, true)}/>
          
        </div>

        <div className={profileItem}>
          <div className={label}>Do you drive?</div>
          <div className={containersContainer}>
            <div className={container}>
              <input type="radio" name="hasCar" onClick={() => updateProfileField('hasCar', true, true)}value="1" id="radio-1"/>
              <label htmlFor="radio-1"><span className={radio}>Yes</span></label>
            </div>
            <div className={container}>
              <input type="radio" name="hasCar" onClick={() => updateProfileField('hasCar', false, true)} defaultChecked value="0" id="radio-2"/>
              <label htmlFor="radio-2"><span className={radio}>No</span></label>
            </div>
          </div>
        </div>

        <div className={profileItem}>
          <div className={label}>Tell us a fun fact about you</div>
          <textarea className={propsErrorMap.funFacts ? `${error} ${textAreaInput}` : `${textAreaInput}`} 
            type="text" placeholder="I've earned Employee of the Month award consecutively for 15 years straight at the Krusty Krab."
            maxLength="140" onBlur={(e)=> updateProfileField('funFacts', e.target.value, true)}/>
        </div>

        <div className={profileItem}>
          <div className={label}>What are your hobbies?</div>
          <textarea className={propsErrorMap.hobbies ? `${error} ${textAreaInput}` : `${textAreaInput}`} type="text" placeholder="Playing guitar, Making movies, etc.."
            onBlur={(e)=> updateProfileField('hobbies', e.target.value, true)}/>
        </div>
        

        <div className={navigationButtonsContainer}>
          <div onClick={back} className={backButton}>Back</div>
          <div onClick={next} className={nextButton}>Next</div>
        </div>


      </div>
    </div>
  )
}
