
import React, { PropTypes } from 'react' 
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import axios from 'axios' 
import config from 'config'

import { authRedirectFilter } from 'config/routes' 

import { StudentProfile } from 'modules/Profile' 
import { SidebarContainer } from 'modules/Main' 
import { FeedbackForm, PictureCropper } from 'modules/SharedComponents'
import MobileStudentProfilePage1 from '../components/MobileStudentProfilePage1'
import MobileStudentProfilePage2 from '../components/MobileStudentProfilePage2'
import MobileStudentProfilePage3 from '../components/MobileStudentProfilePage3'
import MobileStudentProfilePage4 from '../components/MobileStudentProfilePage4'
import MobileStudentProfilePage5 from '../components/MobileStudentProfilePage5'
import MobileStudentProfilePage6 from '../components/MobileStudentProfilePage6'
import MobileStudentProfilePage7 from '../components/MobileStudentProfilePage7'
import MobileStudentProfilePage8 from '../components/MobileStudentProfilePage8'

import { scrollToY } from 'helpers/utils'

import SkyLight from 'react-skylight'
import Croppie from 'croppie'

// ========= REDUX AND STATE IMPORTS ========== //

import * as userActionCreators from 'redux/modules/user/user'
import * as profileActionCreators from 'redux/modules/profile/profile'
import * as listActionCreators from 'redux/modules/list/list'
import * as feedbackFormActionCreators from 'redux/modules/feedback/feedback'
// ============================================ //

import { pageContainer } from '../styles/StudentProfileContainerStyles.css' 
import { userProfileAdviceTitle, userProfileAdviceBody, cancelBtn, acceptBtn } from 'sharedStyles/sharedComponentStyles.css'

// ============== MESSAGES =================== //
var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

// ========================================== //

const actionCreators = {
    ...listActionCreators,
	...profileActionCreators,
	...userActionCreators,
  ...feedbackFormActionCreators
}

