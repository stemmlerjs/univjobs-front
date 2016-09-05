import React, { PropTypes } from 'react'
import { pageContainer, input, textarea, saveBtnList, saveBtn, saveBtnContainer, selectedSaveBtn, inlineDate,
  navSaveBtn, navBackBtn, error, leftDivider, rightDivider, sectionHeader, sectionBody, italics, specialInput, reminderContainer,
  bold, detailsContainer, detailsLeft, detailsRight, detailsHeaderLeft, detailsTitle, detailsBody, jobIndustry, detailsHeaderRight,
  marginTop, table } from '../styles/CreateJobFormPageStyles.css'
import { FormField } from 'modules/CreateJob'
import { Combobox, DropdownList, DateTimePicker, Calendar} from 'react-widgets'

export default function CreateJobFormPage4 (props) {
  console.log("PAGE 4 Props", props)
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
            <h3>Here is how your job will look to students (Click the box to see)</h3>
          </div>

          <div className={detailsHeaderLeft}>
            {(() => {
              switch(props.jobType) {
                case 'summer':
                  return 'SUMMER 2016'
                case 'otg':
                  return 'ONE TIME GIG'
                case 'winter':
                  return 'WINTER BREAKS'
                case 'freelance':
                  return 'FREELANCING'
                case 'rep':
                  return 'CAMPUS REP AND BRAND AMBASSADOR'
                case 'pt':
                  return 'PART TIME WORK'
              }
            })()}
          </div>
        {/* DETAILS BODY*/}
          <div className={detailsBody}>
            <span className={bold}>{props.jobTitle.toUpperCase()}</span>
            <div className={jobIndustry}>
              <span>{props.industry}</span>
            </div>
            <div>
              DATE: {props.startDate.toString()}
            </div>
            <br></br>
            <div>
              LOCATION: {props.internshipLocation}
            </div>
          </div>


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
                 <td>Max Applicants</td>
                 <td>{props.maxApplicants}</td>
                </tr>
                <tr>
                 <td>Cost per applicant</td>
                 <td>$0</td>
                </tr>
                <tr>
                 <td>Number of campuses</td>
                 <td>1</td>
                </tr>
                <tr>
                 <td>Premium options</td>
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
                  <td>Credit Card</td>
                  <td>Disabled</td>
                </tr>
                <tr>
                  <td>Promo Code</td>
                  <td>Promo Code</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>  

      <button onClick={(e) => props.back(props)} className={saveBtn + " " + navBackBtn}>Back</button>
      <button onClick={(e) => props.next(props)} className={saveBtn + " " + navSaveBtn}>Save</button>
    </div>
  )
}