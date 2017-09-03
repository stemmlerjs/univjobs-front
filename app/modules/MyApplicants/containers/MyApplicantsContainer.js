
import React, { Component, PropTypes } from 'react'
import { SidebarContainer } from 'modules/Main'

import config from 'config'
import SkyLight from 'react-skylight'

import MyApplicantsDashboard from '../components/MyApplicantsDashboard'
import NewApplicants from '../components/NewApplicants'

var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as jobActionCreators from 'redux/modules/job/job'
import * as listActionCreators from 'redux/modules/list/list'

import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'
import { authRedirectFilter } from 'config/routes'


const jobs = [
  {
    "job_id":11,
    "posted_by":4,
    "title":"Social Machine",
    "type":2,
    "paid":1,
    "start_date":"2017-07-12T00:00:00.000Z",
    "responsibilities": "We are currently looking for a full stack Software Developer to join our Windsor team. This is a role for someone who likes to build end-to-end systems, take on whatever responsibilities are available and have an impact on the business as a whole. Our ideal candidate is well-rounded and has a thirst for continuous learning and high attention to detail.",
    "qualification":"Proficiency with LAMP(Linux, Apache, MySQL, PHP) Proficiency with Javascript & JQUERY Experience with MVC Experience with Wordpress Experience with Database administration Experience with Object-Oriented programming languages HTML/CSS experience an asset Education : Computer Science, Software Engineering, or a related technical degree or diploma  Experience : 3+ years experience",
    "compensation":"$18.00 to $25.55 /hour",
    "max_applicants":33,
    "remote_work":1,
    "location":"100 city centre, mississauga",
    "desired_skills":"lkjsdfl",
    "active":0,
    "verified":1,
    "createdAt":"2017-07-12T19:37:00.000Z",
    "updatedAt":"2017-08-09T01:01:16.000Z",
    "num_positions":1,
    "applicants": [{
      name: "Khalil Stemmler",
      student_id: 2,
      state: 'INITIAL'
    },{
      name: "Jacob LeMackker",
      student_id: 3,
      state: 'INITIAL'
    },{
      name: "Jennifer Read",
      student_id: 4,
      state: 'INITIAL'
    }]
  },{"job_id":13,"posted_by":4,"title":"Full Stack Web Developer","type":7,"paid":0,"start_date":"2017-08-17T00:00:00.000Z","responsibilities":"Do stuff","qualification":"Hlkansdlkn\n10 years HTML\n10 years CSS","compensation":"15/hr","max_applicants":20,"remote_work":1,"location":null,"desired_skills":"Photoshop and shit","active":0,"verified":1,"createdAt":"2017-07-12T19:37:00.000Z","updatedAt":"2017-08-09T01:01:16.000Z","num_positions":1},{"job_id":14,"posted_by":4,"title":"Social Media","type":7,"paid":0,"start_date":"2017-08-23T00:00:00.000Z","responsibilities":"asd","qualification":"asd","compensation":"asd","max_applicants":25,"remote_work":1,"location":null,"desired_skills":"asd","active":0,"verified":0,"createdAt":"2017-07-12T19:37:00.000Z","updatedAt":"2017-08-09T01:01:16.000Z","num_positions":1},{"job_id":15,"posted_by":4,"title":"Part time job","type":6,"paid":0,"start_date":"2017-08-23T00:00:00.000Z","responsibilities":"Work closely with the other members of the development team to design and code efficient and effective responsive web applications.\nTest and debug web applications.\nCommunicate effectively with clients and team members to resolve issues.\nMaintain and modify existing applications.\nMaintain version control using SVN.\nCommunicate your progress and any items that may create delays against plan.\nCreate clear and concise documentation for all aspects of the design and deployment of web-based applications.\nProvide technical assistance to production personnel, content authors, publishers, clients, and/or vendors/service providers.\nProduce accurate and timely estimates of development effort.\nActively participate in team meetings and offer ideas and recommendations for design improvement.\nConstantly seek to develop yourself by maintaining a high awareness of existing and emerging technologies and keeping abreast of market developments.\nPerform other duties as assigned.","qualification":"College Diploma in a relevant subject required or an equivalent combination of education and experience.\nAt least 3 years of direct work experience on web production and development initiatives.\nAt least 2 years of Java experience. Spring framework experience a definite asset.\nStrong experience with HTML5, CSS3, JSP, JavaScript and JQuery.\nExperience with other web development platforms and languages, (particularly Ajax, PHP, Drupal, MySQL, and XML) are desirable.\nSolid understanding of the web application development process, web architectures and user-centric design.\nStrong grasp of cross-browser compatibility issues and debugging including mobile/responsive environments.\nDemonstrated experience building web sites of increasing complexity. Specific experience with e-commerce is desirable.\nBasic working knowledge of web servers, with Apache and Tomcat preferred.\nBasic working knowledge of database-driven web site design.\nEffective written and verbal communication skills.\nSelf-motivated, able to work independently and as part of a team.\nAbility to work on several projects at once\nAbility to prioritize and self-manage to deadlines.\nStrong customer service focus.","compensation":"$19 / hr","max_applicants":25,"remote_work":0,"location":"100 city Centre, Mississauga","desired_skills":"HTML, CSS","active":0,"verified":1,"createdAt":"2017-07-12T19:37:00.000Z","updatedAt":"2017-08-09T01:01:16.000Z","num_positions":1},{"job_id":16,"posted_by":4,"title":"Props Yolo","type":1,"paid":0,"start_date":"2017-09-02T00:00:00.000Z","responsibilities":"Changed","qualification":"Changed stuff","compensation":"Twees","max_applicants":22,"remote_work":1,"location":"64 Echo Villa Avenue, Brantford ON","desired_skills":"Changed","active":0,"verified":1,"createdAt":"2017-07-12T19:37:00.000Z","updatedAt":"2017-08-09T01:01:16.000Z","num_positions":10}]


