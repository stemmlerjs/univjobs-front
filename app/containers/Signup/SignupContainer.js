import React, { PropTypes } from 'react'
import { studentSignupPage, employerSignupPage } from './styles.css'
import { connect } from 'react-redux'
import { Navigation, StudentSignup, EmployerSignup } from 'components'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users/users'
import * as employerActionCreators from 'redux/modules/employerSignup/employerSignup'

/*  Using the spread operator, we combine all of the action creators from users() and employerSignup()
*/

const actionCreators = {
  ...userActionCreators,
  ...employerActionCreators
};

const SignupContainer = React.createClass({
  // NOTE: We cannot list the action listeners acquired through connect as props here,
  // however, we can list the results of mapStateToProps here.

  propTypes: {
    isAStudent: PropTypes.bool.isRequired,
    empFormVisible: PropTypes.bool.isRequired
  },

/**
  * handleSwitchUserType
  *
  *  Intially, we assume the user is a Student (users.isAStudent === true).
  *  This flips the switch on that.
  */

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
              <EmployerSignup showEmployerSignupForm={this.props.showEmployerSignupForm}/>
            </div>
          }
      </div>
    )
  },
})

function mapStateToProps({users, employerSignup}) {
  return {
    isAStudent: users.isAStudent,
    empFormVisible: employerSignup.empFormVisible,
  }
}

/** 
  * mapActionCreatorsToProps
  *
  * This function grabs all of the Action Creators on the object of the first parameter in the bindActionCreators function
  * and makes them available to us through THIS component's props (SignupContainer, this.props). We can then pass these to our child
  * components to use. DON'T MAKE A HABIT of doing this too deeply (drilling prop holes).
  *
  */

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(SignupContainer)
