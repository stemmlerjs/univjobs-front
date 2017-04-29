/*EmployerDashboard
 *
 * This component is to display numerous student cards for each school,
 * where employers can start 
 *
 * */
// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { StudentCard, Title } from 'modules/SharedComponents'

// ==============THIRD PARTY IMPORTS========================= //
import { DropdownList } from 'react-widgets'

// ================CSS IMPORTS============================== //
import { rootComponentContainer, title, margins, overflowFix } from 'sharedStyles/sharedComponentStyles.css'
import { btn, input, pageFiltersAndSearch } from 'sharedStyles/widgets.css'
import { flexibleCardContainer } from 'sharedStyles/cardContainer.css'
import { campusDropdown, gradDateDropdown, filtersDivider} from '../styles/EmployerDashboardStyles.css'


export default function EmployerDashboard ({students}) {
  return (
    <div className={rootComponentContainer}>

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
          <div className={flexibleCardContainer}>
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
          <StudentCard isInviting={true}/>
          <StudentCard isInviting={true}/>
          <StudentCard isInviting={true}/>
          <StudentCard isInviting={true}/>
          <StudentCard isInviting={true}/>
          <StudentCard isInviting={true}/>
          <StudentCard isInviting={true}/>
          <StudentCard isInviting={true}/>
            <div className={overflowFix}></div>
            <div className={overflowFix}></div>
            <div className={overflowFix}></div>
            <div className={overflowFix}></div>
      </div>
    </div>
  )
}

