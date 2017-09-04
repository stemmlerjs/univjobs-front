
/*
 * DashboardListItem
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'
import MyApplicantsHeader from './MyApplicantsHeader'
import MyApplicantsSubNavbar from './MyApplicantsSubNavbar'

import ApplicantCard from './ApplicantCard'
import ApplicantSidebar from './ApplicantSidebar'

import { rootComponentContainer } from 'sharedStyles/sharedComponentStyles.css'

import { applicantsPageBody, applicantsBodyLeft, applicantsBodyRight } from '../styles/MyApplicantsStyles.css'
import {  } from '../styles/NewApplicantsStyles.css'

import { Link } from 'react-router'

export default function NewApplicants ({ jobs, selectedJob, 
  page, 
  selectedApplicant,

  handleViewApplicantDetails,
  handleClearCurrentApplicantDetails }) {
  return (
    <div className={rootComponentContainer}>
      
      {
        /*
        * =======================
        *   Header + Sub navbar
        * =======================
        */
      }

      <MyApplicantsHeader jobs={jobs} selectedJob={selectedJob}/>
      <MyApplicantsSubNavbar />

      {
       /*
        * =====================
        *         Body
        * =====================
        */
      }
      
      <div className={applicantsPageBody} onClick={handleClearCurrentApplicantDetails}>

        {
          /*
          * =========================
          *     Applicant cards
          * =========================
          */
        }
        <div className={applicantsBodyLeft} >
          {
            selectedJob.applicants 
              ? selectedJob.applicants.map((applicant, index) => {
                return (
                  <ApplicantCard key={index} 
                    applicant={applicant} 
                    selectedApplicant={selectedApplicant}
                    handleViewApplicantDetails={handleViewApplicantDetails}/>
                )
              })
            : ''
          }
        </div>
        
        {
          /*
          * ============================
          *   Rightside action section (void)
          * ============================
          */
        }
        
        <ApplicantSidebar selectedApplicant={selectedApplicant}/>

      </div>
    </div>
  )
}


