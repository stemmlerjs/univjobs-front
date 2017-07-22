
// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'
import SkyLight from 'react-skylight'
import config from 'config'
import { authRedirectFilter } from 'config/routes'

// ==============THIRD PARTY IMPORTS========================= //
import ReduxToastr from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'
import { CompanyInfoSideBar } from 'modules/SharedComponents'

var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

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
      justCheckAuth: true
    }
     return authRedirectFilter(config, this.context.store, this.context.router)
  },

  componentWillMount() {

    this.doRedirectionFilter()
      .then(() => {

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

            /*
            * If we couldn't find the job details, then 
            * we'll just redirect to /join.
            */

            this.refs.container.error(
              "It may not exist anymore... or maybe it never did! Spooky.",
              "Hmm. We don't know where that job is.", {
                timeout: 4000
            });

            setTimeout(() => {
              this.context.router.push("/join")
            }, 4000)  

          })

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
    return (
      <div>
        <RegularNav/>
        {
          this.props.publicJobView
            ? this.props.publicJobView.job 
              ? <PublicJobView
                  info={this.props.publicJobView.job ? this.props.publicJobView.job : {}}
                  handleOpenEmployerProfileModal={this.props.employerProfileModalOpened}
                  showViewInApp={this.props.isAuthenticated && this.props.isAStudent}
                />
              : ''
            : ''
        }

        {
          this.props.publicJobView
            ? this.props.publicJobView.job 
              ? <Footer/>
              : ''
            : ''
        }
        
        

        {
         /*
          * Metadata
          */
        }

        <meta property="og:url"           content={window.location.href} />
        <meta property="og:type"          content="website" />
        <meta property="og:title"         content={window.document.title} />
        <meta property="og:description"   content={this.props.publicJobView.job ? this.props.publicJobView.job.responsibilities : ''} />

        <ToastContainer ref="container"
              toastMessageFactory={ToastMessageFactory}
              className="toast-top-right" />
        
      </div>
    )
  },
})

function mapStateToProps({ job, dashboard, user }) {
  return {
    publicJobView: job.publicJobView ? job.publicJobView : {},
    employerProfileModal: dashboard.employerProfileModal ? dashboard.employerProfileModal : {},
    isAuthenticated: user.isAuthenticated ? user.isAuthenticated : false,
    isAStudent: user.isAStudent ? user.isAStudent : false
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
