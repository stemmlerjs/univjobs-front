
/*
 * app/modules/SharedComponents/components/LocationComponent.js
 *
 * This is the reusable Location Component. This one doesn't do what's supposed to
 * happen for students.
 */

import React, { PropTypes } from 'react'
import { calendarContainer, locationIconNoHover } from '../styles/LocationComponentStyles.css'

export default function LocationComponent ({remoteWork, location}) {

  console.log(remoteWork, location)

  return (
    <div className={calendarContainer}>
      <i className={`fa fa-map-marker ${locationIconNoHover}`} aria-hidden="true"></i>
      <div>{
        remoteWork === 0 || remoteWork == false
          ? <a>{location}</a>
          : 'Remote work'
      }</div>
    </div>
  )
}