const StudentProfileContainer = React.createClass({
  propTypes: {
      //TODO: Add propTypes here
  },

  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  },

 /** createNewTag
  *
  * This function creates a new tag, not in the data list[sports, clubs].
  * It takes the current value given by the user then creates an object with id and value, and concatenates them
  *
  * @return (Promise)
  :*
  */
   createNewTag(newValue, list, textField, updateProfileFieldName) {
       let pickList = {
          //Master list
          'schoolClubList': this.props.schoolClubList,
          'sportsList': this.props.sportsList,
          //propTypes, pushed to the database
          'schoolClub': this.props.schoolClub,
          'sportsTeam': this.props.sportsTeam

       }

       //Create a new tag array object
       //Temporarily concat new value to the old specified list. 
       //Updated list will show when queried
       let tag = [{ [textField]: newValue }].concat(pickList[updateProfileFieldName])
       
       this.props.updateProfileField(updateProfileFieldName, tag, true)
       
       //Create an action creator to display which list got updated
       this.props.updateTag(list)
       
   },

 /** retrieveAllLists
  *
  * This function acquires all the required lists from /api/lists/{choice}
  * and resolves it's returned promise object on completion.
  *
  * @return (Promise)
  :*
  */

  retrieveAllLists() {
    const promise = new Promise((resolve, reject) => {

      if (this.props.gendersList.length == 0) {
        console.log("[Univjobs]: v1.0 - Getting all static lists.")
        this.props.getAllStaticLists()
      }

        this.props.handleGetLanguages()
        this.props.handleGetSports()
        this.props.handleGetClubs()
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
   * @ return (Promise)
   *
   */
  
  doRedirectionFilter() {
    const config = {
      failureRedirect: {
        student: '/join',	// if not logged in, go here (student) 
        employer: '/join'	// if not logged in, go here (employer)
      },
      restricted: {
        to: 'STUDENTS',			      // students only on this route
        redirectTo: '/profile/em'	// if not an employer, redirect to the student equivalent
      }
    }

     return authRedirectFilter(config, this.context.store, this.context.router)
  },

 /*
  * Prompt User Callback
  * 
  * This callback should be executed when we want to tell the user that
  * they should probably upload a photo and or resume if they want to get better
  * results for applying to jobs. 
  */

  promptUserCallback () {
    this.openUserProfileAdvice()
  },

  continueSaveProfile() {
    this.closeUserProfileAdvice()
    this.handleSubmit(this.props)
  },

  /*
   * handleSubmit
   * 
   * Submit the profile. It must pass through a function that checks to see
   * if all fields are valid first before doing this. If all fields are valid,
   * it will then make the API call to create the profile, otherwise, we will
   * execute the failureCallback.
   * 
   */

  handleSubmit(studentProps) {

  /*
   * First time submitting profile.
   */

   if(!this.props.isProfileCompleted) {

	   this.context.store.dispatch(profileActionCreators.submitProfileFirstTime(0, studentProps, this.props.user,

      /*
       * Success callback
       */

      () => {

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
             * Profile is complete. We know this because we're in the success 
             * callback for profile is complete.
             * 
             * If the email is also verified- then we're done!!!1
             */

            if (this.props.isEmailVerified == 1) {

              this.refs.container.success(
                "W00t w00t.",
                "Profile completed. Now go start applying to jobs!", {
                  timeout: 3000
              });

            } 

            /*
             * Otherwise, student only completed their profile- they still need to verifiy
             * their email.
             * 
             * If the email hasn't been verified yet- that's the last thing that the user needs
             * to do before they can say that they're completed their profile entirely.
             */

            else {

              this.refs.container.success(
                "Check your student email.",
                "Nice! Profile completed. Please verify your email now.", {
                  timeout: 3000
              });

            }

            /*
             * After syncing the front, is_profile_complete = true,
             * we need to do our classic reload but when we come back to
             * the app, we want to be at /dashboard/st
             */

            setTimeout(() => {
              window.location.reload()
              this.context.router.push('/dashboard/st')
            }, 2000)

          })
        )

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
            "Let us know about it, pretty please?",
            "Ah darn. Couldn't save profile.",{
              timeout: 3000
            });
        }

        else {
          this.refs.container.error(
          "Fill those out real quick then try again.",
          "Hold up, there. You're missing some required fields!", {
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
      this.props.userProfileAdvicePresented
    ))

   } 
   
  /*
   * Any other subsequent time submitting profile.
   */

   else {
   	this.context.store.dispatch(profileActionCreators.updateProfile(0, studentProps, this.props.user, this.props.snapshot,
     
     /*
      * Success callback
      */

     () => {
      this.refs.container.success(
        "Nice stuff!",
        "Profile succesfully updated", {
          timeout: 3000
        });

       /*
        * Reload everytime we update the profile.
        * (We only redirect to /dashboard/st if 
        * their email is verified and they are just 
        * completing their profile for the first time).
        * 
        * KS
        */
          
        setTimeout(() => {
          window.location.reload()
        }, 2000)

     },

     /*
      * Failure callback
      */
     
     (error) => {
       this.refs.container.error(
    		error,
    		"Something went kaboom!", {
    		   timeout: 3000
    		});
     }))

    }

   },

   handleButtonToggle(booleanState, buttonName) {
       this.props.handleToggleButton(booleanState, buttonName)
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
            "",
            "Success. We went ahead and sent a new Verify Account email to your student email.", {
              closeButton:true,
              timeOut: 30000,
              extendedTimeOut: 10000
            });

        },

        /*
          * Failure callback
          */

        () => {

          this.refs.container.error(
            "Please try again later or contact us.",
            "Uh oh. Looks like something went wrong trying to resend the Verify Account email.", {
              closeButton:true,
              timeOut: 30000,
              extendedTimeOut: 10000
            });

        }
      )

    }
   },

  /** finallyDisableOverlay
   * 
   * A handle to the closeOverlay() function passed down from a higher order component.
   * Invoked as the final function on page load.
   *
  */

  finallyDisableOverlay() {
  	if(this.context.store.getState().rootApplication.isOverlayActive) {
  	  this.props.closeOverlay()
  	}
  },


  /** componentWillReceiveProps
   *
   * When props comes in, let's do the following:
   * - check for error messages to the display an error message 
   * - check for a message to display a success message  
   */

  componentWillReceiveProps(newProps) {


  },

  /*
   * We're setting default values for some fields because we noticed that
   * they are really too slow to type in the way we're doing.
   * 
   * So we've added onBlur to these fields.
   */

  setDefaultValues () {
    return new Promise((resolve, reject) => {

      if (!window.isMobile) {
        document.getElementById('student_funFact').value = this.props.funFacts
        document.getElementById('student_hometown').value = this.props.hometown
        document.getElementById('student_hobbies').value = this.props.hobbies
        document.getElementById('student_position').value = this.props.position
        document.getElementById('student_companyName').value = this.props.companyName
        document.getElementById('student_personalEmail').value = this.props.personalEmail
        document.getElementById('student_lastName').value = this.props.lastName
        document.getElementById('student_firstName').value = this.props.firstName
      }
      resolve()
    })

  },

  /*
  * openConfirmApplyModal
  *
  * When a student finally clicks Apply, they are presented with this
  * confirmation modal to make sure that the student really wants
  * to submit their application.
  *
  * This pops up overtop of the job app modal.
  */

  openUserProfileAdvice () {
    if (this.refs.userProfileAdvice) {
      this.refs.userProfileAdvice.show()
    }
  },

 /*
  * closeConfirmApplyModal
  *
  * Close the confirm apply modal that pops up overtop of the
  * job app modal.
  */

  closeUserProfileAdvice () {
    this.refs.userProfileAdvice.hide()
  },

  /*
   * componentWillMount
   *
   * When the DOM is loaded, do the following:
   * 1.) Get all lists required
   * 2.) Then, do the redirection filter (if required)
   * 4.) Then, put back snapshot user info into inputs (if user has completed profile)
   * 3.) Then, close the overlay
   *
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
              "You've successfully validated your account. That wasn't so bad, was it?", {
                timeout: 5000
            });

           /*
            * Inform componentWillMount that this is the instance in which we 
            * verified our email
            */

            var verifiedEmailThisInstance = true;

            regularComponentWillMountBehaviour(this, verifiedEmailThisInstance)

          },


          /*
           * Failure Callback, could not verify the account with that token.
           * Maybe it expired or was invalid.
           */
          
          () => {

            this.refs.container.error(
              "Please try again.",
              "Verification link expired or invalid!", {
                closeButton:true,
                timeOut: 30000,
                extendedTimeOut: 10000
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

      function regularComponentWillMountBehaviour (_thisContext, emailVerifiedThisInstance) {
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

                  if (!window.isMobile) {
                    _thisContext.refs.container.info(
                      "Click here to resend the verification email. Thanks!",
                      "Before you can move on, we need you to finish your profile & confirm the email we sent to your student email.", {
                        closeButton:true,
                        timeOut: 30000,
                        extendedTimeOut: 10000
                    });
                  }
                  
                }

              /*
                * B: Just profile completion.
                */

                else if (isProfileCompleted == 0) {
                  if (!window.isMobile) {
                    _thisContext.refs.container.info(
                      "Thanks!",
                      "Before you can move on, we just need you to finish your profile.", {
                      closeButton:true,
                      timeOut: 30000,
                      extendedTimeOut: 10000
                    });
                  }
                }

                /*
                * C: Just email verification.
                */

                else {

                  if (!window.isMobile) {
                    _thisContext.refs.container.info(
                      "Click here to resend the verification email. Thanks!",
                      "Before you can move on, we just need you to confirm the email we sent to your student email.", {
                        closeButton:true,
                        timeOut: 30000,
                        extendedTimeOut: 10000
                    });
                  }

                  
                }

                resolve()
              }

              else {

               /*
                * D: Profile is complete AND Email is verified.
                *
                * Now, if this particular instance of componentWillMount was involved
                * in the completion of the Email Verification, then we want to redirect 
                * the user to the Student Dashboard so that they know what they should do 
                * next.
                *
                * We can tell if this was the instance by consulting a flag emailVerifiedThisInstance. 
                * If it is set to true, then we know that this was the componentWillMount instance in which 
                * we verified the email and the user's profile is now complete overall. We redirect in that
                * scenario.
                */

                if (emailVerifiedThisInstance) {
                  console.log("[Univjobs]: Profile was completely verfied + completed in THIS instance of componentWillMount, redirect.")

                  setTimeout(() => {
                    _thisContext.context.router.push('/dashboard/st')
                    window.location.reload()
                  }, 3000)

                }

               /*
                * Otherwise, continue as usual.
                */

                else {

                  console.log("[Univjobs]: Profile was completed + verified in an earlier instance of componentWillMount, continue.")
                  resolve()

                }

              }

            })
          })
          .then(_thisContext.retrieveAllLists)
          .then(_thisContext.setDefaultValues)
          .then(_thisContext.finallyDisableOverlay)
      }

  },

  componentDidMount() {

  },

 /*
  * showImageSizeTooLargeError
  *
  * Presented on file selection for profile picture.
  * Alerts the user that the image they've selected is too large
  * for the request.
  *
  * Max size: 1MB
  */

  showImageSizeTooLargeError () {
    scrollToY(0, 1500, 'easeInOutQuint');
    this.refs.container.error(
      "Images need to be less than 1MB.",
      "Whoa. That's a big picture. Can you shrink that down a bit?", {
        timeout: 10000,
        closeButton: true
    });
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

  showResumeSizeTooLargeError () {
    scrollToY(0, 1500, 'easeInOutQuint');
    this.refs.container.error(
      "The max size is 2MB.",
      "That resume is a little too hefty for us. Can you try another version?", {
        timeout: 10000,
        closeButton:true
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
        enableOrientation: true
      });

      window.cropperInstance.bind({
        url: newImageToCrop.preview,
      });

    }, 50)
    
  },

  rotatePicture () {
    window.cropperInstance.rotate(90)
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

        this.props.updateProfileField('photo', croppedFile, true)

       
       /*
        * Place a preview of the image on the Student Profile
        * picture div.
        */
        try {
          let dropPhotoDiv = document.getElementById('dropPhotoDiv')
          dropPhotoDiv.style.backgroundImage = `url('${croppedFile.preview}')` // blob
          dropPhotoDiv.style.backgroundSize = "cover"

          /*
          * Hide icon, text and border
          */

          dropPhotoDiv.style.border = "0"
          document.getElementById('fa-user').style.visibility = "hidden"
          document.getElementById('drag-dropPhoto').style.visibility = "hidden"
        } 
        catch (err) {
          console.log(err)
        }

        /*
         * Finally, hide the picture cropper modal.
         */

        this.refs.pictureCropper.hide()
      });

  },

  componentWillUnmount() {

  },

  /*
   * MOBILE_next
   * 
   * In an attempt to compartmentalize some of the logic required for the mobile version
   * of the HTML5 page, this mobile Object will be populated with the various functions that the 
   * mobile view demands.
   */

  MOBILE_next () {

    /*
      * If we're not on the last page, 
      * we're going to have to check for errors before trying to advance.
      */

    this.props.tryAdvanceStudentProfilePage(this.props.mobileViewCurrentPage, this.props, 

       /*
        * Success callback
        * 
        * The only time this is important to us is if we're submitting the profile
        * at the end of this process.
        * When we've successfully completed the profile, then we want to do something 
        * else.
        */

      () => {

        /*
         * SET PROFILE TO COMPLETE
         */

        this.refs.container.success(
        "Great work :) ",
        "Profile completed!!!!1one", {
          timeout: 4000
        });

       /*
        * Reload everytime we update the profile.
        * (We only redirect to /dashboard/st if 
        * their email is verified and they are just 
        * completing their profile for the first time).
        * 
        * KS
        */
          
        setTimeout(() => {
          this.context.router.push('/dashboard/st')
          window.location.reload()
        }, 3000)

      },

      /*
        * Failure Callback
        *
        * This is only important when we're submitting the profile the first time.
        */

      (submitError) => {

        scrollToY(0, 1500, 'easeInOutQuint');

        if (submitError) {
          this.refs.container.error(
            "Please try again a little later or let us know.",
            "Darn. Something went wrong submitting your profile.", {
              timeout: 3000
          });
        }

        else {
          this.refs.container.error(
            "Ya gotta fix some of these fields to continue.",
            "Hold your horses, deputy 🐎", {
              timeout: 5000
          });
        }        

      }
    )
  },

  /*
   * MOBILE_back
   * 
   * In an attempt to compartmentalize some of the logic required for the mobile version
   * of the HTML5 page, this mobile Object will be populated with the various functions that the 
   * mobile view demands.
   */

  MOBILE_back () {
    this.props.pageBack(this.props.mobileViewCurrentPage, true)
  },

  render () {

    return (
      <div className={pageContainer}>

        <SidebarContainer isMobile={this.props.isMobile} isAStudent={this.props.user.isAStudent} 
          profilePicture={typeof this.props.profile.photo == "object" && this.props.profile.photo !== null
            ? this.props.profile.photo.preview
            : config.mediaUrl + '/avatar/' + this.props.profile.photo
          } 
          page={this.props.route.page}
          />

        { 
          /*
           * DESKTOP version or MOBILE version.
           */

          !window.isMobile

            ? <StudentProfile
                emailPreferences={this.props.emailPreferences}
                emailPrefList={this.props.emailPrefList}
                firstName={this.props.firstName}
                lastName={this.props.lastName}
                studentStatus={this.props.studentStatus}
                studentStatusList={this.props.studentStatusList}
                educationLevel={this.props.educationLevel}
                educationLevelList={this.props.educationLevelList}
                school={this.props.school}
                enrollmentDate={this.props.enrollmentDate}
                graduationDate={this.props.graduationDate}
                major={this.props.major}
                majorsList={this.props.majorsList}

                programs={this.props.programs.filter((program) => {
                  if (this.props.schoolId == program.school_id) return program
                })}
                program={this.props.program}
                
                gpa={this.props.gpa}
                personalEmail={this.props.personalEmail}
                gender={this.props.gender}
                gendersList={this.props.gendersList}
                sportsTeam={this.props.sportsTeam}
                sportsList={this.props.sportsList}
                schoolClub={this.props.schoolClub}
                schoolClubList={this.props.schoolClubList}
                languages={this.props.languages}
                languagesList={this.props.languagesList}
                hasCar={this.props.hasCar}
                companyName={this.props.companyName}
                position={this.props.position}
                funFacts={this.props.funFacts ? this.props.funFacts : ''}
                hometown={this.props.hometown}
                hobbies={this.props.hobbies}
                photo={this.props.photo}
                resume={this.props.resume}
                onSubmit={this.handleSubmit}
                updateProfileField={this.props.updateProfileField}
                sportsToggle={this.props.sportsToggle}
                clubsToggle={this.props.clubsToggle}
                languagesToggle={this.props.languagesToggle}
                gpaToggle={this.props.gpaToggle}
                emailToggle={this.props.emailToggle}
                onHandleButtonToggle={this.handleButtonToggle}
                onCreateNewTag={this.createNewTag}
                propsErrorMap={this.props.propsErrorMap}
                isSubmittingForm={this.props.isSubmittingForm}
                snapshot={this.props.snapshot}
                handleShowImageSizeTooLargeError={this.showImageSizeTooLargeError}
                handleShowResumeSizeTooLargeError={this.showResumeSizeTooLargeError}
                handleOpenPictureCropper={this.openPictureCropper}
              />
              
            : this.props.isProfileCompleted == 1 && this.props.isEmailVerified == 0
                ? <MobileStudentProfilePage8 resendEmail={this.resendVerifyAccountEmail}/>
                : (() => {
                    switch(this.props.mobileViewCurrentPage) {
                      case 1:
                        return <MobileStudentProfilePage1
                          hometown={this.props.hometown}
                          firstName={this.props.firstName}
                          lastName={this.props.lastName}
                          gender={this.props.gender}
                          gendersList={this.props.gendersList}
                          languages={this.props.languages}
                          languagesList={this.props.languagesList}
                          propsErrorMap={this.props.propsErrorMap}
                          updateProfileField={this.props.updateProfileField}
                          next={this.MOBILE_next}
                        />
                      case 2:
                        return <MobileStudentProfilePage2
                          studentStatus={this.props.studentStatus}
                          studentStatusList={this.props.studentStatusList}
                          educationLevel={this.props.educationLevel}
                          educationLevelList={this.props.educationLevelList}
                          school={this.props.school}
                          major={this.props.major}
                          majorsList={this.props.majorsList}
                          propsErrorMap={this.props.propsErrorMap}
                          updateProfileField={this.props.updateProfileField}
                          next={this.MOBILE_next}
                          back={this.MOBILE_back}
                        />
                      case 3:
                        return <MobileStudentProfilePage3
                          studentStatus={this.props.studentStatus}
                          enrollmentDate={this.props.enrollmentDate}
                          graduationDate={this.props.graduationDate}
                          gpa={this.props.gpa}
                          propsErrorMap={this.props.propsErrorMap}
                          updateProfileField={this.props.updateProfileField}
                          next={this.MOBILE_next}
                          back={this.MOBILE_back}
                        />
                      case 4:
                        return <MobileStudentProfilePage4
                          companyName={this.props.companyName}
                          position={this.props.position}
                          funFacts={this.props.funFacts ? this.props.funFacts : ''}
                          hasCar={this.props.hasCar}
                          hobbies={this.props.hobbies}
                          propsErrorMap={this.props.propsErrorMap}
                          updateProfileField={this.props.updateProfileField}
                          onCreateNewTag={this.createNewTag}
                          next={this.MOBILE_next}
                          back={this.MOBILE_back}
                        />
                      case 5:
                        return <MobileStudentProfilePage5
                          schoolClub={this.props.schoolClub}
                          schoolClubList={this.props.schoolClubList}
                          sportsTeam={this.props.sportsTeam}
                          sportsList={this.props.sportsList}
                          propsErrorMap={this.props.propsErrorMap}
                          updateProfileField={this.props.updateProfileField}
                          onCreateNewTag={this.createNewTag}
                          next={this.MOBILE_next}
                          back={this.MOBILE_back}
                        />
                      case 6:
                        return <MobileStudentProfilePage6
                          photo={this.props.photo}
                          resume={this.props.resume}
                          propsErrorMap={this.props.propsErrorMap}
                          updateProfileField={this.props.updateProfileField}
                          handleShowImageSizeTooLargeError={this.showImageSizeTooLargeError}
                          handleShowResumeSizeTooLargeError={this.showResumeSizeTooLargeError}
                          handleOpenPictureCropper={this.openPictureCropper}
                          next={this.MOBILE_next}
                          back={this.MOBILE_back}
                        />
                      case 7:
                        return <MobileStudentProfilePage7
                          emailPreferences={this.props.emailPreferences}
                          emailPrefList={this.props.emailPrefList}
                          personalEmail={this.props.personalEmail}
                          propsErrorMap={this.props.propsErrorMap}
                          updateProfileField={this.props.updateProfileField}
                          isSubmittingForm={this.props.isSubmittingForm}
                          next={this.MOBILE_next}
                          back={this.MOBILE_back}
                        />
                      case 8:
                        return <MobileStudentProfilePage8 resendEmail={this.resendVerifyAccountEmail}/>
                      default:
                        return <MobileStudentProfilePage1
                          firstName={this.props.firstName}
                          lastName={this.props.lastName}
                          gender={this.props.gender}
                          gendersList={this.props.gendersList}
                          propsErrorMap={this.props.propsErrorMap}
                          updateProfileField={this.props.updateProfileField}
                          next={this.MOBILE_next}
                        />
                    }
                  })()
        }
        
      	<ToastContainer ref="container"
      	  toastMessageFactory={ToastMessageFactory}
      	  className="toast-top-right"
          onClick={this.resendVerifyAccountEmail}/>

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
                <div className={userProfileAdviceTitle}>Hey! Hold up ✋</div>
                <div className={userProfileAdviceBody}>We just wanted you to know that profiles that have a <span className={userProfileAdviceTitle}>profile picture </span>
                  and a <span className={userProfileAdviceTitle}>resume</span> {"perform better than those that don't. You can still save your profile, we just thought we'd let you know."} </div>
                <br/>
                <div className={userProfileAdviceBody}>What do you wanna do?</div>
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
                  rotate={this.rotatePicture}
                />
              </SkyLight>
            </div>
            
      </div>
    )
  },
})

