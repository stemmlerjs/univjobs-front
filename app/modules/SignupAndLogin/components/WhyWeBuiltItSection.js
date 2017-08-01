
/*
 * StudentHowSection
 *
 */

// =================== REACT BUILTIN ========================= //
import React, { PropTypes } from 'react'

import { whyWeBuiltItSectionContainer, title, subTitle, bodySection, blueBold, finalStatement } from '../styles/WhyWeBuiltIt.css'

export default function WhyWeBuiltItSection () {
  return (
    <div className={whyWeBuiltItSectionContainer}>
      <div className={title}>Why are we building Univjobs?</div> 
      <div className={subTitle}>We get it.</div>

      <div className={bodySection}>You're a <span className={blueBold}>busy student.</span></div>

      <div className={bodySection}>You've got bills to pay. You've got exams to crush. On top of all that, you need to line up work for next semester. This usually means you need to spend time applying to jobs, with slightly different resumes and custom cover letters, while trying to juggle studying for exams.
      </div>

      <div className={bodySection}>Perhaps you're a first year student, looking for a part-time job or a few gigs to get experience in your field, but can't find anything nearby.</div>
      <br/>
      <div className={subTitle}>We've been there. It sucks.</div>

      <div>We strongly believe that this process can be better.</div>
      <div className={finalStatement}>We're final year Sheridan students who want to make getting jobs on and around campus easier than it was for us.</div>

    </div>
  )
}