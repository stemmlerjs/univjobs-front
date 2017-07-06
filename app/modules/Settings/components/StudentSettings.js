
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
import { cardSettingsContainer, flexibleCardContainer, flexRowItem } from 'modules/SharedComponents/styles/Settings.css'

/* For each setting, make a card that has a standard design for a toggle
 * https://myaccount.google.com/accessibility
 *
 * */


export default function StudentSettings ({id, isChecked, onClickedButton}) {
  return (
	<div className={rootComponentContainer}>
        
        {/* TITLE */}
        <Title 
            titleName="My Settings"
            subHeading="This is where you manage your personal profile"
        />

        <div className={flexibleCardContainer}>
            <div className={cardSettingsContainer}>
                <div className={flexRowItem}>
                     <h3>Test</h3>
                    <ToggleButton
                        id={id}
                        isChecked={isChecked}
                        clickedButton={onClickedButton}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

StudentSettings.propTypes = {
}



