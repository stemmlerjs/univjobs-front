/*MyListings
 *
 * This component is to show employers all the jobs they listed.
 * It is also where they can edit the posting they have. 
 *
 * */

// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { GenericCard, DASHBOARD_CARD_TYPE, Title } from 'modules/SharedComponents'

// ==============THIRD PARTY IMPORTS========================= //
import { DropdownList } from 'react-widgets'
import { SkyLightStateless } from 'react-skylight'
import ReactTooltip from 'react-tooltip'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// ================CSS IMPORTS============================== //
import { rootComponentContainer, margins } from 'sharedStyles/sharedComponentStyles.css'

/*TODO: Test pageMainJobCards in other card renders
 *
 * */
import { pageMainJobCards, buttonContainers } from '../styles/MyListings.css'
import { maxButton, editButton } from 'sharedStyles/widgets.css'
import { overflowFix } from 'sharedStyles/sharedComponentStyles.css'



const data = [
    { 
        'id': 0, 'button_name': 'EDIT SETTINGS ⬇',
        'id': 1, 'button_name': 'MAX APPLICANTS',
        'id': 2, 'button_name': 'EDIT LISTINGS',
    }
]

//**NOTE:
//  Store is accessible
export default function MyListings ({jobs, handleCardClick, industries, jobTypes, profile}) {
    //console.log(jobs)
    //console.log(industries)
    //console.log(jobTypes)
    return (
            <div className={rootComponentContainer}>
	            <div className={margins}>

  	            {/* TITLE */}
                <Title 
                    titleName="MY LISTINGS"
                    subHeading="Once an applicant applies to your listing, you can no longer edit."
                />
        
  	            {/*MAIN (Cards List)
  	                NOTE: Reference for iterating using map
  	                https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
                */}

  	            <div className={pageMainJobCards}>
                    { jobs.length > 0 ? jobs.map((job) => (
                        <div key={job.job_id}>
  		                    <GenericCard
                                handleCardClick={handleCardClick}
                                cardType={DASHBOARD_CARD_TYPE}
                                job={job}
                                jobTypes={jobTypes}
                                industries={industries}
                                profile={profile}>
		                        <div className={buttonContainers}>
      			                    <button className={maxButton} onClick={(e) => handleCardClick(e, job)}>
      			                        MAX APPLICANTS
      			                      </button>
      			                    <button className={editButton} onClick={(e) => handleCardClick(e, job)}>
      			                        EDIT LISTING
      			                      </button>
                                </div>
                            </GenericCard>
                         </div>
                    )) : ''} 
               </div>
  	            <div className={overflowFix}></div>
  	            <div className={overflowFix}></div>
  	            <div className={overflowFix}></div>
  	            <div className={overflowFix}></div>
            </div>
          </div>
    )
}


MyListings.propTypes = {
    jobs: PropTypes.array.isRequired,
    handleCardClick: PropTypes.func.isRequired,
    industries: PropTypes.array.isRequired,
    profile: PropTypes.object.isRequired
}


