
/*
 * ApplicantCard
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { attrExists } from 'helpers/utils'

import { applicantCardContainer, applicantImageContainer, applicantDetailsContainer, applicantNameText, applicantButtonCorner,
  applicantSchoolText, applicantMajorText, selectedCard, multiselectedCard, altImageContainer, altApplicantImageContainer } from '../styles/ApplicantCardStyles.css'

import config from 'config'

export default function ApplicantCard ({ 
    applicant, 
    lists,
    selectedApplicant, 
    multiSelectViewActive,
    multiSelectedApplicantIds,
    
    handleViewApplicantDetails, 
    handleMultiSelectAddApplicant,
    handleMultiSelectRemoveApplicant
  }) {

  return (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        handleViewApplicantDetails(applicant)
      }} 
      className={applicant.student_id == selectedApplicant.student_id 
        ? multiSelectedApplicantIds.indexOf(applicant.student_id) !== -1
          ? `${applicantCardContainer} ${selectedCard} ${multiselectedCard}`
          : `${applicantCardContainer} ${selectedCard}` 
        : multiSelectedApplicantIds.indexOf(applicant.student_id) !== -1
          ? `${applicantCardContainer} ${multiselectedCard}`
          : applicantCardContainer
      }>
      
        {
          attrExists(applicant.photo_url)
            ? <div className={applicantImageContainer}><img src={`${config.mediaUrl}avatar/${applicant.photo_url}`}/></div>
            : <div className={altApplicantImageContainer}><div className={altImageContainer}><i className={'fa fa-user'} aria-hidden="true"></i></div></div>
        }
        
      <div className={applicantDetailsContainer}>
        <div className={applicantNameText}>{ `${applicant.user_firstName} ${applicant.user_lastName}` }</div>
        <div className={applicantSchoolText}>{`${applicant.school_name} ${new Date(applicant.grad_date).getFullYear()}`}</div>
        <div className={applicantMajorText}>{
            lists.programsObj
              ? lists.programsObj[applicant.program]
                ? lists.programsObj[applicant.program].length > 35 ? lists.programsObj[applicant.program].substring(0,35) + "..." : lists.programsObj[applicant.program]
                : lists.programsObj[applicant.program]
              : ''
          }</div>
      </div>
      <div className={applicantButtonCorner}>
        <i onClick={
          (e) => {

            console.log(multiSelectedApplicantIds)
            if (multiSelectedApplicantIds.indexOf(applicant.student_id) == -1) {
              console.log("multiselecting " + applicant.student_id)
              handleMultiSelectAddApplicant(applicant.student_id)
            }

            else {
              console.log("remove multiselecting " + applicant.student_id)
              handleMultiSelectRemoveApplicant(applicant.student_id)
            }
            
          }
        } className={multiSelectedApplicantIds.indexOf(applicant.student_id) !== -1 ? `fa fa-square` : "fa fa-square-o"} aria-hidden="true"></i>
      </div>
    </div>
  )
}


