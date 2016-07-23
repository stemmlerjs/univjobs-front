import React, { PropTypes } from 'react'
import { SidebarContainer } from 'containers'
import { EmployerProfile } from 'components'
import { pageContainer } from './styles.css'
import { authRedirectFilter } from 'config/routes'

const EmployerProfileContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  },
  componentWillMount() {
    const config = {
      failureRedirect: '/',
      restricted: {
        to: 'EMPLOYERS',
        redirectTo: '/profile/st'
      }
    }
    authRedirectFilter(config, this.context.store, this.context.router)
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

