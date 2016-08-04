import React, { PropTypes } from 'react'
import { SidebarContainer } from 'modules/Main'
import { EmployerProfile } from 'modules/Profile'
import { pageContainer } from '../styles/EmployerProfileContainerStyles.css'
import { authRedirectFilter } from 'config/routes'
import * as lists from 'helpers/lists'
import axios from 'axios'

const EmployerProfileContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  },

  retrieveAllLists() {
    const promise = new Promise((resolve, reject) => {
      axios.all([
        lists.getIndustries()
      ])
      .then((resp) => resolve(resp))
      .catch((resp) => resolve(resp))
    })
    return promise;
  },

  mapListsToProps(lists) {
    const promise = new Promise((resolve, reject) => {
      console.log(lists)
      resolve()
    });

    return promise;
  },

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

    authRedirectFilter(config, this.context.store, this.context.router)
      .then(() => {
        if(this.context.store.getState().application.isOverlayActive)
        this.props.closeOverlay()
      })
  },

  componentWillMount() {
    /*  On page load, we will first get all the required lists for the screen */  
    this.retrieveAllLists()
      .then(this.mapListsToProps)
      .then(this.doRedirectionFilter) 
  },

  render () {
    return (
      <div className={pageContainer}>
        <SidebarContainer/>
        <EmployerProfile/>
      </div>
    )
  }
})

export default EmployerProfileContainer

