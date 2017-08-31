/*EmployerDashboard
 *
 * This component is to display numerous student cards for each school,
 * where employers can start inviting students to apply to a job posting they listed. 
 *
 * */
// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { StudentCard, Title, LoadingCard } from 'modules/SharedComponents'
import config from 'config'

// ==============THIRD PARTY IMPORTS========================= //
import { DropdownList } from 'react-widgets'
import { Combobox } from 'react-widgets'

// ================CSS IMPORTS============================== //
import { rootComponentContainer, title, margins, overflowFix } from 'sharedStyles/sharedComponentStyles.css'
import { btn, input, pageFiltersAndSearch } from 'sharedStyles/widgets.css'
import { flexibleCardContainer } from 'sharedStyles/cardContainer.css'


import { filterJobTypeContainer, filterTitle, filterJobTypeColumnContainer, filterJobTypeColumn, 
    filterKeywordAndCityContainer, filterKeyWordContainer, searchButton, cancelButton, 
    filterInputField, filterInputFieldContainer, filterJobsOpenButton,
    comboBox } from '../styles/StudentDashboardStyles.css'

import { filtersContainer, comboBoxContainer, comboBoxTitle, leftSideFilterColumn, rightSideFilterColumn,
    filterContainerInner, leftSideInner, onlyShow, filterButtonsContainer, rightInner, filterContainerMainHidden,
    filterContainerMain  } from '../styles/EmployerDashboardStyles.css'


export default function EmployerDashboard ({students, lists, industriesList, programsList,
    handleOpenStudentProfileModal,
    handleCloseStudentProfileModal,
    handleOpenInviteStudentModal,
    handleCloseInviteStudentModal,

    filterConfig,
    filterMenuOpen,
    handleToggleFilterMenu,
    handleDoInviteStudent,
    updateFilterSettings,
    filterStudents
    
}) {
window.lists = lists;
window.students = students;
  return (
    <div className={rootComponentContainer}>

          {
           /* 
            * TITLE 
            */
          }

          <Title 
            titleName="Search students"
            subHeading="Invite students to interviews for jobs that you think they'd be a good fit for."
          />

          {
           /* 
            * Filter Menu open button
            * Click to expand the filter menu 
            */
          }
           
            <div className={filterJobsOpenButton} onClick={handleToggleFilterMenu}>
              {
                !filterMenuOpen
                  ? '+ Filter Students'
                  : '- Filter Students'
                }
            </div>

           {
            /* 
             * FILTER MENU
             */
           }

            <div id="delayed-overflow-hidden" className={ filterMenuOpen ? filterContainerMain : filterContainerMainHidden }>
              <div className={filterContainerInner}>
                <div className={leftSideFilterColumn}>

                  {
                  /* 
                    * Only Show [filters]
                    */
                  }

                  <div className={leftSideInner}>
                  <div className={onlyShow}>Only show: </div>
                    <input 
                      type="checkbox" 
                      name="pt"
                      defaultChecked={filterConfig ? filterConfig.hasCar : false} 
                      onChange={() => {
                        let newFilter = filterConfig;
                        newFilter.hasCar = !filterConfig.hasCar
                        updateFilterSettings(newFilter, false)
                      }}
                    />Students that have a car

                    <div className={filterButtonsContainer}>
                      <button className={searchButton} onClick={filterStudents}>Search</button>
                      <button className={cancelButton} onClick={handleToggleFilterMenu}>Cancel</button>
                    </div>
                  </div>
                </div>
                <div className={rightSideFilterColumn}>
                  <div className={rightInner}>
                    <div className={comboBoxContainer}>
                      <div className={comboBoxTitle}>Program of Study</div>
                        <Combobox
                          className={`${comboBox}`}
                          textField='major_text'
                          valueField='id'
                          filter='contains'
                          data={programsList}
                          onChange={(program) => {
                            let newFilter = filterConfig;
                              newFilter.program = program.id
                              updateFilterSettings(newFilter, false)
                          }}
                          defaultValue={''}
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {
           /* 
            * Student Cards
            */
          }

          <div className={flexibleCardContainer}>

            {
             
              students.length > 0 ? students.filter((student) => {
                var shouldFilterOut = student.filter_show === undefined 
                                        ? false 
                                        : student.filter_show === true 
                                            ? false 
                                            : true;

                if (!shouldFilterOut) return student
              })
              
              
              .map((student) => (
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
                    major={lists.majors[student.major]
                      ? lists.majors[student.major].length > 35 ? lists.majors[student.major].substring(0,35) + "..." : lists.majors[student.major]
                      : lists.majors[student.major]
                    }
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
              )) : ''

            }
          
          
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


