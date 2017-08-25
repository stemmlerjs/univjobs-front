// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { Sidebar } from 'modules/Main'

// ==============OTHER IMPORTS========================= //
import { logout } from 'helpers/auth'
import { clearSelectedJob } from 'redux/modules/mypostings/mypostings'

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

  /*
   * clearSelectedJob
   * 
   * 
   */
  
  MY_POSTINGS_clearSelectedJob (jobType) {
    this.context.store.dispatch(clearSelectedJob(jobType))
  },

  render () {

    return (
      <div>
        { 

         /*
          * If we're working in a Mobile View, we're going to use the fancy
          * mobile slider. Otherwise, we'll use the regular Sidebar for the 
          * Univjobs Desktop app.
          */

          !this.props.isMobile
            ? <Sidebar 
                onLogout={this.handleLogout} 
                isAStudent={this.props.isAStudent}
                profilePicture={this.props.profilePicture}
                page={this.props.page}
                handleClearSelectedJob={this.MY_POSTINGS_clearSelectedJob}
              />
            : ''
        }
        
      </div>
    )
  },
})



export default SidebarContainer
