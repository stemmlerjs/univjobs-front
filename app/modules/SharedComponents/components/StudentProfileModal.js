
/* 
 * StudentCard
 * 
 * This components is to display the card from students for employers to hire or invite
 *
 * NOTE: This might be the same as Application Generic Card
 * TODO: Check if the Application Generic Card is the same
 * 
 */

// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

import config from 'config'
import ReactTooltip from 'react-tooltip'

import { studentProfileModalContainer, studentProfileLeftContainer, stProfileHeader, stProfileImageContainer,
  stProfileNameAndSchool, stProfileName, stProfileProgram, studenProfileRightContainer, stProfileGrad, itemIcon, experienceHobbiesEtc,
  listItemContainer } from '../styles/StudentProfileModal.css'

const StudentProfileModal = ({pictureUrl, name, major, sportsString, schoolName, hasCar, clubsString, gradDate, lists}) => (

    <div className={studentProfileModalContainer}>
      <div className={studentProfileLeftContainer}>

        {
         /*
          * Header Section
          */
        }
        <div className={stProfileHeader}>
          <div className={stProfileImageContainer}>
            <img src={pictureUrl}/>
          </div>
          <div className={stProfileNameAndSchool}>
            <div className={stProfileName}>{name}</div>
            <div className={stProfileProgram}>{lists.majors[major]}</div>
            <div className={stProfileGrad}>{schoolName} {gradDate.getFullYear()}</div>
          </div>
        </div>

        {
         /*
          * Hobbies, job experience, etc
          */
        }
        <div className={experienceHobbiesEtc}>
          { hasCar == 1
              ? <div className={listItemContainer}>
                  <ReactTooltip delayHide={100} delayShow={100} place="bottom" effect="float"/>
                  <img data-tip={'Transportation availability'} className={itemIcon} src={`${config.assetUrl}components/cards/student/actions/a/has_car_active_24px.svg`}/>
                  <div>Daily access to a vehicle</div>
                </div>
              : ''
          }
          { sportsString !== ""
              ? <div className={listItemContainer}>
                  <ReactTooltip delayHide={100} delayShow={100} place="bottom" effect="float"/>
                  <img data-tip={'Sports'} className={itemIcon} src={`${config.assetUrl}components/cards/student/actions/a/sports_active_24px.svg`}/>
                  <div>{sportsString}</div>
                </div>
              : ''
          }
          { clubsString !== ""
              ? <div className={listItemContainer}>
                  <ReactTooltip delayHide={100} delayShow={100} place="bottom" effect="float"/>
                  <img data-tip={'Clubs'} className={itemIcon} src={`${config.assetUrl}components/cards/student/actions/a/clubs_active_24px.svg`}/>
                  <div>{clubsString}</div>
                </div>
              : ''
          }
        </div>
      </div>


      <div className={studenProfileRightContainer}>
      </div>
    </div>
)

export default StudentProfileModal
