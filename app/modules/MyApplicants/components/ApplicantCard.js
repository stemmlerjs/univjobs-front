
/*
 * ApplicantCard
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { applicantCardContainer, applicantImageContainer, applicantDetailsContainer, applicantNameText, applicantButtonCorner,
  applicantSchoolText, applicantMajorText, selectedCard, multiselectedCard } from '../styles/ApplicantCardStyles.css'

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
  console.log("applicant", applicant)
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
      <div className={applicantImageContainer}>
        <img src={`${config.mediaUrl}avatar/${applicant.photo_url}`}/>
      </div>
      <div className={applicantDetailsContainer}>
        <div className={applicantNameText}>{ `${applicant.user_firstName} ${applicant.user_lastName}` }</div>
        <div className={applicantSchoolText}>{`${applicant.school_name} ${new Date(applicant.grad_date).getFullYear()}`}</div>
        <div className={applicantMajorText}>{lists.majors[applicant.major]}</div>
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

