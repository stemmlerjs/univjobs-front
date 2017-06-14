// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'

// ==================OTHER IMPORTS============================== //
import { authRedirectFilter } from 'config/routes'

// ==============CSS IMPORTS============================= //
import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'

const PageNotFoundContainer = React.createClass({
	contextTypes: {
		router: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired
	},

  componentWillMount() {
      this.props.closeOverlay()
  },


  componentWillUnmount() {

  },

  render () {
    return (
      <div className={pageContainer} >
        <h1>404 - Page Not Found</h1>
    </div>
    )
  },
})

export default PageNotFoundContainer
