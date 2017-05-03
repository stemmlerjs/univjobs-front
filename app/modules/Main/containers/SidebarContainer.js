// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { Sidebar, JobSidebar } from 'modules/Main'

// ==============OTHER IMPORTS========================= //
import { logout } from 'helpers/auth'

const SidebarContainer = React.createClass({
  propTypes: {
    isAStudent: React.PropTypes.bool
  },

  // <Provider> implicitly does .childContextTypes and passes down the store object to all components.
  // We can grab this by specifying the context types we want
  contextTypes: {
    store: React.PropTypes.object,
    router: React.PropTypes.object
  },


  handleLogout() {
    /*Note: The destructuring assignment syntax is a JavaScript expression that makes 
     * it possible to extract data from arrays or objects into distinct variables.
     *
     * Ref: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
     * */
    const { store, router } = this.context;
    logout(store, router)
  },

  render () {
    return (
      <div>
        <Sidebar onLogout={this.handleLogout} isAStudent={this.props.isAStudent}/>
        <JobSidebar/>
      </div>
    )
  },
})



export default SidebarContainer
