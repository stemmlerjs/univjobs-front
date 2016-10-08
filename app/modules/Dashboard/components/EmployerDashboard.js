import React, { PropTypes } from 'react'
import { rootComponentContainer, btn } from 'sharedStyles/styles.css'
import { DropdownList } from 'react-widgets'
import { pageContainer, pageHeaderSection, pageTitle, title, pageFiltersAndSearch, pageMainStudentCards, input,
  campusDropdown, gradDateDropdown, filtersDivider, margins, overflowFix } from '../styles/EmployerDashboardStyles.css'
import { StudentCard } from 'modules/Dashboard'

export default function EmployerDashboard (props) {
  return (
    <div className={rootComponentContainer}>
      <div className={margins}>
        <div className={pageHeaderSection}>

          {/* TITLE */}
          <div className={pageTitle}>
            <h1 className={title}>SEARCH STUDENTS</h1>
          </div>

          {/* FILTERS */}
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

          {/* MAIN (Cards list) */}
          <div className={pageMainStudentCards}>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
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