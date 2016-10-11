import React, { PropTypes } from 'react'
import { StudentCard } from 'modules/Dashboard'
import SkyLight from 'react-skylight'
import { rootComponentContainer, margin, pageHeaderSection, 
	pageTitle, title} from 'sharedStyles/styles.css'
import { pageContainer, cardContainer, card, cardHeader, 
	jobTitleContainer, jobTitle, industryTitle,
	tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader, overflowFix, pageMainJobCards} from '../styles/StudentDashboard.css'
import { JobCard } from 'modules/Dashboard'

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

export default function StudentDashboar ({jobs}) {
   //Pass user info with job info then loop to show
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
	       <JobCard key={job.id} jobs={job}/>
	    ))}
	    <div className={overflowFix}></div>
	    <div className={overflowFix}></div>
	    <div className={overflowFix}></div>
	    <div className={overflowFix}></div>
	   </div>
	  </div>
	</div>	
   )
}

