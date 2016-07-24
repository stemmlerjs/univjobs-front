import React, { PropTypes } from 'react'
import { studentSignupPage, employerSignupPage, input, errorMessage, loginBtn } from './styles.css'
import { connect } from 'react-redux'
import { Navigation, StudentSignup, EmployerSignup } from 'components'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as signupFormActionCreators from 'redux/modules/signupForm/signupForm'
import * as loginFormActionCreators from 'redux/modules/loginForm/loginForm'
import { authRedirectFilter } from 'config/routes'
import SkyLight from 'react-skylight'

/*  Using the spread operator, we combine all of the action creators from users()
*/

const styles = {
  overlayStyles: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    zIndex: 99,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  dialogStyles: {
    // Overriden styles
    marginLeft: '0px',
    marginTop: '0px',

    // Custom Styles
    width: '330px',
    height: '330px',
    zIndex: '100',
    padding: '2px',
    borderRadius: '2px',
    boxShadow: 'rgba(0, 0, 0, 0.137255) 0px 0px 4px, rgba(0, 0, 0, 0.278431) 0px 4px 8px',
    fontSize: '20px',
    textAlign: 'center',
    display: 'block',
    backgroundColor: 'rgb(255, 255, 255)',
    position: 'fixed',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    top: '50%'
  }
};
    

const actionCreators = {
  ...userActionCreators,
  ...signupFormActionCreators,
  ...loginFormActionCreators
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
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  },

/**
  * handleSwitchUserType
  *
  *  Intially, we assume the user is a Student (users.isAStudent === true).
  *  This flips the switch on that.
  */

  handleSwitchUserType (e) {
    e.preventDefault()
    this.props.switchedUserType(this.props.isAStudent)
  },

/**
  * openLoginModal
  *
  *  Opens the Login modal. Can be triggered on either Student or Employer view.
  *  Function is passed to the Navigation component as Props
  *
  * @param (Event) e - the click event
  */

  openLoginModal (e) {
    e.preventDefault()
    this.refs.loginModal.show()
  },

/**
  * handleLoginAttempt
  *
  *  Passes login credentials through client-side validation before attempting to
  *  use email and password to authenticate to the server.
  *
  * @param (Event) e - the click event
  */


  handleLoginAttempt (e) {
    e.preventDefault(),
    console.log('aids')
  },

/**
  * componentWillMount
  *
  *  Opens the Login modal. Can be triggered on either Student or Employer view.
  *  Function is passed to the Navigation component as Props
  */

  componentWillMount() {
    const config = {
      successRedirect: {
        student: '/profile/st',
        employer: '/profile/em'
      },
      failureRedirect: null,
      restricted: null
    }
    authRedirectFilter(config, this.context.store, this.context.router)
  },

  render () {
    console.log(this.props)
    return (
      <div>
        <Navigation 
          onSwitchUserType={this.handleSwitchUserType} 
          isAStudent={this.props.isAStudent} 
          onOpenLoginModal={this.openLoginModal}
        />

        <SkyLight 
            overlayStyles={styles.overlayStyles} 
            dialogStyles={styles.dialogStyles}
            closeButtonStyle={styles.closeButtonStyle}
            hideOnOverlayClicked 
            ref="loginModal" 
            title="Log in">
            <div>
              <input className={input} 
                onChange={(e) => this.props.updateLoginForm('email', e.target.value)}
                type="text" 
                placeholder="Email"/>
              <input className={input} 
                onChange={(e) => this.props.updateLoginForm('password', e.target.value)}
                type="password" 
                placeholder="Password"/>
            </div>
            <div className={errorMessage}>
              { this.props.loginFormErrorText }
            </div>
          <button className={loginBtn} onClick={this.handleLoginAttempt}>Next</button>
          </SkyLight>

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

function mapStateToProps({user, signupForm, loginForm}) {
  console.log(loginForm)
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
    employerFormError: signupForm.employerSignupForm.error ? signupForm.employerSignupForm.error : '',
    loginFormErrorText: loginForm.error ? signupForm.error : '',
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
