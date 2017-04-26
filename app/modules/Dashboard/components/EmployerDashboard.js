import React, { PropTypes } from 'react'
import { DropdownList } from 'react-widgets'
import { StudentCard, Title } from 'modules/SharedComponents'
import { rootComponentContainer, btn } from 'sharedStyles/styles.css'
import { container } from 'sharedStyles/cardContainer.css'
import { pageContainer, pageHeaderSection, pageTitle, title, pageFiltersAndSearch, pageMainStudentCards, input,
  campusDropdown, gradDateDropdown, filtersDivider, margins, overflowFix } from '../styles/EmployerDashboardStyles.css'


export default function EmployerDashboard ({students}) {
  return (
    <div className={rootComponentContainer}>
        <div className={pageHeaderSection}>

          {/* TITLE */}
          <Title 
            titleName="SEARCH STUDENTS"
            subHeading="In the future, you can invite students to apply to the jobs you posted."
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
          <div className={container}>
          {/*
            {students.map((student) => (
              <StudentCard 
                key={student.user.email} 
                belongsToClubs={student.clubs}
                educationLevel={student.edu_level}
                funFact={student.fun_fact}
                GPA={student.GPA}
                hasCar={student.has_car}
                hobbies={student.hobbies}
                name={student.user.first_name}
                major={student.major}
                pastJob={student.position}
                photo={student.photo}
                school={student.school.name}
                sports={student.sports}
              />
            ))}
*/}
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
            <div className={overflowFix}></div>
            <div className={overflowFix}></div>
            <div className={overflowFix}></div>
            <div className={overflowFix}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

