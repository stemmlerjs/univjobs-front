
/*
 * StudentSettings 
 *
 * This components is to display the settings for the student profile
 *
 * */
// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'


// ==============THIRD PARTY IMPORTS========================= //
import { SkyLightStateless } from 'react-skylight'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactTooltip from 'react-tooltip'

// ==============MADE COMPONENTS========================= //
import { Title, ToggleButton } from 'modules/SharedComponents'

import config from 'config'
import moment from 'moment'

// ================CSS IMPORTS============================== //
/*NOTE: styles/StudentDashboard.css can be reused */
import { rootComponentContainer, margins, title } from 'sharedStyles/sharedComponentStyles.css'
import { buttonContainers } from 'sharedStyles/widgets.css'
import { cardSettingsContainer, flexibleCardContainer, flexRowItem, settingsOptionHeader, settingsOptionDetail,
    textButton } from 'modules/SharedComponents/styles/Settings.css'

/* For each setting, make a card that has a standard design for a toggle
 * https://myaccount.google.com/accessibility
 *
 * */


export default function StudentSettings ({ id, isChecked, onClickedButton, handleConfirmDeactivateAccount }) {
  return (
	  <div className={rootComponentContainer}>
        
        {/* TITLE */}
        <Title 
            titleName="My Settings"
            subHeading="This is where you manage your account settings"
        />

        <div className={flexibleCardContainer}>

        {
          /*
           * DE ACTIVATE ACCOUNT 
           */
        }

          <div className={cardSettingsContainer}>
            <div className={flexRowItem}>
              <div className={settingsOptionHeader}>Deactivate account</div>
              <div className={settingsOptionDetail}>Hide your profile from employers and resigns any current job applications you have open. You can reactivate your account later.</div>
            </div>
            <div className={flexRowItem}>
              <div className={textButton} onClick={handleConfirmDeactivateAccount}>Deactivate</div>
            </div>
          </div>


          {
            /*
             * OTHER SETTINGS
             */
          }
          
          {/**
          <div className={cardSettingsContainer}>
            <div className={flexRowItem}>
              <div className={settingsOptionHeader}>Deactivate account</div>
              <div className={settingsOptionDetail}>Hide your profile from employers and resigns any current job applications you have open. You can reactivate your account later.</div>
            </div>
            <div className={flexRowItem}>
              <ToggleButton
                id={id}
                isChecked={isChecked}
                clickedButton={onClickedButton}
              />
            </div>
          </div>
           */}


        </div>
    </div>
  )
}

StudentSettings.propTypes = {
}



