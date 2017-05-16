
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

const StudentDetailsModal = (props) => (

    <div className={studentDetailsModalContainer}>
      <div className={studentDetailsLeftContainer}>

        <div className={stDetailsHeader}>
          <div className={stDetailsImageContainer}>
            <img/>
          </div>
          <div className={stDetailsNameAndSchool}>
            <div className={stDetailsName}></div>
            <div className={stDetailsProgram}></div>
          </div>
        </div>
        <div></div>

      </div>
      <div className={studenDetailsRightContainer}>
      </div>
    </div>
)

export default StudentDetailsModal
