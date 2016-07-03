import React, { PropTypes } from 'react'
import { studentSignupPage, employerSignupPage } from './styles.css'
import { connect } from 'react-redux'
import { Navigation, StudentSignup, EmployerSignup } from 'components'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as signupFormActionCreators from 'redux/modules/signupForm/signupForm'

/*  Using the spread operator, we combine all of the action creators from users()
*/

const actionCreators = {
  ...userActionCreators,
  ...signupFormActionCreators
}

const SignupContainer = React.createClass({
  // NOTE: We cannot list the action listeners acquired through connect as props here,
  // however, we can list the results of mapStateToProps here.

  propTypes: {
    isAStudent: PropTypes.bool.isRequired,
    studentEmail: PropTypes.string.isRequired,
    studentPassword: PropTypes.string.isRequired,
    studentFormError: PropTypes.string.isRequired,
    employerFirstName: PropTypes.string.isRequired,
    employerLastName: PropTypes.string.isRequired,
    employerCompanyName: PropTypes.string.isRequired,
    employerPhone: PropTypes.string.isRequired,
    employerEmail: PropTypes.string.isRequired,
    employerPassword: PropTypes.string.isRequired,
    employerFormError: PropTypes.string.isRequired
  },

  contextTypes: {
    router: PropTypes.object.isRequired
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
              <StudentSignup  
                emailText={this.props.studentEmail}
                passwordText={this.props.studentPassword}
                updateStudentSignupForm={this.props.updateStudentForm}
                submitSignupForm={this.props.submitStudentSignupForm}
                error={this.props.studentFormError}
                router={this.context.router}/>
            </div>
            :
            <div className={employerSignupPage}>
              <EmployerSignup 
                submitSignupForm={this.props.submitEmployerSignupForm}
                updateEmployerSignupForm={this.props.updateEmployerForm}
                firstNameText={this.props.employerFirstName}
                lastNameText={this.props.employerLastName}
                companyNameText={this.props.employerCompanyName}
                phoneText={this.props.employerPhone}
                emailText={this.props.employerEmail}
                passwordText={this.props.employerPassword}
                error={this.props.employerFormError}
                router={this.context.router}/>
            </div>
          }
      </div>
    )
  },
})

function mapStateToProps({user, signupForm}) {
  console.log(signupForm)
  return {
    isAStudent: user.isAStudent,
    studentEmail: signupForm.studentSignupForm.email ? signupForm.studentSignupForm.email : '',
    studentPassword: signupForm.studentSignupForm.password ? signupForm.studentSignupForm.password : '',
    studentFormError: signupForm.studentSignupForm.error ? signupForm.studentSignupForm.error : '',
    employerFirstName: signupForm.employerSignupForm.firstName ? signupForm.employerSignupForm.firstName : '',
    employerLastName: signupForm.employerSignupForm.lastName ? signupForm.employerSignupForm.lastName : '',
    employerCompanyName: signupForm.employerSignupForm.companyName ? signupForm.employerSignupForm.companyName : '',
    employerPhone: signupForm.employerSignupForm.phone ? signupForm.employerSignupForm.phone : '',
    employerEmail: signupForm.employerSignupForm.email ? signupForm.employerSignupForm.email : '',
    employerPassword: signupForm.employerSignupForm.password ? signupForm.employerSignupForm.password : '',
    employerFormError: signupForm.employerSignupForm.error ? signupForm.employerSignupForm.error : ''
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
