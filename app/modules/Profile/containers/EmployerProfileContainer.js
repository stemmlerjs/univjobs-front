import React, { PropTypes } from 'react'
import { SidebarContainer } from 'modules/Main'
import { EmployerProfile } from 'modules/Profile'
import { pageContainer } from '../styles/EmployerProfileContainerStyles.css'
import { authRedirectFilter } from 'config/routes'

const EmployerProfileContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
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
    authRedirectFilter(config, this.context.store, this.context.router)
      .then(() => {
        if(this.context.store.getState().application.isOverlayActive)
        this.props.closeOverlay()
      })
  },
  render () {
    console.log(this.context)
    return (
      <div className={pageContainer}>
        <SidebarContainer/>
        <EmployerProfile/>
      </div>
    )
  }
})
export default EmployerProfileContainer

