
/*
 * StudentHowSection
 *
 */

// =================== REACT BUILTIN ========================= //
import React, { PropTypes } from 'react'

import { howSectionContainer, title, contentContainer, imageContainer, rightsideContent, pipelineSvg, handshakeSvg, writingSvg,
  subtleDivider, pipelineApply, pipelineContact, pipelineInterview, pipelineHire, processContainer,
  processItemContainer, profileSvg, notificationSvg, processItemTitle, processItemAltBody,
  employerCallToAction, employerCTALink } from '../styles/HowSection.css'

export default function StudentHowSection () {
  return (
    <div className={howSectionContainer}>
      <div className={title}>How Univjobs works</div>  
      <div className={contentContainer}>
        <div className={imageContainer}>
          <span className={pipelineApply}>APPLY</span>
          <span className={pipelineContact}>CONTACT</span>
          <span className={pipelineInterview}>INTERVIEW</span>
          <span className={pipelineHire}>HIRE</span>
          <img className={pipelineSvg} src="https://univjobs.ca/assets/images/front/pipeline.png"/>
          {/* 
          <img className={handshakeSvg} src="/assets/svg/handshake.svg"/>
          <img className={writingSvg} src="/assets/svg/writing.svg"/>
          */}
        </div>
        <div className={rightsideContent}>
          <div>Univjobs streamlines the hiring process.</div>
          <div>We aim to reduce anxiety by keeping students and employers informed about the status of their
          applications all the way from the initial job application to post-onboarding.</div>
        </div>
      </div>


      <div className={subtleDivider}></div>

      <div className={processContainer}>
        <div className={processItemContainer}>
          <img className={profileSvg} src="/assets/svg/profile.svg"/>
          <div className={processItemTitle}>One profile, one resume</div>
          <div>Your profile is your resume. Keep it up to date with your latest skills and credentials.</div>
          <div className={processItemAltBody}>No experience? First year? Just tell employers about yourself!</div>
        </div>
        <div className={processItemContainer}>
          <img className={notificationSvg} src="/assets/svg/bino.svg"/>
          <div className={processItemTitle}>Apply to jobs just for you</div>
          <div>Based on your industry skills and experience, we attempt to match you with jobs that best suit where you are as a student or recent grad.</div>
          <div className={processItemAltBody}>You're totally free to search our entire bank of jobs as well.</div>
        </div>
        <div className={processItemContainer}>
          <img className={notificationSvg} src="/assets/svg/notification.svg"/>
          <div className={processItemTitle}>Get notified of application changes</div>
          <div>Monitor the state of your application; know when you're still being considered. No more frantically applying to jobs for the next semester.</div>
        </div>
      </div>

      <div className={employerCallToAction}>Are you an employer?</div>
      <div className={employerCTALink}>Learn about how we can help you find great local talent</div>
      

      
    </div>
  )
}
