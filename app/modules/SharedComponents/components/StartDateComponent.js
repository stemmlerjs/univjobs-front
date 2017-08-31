
/*
 * app/modules/SharedComponents/components/StartDateComponent.js
 *
 * This is the reusable Start Date component that shows a nice little icon beside the date.
 */

import React, { PropTypes } from 'react'
import { calendar, calendarContainer } from '../styles/StartDateComponentStyles.css'

import moment from 'moment'

export default function StartDateComponent ({date}) {

  return (
    <div className={calendarContainer}>
      <i className={`fa fa-calendar ${calendar}`}></i>
      <div>{'Starts ' + moment(new Date(date)).format('MMMM Do, YYYY')}</div>
    </div>
  )
}





