
// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { FormField } from 'modules/CreateJob'

// ==============THIRD PARTY IMPORTS========================= //
import { Combobox, DropdownList, DateTimePicker, Calendar} from 'react-widgets'
import { JobCard } from 'modules/SharedComponents'

import moment from 'moment'
import config from 'config'

// ================CSS IMPORTS============================== //
import { lastPageContainer, input, textarea, 
        saveBtnList, saveBtn, saveBtnContainer, 
        selectedSaveBtn, inlineDate, navSaveBtn, 
        navBackBtn, error, leftDivider, 
        rightDivider, sectionHeader, sectionBody, 
        italics, specialInput, reminderContainer, bold, 
        detailsContainer, detailsLeft, detailsRight, 
        detailsHeaderLeft, detailsTitle, detailsBody, buttonsContainer,
        jobIndustry, detailsHeaderRight, marginTop, table, pageContainer, leftPadTableItem } from '../styles/CreateJobFormPageStyles.css'

import { rootComponentContainer } from 'sharedStyles/sharedComponentStyles.css'

export default function CreateJobFormPage4 (props) {
  console.log(props, "page 4")
  return (
    <div className={pageContainer}>

      {/* REMINDER CONTAINER */}
      <div className={reminderContainer}>
        <span className={bold}>Reminder:</span> Our platform is free until further notice
      </div>

      {/* DETAILS CONTAINER */}
      <div className={detailsContainer}>

        <div className={detailsLeft}>
          <div className={detailsTitle}>
            <h3>Here is how your job will look to students</h3>
          </div>

          {/* 

            TODO: 
              - test and make sure that remote_work is working on the back end
              - probably change the compensation field to be smaller.
              - make sure that the skills field is in the database and gets sent to the 
                database.
              - update the CreateJobFormPage4 component in CreateJobContainer and give it the props
                that it needs to sit on this page.
                    */}

          <JobCard 
            cardType={'employer'}
            page={'employer'}
            title={props.jobTitle}
            jobType={props.jobType === 1 
                      ? 'One Time Gig' :
                      props.jobType === 2 
                      ? 'Summer' :
                      props.jobType === 3 
                      ? 'Winter' :
                      props.jobType === 4
                      ? 'Freelance' :
                      props.jobType === 5
                      ? 'Campus Rep' :
                      props.jobType === 6
                      ? 'Part-time' :
                      props.jobType === 7
                      ? 'Full-time' :
                      ''
                    }
            logoUrl={config.mediaUrl + props.logoUrl}
            paid={props.paid}
            companyName={props.companyName}
            startDate={moment(props.startDate).format('MMMM Do, YYYY')}
            location={props.internshipLocation}
            responsibilities={props.responsibilities}
            qualification={props.qualification}
            address={props.address}
            compensation={props.compensation}
            createdAt={props.createdAt}
            industry={props.industries[props.employerProfile.industry]}
            remoteWork={props.remoteWork ? 1 : 0}
            paid={props.paid ? 1 : 0}
            questions={props.questions}
            handleOpenEmployerProfileModal={props.handleOpenEmployerProfileModal}
            handleCardClick={props.handleCardClick}
            jobObject={{
              description: props.employerProfile.description,
              employee_count: props.employerProfile.employeeCount,
              office_postal_code: props.employerProfile.officePostalCode,
              website: props.employerProfile.website,
              max_applicants: props.maxApplicants,
              applicant_count: 0
            }}
            officeAddress={props.employerProfile.officeAddress}
            officeCity={props.employerProfile.officeCity}
          />
        </div>

        <div className={detailsRight}>
          <div>
            <h3>Here is a summary of your order</h3>
            <h3>Review and confirm your listing and billing info</h3>
          </div>
          <div className={detailsHeaderRight}>
            LISTING DETAILS
          </div>
          <div className={detailsBody}>
            <table className={table}>
              <tbody>
                <tr>
                 <td className={leftPadTableItem}>Max Applicants</td>
                 <td>{props.maxApplicants}</td>
                </tr>
                <tr>
                 <td className={leftPadTableItem}>Number of positions</td>
                 <td>{props.numPositions}</td>
                </tr>
                <tr>
                 <td className={leftPadTableItem}>Cost per applicant</td>
                 <td>$0</td>
                </tr>
                <tr>
                 <td className={leftPadTableItem}>Number of campuses</td>
                 <td>1</td>
                </tr>
                <tr>
                 <td className={leftPadTableItem}>Premium options</td>
                 <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={detailsHeaderRight + ' ' + marginTop}>
            BILLING INFO
          </div>
          <div className={detailsBody}>
            <table className={table}>
              <tbody>
                <tr>
                  <td className={leftPadTableItem}>Credit Card</td>
                  <td style={{fontStyle: 'italic'}}>Disabled</td>
                </tr>
                <tr>
                  <td className={leftPadTableItem}>Promo Code</td>
                  <td style={{fontStyle: 'italic'}}>Disabled</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>  
      <div className={buttonsContainer}>
        <button onClick={(e) => props.back(props)} className={saveBtn + " " + navBackBtn}>Back</button>
        <button onClick={(e) => props.next(props)} className={saveBtn + " " + navSaveBtn}>Save</button>
      </div>
    </div>
  )
}
