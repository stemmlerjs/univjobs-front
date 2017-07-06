/*
 * ToggleButton 
 *
 * This components is to display the on-off-button switch
 *
 * */
// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'


// ==============THIRD PARTY IMPORTS========================= //
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import config from 'config'

// ================CSS IMPORTS============================== //
/*NOTE: styles/StudentDashboard.css can be reused */
import { toggleContainer, input, toggle } from 'modules/SharedComponents/styles/Settings.css'

const ToggleButton = ({id, isChecked, clickedButton}) => (
    <div className={toggleContainer}>
        <input 
            id={id}
            className={input}
            type="checkbox"
            defaultChecked={isChecked}
            onChange={(e) => clickedButton(e, id, isChecked) }
        />
        <label className={toggle} htmlFor={id}/>
    </div>
)

ToggleButton.propTypes = {
        id: PropTypes.string.isRequired,
        isChecked: PropTypes.bool,
        clickedButton: PropTypes.func,
};

export default ToggleButton
