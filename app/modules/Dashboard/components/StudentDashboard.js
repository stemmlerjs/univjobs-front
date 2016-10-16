import React, { PropTypes } from 'react'
import { StudentCard } from 'modules/Dashboard'
import { JobCard, JobCardModal } from 'modules/Dashboard'
import { SkyLightStateless } from 'react-skylight'
import { hideModal } from 'redux/modules/dashboard/dashboard'

import { rootComponentContainer, margin, pageHeaderSection, 
	pageTitle, title} from 'sharedStyles/styles.css'
import { pageContainer, cardContainer, card, cardHeader, 
	jobTitleContainer, jobTitle, industryTitle,
	tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader, overflowFix, pageMainJobCards} from '../styles/StudentDashboard.css'

const styles = {
  overlayStyles: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    zIndex: 99,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  dialogStyles: {
     width: '50%',
     height: '75%',
     marginTop: '-300px',
     marginLeft: '-25%',
  }
};


//**NOTE: 
//  Store is accessible

/*TODO:
 *  [x] Pass proper info to job card modal
 *  [] On event, pass the two answers from questions
 *  [] Create a redux lifecyle event on APPLY BUTTON
 *  [] Send to appropriate POST endpoints
 *    [] Create api endpoints to receive job application & answers
 * */
export default function StudentDashboard ({jobs, onShowModal, onHideModal, modal}) {
   //Pass user info with job info then loop to show
   console.log("********STUDENDTDASHBOARD*************")
   console.log(modal)
   return (
	<div className={rootComponentContainer}>
	  <div className={margin}>
	  {/* TITLE */}
	   <div className={pageHeaderSection}>
	    <div className={pageTitle}> 
	    <h1 className={title}>LET'S GET YOU HIRED!</h1>
	    </div>
	  </div>
	   {/*MAIN (Cards List) 
	     NOTE: Reference for iterating using map
	          https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
	   */}
	   <div className={pageMainJobCards}>
	    {jobs.map((job) => (
	      
	      <div key={job.id}>    
	       <JobCard jobs={job}> 
			<button 
			     className={applyButton} 
			     onClick={(e) => onShowModal(e, job)}
			 >
			  APPLY
			</button>
		</JobCard>
	    </div>
	))}
		
	{/*MODAL
	   The state of modal is checked first, 
	   if it isOpen === true then show the modal
	   else, return empty
	*/}
	{ modal.isOpen 
	      ?	<SkyLightStateless
			isVisible={modal.isOpen}
			onCloseClicked={(e) => onHideModal(e, modal.job.id)}
			title=""
		>
		  <JobCardModal job={ modal.job }/>

		</SkyLightStateless>
	      :  ""
	}
      </div>
	    <div className={overflowFix}></div>
	    <div className={overflowFix}></div>
	    <div className={overflowFix}></div>
	    <div className={overflowFix}></div>
	   </div>
	  </div>
   )
}

StudentDashboard.propTypes = {
	onHandleClicked: PropTypes.func
}

