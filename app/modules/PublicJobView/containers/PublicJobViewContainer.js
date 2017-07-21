
// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'
import SkyLight from 'react-skylight'
import config from 'config'
import { authRedirectFilter } from 'config/routes'

// ==============THIRD PARTY IMPORTS========================= //
import ReduxToastr from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'
import { CompanyInfoSideBar } from 'modules/SharedComponents'

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as publicJobViewActionCreators from 'redux/modules/job/publicJobView'
import employerProfileModal from 'redux/modules/dashboard/employerProfileModal'

import PublicJobView from '../components/PublicJobView'
import { Footer, RegularNav } from 'modules/SharedComponents'

// ========== CSS ============================================== //
import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'
import { overlayKill } from '../styles/PublicJobView.css'

const PublicJobViewContainer = React.createClass({
  propTypes: {
    user: PropTypes.object,
  },

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
    	  student: '/join',	// if not logged in, go here (student)
    	  employer: '/join'      // if not logged in, go here (employer)
      },
      restricted: {
        to: 'STUDENTS',		 // STUDENTS only on this route
	    redirectTo: '/dashboard/em'   // if not an EMPLOYER, redirect to the employer equivalent
		 			 // This might change to employer categories
      }
    }
     return authRedirectFilter(config, this.context.store, this.context.router)
  },

  componentWillMount() {

    /*
     * First, we get the jobId from the route params if it's even there.
     * If it's not there, then we're at /posting (we have to handle this)
     * in another <Route path="/posting">
     */

    const jobId = this.props.routeParams.jobId;

    this.props.fetchPublicJobDetails(jobId,
    
    /*
     * Success callback
     */

      () => {

       /*
        * Change metadata for this webpage.
        */

        document.title = `${this.props.publicJobView.job.title} - Univjobs`;

        this.props.closeOverlay()

      },

    /*
     * Failure callback
     */
      
      () => {

        this.props.closeOverlay()

      })
	  
  },

  /*
   * handleCompanyInfoSidebarStateChange
   *
   * We need this function to update Redux when the modal is closed so it doesn't
   * open up again anytime new props are loaded in and this.props.employerProfileModal.isOpen
   * still === true.
   */

  handleCompanyInfoSidebarStateChange (state) {
    if (!state.isOpen) {
      this.props.employerProfileModalClosed()
    }
  },

  render () {
    console.log(this.props)
    return (
      <div>
        <RegularNav/>
        {
         /*
          * CompanyInfoSideBar
          *
          * When a student clicks on Company Info on a Job Card, the Company Info
          * sidebar component opens up.
          *
          * @class .overlayKill works with the 
          * react burger menu. 
          *
          * When it's not active, we set the width of the overlay to 0%
          * because it usually takes up the entire screen.
          */
        }
        <div className={this.props.employerProfileModal.isOpen ? '' : overlayKill}>
          <CompanyInfoSideBar
            onStateChange={ this.handleCompanyInfoSidebarStateChange }
            isOpen={this.props.employerProfileModal.isOpen}
            employerName={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.employerName : null}
            industry={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.industry : null}
            logoUrl={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.logoUrl : null}
            headquarters={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.headquarters : null}
            website={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.website : null}
            numEmployees={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.numEmployees : null}
            aboutSectionExpanded={this.props.employerProfileModal.isAboutSectionOpen ? this.props.employerProfileModal.isAboutSectionOpen : false}
            handleToggleAboutSection={this.props.toggleAboutSection}
            about={this.props.employerProfileModal.employerInfo ? this.props.employerProfileModal.employerInfo.about : null}/>
        </div>
        <PublicJobView
          info={this.props.publicJobView.job ? this.props.publicJobView.job : {}}
          handleOpenEmployerProfileModal={this.props.employerProfileModalOpened}
        />
        <Footer/>

        {
         /*
          * Metadata
          */
        }

        <meta property="og:url"           content={window.location.href} />
        <meta property="og:type"          content="website" />
        <meta property="og:title"         content={window.document.title} />
        <meta property="og:description"   content={this.props.publicJobView.job.responsibilities} />
        <meta property="og:image"         content={"https://univjobs.ca/assets/images/front/univjobs-logo-1024.png"} />

        
      </div>
    )
  },
})

function mapStateToProps({ job, dashboard }) {
  return {
    publicJobView: job.publicJobView ? job.publicJobView : {},
    employerProfileModal: dashboard.employerProfileModal ? dashboard.employerProfileModal : {}
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators({
    ...userActionCreators,
    ...publicJobViewActionCreators,
    ...employerProfileModal.actionCreators
  }, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(PublicJobViewContainer)
