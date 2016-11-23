import React from 'react'
import { Sidebar } from 'modules/Main'
import { logout } from 'helpers/auth'

const SidebarContainer = React.createClass({
  // <Provider> implicitly does .childContextTypes and passes down the store object to all components.
  // We can grab this by specifying the context types we want
  contextTypes: {
    store: React.PropTypes.object,
    router: React.PropTypes.object
  },

  propTypes: {
    isAStudent: React.PropTypes.bool.isRequired
  },

  handleLogout() {
    const { store, router } = this.context;
    logout(store, router)
  },

  render () {
    return (
      <Sidebar onLogout={this.handleLogout} isAStudent={this.props.isAStudent}/>
    )
  },
})



export default SidebarContainer