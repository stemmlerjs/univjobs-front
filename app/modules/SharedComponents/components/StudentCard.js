import React, { PropTypes } from 'react'
import { pageContainer, cardContainer, card, cardHeaderContainer,
    cardHeaderItem, cardHeaderItemText, cardHeaderItemImage, 
    cardHeaderItemIcon, studentMajor, studentMajorItem, 
    studentMajorData, studentNameTitle, 
    width, jobTitleContainer, jobTitle, industryTitle, tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader, crop} from '../styles/Card.css'

/*
StudentCard.propTypes = {
  cardType: PropTypes.string.isRequired,
  job: PropTypes.object,
  jobTypes: PropTypes.array,
  industries: PropTypes.array,
  handleCardClick: PropTypes.func.isRequired
}
*/

const StudentCard = () => (
    <div className={cardContainer}>
        <div className={card}>
          <header className={cardHeaderContainer}>
            <div className={cardHeaderItemImage}>
                <img className={crop} src="https://s3.amazonaws.com/univjobs/logo/2016/09/30/Happy+Birthday+Joey+Ramone.jpg" alt="Smiley face" />
            </div>
            <div className={cardHeaderItem}>
                    <div>
                        <h4 className={studentNameTitle}>Charles Javelona</h4>
                        <span className={studentMajor}>
                            <p className={studentMajorItem}><b>Major:</b> Marketing Management</p>
                        </span>
                    </div>
                    <div className={width}></div>
                    <div className={cardHeaderItemIcon}>
                        <i className={"fa fa-refresh fa-2x"} aria-hidden="true"></i>
                        <br/>
                        College<br/>Info
                    </div>
            </div>
          </header>
        </div>
    </div>
)

export default StudentCard
