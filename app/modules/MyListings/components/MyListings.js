import React, { PropTypes } from 'react'
import { StudentCard } from 'modules/Dashboard'
import { JobCard, JobCardModal } from 'modules/Dashboard'
import { GenericCard, DASHBOARD_CARD_TYPE } from 'modules/SharedComponents'
import { SkyLightStateless } from 'react-skylight'
import { hideModal } from 'redux/modules/dashboard/dashboard'
import { rootComponentContainer, margin, pageHeaderSection,
	pageTitle, title} from 'sharedStyles/styles.css'
import { pageContainer, cardContainer, card, cardHeader,
	jobTitleContainer, jobTitle, industryTitle,
	tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader, overflowFix, pageMainJobCards,
	buttonContainers, pinIcon, fillIcon, unFillIcon, rotateIcon} from '../styles/MyListings.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactTooltip from 'react-tooltip'

//**NOTE:
//  Store is accessible
const MyListings = () => (
            <div className={rootComponentContainer}>
	            <div className={margin}>

  	            {/* TITLE */}
  	            <div className={pageHeaderSection}>
  	                <div className={pageTitle}>
  	                    <h1 className={title}>MY LISTINGS</h1>
  	                </div>
  	            </div>
               </div>
            </div>
)

export default MyListings




