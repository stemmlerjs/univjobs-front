import React, { PropTypes } from 'react'
import { pageContainer, cardContainer, card, cardHeaderContainer,
    cardHeaderItem, cardHeaderItemText, cardHeaderItemImage, 
    cardHeaderItemIcon, studentMajor, studentMajorItem, 
    studentMajorData, studentNameTitle, width, schoolNameContainer, 
    schoolTitle, headerDivider, classYearContainer, 
    classYearItem, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader, crop} from '../styles/StudentCard.css'

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

          <div className={headerDivider}></div>

          <div className={schoolNameContainer}>
               <span className={schoolTitle}>Sheridan College</span> 
          </div>
          <div className={classYearContainer}>
            <h3 className={classYearItem}>Bachelor's, Class of 2019</h3>
          </div>
        </div>
    </div>
)

export default StudentCard
