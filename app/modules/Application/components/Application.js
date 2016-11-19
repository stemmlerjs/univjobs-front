import React, { PropTypes } from 'react'
import { SkyLightStateless } from 'react-skylight'
import { JobCard, ApplicationModal } from '../../SharedComponents'
import { rootComponentContainer, margin, pageHeaderSection,
	pageTitle, title, crossHair } from 'sharedStyles/styles.css' 
import { pageMainJobCards } from '../styles/index.css'



export default function Application ({user, applications, industries, 
				    jobTypes, applicationModal, onShowModal, onHideModal}) {
				
   console.log("******* APPLICATION COMPONENT **********")
   console.log(user)
   console.log(applications)
   console.log(industries)
   console.log(jobTypes)
   return (
	<div className={rootComponentContainer}>
	  <div className={margin}>
	  {/* TITLE */}
	   <div className={pageHeaderSection}>
	    <div className={pageTitle}> 
	     <h1 className={title}>MY APPLICATIONS</h1>
	    </div>
	   </div>
	   {/*MAIN (Cards List) 
	     NOTE: Reference for iterating using map
	          https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
	   */}
	   <div className={pageMainJobCards}>
	    { applications ? applications.map((application) => (

		<div className={application ? crossHair : ''}
		     key={application.id}	
		     onClick={(e) => onShowModal(e, application)}
		>
		  <JobCard jobs={application} 
		  	   jobTypes={jobTypes} 
			   industries={industries}
		  >
			   <button/>
			   <button/>
			   <button/>
		  </JobCard>
	        </div> 
	    )) : ''}
   	   {/*MODAL
	   The state of modal is checked first, 
	   if it isOpen === true then show the modal
	   else, return empty
	*/}
	{ applicationModal.isOpen 
	      ?	<SkyLightStateless
			isVisible={applicationModal.isOpen}
			onCloseClicked={(e) => onHideModal(e, applicationModal.application.id)}
			title=""
		>
		  <ApplicationModal application={applicationModal.application} 
				industries={industries}
				jobTypes={jobTypes}
		  />

		</SkyLightStateless>
	      :  ""
	}
      </div>
     </div>
    </div>
	  
   )
}

