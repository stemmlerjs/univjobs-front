import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { pageContainer, cardContainer, card, cardHeader, 
	jobTitleContainer, jobTitle, industryTitle,
	tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader} from '../styles/Card.css'


/*NOTE: This might be reusable for student applications
 * Show all info of student answers and job info with questions
 * 
 *FIXME: Answers from other students are showing, remove answers that are not related from the students
 * */

export default function ApplicationModal({ application, industries, jobTypes}) { 
  return (
		<div className={cardModalContainer}>

		{/* LEFT MODAL */}
		  <div className={cardModalBodyLeft}>
		  {/* CARD HEADER */}
		    <div className={cardModalHeader}>
		      <h2 className={jobModalTitle}>{ application ? application.title : '' }</h2>
		      
		      {/* TODO: Point to Industry Name */}
		      <h3 className={jobModalIndustry}> {
			      industries ? industries[application.business.industry].industry : ''
		      }</h3>
		    </div>
		    
		    <div className={cardModalScroll}>
		       
		    
		    </div>

		    <div className={cardModalFooter}>
		      <img className={image}src="https://placeholdit.imgix.net/~text?txtsize=50&txt=50%C3%9750&w=50&h=50"/>
		    </div>
		 </div>
		 <div className={cardModalBodyRight}>
		   <p className={questionHeader}>{''}</p>
		   <textarea
		   	rows="6"
		   >	
		   </textarea>
		   <p className={questionHeader}>{''}</p>
		   <textarea
		   	rows="6"
		   >	
		   </textarea>
		   <div>
		     <button/> 
		   </div> 
	          </div>
		</div>
  )
}
