import React, { PropTypes } from 'react'

/*NOTE: JobCardModal most likely can be reused*/
import { JobCardModal } from 'modules/Dashboard'
import { GenericCard, DASHBOARD_CARD_TYPE } from 'modules/SharedComponents'
import { SkyLightStateless } from 'react-skylight'
import { rootComponentContainer, margin, pageHeaderSection,
	pageTitle, title} from 'sharedStyles/styles.css'

/*NOTE: styles/StudentDashboard.css can be reused */
import { pageContainer, cardContainer, card, cardHeader,
	jobTitleContainer, jobTitle, industryTitle,
	tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader, overflowFix, pageMainJobCards,
	buttonContainers, pinIcon, fillIcon, unFillIcon, rotateIcon} from '../styles/StudentDashboard.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactTooltip from 'react-tooltip'

//**NOTE:
//  Store is accessible
//  Follow Dasboard StudentDashbaord for Job & Pin functionality and display
export default function PinJobs () {
  return (
	<div>MY PINNED JOBS</div>
  )
}

PinJobs.propTypes = {
}



