/*EmployerDashboard
 *
 * This component is to display numerous student cards for each school,
 * where employers can start inviting students to apply to a job posting they listed. 
 *
 * */
// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { StudentCard, Title } from 'modules/SharedComponents'
import config from 'config'

// ==============THIRD PARTY IMPORTS========================= //
import { DropdownList } from 'react-widgets'

// ================CSS IMPORTS============================== //
import { rootComponentContainer, title, margins, overflowFix } from 'sharedStyles/sharedComponentStyles.css'
import { btn, input, pageFiltersAndSearch } from 'sharedStyles/widgets.css'
import { flexibleCardContainer } from 'sharedStyles/cardContainer.css'
import { campusDropdown, gradDateDropdown, filtersDivider} from '../styles/EmployerDashboardStyles.css'



export default function EmployerDashboard ({students, lists,
    handleOpenStudentProfileModal,
    handleCloseStudentProfileModal,
    handleOpenInviteStudentModal,
    handleCloseInviteStudentModal,
    handleDoInviteStudent
}) {
  console.log(lists)
  return (
    <div className={rootComponentContainer}>

          {/* TITLE */}
          <Title 
            titleName="Search students"
            subHeading="Invite students to interviews for jobs that you think they'd be a good fit for."
          />

      {/* FILTERS 
      <div className={pageFiltersAndSearch}>
           <input className={input}
                placeholder="Search students">
            </input>
          
          <DropdownList
            className={campusDropdown}
            textField="email_pref"
            valueField="id"
           />
          
          <div className={filtersDivider}></div>
          
          <DropdownList
            className={gradDateDropdown}
            textField="email_pref"
            valueField="id"
          />
          <button className={btn}>Filter</button>
        </div>
*/}
          {/* MAIN (Cards list) */}
          <div className={flexibleCardContainer}>
  
            { students.map((student) => (
                  <StudentCard 
                    key={student.student_id}
                    name={student.user_firstName.substring(0,1).toUpperCase() + student.user_firstName.substring(1) + ' ' 
                      + student.user_lastName.substring(0,1).toUpperCase() + student.user_lastName.substring(1)}
                    pictureUrl={config.mediaUrl + 'avatar/' + student.photo_url}
                    resumeUrl={config.mediaUrl + 'res/' + student.resume_url}
                    funFact={student.fun_fact}
                    educationLevel={student.edu_level}
                    hasCar={student.has_car}
                    hobbies={student.hobbies}
                    languages={student.languages}
                    clubs={student.clubs}
                    sports={student.sports}
                    major={student.major}
                    gpa={student.gpa}
                    gradDate={new Date(student.grad_date)}
                    schoolName={student.school_name}
                    hometown={student.hometown}
                    hobbies={student.hobbies}
                    recentCompanyName={student.recent_company_name}
                    recentPosition={student.recent_company_position}
                    showResume={false}
                    isDashboardCard={true}
                    handleOpenStudentProfileModal={handleOpenStudentProfileModal}
                    handleCloseStudentProfileModal={handleCloseStudentProfileModal}
                    handleOpenInviteStudentModal={handleOpenInviteStudentModal}
                    handleCloseInviteStudentModal={handleCloseInviteStudentModal}
                    handleDoInviteStudent={handleDoInviteStudent}
                    studentObj={student}
                    lists={lists}
                  />
            ))}
          
          
      </div>
    </div>
  )
}

/*
* TODO:
* when we hook this up to display actual students again,
* we need to do some math and sometimes add a couple of these.
* 
*   <div className={overflowFix}></div>
*
*/