const selectedJob = {
    "job_id":11,
    "posted_by":4,
    "title":"Social Machine",
    "type":2,
    "paid":1,
    "start_date":"2017-07-12T00:00:00.000Z",
    "responsibilities": "We are currently looking for a full stack Software Developer to join our Windsor team. This is a role for someone who likes to build end-to-end systems, take on whatever responsibilities are available and have an impact on the business as a whole. Our ideal candidate is well-rounded and has a thirst for continuous learning and high attention to detail.",
    "qualification":"Proficiency with LAMP(Linux, Apache, MySQL, PHP) Proficiency with Javascript & JQUERY Experience with MVC Experience with Wordpress Experience with Database administration Experience with Object-Oriented programming languages HTML/CSS experience an asset Education : Computer Science, Software Engineering, or a related technical degree or diploma  Experience : 3+ years experience",
    "compensation":"$18.00 to $25.55 /hour",
    "max_applicants":33,
    "remote_work":1,
    "location":"100 city centre, mississauga",
    "desired_skills":"lkjsdfl",
    "active":0,
    "verified":1,
    "createdAt":"2017-07-12T19:37:00.000Z",
    "updatedAt":"2017-08-09T01:01:16.000Z",
    "num_positions":1,
    "applicants": [{
      name: "Khalil Stemmler",
      student_id: 2,
      state: 'INITIAL'
    },{
      name: "Jacob LeMackker",
      student_id: 3,
      state: 'INITIAL'
    },{
      name: "Jennifer Read",
      student_id: 4,
      state: 'INITIAL'
    }]
  }

const MyApplicantsContainer = React.createClass({
	contextTypes: {
		router: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired
  },
  
  /** doRedirectionFilter
   *
   * The redirection filter is the process that occurs each time we enter this container.
   * Used in every higher order component and supplied with a config, it ensures that the
   * user is redirected to the appropriate page based on their authentication status and
   * user type.
   *
   * @ return (Promise)
   *
   */

  doRedirectionFilter() {
    const config = {
      failureRedirect: {
    	  student: '/join',	            // if not logged in, go here (student)
    	  employer: '/join'             // if not logged in, go here (employer)
      },
      restricted: {
        to: 'EMPLOYERS',		          // STUDENTS only on this route
	      redirectTo: '/dashboard/st'   // if not an EMPLOYER, redirect to the student equivalent
		 			                            // This might change to employer categories
      }
    }
     return authRedirectFilter(config, this.context.store, this.context.router)
  },

  componentWillMount() {

    // var currentJobId = null

    // /*
    //  * Check if a job id was preset in the route parameters.
    //  */

    // if (this.props.route.path.indexOf(':jobId') !== -1) {
    //   currentJobId = this.props.params.jobId;
    // }

    /*

    this.props.page == "applicants-dash"
            ? <MyApplicantsDashboard jobs={jobs} selectedJob={{}}/>
            :
    */

    this.doRedirectionFilter()
      //.then(this.props.getAllJobsMyPostings(currentJobId, this.getPageType()))
      .then(this.props.handleGetIndustries)
      .then(this.props.handleGetJobTypes)
      .then(this.props.closeOverlay)
  },

  componentDidMount () {

    try {
      // We want to hide the drift widget when the student profile thingy is open.
      drift.on('ready', () => {
        drift.api.widget.hide();
      })
    }

    catch (e) {
      console.log(e)
    }

  },

  render () {
    return (
      <div className={pageContainer} >
        <SidebarContainer isMobile={this.props.isMobile} isAStudent={false} 
          page={this.props.route.page}
          profilePicture={config.mediaUrl + this.props.profile.employerProfile.logoUrl}
        />

        {
          (() => {
            switch (this.props.route.page) {
              case "applicants-dash":
                return <MyApplicantsDashboard 
                        jobs={jobs} 
                        selectedJob={selectedJob} 
                        page={this.props.route.page}/>
              case "applicants-new":
                return <NewApplicants 
                        jobs={jobs} 
                        selectedJob={selectedJob} 
                        page={this.props.route.page}/>
            }
          })()
        }
        
        <ToastContainer ref="container"
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right" />
        
    </div>
    )
  },
})

/* The entire redux store is passed in here,
// Return an object defining which values you want to bind to props
//
// @params ({user}) contains BaseUser & Employer attributes
// */

function mapStateToProps({user, job, list, profile, myapplicants}) {
  return {
	  user: user ? user : {},
    job: job ? job.employerJobs.jobs : [],
    profile: profile ? profile : {},
    industryList: list.industries ? list.industries : [],
    jobTypes: list.jobTypes ? list.jobTypes : []
  }
}

/**
  * mapActionCreatorsToProps
  *
  * This function grabs all of the Action Creators on the object of the first parameter in the bindActionCreators function
  * and makes them available to us through THIS component's props (SignupContainer, this.props). We can then pass these to our child
  * components to use. DON'T MAKE A HABIT of doing this too deeply (drilling prop holes).
  *
  **/

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators({
    ...jobActionCreators,
    ...listActionCreators,
    ...userActionCreators
  }, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(MyApplicantsContainer)
