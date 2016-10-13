import React, { PropTypes } from 'react'
import { pageContainer, cardContainer, card, cardHeader, 
	jobTitleContainer, jobTitle, industryTitle,
	tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader} from '../styles/StudentDashboard.css'

//Accept job object which contains the proptypes.
export default function JobCardModal({ jobs  }) {
  console.log(jobs)
  return (
	//Testing encapsulation
	//NOTE: Assumption that button component might break
		<div className={cardModalContainer}>
		  <div className={cardModalBodyLeft}>
		    <div className={cardModalHeader}>
		      <h2 className={jobModalTitle}>Job Title</h2>
		      <h3 className={jobModalIndustry}>Industry Name</h3>
		    </div>
		    
		    <div className={cardModalScroll}>
		    
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
  )
}
