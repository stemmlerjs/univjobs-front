import React, { PropTypes } from 'react'
import { SidebarContainer } from 'modules/Main'
import { StudentDashboard } from 'modules/Dashboard'
/*
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import { authRedirectFilter } from 'config/routes'


const actionCreators = {
  ...userActionCreators,
}
*/

const StudentDashboardContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  },

/**
  * handleSwitchUserType
  *
  *  Intially, we assume the user is a Student (users.isAStudent === true).
  *  This flips the switch on that.
  */
  componentWillMount() {
	this.props.closeOverlay()
  },

  render () {
    return (
      <div>
      <SidebarContainer />
       <StudentDashboard />
      </div>
    )
  },
})

export default StudentDashboardContainer
/* The entire redux store is passed in here,
// Return an object defining which values you want to bind to props
function mapStateToProps({user}) {
  return {
	user: user ? user : {}
  }
}
/** 
  * mapActionCreatorsToProps
  *
  * This function grabs all of the Action Creators on the object of the first parameter in the bindActionCreators function
  * and makes them available to us through THIS component's props (SignupContainer, this.props). We can then pass these to our child
  * components to use. DON'T MAKE A HABIT of doing this too deeply (drilling prop holes).
  *
  *
function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

// connect(specify_what_keys_you_want_from_store, wraps_dispatch_around_action_creators)(container)
export default connect(mapStateToProps, mapActionCreatorsToProps)(StudentDashboardContainer)*/
