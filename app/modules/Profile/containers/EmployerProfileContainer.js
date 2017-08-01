
import React, { PropTypes } from 'react'
import { authRedirectFilter } from 'config/routes'
import { SidebarContainer } from 'modules/Main'
import { EmployerProfile } from 'modules/Profile'
import axios from 'axios'
import * as lists from 'helpers/lists'
import { Title, PictureCropper } from 'modules/SharedComponents'

import Croppie from 'croppie'
import config from 'config'

// ====== REDUX AND STATE IMPORTS =======
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as profileActionCreators from 'redux/modules/profile/profile'
import * as listActionCreators from 'redux/modules/list/list'

import SkyLight from 'react-skylight'
import { userProfileAdviceTitle, userProfileAdviceBody, cancelBtn, acceptBtn } from 'sharedStyles/sharedComponentStyles.css'

// ============= MESSAGES ===============
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
// ======================================


// =============== OTHER ================

var beingDraggedOver = false;

import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'

const actionCreators = {
  ...listActionCreators,
  ...profileActionCreators,
  ...userActionCreators
}

const EmployerProfileContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  },

 /** retrieveAllLists
  *
  * This function acquires all the required lists from /api/lists/{choice}
  * and resolves it's returned promise object on completion.
  *
  * @return (Promise)
  *
  */

  retrieveAllLists() {
    const promise = new Promise((resolve, reject) => {
      if (this.props.industryList.length == 0) {
        console.log("[Univjobs]: v1.0 - Getting all static lists.")
        this.props.getAllStaticLists()
      }

        this.props.handleGetIndustries()
          .then((resp) => resolve(true))
          .catch((resp) => resolve(true))
    })
      return promise
  },


/** doRedirectionFilter
  *
  * The redirection filter is the process that occurs each time we enter this container.
  * Used in every higher order component and supplied with a config, it ensures that the
  * user is redirected to the appropriate page based on their authentication status and
  * user type.
  *
  * @return (Promise)
  *
  */

  doRedirectionFilter(){
    const config = {
      failureRedirect: {
        student: '/join',         // if not logged in, go here (student)
        employer: '/join'         // if not logged in, go here (employer)
      },
      restricted: {
        to: 'EMPLOYERS',          // employers only on this route
        redirectTo: '/profile/st' // if not an employer, redirect to the student equivalent
      }
    }

    return authRedirectFilter(config, this.context.store, this.context.router)
  },

