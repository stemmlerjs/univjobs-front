import React, { PropTypes } from 'react'
import { authRedirectFilter } from 'config/routes'
import { StudentProfile } from 'components'
import { SidebarContainer } from 'containers'
import { pageContainer } from './styles.css'

const StudentProfileContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  },
  componentWillMount() {
    const config = {
      failureRedirect: '/',
      restricted: {
        to: 'STUDENTS',
        redirectTo: '/profile/em'
      }
    }
    authRedirectFilter(config, this.context.store, this.context.router)
  },
  render () {
    return (
      <div className={pageContainer}>
        <SidebarContainer/>
        <StudentProfile/>
      </div>
    )
  },
})
export default StudentProfileContainer