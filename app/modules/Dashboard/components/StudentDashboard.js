import React, { PropTypes } from 'react'
import { pageContainer, cardContainer, card } from '../styles/StudentDashboard.css'


export default function StudentDashboard ({user, props}) {
 console.log("Hello")

	 //Pass user info with job info then loop to show
   return (
       <div className={pageContainer}>
         <div className={cardContainer}>
	    <div className={card}>
	      div
	    </div>
	    <div className={card}>
	      div
	    </div>
	    <div className={card}>
	      div
	    </div>
	 </div>
       </div>
   )
}


