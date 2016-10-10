import React, { PropTypes } from 'react'
import { applyButton} from '../styles/StudentDashboard.css'

import { card, cardContainer, cardHeader, cardDivider, cardBody,
  studentPic, institution, studentPicInner, studentDetails, studentName,
  studentMajor, degreeInfo, mainInfoList, miscInfoList, bold, list, stDetail,
  stDetailInner, flex, stDetailValue } from '../styles/StudentCardStyles.css'

//Accept job object which contains the proptypes.
export default function StudentCard({ refs, belongsToClubs, educationLevel, funFact, GPA,
  hasCar, hobbies, name, major, pastJob, photo, school, sports
}) {
  return (
      <div className={cardContainer}>
        <div className={card}>
          <div className={cardHeader}>
            <div className={studentPic}>
              <div className={studentPicInner}>
                
              </div>
            </div>
            <div className={studentDetails}>
              <div className={studentName}>{ name }</div>
              <div className={studentMajor}>Major: <span></span></div>
            </div>
          </div>
          <div className={cardDivider}></div>
          <div className={cardBody}>
            <div className={institution}>{ school }</div>
            <div className={degreeInfo}>Bachelors, 1st Year</div>
          
            <ul className={mainInfoList + ' ' + list}>
              <li className={flex}>
                <div className={stDetail}>
                  <div className={stDetailInner}></div>
                </div>
                <div className={stDetailValue}>GPA: { GPA }</div>
              </li>
              <li className={flex}>
                <div className={stDetail}>
                  <div className={stDetailInner}></div>
                </div>
                <div className={stDetailValue}>Sports?</div>
              </li>
              <li className={flex}>
                <div className={stDetail}>
                  <div className={stDetailInner}></div>
                </div>
                <div className={stDetailValue}>Car?</div>
              </li>
            </ul>
  
            <div className={miscInfoList}>
              <ul className={list}>
                <li><span className={bold}>Past Job: </span>Server at Cafe Italiano</li>
                <li><span className={bold}>Fun Fact: </span>I'm cool</li>
                <li><span className={bold}>Hobbies: </span>Coding, music, longboarding</li>
              </ul>
            </div>
          </div>
        <button className={applyButton} onClick={() => {refs.jobModal.show()} }>INVITE TO APPLY</button>
      </div>
     </div> 
  )
}
