
/*
 * app/modules/SharedComponents/components/PaidJobComponent.js
 *
 * This is the reusable Paid Job component that shows a nice little icon beside if its paid or not..
 */

import React, { PropTypes } from 'react'
import { paidJobContainer, moneyIcon } from '../styles/PaidJobComponentStyles.css'

import moment from 'moment'

export default function PaidJobComponent ({paid}) {

  return (
    <div className={paidJobContainer}>
      <i className={`fa fa-usd ${moneyIcon}`} aria-hidden="true"></i> 
      <span>{paid === 0 || paid === false ? 'Not paid' : 'Paid job'}</span>
    </div> 
  )
}





