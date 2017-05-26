/*Applicants
 *
 * Students who applied to a particular job
 * */
// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'
import config from 'config'

// ==============MADE COMPONENTS========================= //
import { GenericCard, ApplicationModal, APPLICATIONS_CARD_TYPE, StudentCard, Title } from '../../SharedComponents'

// ==============THIRD PARTY IMPORTS========================= //
import { SkyLightStateless } from 'react-skylight'
import { Combobox } from 'react-widgets'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


// ================CSS IMPORTS============================== //
import { rootComponentContainer, margins, title, comboBox } from 'sharedStyles/sharedComponentStyles.css'
import { pageFiltersAndSearch } from 'sharedStyles/widgets.css'
import { flexibleCardContainer } from 'sharedStyles/cardContainer.css'

Applicants.propTypes = {
    //Insert typechecking variables
}


export default function Applicants (props) {
  return (
  <div className={rootComponentContainer}>
    <div className={margins}>

        {/* TITLE */}
        <Title titleName='My applicants'
               subHeading="Hire students who've applied to jobs you've posted">
        </Title>

        {
         /*
          * DROPDOWN
          * 
          * This is a shortcut that we are taking for now. We're just going to implement
          * the ability to switch between jobs with this simple dropdown.
          */
        }
        <div>
          <div>Job Title</div>
          <Combobox
              className={`${comboBox}`}
              textField="title"
              valueField="job_id"
              filter="contains"
              data={props.jobs.filter((job) => {
                return job.active == 1
              })}
              onChange={job => props.changeSelectedJob(job)}
              value={props.currentSelectedJob.job_id}
            />
        </div>

        {
         /*
          * STUDENT / APPLICANT CARDS
          * 
          * When we select a job, display all of the student that applied to this
          * job. This should show all the same student card information on the basic card
          * (more on the modal later).
          *
          * Initially, we should be able to CONNECT with a student or REJECT a student here.
          *
          * After CONNECTing with a student, we are able to either REJECT, CONNECT or HIRE them.
          */
        }
     
        <div className={flexibleCardContainer}>

          {
            props.currentSelectedJob.applicants 
              ? props.currentSelectedJob.applicants.length != 0 
                  ? 
                  
                  props.currentSelectedJob.applicants.filter((applicant) => {

                  {
                   /*
                    * FILTER: We want to filter all of the applicants and make sure not to 
                    * render any cards that have been REJECTED.
                    *
                    * Note: REJECTED cards are still rendered directly after rejecting a student 
                    * so we needed a way to make these disappear without reloading the page. 
                    * @see applicants.hiddenStudents
                    *
                    * After we've filtered through, we map each of the applicants to a <StudentCard/>
                    */
                  }

                    var render = true;

                    props.hiddenStudents.map((hiddenStudent) => {
                      if ((hiddenStudent.studentId == applicant.student_id) && (hiddenStudent.jobId == applicant.job_id)) {
                        render = false;
                      }
                    })

                    return render;
                  })
                  .map((applicant) => (
                    
                      <StudentCard
                        key={applicant.student_id}
                        pictureUrl={config.mediaUrl + 'avatar/' + applicant.photo_url}
                        resumeUrl={config.mediaUrl + 'res/' + applicant.resume_url}
                        name={applicant.user_firstName.substring(0,1).toUpperCase() + applicant.user_firstName.substring(1) + ' ' 
                          + applicant.user_lastName.substring(0,1).toUpperCase() + applicant.user_lastName.substring(1)}
                        funFact={applicant.fun_fact}
                        educationLevel={applicant.edu_level}
                        hasCar={applicant.has_car}
                        hobbies={applicant.hobbies}
                        languages={applicant.languages}
                        clubs={applicant.clubs}
                        sports={applicant.sports}
                        major={applicant.major}
                        gpa={applicant.gpa}
                        gradDate={new Date(applicant.grad_date)}
                        schoolName={applicant.school_name}
                        hometown={applicant.hometown}
                        hobbies={applicant.hobbies}
                        recentCompanyName={applicant.recent_company_name}
                        recentPosition={applicant.recent_company_position}
                        showResume={true}
                        isDashboardCard={false}
                        handleOpenConfirmRejectStudentModal={props.handleOpenConfirmRejectStudentModal}
         	              handleCloseConfirmRejectStudentModal={props.handleCloseConfirmRejectStudentModal}
                        handleOpenStudentProfileAndAnswersModal={props.handleOpenStudentProfileAndAnswersModal}
                        handleCloseStudentProfileAndAnswersModal={props.handleCloseStudentProfileAndAnswersModal}
                        lists={props.lists}
                        studentObj={applicant}
                        state={applicant.state}
                      />
                  ))
                : 'No applicants for this job'
            : ''
          }
        </div>

      </div>
    </div>
   )
}

