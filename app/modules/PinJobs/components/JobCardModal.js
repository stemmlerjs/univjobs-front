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
export default function JobCardModal({ job, onApplyClicked,
				      industries, answerOne, answerTwo,
				      updateAnswerField}) { 
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
			      industries ? industries[job.business.industry].industry : ''
		      }</h3>
		    </div>
		    
		    <div className={cardModalScroll}>
		       
		    
		    </div>

		    <div className={cardModalFooter}>
		      <img className={image}src="https://placeholdit.imgix.net/~text?txtsize=50&txt=50%C3%9750&w=50&h=50"/>
		    </div>
		 </div>
		 <div className={cardModalBodyRight}>
		   <p className={questionHeader}>{job ? job.questions[0].text : ''}</p>
		   <textarea
		   	rows="6"
			value={answerOne}
  			onChange={(e) => updateAnswerField('answerOne', e.target.value)}
		   >	
		   </textarea>
		   <p className={questionHeader}>{job ? job.questions[1].text : ''}</p>
		   <textarea
		   	rows="6"
			value={answerTwo}
  			onChange={(e) => updateAnswerField('answerTwo', e.target.value)}
		   >	
		   </textarea>
		   <div>
		     <button onClick={(e) => onApplyClicked(e, job.questions)}>Buttooooooon</button>  
		   </div> 
	          </div>
		</div>
  )
}
