
import React, { PropTypes } from 'react'

import { weHelpYouSectionContainer, title, weHelpYouItemsContainer,
  weHelpYouItem, helpItemImageContainer, helpItemImage } from '../styles/WeHelpYouSection.css'

import { processContainer, processItemTitle} from '../styles/HowSection.css'

export default function WeHelpYouSectionContainer () {
  return (
    <div className={weHelpYouSectionContainer}>
      <div className={title}>We can help you</div>

      <div className={processContainer}>

        <div className={weHelpYouItem}>
          <div className={helpItemImageContainer}>
            <img className={helpItemImage} src="/assets/svg/clock.svg"/>
          </div>  
          <div className={processItemTitle}>SAVE TIME, NO CLUTTER</div>
          <div>We're always striving to improve the recruiting and hiring process for you.
          We've built a solution that allows you to track your whole hiring process where you can sift through applicants,
          contact or reject them after the interview and hire students you need.</div>
        </div>

        <div className={weHelpYouItem}>
          <div className={helpItemImageContainer}>
            <img className={helpItemImage} src="/assets/svg/student.svg"/>
          </div>  
          <div className={processItemTitle}>GET QUALIFIED APPLICANTS</div>
          <div>Our built-in technology ensures that qualified students see your job postings, and enable them to apply to it.</div>
        </div>

        <div className={weHelpYouItem}>
          <div className={helpItemImageContainer}>
            <img className={helpItemImage} src="/assets/svg/visibility.svg"/>
          </div>  
          <div className={processItemTitle}>BRAND EXPOSURE</div>
          <div>Post jobs to reach multiple schools of your choice. Ensure that you have the national brand exposure to young professionals.
          We help you with branding by using social media targeting so that your job posting can be seen by passive students.</div>
        </div>
      </div>
    </div>
  )
}