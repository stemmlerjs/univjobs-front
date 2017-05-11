
// ================REACT BUILTINS============================== //

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { cardContainer }from '../styles/StudentCard.css'
import { pageMainJobCards, rotateIcon, applyButton } from 'modules/SharedComponents/styles/StudentCard.css'

// JobCard.propTypes = {
//   cardType: PropTypes.string.isRequired,
//   job: PropTypes.object,
//   jobTypes: PropTypes.array,
//   industries: PropTypes.array,
//   handleCardClick: PropTypes.func.isRequired
// }

export default function JobCard (props) {
  return (
    <div className={cardContainer}>
        <div>{props.title}</div>
        <button onClick={(e) => props.onPinJob(e, props.jobId)} data-tip={props.pinned ? "Unpin job?" : "Pin job?" }>
            <i className={props.pinned ? rotateIcon + " fa fa-thumb-tack fa-lg " + fillIcon : rotateIcon + " fa fa-thumb-tack fa-lg"} 
                aria-hidden="true" />
            <ReactTooltip place="top" type="dark" effect="float"/>
        </button>

        <button  onClick={(e) => props.handleCardClick(e, props)}>APPLY</button>
                            
                            </div>
  )
}
