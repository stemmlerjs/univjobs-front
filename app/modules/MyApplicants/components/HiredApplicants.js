
/*
 * HiredApplicants.js
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'
import MyApplicantsHeader from './MyApplicantsHeader'
import MyApplicantsSubNavbar from './MyApplicantsSubNavbar'

import ApplicantCard from './ApplicantCard'
import ApplicantSidebar from './ApplicantSidebar'

import { rootComponentContainer } from 'sharedStyles/sharedComponentStyles.css'

import { applicantsPageBody, applicantsBodyLeft, applicantsBodyRight, headerTextStyle1,
  applicantCardsContainerDiv, applicantPageInstructions, returnButton, returnButtonContainer } from '../styles/MyApplicantsStyles.css'
import {  } from '../styles/NewApplicantsStyles.css'

import { Link } from 'react-router'

export default function HiredApplicants ({ jobs, selectedJob, 
  page, 
  selectedApplicant,
  lists,

  multiSelectViewActive,
  multiSelectedApplicantIds,

  jobSelectDropdownIsOpen,
  handleOpenJobSelect,
  handleChangeSelectedJob,
  handleClearSelectedJob,

  handleViewApplicantDetails,
  handleClearCurrentApplicantDetails,
  handleMultiSelectAddApplicant,
  handleMultiSelectRemoveApplicant,
  handleMultiSelectDeselectAll,
  handleMultiSelectAll
}) {
  return (
    <div className={rootComponentContainer}>
      
      {
        /*
        * =======================
        *   Header + Sub navbar
        * =======================
        */
      }

      <MyApplicantsHeader 
        jobs={jobs} 
        page={page}
        jobSelectDropdownIsOpen={jobSelectDropdownIsOpen} 
        handleOpenJobSelect={handleOpenJobSelect} 
        handleChangeSelectedJob={handleChangeSelectedJob}
        selectedJob={selectedJob}/>
      <MyApplicantsSubNavbar 
        multiSelectViewActive={multiSelectViewActive}
        handleMultiSelectAll={handleMultiSelectAll}
        handleMultiSelectDeselectAll={handleMultiSelectDeselectAll}/>

      {
       /*
        * =====================
        *         Body
        * =====================
        */
      }
      
      <div className={applicantsPageBody}>

        {
          /*
          * =========================
          *     Applicant cards
          * =========================
          */
        }
        <div className={applicantsBodyLeft} onClick={handleClearCurrentApplicantDetails}>
          {
            /*
             * - Total job Applicant count
             * - selected applicants count
             *
             * TODO: maybe underneath the applicant page instructions,
             * there can be a thing that say "Show me how" that opens it up.
             */
          }

          {
            selectedJob.applicants_HIRED 
              ? <div>
                  <div className={headerTextStyle1}>Showing {selectedJob.applicants_HIRED.length} of {selectedJob.applicants_HIRED.length} hired applicants.</div>
                  <div className={applicantPageInstructions}>Review your hired applicants.</div>

                  <div className={applicantCardsContainerDiv}>
                    {
                      selectedJob.applicants_HIRED.map((applicant, index) => {
                        return (
                          <ApplicantCard key={index} 
                            applicant={applicant} 
                            selectedApplicant={selectedApplicant}
                            lists={lists}
                            multiSelectViewActive={multiSelectViewActive}
                            multiSelectedApplicantIds={multiSelectedApplicantIds}
                            handleViewApplicantDetails={handleViewApplicantDetails}
                            handleMultiSelectAddApplicant={handleMultiSelectAddApplicant}
                            handleMultiSelectRemoveApplicant={handleMultiSelectRemoveApplicant}
                            />
                        )
                      })
                    }
                  </div>
              </div>
            : <div>
                <div className={headerTextStyle1}>No hired applicants yet.</div>
                <div className={applicantPageInstructions}>Hire a student by moving an applicant from the Potential Hires pool to Hired.</div>
                <div className={returnButtonContainer}>
                  <Link onClick={handleClearSelectedJob} className={returnButton} to="/myapplicants">Back to My Applicants Dashboard</Link>
                </div>
              </div>
          }
        </div>
        
        {
          /*
          * ============================
          *   Rightside action section (void)
          * ============================
          */
        }
        
        <ApplicantSidebar 
          lists={lists} 
          selectedApplicant={selectedApplicant} 
          questions={selectedJob.questions}
          multiSelectViewActive={multiSelectViewActive}/>

      </div>
    </div>
  )
}


