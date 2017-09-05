
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

import { applicantsPageBody, applicantsBodyLeft, applicantsBodyRight, headerTextStyle1,
  applicantCardsContainerDiv, applicantPageInstructions, returnButton, returnButtonContainer } from '../styles/MyApplicantsStyles.css'
import {  } from '../styles/NewApplicantsStyles.css'

import { Link } from 'react-router'

export default function NewApplicants ({ jobs, selectedJob, 
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
  handleMultiSelectAll,
  handleMultiSelectRejectApplicants,
  handleMultiSelectAdvanceApplicants
}) {
    console.log("selected jpob", selectedJob);
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
        handleMultiSelectDeselectAll={handleMultiSelectDeselectAll}
        handleMultiSelectRejectApplicants={handleMultiSelectRejectApplicants}
        handleMultiSelectAdvanceApplicants={handleMultiSelectAdvanceApplicants}/>

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
            selectedJob.applicants_INITIAL 
              ? <div>
                  <div className={headerTextStyle1}>Showing {selectedJob.applicants_INITIAL.length} of {selectedJob.applicants_INITIAL.length} new applicants.</div>
                  <div className={applicantPageInstructions}>Browse new applicants and move candidates you like to the Potential Hires Pool.</div>

                  <div className={applicantCardsContainerDiv}>
                    {
                      selectedJob.applicants_INITIAL.map((applicant, index) => {
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
                <div className={headerTextStyle1}>No new applicants yet.</div>
                <div className={applicantPageInstructions}>When someone applies to your posting, you'll see them here first.</div>
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


