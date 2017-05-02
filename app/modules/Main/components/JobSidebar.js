
/*
 * JobSideBar
 *
 * This components is to display a bar on the left side with numerous buttons 
 *
 * */

// =================== REACT BUILTIN ========================= //
import React, { PropTypes } from 'react'

// ================CSS IMPORTS============================== //
import { jobsidebar, hideJobsidebar } from 'sharedStyles/jobsidebar.css'


/*
* TODO:
* use the hideJobsidebar css attributes to hide the sidebar based on some piece
* of state from the store that can accurately notify when we are on the Applicants
* page.
* 
* Use transitions to make it slide out nicely.
* 
* Also, we're going to need to subscribe to:
*   applicants.jobs       ~ []
*   applicant.selectedJob ~ number (id)
*/

export default function JobSidebar () {
  return (
    <div className={jobsidebar + ' ' + hideJobsidebar}>
    


    </div>
  )
}
