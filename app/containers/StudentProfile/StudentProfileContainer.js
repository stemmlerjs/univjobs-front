import React, { PropTypes } from 'react'
import { authRedirectFilter } from 'config/routes'

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
      <div>CREATE STUDENT PROFILE</div>
    )
  },
})
export default StudentProfileContainer