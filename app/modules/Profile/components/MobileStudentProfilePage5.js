
import React, { PropTypes } from 'react'

import MobileStudentProfileBreadCrumbs from './MobileStudentProfileBreadCrumbs'
import { Combobox, DropdownList, DateTimePicker, Calendar, Multiselect, SelectList} from 'react-widgets'
import { scrollToY } from 'helpers/utils'

import { mobileStudentProfilePageContainer, largeHeader, profileItemsContainer, label,
  profileItem, textInput, dropdownInput, navigationButtonsContainer, nextButton, 
  longDropDown, backButton, multiselectDropdown } from '../styles/MobileStudentProfilePage.css'
import { error } from 'sharedStyles/error.css' 

export default function MobileStudentProfilePage5 (
  { 
    schoolClubList,
    schoolClub,
    sportsList,
    sportsTeam,
    propsErrorMap, 
    updateProfileField,
    onCreateNewTag,
    next,
    back
  }) {
  
  scrollToY(0, 1500, 'easeInOutQuint');
  return (
    <div className={mobileStudentProfilePageContainer}>

      <MobileStudentProfileBreadCrumbs totalStates={8} currentState={5} />

      <div className={largeHeader}>Any extra curricular activities?</div>
      <div className={profileItemsContainer}>

        <div className={profileItem}>
          <div className={label}>Are you in any clubs? <span>(optional)</span></div>

          <Multiselect
            className={propsErrorMap.schoolClub? `${multiselectDropdown} ${error}` : `${multiselectDropdown}`}
            valueField='id' textField='club_name'
            placeholder='Toastmasters, Sheridan Computing Society'
            data={schoolClubList}
            value={schoolClub}
            onCreate={ value => onCreateNewTag(value, 'schoolClubList', 'club_name', 'schoolClub')}
            onChange={ value => updateProfileField('schoolClub', value, true)}
          /> 	
        </div>

        <div className={profileItem}>
          <div className={label}>Do you play any sports? <span>(optional)</span></div>

          <Multiselect
            className={propsErrorMap.sportsTeam? `${multiselectDropdown} ${error}` : `${multiselectDropdown}`}
            valueField='id' textField='sport'
            placeholder='Basketball, Hockey'
            data={sportsList}
            value={sportsTeam}
            onCreate={ value => onCreateNewTag(value, 'sportsList', 'sport', 'sportsTeam')}
            onChange={ value => updateProfileField('sportsTeam', value, true)}
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