function mapStateToProps({user, profile, list, feedback}) {
  return {
    user: user ? user : {},
    feedback: feedback ? feedback : {},
    profile: profile.studentProfile ? profile.studentProfile : {},
    snapshot: profile.snapshot ? profile.snapshot : {},
    emailPreferences: profile.studentProfile.emailPreferences ? profile.studentProfile.emailPreferences : 2,  // DEFAULT value (string || number)
    emailPrefList: list.emailPreferencesArray ? list.emailPreferencesArray : [],                      // list of selected value (array)
    firstName: profile.studentProfile.firstName ? profile.studentProfile.firstName : '',
    lastName: profile.studentProfile.lastName ? profile.studentProfile.lastName : '',
    studentStatus: profile.studentProfile.studentStatus ? profile.studentProfile.studentStatus : 1,          // DEFAULT value (String || number)
    studentStatusList: list.studentStatusArray ? list.studentStatusArray : [],                    // list of selected value (array)
    educationLevel: profile.studentProfile.educationLevel ? profile.studentProfile.educationLevel : 1,
    educationLevelList: list.eduLevelsArray ? list.eduLevelsArray : [],
    /**
     * Get students school from snapshot
     * */
    school: profile.studentProfile ? profile.snapshot.name : '',
    enrollmentDate: profile.studentProfile.enrollmentDate ?  profile.studentProfile.enrollmentDate : new Date, 
    graduationDate: profile.studentProfile.graduationDate ? profile.studentProfile.graduationDate : new Date,  

    /*major(value, list)*/
    major: profile.studentProfile.major ? profile.studentProfile.major : '',  
    majorsList: list.majorsArray ? list.majorsArray : [],

    /*gpa(value, boolean)*/
    gpa: profile.studentProfile.gpa ? profile.studentProfile.gpa : '0.00',
    gpaToggle: profile.studentProfile.gpaToggle ? profile.studentProfile.gpaToggle : false,

    /*personalEmail(value, boolean)*/
    personalEmail: profile.studentProfile.personalEmail ? profile.studentProfile.personalEmail : '',
    emailToggle: profile.studentProfile.emailToggle ? profile.studentProfile.emailToggle : false,

    /*gender(value, boolean, list)*/
    gender: profile.studentProfile.gender ? profile.studentProfile.gender : 1,
    gendersList: list.gendersArray ? list.gendersArray : [],

    /*sportsTeam(value, boolean, list)*/
    sportsTeam: profile.studentProfile.sportsTeam ? profile.studentProfile.sportsTeam : [],
    sportsToggle: profile.studentProfile.sportsToggle ? profile.studentProfile.sportsToggle : false,
    sportsList: list.sports ? list.sports : [],

    /*schoolClub(value, boolean, list)*/
    schoolClub: profile.studentProfile.schoolClub ? profile.studentProfile.schoolClub: [], 
    clubsToggle: profile.studentProfile.clubsToggle ? profile.studentProfile.clubsToggle : false,
    schoolClubList: list.schoolClubs ? list.schoolClubs : [],

    /*languages(value, boolean, list)*/
    languages: profile.studentProfile.languages ? profile.studentProfile.languages : [],
    languagesToggle: profile.studentProfile.languagesToggle ? profile.studentProfile.languagesToggle : false,
    languagesList: list.languages ? list.languages : [],

    /*hasCar(value)*/
    hasCar: profile.studentProfile.hasCar ? profile.studentProfile.hasCar : false,

    companyName: profile.studentProfile.companyName ? profile.studentProfile.companyName : '',
    position: profile.studentProfile.position ? profile.studentProfile.position : '',
    funFacts: profile.studentProfile.funFacts ? profile.studentProfile.funFacts : '',
    hometown: profile.studentProfile.hometown ? profile.studentProfile.hometown : '',
    hobbies: profile.studentProfile.hobbies? profile.studentProfile.hobbies: '',
    photo: profile.studentProfile.photo ? profile.studentProfile.photo : '',
    resume: profile.studentProfile.resume ? profile.studentProfile.resume : '',
    isProfileCompleted: profile.isProfileCompleted ? profile.isProfileCompleted : '',

    isProfileComplete: user.isProfileComplete ? user.isProfileComplete : 0,
    isEmailVerified: user.emailVerified ? user.emailVerified : 0,

    propsErrorMap: profile.studentProfile.propsErrorMap ? profile.studentProfile.propsErrorMap : { 
        emailPreferences: false,
        firstName: false,
        lastName: false,
        studentStatus: false,
        educationLevel: false,
        school: false,
        enrollmentDate: false,
        graduationDate: false,
        major: false,
        gpa: false,
        personalEmail: false,
        gender: false,
        sportsTeam: false,
        schoolClub: false,
        languages: false,
        hasCar: false,
        companyName: false,
        position: false,
        funFacts: false,
        hometown: false,
        hobbies: false,
        photo: false,
        resume: false,
        sportsToggle: false,
        clubsToggle: false,
        languagesToggle: false,
        emailToggle: false,
        gpaToggle: false,
    },
    error: profile.error ? profile.error : '',
    programs: list.programs ? list.programs : [],
    program: profile.studentProfile.program ? profile.studentProfile.program : '',
    schoolId: profile.studentProfile.schoolId ? profile.studentProfile.schoolId : '',
    submitSuccess: profile.submitSuccess ? profile.submitSuccess : false,
    isSubmittingForm: profile.isSubmittingForm ? profile.isSubmittingForm : false,
    userProfileAdvicePresented: profile.userProfileAdvicePresented ? profile.userProfileAdvicePresented : false,
    mobileViewCurrentPage: profile.mobileViewCurrentPage ? profile.mobileViewCurrentPage : 1
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(StudentProfileContainer)
