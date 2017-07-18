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

import { switchClass, slider, round } from 'modules/SharedComponents/styles/ToggleButton.css'

const ToggleButton = ({id, isChecked, clickedButton}) => (
  <div>
    <label className={switchClass}>
      <input type="checkbox"></input>
      <span className={`${slider} ${round}`}></span>
    </label>
  </div>
)

ToggleButton.propTypes = {
    id: PropTypes.string.isRequired,
    isChecked: PropTypes.bool,
    clickedButton: PropTypes.func,
};

export default ToggleButton
