import React, { PropTypes } from 'react'
import SkyLight from 'react-skylight'
import { pageContainer, cardContainer, card, cardHeader, 
	jobTitleContainer, jobTitle, industryTitle,
	tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight} from '../styles/StudentDashboard.css'

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

const StudentDashboard = React.createClass({

  render() {
	 //Pass user info with job info then loop to show
   return (
       <div className={pageContainer}>
         <div className={cardContainer}>
	    <div className={card}>
	      <header className={cardHeader}>
	       <span>
	         <p>Job Type</p>
	       </span>
	      </header>
	      <div className={jobTitleContainer}>
	        <h2 className={jobTitle}>Job Title</h2>
	      </div>
	      <h3 className={industryTitle}>Software Development</h3>

	      <div>
	        <ul className={tagContainer}>
	         <li className={tagElement}>
		  <span>Test</span>
		 </li>
	         <li className={tagElement}>
		  <span>Test</span>
		 </li>
	         <li className={tagElement}>
		  <span>Test</span>
		  </li>
	         <li className={tagElement}>
		  <span>Test</span>
		  </li>
		</ul>
	      </div>

	      <div>
	        <ul className={companyContainer}>
		 <li>
		   <img src="https://placeholdit.imgix.net/~text?txtsize=12&txt=56%C3%9756&w=56&h=56" alt="Smiley face"/>
		 </li>
		 <li>
		  <ul className={companyInfoContainer}>
		    <li><h4 className={companyTitle}>Univjobs</h4>
		    </li>
		    <li>
		      <a href="https://google.com">Company Info</a>
		    </li>
		  </ul> 
		 </li>
		</ul>
	      </div>
	      <button className={applyButton} onClick={() => this.refs.jobModal.show()}>APPLY</button>
	      <SkyLight
	      	overlayStyles={styles.overlayStyles}
	        dialogStyles={styles.dialogStyles}
		closeButtonStyle={styles.closedButtonStyle}
		hideOnOverlayClicked
		ref="jobModal"
		>
		<div className={cardModalContainer}>
		  <div className={cardModalBodyLeft}>
		     <div className={cardModalHeader}>
		      <h2 className={jobModalTitle}>Job Title</h2>
		      <h3 className={jobModalIndustry}>Industry Name</h3>
		      <div>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		    	<p>Test</p>
		     </div>
		    </div>
		  </div>
		  <div className={cardModalBodyRight}>
		    <p>Hello</p>
		 </div>
		</div>
	     </SkyLight>  
	   </div>
	 </div>
       </div>
       )
  }
})

export default StudentDashboard

