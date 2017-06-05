// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'
import { Navigation, Footer } from 'modules/SharedComponents'

import { validatePersonalEmail, validateResetPasswords } from 'helpers/utils'
import config from 'config'

import ConfirmPassword from '../components/ConfirmPassword'
import ResetPassword from '../components/ResetPassword'

// ==============THIRD PARTY IMPORTS========================= //

var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as resetActionCreators from 'redux/modules/reset/reset'

// ==============CSS IMPORTS============================= //
import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'

const PasswordResetContainer = React.createClass({

  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  },

  componentWillMount() {

   /*
    * If we're on /password/confirm/:code
    */

    if (this.props.location.pathname.indexOf("/password/confirm") !== -1) {
      const code = this.props.params.code;

     /*
      * If the code is in the route params, this means we're verifying the 
      * code because we're on /password/confirm/:code. Let's run that through.
      */

      if (code !== "") {
        this.props.verifyPasswordResetCode(code,

       /*
        * Success callback
        * 
        * If it was successful, we want to now show the view
        * that allows the user to enter their new password and submit it.
        */
        
        () => {

          this.props.closeOverlay()

        },

       /*
        * Failure callback
        */
        
        (errorStatusCode) => {

         /*
          * If the code is expired for invalid,
          * show a toastr and then redirect to the ResetPassword component so
          * they can start over.
          */
          
          if (errorStatusCode === 404) {

            this.props.closeOverlay()

            this.context.router.push('/password/reset')

            this.refs.container.error(
              "Password reset code invalid or expired. Please resubmit request.",
              "Oh snap.",
              {
                timeout: 3000
            });

          }

          /*
           * If there was some sort of server error, just
           * tell the user to reload the page.
           */

          if (errorStatusCode === 500) {

            this.props.closeOverlay()
          }
          
        })
      } 

     /*
      * No code even provided in the route params
      */

      else {

      }

    }

   /*
    * Otherwise, we're on /password/reset and we should just closeOverlay
    * to render the view.
    */

    else {
      this.props.closeOverlay()
    }
  },

  submitResetRequest () {

   /*
    * Validate email first quickly. 
    * If it's bad, show an error toastr
    */
    
    if (!validatePersonalEmail(this.props.email)) {

      this.refs.container.error(
        "Please enter a valid email address.",
        "Whoa there.",
         {
          timeout: 3000
      });

    }

   /*
    * If it's alright, lets submit.
    */

    else {

      this.props.submitPasswordReset(this.props.email,

     /*
      * Success callback
      */
      
      () => {

        this.refs.container.success(
          "Done!",
          "Password Reset sent.", {
            timeout: 3000
        });

      },

     /*
      * Failure callback
      */
      
      (errorMessage) => {

        this.refs.container.error(
          errorMessage,
          "Whoops.",
          {
            timeout: 3000
        });

      })
    }
  },

  submitNewPassword () {
    const newPassword = this.props.newPassword
    const confirmNewPassword = this.props.confirmNewPassword

    if (validateResetPasswords(newPassword, confirmNewPassword)) {
      
      /*
       * Lets submit the password update request then!
       */

      const code = this.props.params.code;

      this.props.submitPasswordUpdate(code, newPassword,

      /*
       * Success callback.
       * 
       * If we were able to successfully update our password, show a success and take us
       * back to home.
       */
      
      () => {

        this.refs.container.success(
          "Password reset complete. Try logging in now with your new password.",
          "Success!", {
            timeout: 3000
        });

        setTimeout(() => {

          this.context.router.push('/join')

        }, 2000)
        

      },

      /*
       * Failure callback
       */
      
      (errorStatusCode) => {

        /*
         * Some backend error occured
         */

        if (errorStatusCode === 500) {

          this.refs.container.error(
            "Something went wrong on our end. Please try again or contact us if the problem persists.",
            "Oh snap.",
            {
              timeout: 3000
          });

        }

        /*
         * The passcode expired. We have to start over.
         */

        if (errorStatusCode === 401) {

          this.refs.container.error(
            "Password reset code invalid or expired. Please resubmit request.",
            "Oh snap.",
            {
              timeout: 3000
          });

          setTimeout(() => {
            this.context.router.push('/password/reset')
          }, 2000)

        }

      })

    }

    else {

      this.refs.container.error(
        "Needs to be over at least 6 characters and both fields must match.",
        "Check your password.",
        {
          timeout: 3000
      });

    }
  },

  render () {
    console.log(this.props)
    return (
      <div className={pageContainer} >
        <Navigation logoOnly={true}/>

        {
          this.props.location.pathname == "/password/reset"
            ? <ResetPassword 
                handleSubmit={this.submitResetRequest}
                email={this.props.email}
                handleUpdateField={this.props.updateField}
                isSubmitting={this.props.isSubmitting}
                submitSuccess={this.props.submitSuccess}
              />
            : ''
        }

        {
          this.props.location.pathname.indexOf("/password/confirm") !== -1
            ? <ConfirmPassword
                handleSubmitNewPassword={this.submitNewPassword}
                handleUpdateField={this.props.updateField}
                newPassword={this.props.newPassword}
                confirmNewPassword={this.props.confirmNewPassword}
                isVerifying={this.props.isVerifying}
                verifySuccess={this.props.verifySuccess}/>
            : ''
        }

        
	  <ToastContainer ref="container"
        toastMessageFactory={ToastMessageFactory}
        className="toast-top-right" />

        <Footer />
    </div>
    )
  },
})


function mapStateToProps({reset}) {
  return {
	  email: reset.email ? reset.email : '',
    isSubmitting: reset.isSubmitting ? reset.isSubmitting : false,
    submitSuccess: reset.submitSuccess ? reset.submitSuccess : false,
    isVerifying: reset.isVerifying ? reset.isVerifying : false,
    verifySuccess: reset.verifySuccess ? reset.verifySuccess : false,
    newPassword: reset.newPassword ? reset.newPassword : '',
    confirmNewPassword: reset.confirmNewPassword ? reset.confirmNewPassword : ''
  }
}

/**
  * mapActionCreatorsToProps
  *
  * This function grabs all of the Action Creators on the object of the first parameter in the bindActionCreators function
  * and makes them available to us through THIS component's props (SignupContainer, this.props). We can then pass these to our child
  * components to use. DON'T MAKE A HABIT of doing this too deeply (drilling prop holes).
  *
  **/

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators({
    ...resetActionCreators
  }, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(PasswordResetContainer)
