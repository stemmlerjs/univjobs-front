
import React, { PropTypes } from 'react'

import { benefitsSectionContainer, title, benefitItemText, benefitItemImage,
  benefitItem } from '../styles/BenefitsSection.css'

import { weHelpYouSectionContainer,  weHelpYouItemsContainer,
  weHelpYouItem, helpItemImageContainer, helpItemImage } from '../styles/WeHelpYouSection.css'

import { processContainer, processItemTitle} from '../styles/HowSection.css'

export default function BenefitsSection () {
  return (
    <div className={benefitsSectionContainer}>
      <div className={title}>How we can help</div>

      <div className={processContainer}>

        <div className={`${weHelpYouItem} ${benefitItem}`}>
          <img className={`${helpItemImage} ${benefitItemImage}`} src="/assets/svg/target.svg"/>
          <div className={benefitItemText}>Target with smart filtering</div>
        </div>

        <div className={`${weHelpYouItem} ${benefitItem}`}>
          <img className={`${helpItemImage} ${benefitItemImage}`} src="/assets/svg/check.svg"/>
          <div className={benefitItemText}>Ask applicants questions ahead of time</div>
        </div>

        <div className={`${weHelpYouItem} ${benefitItem}`}>
          <img className={`${helpItemImage} ${benefitItemImage}`} src="/assets/svg/school.svg"/>
          <div className={benefitItemText}>Post jobs to multiple schools</div>
        </div>

      </div>

      <div className={processContainer}>
        <div className={`${weHelpYouItem} ${benefitItem}`}>
          <img className={`${helpItemImage} ${benefitItemImage}`} src="/assets/svg/invite.svg"/>
          <div className={benefitItemText}>Invite students & post-grads to apply</div>
        </div>

        <div className={`${weHelpYouItem} ${benefitItem}`}>
          <img className={`${helpItemImage} ${benefitItemImage}`} src="/assets/svg/list.svg"/>
          <div className={benefitItemText}>Keep track of applicants</div>
        </div>
      </div>


    </div>
  )
}