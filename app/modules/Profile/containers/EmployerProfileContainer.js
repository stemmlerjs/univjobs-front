import React, { PropTypes } from 'react'
import { SidebarContainer } from 'modules/Main'
import { EmployerProfile } from 'modules/Profile'
import { pageContainer } from '../styles/EmployerProfileContainerStyles.css'
import { authRedirectFilter } from 'config/routes'
import * as lists from 'helpers/lists'

const EmployerProfileContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  },
  retrieveAllLists() {
    lists.getIndustries()
    axios.all([
      lists.getIndustries()
    ])
  },
  componentWillMount() {
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
    this.retrieveAllLists()
    authRedirectFilter(config, this.context.store, this.context.router)
      .then(() => {
        if(this.context.store.getState().application.isOverlayActive)
        this.props.closeOverlay()
      })
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