/** finallyDisableOverlay
  *
  * A handle to the closeOverlay() function passed down from a higher order component.
  * Invoked as the final function on page load.
  */

  finallyDisableOverlay() {
    if(this.context.store.getState().rootApplication.isOverlayActive){
      this.props.closeOverlay()
    }
  },

  /*
  * componentWillReceiveProps
  *
  * When props come in, lets do the following:
  * - check for error messages to display an error message
  * - check for a success message to display a success message
  *
  * @param (Object) newProps
  */

  componentWillReceiveProps(newProps) {
    let error = newProps.error;
    let submitSuccess = newProps.submitSuccess;
  },

  /*
  * componentWillMount
  *
  * When the actual DOM is loaded, lets get all the lists required
  * then do the redirection filter (if required) and then
  * close the overlay
  *
  * @param (Object) newProps
  */

  componentWillMount() {

    /*
      * If the user is here now from clicking the Verify Account email link 
      * and we need to try to verify their account, let's get the token and do
      * that. 
      *
      * The url at this point should look like: profile/st/token/:token
      */

      var emailConfirmationToken = this.props.params.token

      if (emailConfirmationToken !== undefined && emailConfirmationToken !== "") {

        this.props.attemptCompleteVerifyAccount(emailConfirmationToken,


          /*
           * Success Callback, account has been verified!
           */
        
          () => {

            this.refs.container.success(
              "Thank you!",
              "You've successfully validated your account.", {
                timeout: 5000
            });

            regularComponentWillMountBehaviour(this)

          },


          /*
           * Failure Callback, could not verify the account with that token.
           * Maybe it expired or was invalid.
           */
          
          () => {

            this.refs.container.error(
              "Please try again.",
              "Verification link expired or invalid!", {
                timeout: 5000
            });

            regularComponentWillMountBehaviour(this)
            
          })

      }

     /*
      * Just a regular visit to the profile page, continue as usual.
      */

      else {
        regularComponentWillMountBehaviour(this)
      }

     // ########################################################################## //

     /*
      * regularComponentWillMountBehaviour
      *
      * We created this regularComponentWillMountBehaviour function so that after
      * we attempt to complete the user account validation process (if a token exists)
      * in the URL, we can continue as usual.
      */

      function regularComponentWillMountBehaviour (_thisContext) {

        _thisContext.doRedirectionFilter()

          /*
          * If the profile is not completed, we can show a toastr.
          * If the profile IS completed, we just advance.
          */

          .then(({isProfileCompleted, isEmailVerified}) => {
            return new Promise((resolve, reject) => {
              console.log(isProfileCompleted, isEmailVerified)
              
              if (isProfileCompleted == 0 || !isEmailVerified) {

              /*
                * A: Both
                */

                if (isProfileCompleted == 0 && !isEmailVerified) {
                  _thisContext.refs.container.info(
                    "You can click here to resend the verification email. Thanks!",
                    "Before you can move on, we need you to finish your profile & confirm the email we sent you.", {
                      timeout: 3000
                  });
                }

              /*
                * B: Just profile completion.
                */

                else if (isProfileCompleted == 0) {
                  _thisContext.refs.container.info(
                    "Thanks!",
                    "Before you can move on, we just need you to finish your profile.", {
                      timeout: 3000
                  });
                }

                /*
                * C: Just email verification.
                */

                else {
                  _thisContext.refs.container.info(
                    "You can click here to resend the verification email. Thanks!",
                    "Before you can move on, we just need you to confirm the email we sent you.", {
                      timeout: 3000
                  });
                }

                resolve()
              }

              else {
                console.log("profile complete, continue")
                resolve()
              }

            })
          })
          .then(_thisContext.retrieveAllLists())
          .then(_thisContext.finallyDisableOverlay)

      }

  },

   /**
    * resendVerifyAccountEmail
    *
    * If the user clicks on the notification that's lets them know that they can't advance
    * any further, we want to ask to resend the verification email to our email. 
    */

   resendVerifyAccountEmail () {
     if (!this.props.user.emailVerified) {

      this.props.resendVerifyAccountEmail(

        /*
          * Success callback
          *
          * In this case, we're now able to move throughout the rest of the application.
          */

        () => {
          
          this.refs.container.success(
            "Almost done!",
            "Success. We went ahead and sent a new Verify Account email to you. Check your email.", {
              timeout: 3000
            });

        },

        /*
          * Failure callback
          */

        () => {

          this.refs.container.error(
            "Please try again later or contact us.",
            "Uh oh. Looks like something went wrong trying to resend the Verify Account email.", {
              timeout: 3000
            });

        }
      )

    }
   },

   continueSaveProfile () {
     this.closeUserProfileAdvice()
      this.handleSubmit(this.props)
   },

   openUserProfileAdvice () {
     this.refs.userProfileAdvice.show()
   },

   closeUserProfileAdvice () {
     this.refs.userProfileAdvice.hide()
   },

  handleSubmit(empProps) {
    // If Profile is NOT completed, do /PUT. All fields must be populated and valid.
    if(!this.props.isProfileCompleted) {
      this.context.store.dispatch(
        profileActionCreators.submitProfileFirstTime(1, empProps, this.props.user,
        
        /*
         * Success Callback
         */

        () => {
          this.refs.container.success(
            "Woohoo :)",
            "Profile successfully updated!", {
            timeOut: 3000

          });


          /*
          * Now, we want to actually update the redux state so
          * that the client is in sync with the back and knows that
          * our profile is complete.
          * 
          * This will allow us to move to different parts of the app 
          * now.
          */

          this.context.store.dispatch(
            userActionCreators.setProfileCompleteThenReloadToDashboard(() => {

              /*
              * After syncing the front, is_profile_complete = true,
              * we need to do our classic reload but when we come back to
              * the app, we want to be at /dashboard/st
              */

              setTimeout(() => {
                window.location.reload()
                this.context.router.push('/dashboard/em')
              }, 2000)

            })
          )

        //   this.context.store.dispatch(userActionCreators.setProfileCompleted())

        //  /* Promise that checks all conditions must be true in order to reroute to dashboard automatically
        //   * */
          
        //   this.onHandleReload(this.props.user.isProfileCompleted, 
        //                     this.props.user.emailVerified).then((message) =>{
        //                         message == true ? this.context.router.push('/dashboard/em') : null
        //                     })
        },

        /*
         * Failure Callback
         */
        
        (error) => {

          /*
          * We can get two different types of errors.
          * HTTP ERROR or INVALID FIELDS. 
          * 
          * Either way, we need to show a toastr to let the user know that they
          * need to fix this.
          */

          if (error == "HTTP ERROR") {
            this.refs.container.error(
              "Please try again later.",
              "We've encountered an issue saving your profile.",{
                timeout: 3000
              });
          }

          else {
            this.refs.container.error(
            "Please fill those out and re-submit.",
            "You're missing some required fields!", {
              timeout: 3000
            });
          }

        },
        
       /*
        * Prompt User Callback
        * 
        * This callback should be executed when we want to tell the user that
        * they should probably upload a photo and or resume if they want to get better
        * results for applying to jobs. 
        */

        this.openUserProfileAdvice,
        this.props.userProfileAdvicePresented,
        )
      )
    } 
    
    else {
      // If Profile is completed already, do /PATCH. All fields must be populated and valid.
      this.context.store.dispatch(
        profileActionCreators.updateProfile(1, empProps, this.props.user, this.props.snapshot,
        
        /*
         * Success Callback
         */

        () => {

          this.refs.container.success(
            "Looking good :)",
            "Profile successfully updated!", {
            timeOut: 3000
          });

           /*NOTE: router.push may not be the best solution. Will check to see if this is the ideal solution*/
           setTimeout(() => {
             window.location.reload()
           }, 2000)

        },

        /*
         * Failure Callback
         */
        
        (error) => {

          this.refs.container.error(
            error,
            "Something went wrong while trying to submit", {
            timeOut: 3000
          });

        })
      )
      console.log("Profile already completed, lets patch this")
    }
  },

  /*onHandleReload
   *
   *
  * @param (boolean) isProfileCompleted
  * @param (boolean) emailVerified 
   * */
   onHandleReload (isProfileCompleted, emailVerified) {
          //Pass on isProfileCompleted && emailVerified to a function that:
            //checks to see if both vars are true
            //if they are:
                //push to new url dashboard
            //otherwise, just reload the page
        return new Promise((resolve, reject) => {
          if(isProfileCompleted && emailVerified) {
              //Setwindow reload and reroute
              setTimeout(() => {
                    window.location.reload()
                    resolve(true)
              }, 1000)
                
            } else {
              setTimeout(() => {
                    window.location.reload()
                    reject(false)
              }, 1000)
            
            }
        })

   },

  /*
  * onDragOver
  * 
  * On the drag over of the profile picture, we conditionally style it to smooth it out.
  */

  onDragOver () {
    if (!beingDraggedOver) {
      beingDraggedOver = true;
      document.getElementById('dropPhotoDiv').classList.add('profilePictureDragDrop')
    }
  },

  /*
  * onDragLeave
  * 
  * On the drag over of the profile picture, we conditionally style it to smooth it out.
  */

  onDragLeave () {
    beingDraggedOver = false;
    document.getElementById('dropPhotoDiv').classList.remove('profilePictureDragDrop')
  },

 /*
  * showImageSizeTooLargeError
  *
  * Presented on file selection for profile picture.
  * Alerts the user that the image they've selected is too large
  * for the request.
  *
  * Max size: 2MB
  */

  showImageSizeTooLargeError () {
    this.refs.container.error(
      "Max image size is 2MB. Sorry about that.",
      "Looks great, but that image is a little too large.", {
        timeout: 3000
    });
  },


  /*
  * openPictureCropper
  *
  * Opens a modal with the image to crop on it.
  */

  openPictureCropper (newImageToCrop) {

    /*
     * Open the modal's overlay
     */

    this.refs.pictureCropper.show()

    /*
     * Initialize Croppie. Paste 
     * the image from the client onto the 
     * cropper so that they can crop the image.
     */

    setTimeout(() => {

      var el = document.getElementById('cropper');
      window.cropperInstance = new Croppie(el, {
        viewport: { width: 250, height: 250 },
        boundary: { width: 250, height: 250 },
        showZoomer: false,
        enableResize: false,
        enableOrientation: false
      });

      window.cropperInstance.bind({
        url: newImageToCrop.preview,
      });

    }, 50)
    
  },

  /*
   * cropAndContinueWithImage
   * 
   * Called after showing the pictureCropper modal with the
   * cropped image inside of it.
   */

  cropAndAppendImage() {

   /*
    * Get the current cropped result of 
    * the image.
    */

    window.cropperInstance.result('blob')

     /*
      * Append the cropped blob to props for update / save.
      */

      .then((blob) => {

       /*
        * Create a file object. Normally we don't really have to do
        * this but because our app currenly expects this type of
        * object to float through multiple different components,
        * lets replicate exactly what it's used to seeing.
        *
        * We NEED to include the type of the file because our backend
        * only accepts images.
        *
        * TODO: let the user know ahead of time if they've selected a bad
        * image file type.
        */
        
        var type = blob.type
        type = type.substring(type.indexOf("/") + 1)

        var croppedFile = new File([blob], 
          "newphoto_" + new Date().toDateString() + "." + type,
          {
            type: blob.type
          });

       /*
        * Important: create the preview attribute and append it to
        * the file object (apparently it doesnt create this) by
        * default.
        */

        var preview = URL.createObjectURL(blob)
        croppedFile.preview = preview;

        this.props.updateProfileField('logoUrl', croppedFile, false)
       
       /*
        * Place a preview of the image on the Student Profile
        * picture div.
        */

        let dropPhotoDiv = document.getElementById('dropPhotoDiv')
        dropPhotoDiv.style.backgroundImage = `url('${croppedFile.preview}')` // blob
        dropPhotoDiv.style.backgroundSize = "cover"

        /*
         * Hide icon, text and border
         */

        dropPhotoDiv.style.border = "0"
        document.getElementById('fa-camera').style.visibility = "hidden"
        document.getElementById('drag-drop').style.visibility = "hidden"

        /*
         * Finally, hide the picture cropper modal.
         */

        this.refs.pictureCropper.hide()
      });

  },

  render () {
    return (
      <div className={pageContainer}>
        <SidebarContainer 
          isMobile={this.props.isMobile}
          isAStudent={false} 
          logoUrl={this.props.logoUrl}
          profilePicture={typeof this.props.profile.logoUrl == "object" && this.props.profile.logoUrl !== null
            ? this.props.profile.logoUrl.preview
            : config.mediaUrl + this.props.profile.logoUrl
          }
        />
        <Title 
            titleName="My business profile"
            subHeading=""/>
        <EmployerProfile
          companyName={this.props.companyName}
          industry={this.props.industry}
          industryList={this.props.industryList}
          website={this.props.website}
          description={this.props.description}
          employeeCount={this.props.employeeCount}
          officeAddress={this.props.officeAddress}
          officeCity={this.props.officeCity}
          officePostalCode={this.props.officePostalCode}
          logoUrl={this.props.logoUrl}
          updateProfileField={this.props.updateProfileField}
          onSubmit={this.handleSubmit}
          submitErrorsExist={this.props.submitErrorsExist}
          profileErrorsMap={this.props.profileErrorsMap}
          email={this.props.user.email}
          firstName={this.props.user.firstName}
          lastName={this.props.user.lastName}
          dateJoined={new Date(this.props.user.dateJoined)}
          mobile={Number(this.props.user.mobile)}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          isSubmittingForm={this.props.isSubmittingForm}
          handleShowImageSizeTooLargeError={this.showImageSizeTooLargeError}
          handleOpenPictureCropper={this.openPictureCropper}
        />
        <ToastContainer ref="container"
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right"
          onClick={this.resendVerifyAccountEmail} />


          {
            /*
              * ========================================
              *           userProfileAdvice
              * ========================================
              *
              * This is the main modal for this screen.
              * It's purpose is to allow the student to see
              * the details for a job and apply to the job
              * after filling in any answers to questions if necessary.
              */
            }
            <div id="user-profile-advice-wrapper">
              <SkyLight ref="userProfileAdvice">
                <div className={userProfileAdviceTitle}>Hey! Just a suggestion ✋</div>
                <div className={userProfileAdviceBody}>Did you know that profiles with a <span className={userProfileAdviceTitle}>profile picture </span>
                  {"perform better than those that don't? You can still save your profile, we just thought we'd let you know."} </div>
                <br/>
                <div className={userProfileAdviceBody}>What do you want to do?</div>
                <div>
                  <button className={acceptBtn} onClick={this.continueSaveProfile}>Save profile</button>
                  <button className={cancelBtn} onClick={this.closeUserProfileAdvice}>Cancel</button>
                </div>
              </SkyLight>
            </div>


            {
             /*
              * ========================================
              *           pictureCropper
              * ========================================
              *
              * This is the modal that will contain the picture and crop it.
              */
            }
            <div id="cropper-container-wrapper">
              <SkyLight ref="pictureCropper">
                <PictureCropper 
                  onDoneCrop={this.cropAndAppendImage}
                />
              </SkyLight>
            </div>

      </div>
    )
  }
})

