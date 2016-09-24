import React, { PropTypes } from 'react'
//NOTE: export Card.js then import it here
import SkyLight from 'react-skylight'
import { pageContainer, cardContainer, card, cardHeader, 
	jobTitleContainer, jobTitle, industryTitle,
	tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader} from '../styles/StudentDashboard.css'

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
		      </div>
		      <div className={cardModalScroll}>
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
		     <div className={cardModalFooter}>
		       <img className={image}src="https://placeholdit.imgix.net/~text?txtsize=50&txt=50%C3%9750&w=50&h=50"/>
		     </div>
		    </div>
		  <div className={cardModalBodyRight}>
		    <p className={questionHeader}>Question</p>
		    <textarea rows="6"></textarea>
		    <p className={questionHeader}>Question</p>
		    <textarea rows="6"></textarea>
		    <div>
		     <button>heelo</button>  
		    </div> 
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

