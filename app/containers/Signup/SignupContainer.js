import React, { PropTypes } from 'react'
import { studentSignupPage, employerSignupPage } from './styles.css'
import { connect } from 'react-redux'
import { Navigation, StudentSignup, EmployerSignup } from 'components'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users/users'

const SignupContainer = React.createClass({
  propTypes: {
    isAStudent: PropTypes.bool.isRequired,
    switchedUserType: PropTypes.func.isRequired
  },

  handleSwitchUserType (e) {
    e.preventDefault();
    this.props.switchedUserType(this.props.isAStudent);
  },

  render () {
    return (
      <div>
        <Navigation onSwitchUserType={this.handleSwitchUserType} isAStudent={this.props.isAStudent} />
          { this.props.isAStudent === true ?
            <div className={studentSignupPage}>
              <StudentSignup/>
            </div>
            :
            <div className={employerSignupPage}>
              <EmployerSignup/>
            </div>
          }
      </div>
    )
  },
})

function mapStateToProps(state) {
  return {
    isAStudent: state.isAStudent
  }
}

function mapDispatchToProps(dispatch) {
  // Here, we bind dispatch to all of our user action creators.
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer)