// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import StudentSignup from '../components/StudentSignup'
import EmployerSignup from '../components/EmployerSignup'
import { Navigation, Footer } from 'modules/SharedComponents'

// ==============THIRD PARTY IMPORTS========================= //
import SkyLight from 'react-skylight'
import {toastr} from 'react-redux-toastr'
import ReduxToastr from 'react-redux-toastr'

// =============REDUX & IMPORTS============================= //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as signupFormActionCreators from 'redux/modules/signupForm/signupForm'
import * as loginFormActionCreators from 'redux/modules/loginForm/loginForm'

// ===========OTHER IMPORTS============================== //
import { authRedirectFilter } from 'config/routes'
import { getAccessToken } from 'helpers/auth'
import { detectEnterPress } from 'helpers/utils'

// ================CSS IMPORTS============================== //
import { input, errorMessage, loginBtn, passwordRst } from '../styles/SignupContainerStyles.css'


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
    closeOverlay: PropTypes.func.isRequired,
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
    employerFormError: PropTypes.string.isRequired,
    loginFormEmailText: PropTypes.string.isRequired,
    loginFormPasswordText: PropTypes.string.isRequired,
    loginFormErrorText: PropTypes.string.isRequired
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
  * handleStudentSignup
  *
  *  Passes signup credentials through client-side validation before attempting to
  *  use email and password to create & authenticate to the server.
  *
  * @param (Event) e - the click event
  *
  * TODO: Hide console log in prod
  */
    handleStudentSignup(e) {
        e.preventDefault()
      //  debugger;
        this.props.submitStudentSignupForm(
            this.props.studentEmail,
            this.props.studentPassword
        )
        .then((actionResult) => {
            if(actionResult) {
                this.context.router.replace('/profile/st')
          } 
        }).catch((err) => console.log(err))
    },

/**
  * handleEmployerSignup
  *
  *  Passes signup credentials through client-side validation before attempting to
  *  use email and password to create & authenticate to the server.
  *
  * @param (Event) e - the click event
  * TODO: Hide console log in prod
  */
    handleEmployerSignup(e) {
        e.preventDefault()
        this.props.submitEmployerSignupForm(this.props.employerFirstName, 
                                            this.props.employerLastName, 
                                            this.props.employerCompanyName, 
                                            this.props.employerPhone, 
                                            this.props.employerEmail, 
                                            this.props.employerPassword
        )
        .then((actionResult) => {
            if(actionResult) {
                this.context.router.replace('/profile/em')
          } 
        }).catch((err) => console.log(err))
    },
/**
  * handleLoginAttempt
  *
  *  Passes login credentials through client-side validation before attempting to
  *  use email and password to authenticate to the server.
  *
  * @param (Event) e - the click event
  * TODO: Hide console log in prod
  */


  handleLoginAttempt (e) {
    if(e) e.preventDefault()
    this.props.submitLoginForm(
      this.props.loginFormEmailText,
      this.props.loginFormPasswordText
    )
    .then(({isAStudent, isProfileCompleted, isEmailVerified}) => {
      //TODO: Implement this as a tiny module (function) to put inside of authRedirectionFilter

      console.log("Here in login")
      if(isAStudent && isProfileCompleted && isEmailVerified) {
        // Route to Student Dashboard
        this.context.router.replace('/dashboard/st')

      } else if (isAStudent && (!isProfileCompleted || !isEmailVerified)) {
        // Route to Student Profile
        this.context.router.replace('/profile/st')

      } else if (!isAStudent && isProfileCompleted && isEmailVerified) {
        // Route to employer dashboard
        this.context.router.replace('/categories')

      } else if (!isAStudent && (!isProfileCompleted || !isEmailVerified)) {
        // Route to Employer Profile
        this.context.router.replace('/profile/em')

      }
    })
    .catch((err) => {
      console.log("Could not login", err)
    })
  },

/**
  * componentWillMount
  *
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
      .then(() => {
        if(this.context.store.getState().rootApplication.isOverlayActive)
        this.props.closeOverlay()
      })
  },


  /**
  * submitOnEnter
  *
  * Hooks into the reusable detectEnterPress() function and fires off a submit when
  * enter is pressed while the login modal is open AND email and password are not null
  * AND email or password is focused.
  *
  * @return (void)
  *
  */

  submitOnEnter() {
    if((this.props.loginFormEmailText !== "") && (this.props.loginFormPasswordText !== "")) {
      this.handleLoginAttempt()
    }
  },

  render () {
    return (
      <div>
        <Navigation
          onSwitchUserType={this.handleSwitchUserType}
          isAStudent={this.props.isAStudent}
          onOpenLoginModal={this.openLoginModal}
          logoOnly={false}
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
                name="login[email]"
                onChange={(e) => this.props.updateLoginForm('email', e.target.value)}
                type="text"
                onKeyUp={(e) => detectEnterPress(e, this.submitOnEnter)}
                placeholder="Email"
               />
              <input className={input}
                name="login[password]"
                onChange={(e) => this.props.updateLoginForm('password', e.target.value)}
                type="password"
                onKeyUp={(e) => detectEnterPress(e, this.submitOnEnter)}
                placeholder="Password"
              />
              <div className={passwordRst} onClick={() => {
                this.context.router.push('/password/reset')
              }}>Forgot your password?</div>
            </div>
            <div className={errorMessage}>
              { this.props.loginFormErrorText }
            </div>
              <button className={loginBtn} onClick={this.handleLoginAttempt}>Next</button>
          </SkyLight>

          { this.props.isAStudent === true ?
            <div>
              <StudentSignup
                emailText={this.props.studentEmail}
                passwordText={this.props.studentPassword}
                updateStudentSignupForm={this.props.updateStudentForm}
                submitSignupForm={this.props.submitStudentSignupForm}
                onSubmitSignup={(e) => this.handleStudentSignup(e)}
                error={this.props.studentFormError}
                router={this.context.router}/>
            </div>
            :
            <div>
              <EmployerSignup
                onSubmitSignup={(e) => this.handleEmployerSignup(e)}
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
        <Footer />
        <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            position="top-right"
        />
      </div>
    )
  },
})

// The entire redux store is passed in here,
// Return an object defining which values you want to bind to props
function mapStateToProps({user, signupForm, loginForm}) {
  return {
    isAStudent: user.isAStudent ? true : false,
    isProfileCompleted: user.isProfileCompleted ? true : false,
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
    loginFormEmailText: loginForm.email ? loginForm.email : '',
    loginFormPasswordText: loginForm.password ? loginForm.password : '',
    loginFormErrorText: loginForm.error ? loginForm.error : ''
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

// connect(specify_what_keys_you_want_from_store, wraps_dispatch_around_action_creators)(container)
export default connect(mapStateToProps, mapActionCreatorsToProps)(SignupContainer)
