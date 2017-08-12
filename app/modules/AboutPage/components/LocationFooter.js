
import React, { PropTypes } from 'react'

import { locationFooterContainer, circle, locationContainer, companyName, address } from '../styles/LocationFooter.css'

const LocationFooter = () => (
  <div className={locationFooterContainer}>
    <div className={circle}>
      <img src="/assets/images/front/location.png" />
    </div>

    <div className={locationContainer}>
      <div className={address}>Univjobs is a product of</div>
      <div className={companyName}>DCommons Inc.</div>
      <div className={address}>Oakville, ON</div>
    </div>
  </div>
)

export default LocationFooter