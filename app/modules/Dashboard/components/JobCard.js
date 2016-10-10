import React, { PropTypes } from 'react'
import { pageContainer, cardContainer, card, cardHeader, 
	jobTitleContainer, jobTitle, industryTitle,
	tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader} from '../styles/StudentDashboard.css'

//Accept job object which contains the proptypes.
export default function JobCard({ refs }) {
  console.log(refs)
  return (
	//Testing encapsulation
	//NOTE: Assumption that button component might break
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
	      <button className={applyButton} onClick={() => {refs.jobModal.show()} }>APPLY</button>
	    </div>
	   </div> 
  )
}
