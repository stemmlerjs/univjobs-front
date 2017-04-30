// ================REACT BUILTINS============================== //
import React, { PropTypes } from 'react'

// ================CSS IMPORTS============================== //
import { pageContainer, cardContainer, card, cardHeader,
	jobTitleContainer, jobTitle, industryTitle,
	tagContainer, tagList, tagElement,
	companyContainer, companyInfoContainer, companyTitle,
	applyButton, cardModalContainer, cardModalHeader, jobModalTitle,
	jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader, crop} from '../styles/Card.css'

GenericCard.propTypes = {
  cardType: PropTypes.string.isRequired,
  job: PropTypes.object,
  jobTypes: PropTypes.array,
  industries: PropTypes.array,
  handleCardClick: PropTypes.func.isRequired
}

/**
  * GenericCard
  *
  * The GenericCard component is used among many different places in our application. The tentative list of
  * places that make use of the GenericCard are:
  *
  *   > MyApplications
  *   > MyPinnedJobs
  *   > Dashboard
  *
  * The required proptypes for each one differ slightly so this is something that needs to taken into consideration.
  * -> Use the cardType prop to differentiate between rendering decisions.
  */

export const APPLICATIONS_CARD_TYPE = 'APPLICATIONS_CARD'
export const DASHBOARD_CARD_TYPE = 'DASHBOARD_CARD_TYPE'
export const PINNED_JOBS_CARD_TYPE = 'PINNED_JOBS'

export default function GenericCard({ cardType, job, jobTypes, industries, profile, handleCardClick, children }) {
    debugger
  return (
    <div className={cardContainer}>
      {(() => {
        switch(cardType) {
          case DASHBOARD_CARD_TYPE:

            {/* ================================================================= */}
            {/* ======================= DASHBOARD CARD ========================== */}
            {/* ================================================================= */}

            return <div onClick={(e) => handleCardClick(e, job)}>
                <div className={card}>
                  <header className={cardHeader}>
                    {/*JOB TYPES*/}
                    <span>
                      <p>{ jobTypes.length > 0 ? jobTypes[job.type].description : '' }</p>
                    </span>
                  </header>

                  {/* JOB TITLE */}
                  <div className={jobTitleContainer}>
                    <h2 className={jobTitle}>{job ? job.title : ''}</h2>
                  </div>

                  {/* TODO: Point to industry  */}
                  <h3 className={industryTitle}>
                  { industries.length > 0 ? industries[profile.snapshot.employer.industry].industry_text : '' }</h3>

                  {/* TAGS */}
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
                        <div className={crop}>
                          <img src="https://s3.amazonaws.com/univjobs/logo/2016/09/30/Happy+Birthday+Joey+Ramone.jpg" alt="Smiley face" />
                        </div>
                      </li>

                      <li>
                        <ul className={companyInfoContainer}>
                          <li>
                            <h4 className={companyTitle}>{ job ? profile.snapshot.employer.company_name : ''}</h4>
                          </li>

                          <li>
                            <a href={ job ? profile.snapshot.employer.website : ''} target="_blank">{profile.snapshot.employer.description}</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                { children }

              </div>
            </div>
          case APPLICATIONS_CARD_TYPE:

            {/* =================================================================== */}
            {/* ======================= APPLICATIONS JOB CARD ===================== */}
            {/* =================================================================== */}

            return <div onClick={(e) => handleCardClick(e, job)}>
                <div className={card}>
                  <header className={cardHeader}>
                    {/*JOB TYPES*/}
                    <span>
                      <p>{ jobTypes > 0 ? jobTypes[job.type].jobtype : ''}</p>
                    </span>
                  </header>

                  {/* JOB TITLE */}
                  <div className={jobTitleContainer}>
                    <h2 className={jobTitle}>{job ? job.title : ''}</h2>
                  </div>

                  {/* TODO: Point to industry  */}
                  <h3 className={industryTitle}>{ industries.length > 0 ? industries[job.type].industry : ''}</h3>

                  {/* TAGS */}
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
                            <h4 className={companyTitle}>{ job ? job.business.company_name : ''}</h4>
                          </li>

                          <li>
                            <a href={ job ? job.business.website : ''} target="_blank">Company Info</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                { children }

              </div>
            </div>
          case PINNED_JOBS_CARD_TYPE:

            {/* =================================================================== */}
            {/* ======================= PINNED JOBS CARD ========================== */}
            {/* =================================================================== */}

            return <div onClick={(e) => handleCardClick(e, job)}>
                <div className={card}>
                  <header className={cardHeader}>
                    {/*JOB TYPES*/}
                    <span>
                      <p>{ jobTypes > 0 ? jobTypes[job.type].jobtype : ''}</p>
                    </span>
                  </header>

                  {/* JOB TITLE */}
                  <div className={jobTitleContainer}>
                    <h2 className={jobTitle}>{job ? job.title : ''}</h2>
                  </div>

                  {/* TODO: Point to industry  */}
                  <h3 className={industryTitle}>
                  { industries > 0 ? industries[job.business.industry].industry : ''}</h3>

                  {/* TAGS */}
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
                        <div className={crop}>
                          <img src="https://s3.amazonaws.com/univjobs/logo/2016/09/30/Happy+Birthday+Joey+Ramone.jpg" alt="Smiley face" />
                        </div>
                      </li>

                      <li>
                        <ul className={companyInfoContainer}>
                          <li>
                            <h4 className={companyTitle}>{ job ? job.business.company_name : ''}</h4>
                          </li>

                          <li>
                            <a href={ job ? job.business.website : ''} target="_blank">{job.business.description}</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                { children }

              </div>
            </div>
          default:
            return <div>NO SWAG</div>
        }
      })()}
    </div>
  )
}