function mapStateToProps({user, profile, list}) {
  return {
    user: user ? user : {},
    profile: profile.employerProfile ? profile.employerProfile : {},
    snapshot: profile.snapshot ? profile.snapshot : {},
    companyName: profile.employerProfile.companyName ? profile.employerProfile.companyName : '',
    industry: profile.employerProfile.industry ? profile.employerProfile.industry : '',
    industryList: list.industriesArray ? list.industriesArray : [],
    website: profile.employerProfile.website ? profile.employerProfile.website : '',
    description: profile.employerProfile.description ? profile.employerProfile.description : '',
    employeeCount: profile.employerProfile.employeeCount ? profile.employerProfile.employeeCount : '',
    officeAddress: profile.employerProfile.officeAddress ? profile.employerProfile.officeAddress : '',
    officeCity: profile.employerProfile.officeCity ? profile.employerProfile.officeCity : '',
    officePostalCode: profile.employerProfile.officePostalCode ? profile.employerProfile.officePostalCode : '',
    logoUrl: profile.employerProfile.logoUrl ? profile.employerProfile.logoUrl : '',
    isProfileCompleted: profile.isProfileCompleted ? profile.isProfileCompleted : '',
    submitErrorsExist: profile.submitErrorsExist ? profile.submitErrorsExist : false,
    profileErrorsMap: profile.employerProfile.propsErrorMap ? profile.employerProfile.propsErrorMap : {
      companyName: false,
      industry: false,
      logoUrl: false,
      website: false,
      description: false,
      employeeCount: false,
      officeAddress: false,
      officeCity: false,
      officePostalCode: false
    },
    error: profile.error ? profile.error : '',
    submitSuccess: profile.submitSuccess ? profile.submitSuccess : false,
    isSubmittingForm: profile.isSubmittingForm ? profile.isSubmittingForm : false,
    openUserProfileAdvice: profile.openUserProfileAdvice ? profile.openUserProfileAdvice : false,
    userProfileAdvicePresented: profile.userProfileAdvicePresented ? profile.userProfileAdvicePresented : false
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(EmployerProfileContainer)
