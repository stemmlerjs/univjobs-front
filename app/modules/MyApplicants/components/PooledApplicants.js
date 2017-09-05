
/*
 * PooledApplicants
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

import { Link } from 'react-router'

export default function PooledApplicants ({ jobs, selectedJob, 
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
        selectedJob={selectedJob}
        page={page}
        jobSelectDropdownIsOpen={jobSelectDropdownIsOpen} 
        handleOpenJobSelect={handleOpenJobSelect} 
        handleChangeSelectedJob={handleChangeSelectedJob}
      />
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
            selectedJob.applicants_POOLED 
              ? <div>
                  <div className={headerTextStyle1}>Showing {selectedJob.applicants_POOLED.length} of {selectedJob.applicants_POOLED.length} potential hires.</div>
                  <div className={applicantPageInstructions}>Sort through your potential hires and choose the right hires for the job!</div>

                  <div className={applicantCardsContainerDiv}>
                    {
                      selectedJob.applicants_POOLED.map((applicant, index) => {
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
                <div className={headerTextStyle1}>No applicants in the Potential Hires pool.</div>
                <div className={applicantPageInstructions}>When you want to contact a student, move them into here to contact them.</div>
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


