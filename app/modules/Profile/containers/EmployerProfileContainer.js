
import React, { PropTypes } from 'react'
import { SidebarContainer } from 'modules/Main'
import { EmployerProfile } from 'modules/Profile'
import { pageContainer } from '../styles/EmployerProfileContainerStyles.css'
import { authRedirectFilter } from 'config/routes'
import * as lists from 'helpers/lists'
import axios from 'axios'

// ====== REDUX AND STATE IMPORTS =======
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as profileActionCreators from 'redux/modules/profile/profile'
// ======================================

const actionCreators = {
  ...profileActionCreators,
  ...userActionCreators
}

const EmployerProfileContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  },

 /** retrieveAllLists
  *
  * This function acquires all the required lists from /api/lists/{choice}
  * and resolves it's returned promise object on completion.
  *
  * @return (Promise)
  *
  */

  retrieveAllLists() {
    const promise = new Promise((resolve, reject) => {
      axios.all([
        lists.getIndustries(this.context.store)
      ])
      .then((resp) => resolve(true))
      .catch((resp) => resolve(true))
    })
    return promise;
  },


/** doRedirectionFilter
  *
  * The redirection filter is the process that occurs each time we enter this container.
  * Used in every higher order component and supplied with a config, it ensures that the
  * user is redirected to the appropriate page based on their authentication status and 
  * user type.
  *
  * @return (Promise)
  *
  */

  doRedirectionFilter(){
    const config = {
      failureRedirect: {
        student: '/join',
        employer: '/join'
      },
      restricted: {
        to: 'EMPLOYERS',
        redirectTo: '/profile/st'
      }
    }

    return authRedirectFilter(config, this.context.store, this.context.router)
  },

/** finallyDisableOverlay
  *
  * A handle to the closeOverlay() function passed down from a higher order component.
  * Invoked as the final function on page load.
  */

  finallyDisableOverlay() {
    if(this.context.store.getState().application.isOverlayActive){
      this.props.closeOverlay()
    }
  },

  componentWillMount() {
    /*  On page load, we will first get all the required lists for the screen */  
    this.retrieveAllLists()
      .then(this.doRedirectionFilter) 
      .then(this.finallyDisableOverlay)
  },

  render () {
    return (
      <div className={pageContainer}>
        <SidebarContainer/>
        <EmployerProfile 
          companyName={this.props.companyName}
          industry={this.props.industry}
          industryList={this.props.industryList}
          website={this.props.website}
          description={this.props.description}
          employeeCount={this.props.employeeCount}
          officeAddress={this.props.officeAddress}
          officeCity={this.props.officeCity}
          officePostalCode={this.props.officePostalCode}
          logoUrl={this.props.logoUrl}
          updateProfileField={this.props.updateProfileField}
        />
      </div>
    )
  }
})

function mapStateToProps({user, profile}) {
  return {
    companyName: profile.employerProfile.companyName ? profile.employerProfile.companyName : '',
    industry: profile.employerProfile.industry ? profile.employerProfile.industry : '',
    industryList: profile.lists.industries ? profile.lists.industries : [],
    website: profile.employerProfile.website ? profile.employerProfile.website : '',
    description: profile.employerProfile.description ? profile.employerProfile.description : '',
    employeeCount: profile.employerProfile.employeeCount ? profile.employerProfile.employeeCount : '',
    officeAddress: profile.employerProfile.officeAddress ? profile.employerProfile.officeAddress : '',
    officeCity: profile.employerProfile.officeCity ? profile.employerProfile.officeCity : '',
    officePostalCode: profile.employerProfile.officePostalCode ? profile.employerProfile.officePostalCode : '',
    logoUrl: profile.employerProfile.logoUrl ? profile.employerProfile.logoUrl : ''
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(EmployerProfileContainer)
