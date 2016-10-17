import React, { PropTypes } from 'react'
import { pageContainer, cardContainer, card, cardHeader, 
	jobTitleContainer, jobTitle, industryTitle,
	tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader} from '../styles/StudentDashboard.css'

//Accept job object which contains the proptypes.
export default function JobCard({ jobs, children, lists}) {
  console.log("********JOB CARD*****************")
  console.log(lists)
  return (
	//Testing encapsulation
	//NOTE: Assumption that button component might break
      <div className={cardContainer}>
         <div className={card}>
	   <header className={cardHeader}>

	   {/*JOB TYPES*/}
	     <span>
	       <p>{lists.jobTypes[jobs.type].jobtype}</p>
	     </span>
	    </header>
		      
	    <div className={jobTitleContainer}>
	       <h2 className={jobTitle}>{jobs.title}</h2>
	    </div>
	    
	    {/* TODO: Point to industry  */}
	    <h3 className={industryTitle}>Software Development</h3>


	    {/* TODO: Point to appropriate tags
	    	      [] Need to have icons for this
		      [] Make a loop to determine the proper tag icons 
	    */}
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

	      {/*TODO: Point to imaga within job object*/}
	      <div>
	        <ul className={companyContainer}>
		   <li>
		    <img src="https://placeholdit.imgix.net/~text?txtsize=12&txt=56%C3%9756&w=56&h=56" alt="Smiley face"/>
		   </li>
		   
		   <li>
		     <ul className={companyInfoContainer}>
			<li>
			  <h4 className={companyTitle}>{jobs.user.company_name}</h4>
		        </li>
		
			<li>
			  <a href={jobs.user.website} target="_blank">Company Info</a>
		        </li>
		     </ul> 
		    </li>
		 </ul>
	      </div>
                    { children }

	    </div>
	   </div> 
  )
}
