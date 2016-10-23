import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { pageContainer, cardContainer, card, cardHeader, 
	jobTitleContainer, jobTitle, industryTitle,
	tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader} from '../styles/StudentDashboard.css'


//Accept job object which contains the proptypes.
export default function JobCardModal({ job, questions, onApplyClicked,
				      industries}) { 
  console.log("**********JOB CARD MODAL************")
  console.log(questions)
  return (
		<div className={cardModalContainer}>

		{/* LEFT MODAL */}
		  <div className={cardModalBodyLeft}>
		  {/* CARD HEADER */}
		    <div className={cardModalHeader}>
		      <h2 className={jobModalTitle}>{ job ? job.title : '' }</h2>
		      
		      {/* TODO: Point to Industry Name */}
		      <h3 className={jobModalIndustry}> {
			      industries ? industries[job.user.industry].industry : ''
		      }</h3>
		    </div>
		    
		    <div className={cardModalScroll}>
		       
		    
		    </div>

		    <div className={cardModalFooter}>
		      <img className={image}src="https://placeholdit.imgix.net/~text?txtsize=50&txt=50%C3%9750&w=50&h=50"/>
		    </div>
		 </div>
		 <div className={cardModalBodyRight}>
		   <p className={questionHeader}>{questions[0].text}</p>
		   <p className={questionHeader}>{questions[1].text}</p>
		   <div>
		     <button onClick={(e) => onApplyClicked(e, questions)}>Buttooooooon</button>  
		   </div> 
	          </div>
		</div>
  )
}
