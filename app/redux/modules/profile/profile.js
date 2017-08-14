
import { employerProfilePUT, employerProfilePATCH, validateEmployerProfileFields,
  studentProfilePUT, studentProfilePATCH, validateStudentProfileFields,
  compareToSnapshot, getUserInfo, extractLanguageId,
  extractClubsObject, extractSportsObject, mobileProfileHelper } from 'helpers/profile'
import { toISO, hasCarBoolean, scrollToY } from 'helpers/utils'
import profileAdviceModal from './profileAdviceModal'

// =======================================================
// ==================== ACTIONS ==========================
// =======================================================


// ********** Base form actions **************

const UPDATE_PROFILE_FIELD = 'PROFILE.UPDATE_PROFILE_FIELD'

const TOGGLE_BUTTON = 'PROFILE.TOGGLE_BUTTON'

const UPDATE_TAG = 'PROFILE.UPDATE_TAG'

const SAVING_PROFILE_INFO = 'PROFILE.SAVING_PROFILE_INFO'
const SAVED_PROFILE_INFO_SUCCESS = 'PROFILE.SAVED_PROFILE_INFO_SUCCESS'
const SAVED_PROFILE_INFO_FAILURE = 'PROFILE.SAVED_PROFILE_INFO_FAILURE'

const FETCHING_PROFILE_INFO = 'PROFILE.FETCHING_INFO'
const FETCHED_PROFILE_INFO_SUCCESS = 'PROFILE.FETCHED_INFO_SUCCESS'
const FETCHED_PROFILE_INFO_FAILURE = 'PROFILE.FETCHED_INFO_FAILURE'

const PROFILE_ADVICE_PRESENTED = 'PROFILE_ADVICE_PRESENTED'

const MOBILE_TRY_ADVANCE_STUDENT_PROFILE_NEXT_PAGE = 'MOBILE_TRY_ADVANCE_STUDENT_PROFILE_NEXT_PAGE'
const MOBILE_STUDENT_PROFILE_NEXT_PAGE = 'MOBILE_STUDENT_PROFILE_NEXT_PAGE'
const MOBILE_STUDENT_PROFILE_PAGE_BACK = 'MOBILE_PROFILE_PAGE_BACK'

const MOBILE_EMPLOYER_PROFILE_NEXT_PAGE = 'MOBILE_EMPLOYER_PROFILE_NEXT_PAGE'

// =======================================================
// ================== ACTION CREATORS ====================
// =======================================================


/*
 * ========= MOBILE PROFILE ACTIONS ==========
 */



export function pageBack (currentPage) {
  return function (dispatch) {

    if (currentPage !== 1) {
      dispatch({
        type: MOBILE_STUDENT_PROFILE_PAGE_BACK
      })
    }

  }
}

export function tryAdvanceEmployerProfilePage (currentPage, props, successCallback, failureCallback) {
  return function (dispatch) {

    if (currentPage == 1) {
      mobileProfileHelper.validateEmployerProfilePage1(props, (errorsExist, profileFieldErrors) => {

        /*
         * If there were errors on the page somewhere, then
         * we can't advance and we need to let the user know.
         */

        if(errorsExist) {
          handleErrorsExist(profileFieldErrors)
    	  } 

        /*
         * If no errors were present on Page 1, we can advance to the next page.
         */

        else {
          dispatch(nextEmployerProfilePage())
        }

      })
    }

    else if (currentPage == 2) {
      mobileProfileHelper.validateEmployerProfilePage2(props, (errorsExist, profileFieldErrors) => {

        /*
         * If there were errors on the page somewhere, then
         * we can't advance and we need to let the user know.
         */

        if(errorsExist) {
          handleErrorsExist(profileFieldErrors)
    	  } 

        /*
         * If no errors were present on Page 2, we can advance to the next page.
         */

        else {
          dispatch(nextEmployerProfilePage())
        }

      })
    }

    /*
     * If we're on page 3, this means that we're submitting the employer profile.
     */

    else if (currentPage == 3) {

      /*
        * Let the app know that we're saving profile info so we should 
        * update the store.
        */

        var profileInfo = props
        debugger;

        dispatch(savingProfileInfo(false))

          // No errors, proceed to /PUT on api/me
          var putData = {
            // "user-is_a_student": false,
            // "user-is_profile_completed": true,
            // "user-email": user.email,
            // "user-first_name": user.firstName,
            // "user-last_name": user.lastName,
            // "user-is_active": true,
            // "user-date_joined": user.dateJoined,
            // "user-mobile": user.mobile,
            // is_a_student: false,
            // is_profile_completed: true, // set this flag to true so we know for next time
            company_name: profileInfo.companyName,
            logo: profileInfo.logoUrl,
            office_address: profileInfo.officeAddress,
            office_city: profileInfo.officeCity,
            office_postal_code: profileInfo.officePostalCode,
            description: profileInfo.description,
            website: profileInfo.website,
            employee_count: profileInfo.employeeCount,
            industry: profileInfo.industry || profileInfo.industry.id,
            // date_joined: user.dateJoined,
            // first_name: user.firstName,
            // last_name: user.lastName,
            // email: user.email
          }

          employerProfilePUT(putData)
          .then((res) => {

              // DISPATCH - SAVED_PROFILE_SUCCESS
              dispatch(savedProfileSuccess())

              successCallback()
              //doRedirect()
            })
            .catch((err) => {
              // DISPATCH - SAVED_PROFILE_ERROR
              dispatch(savedProfileFailure({}, [
                  'HTTP Error Occurred.\n',
                  err.message
              ], false))

              failureCallback('HTTP ERROR')

            })


      
    }

    function handleErrorsExist (profileFieldErrors) {
      dispatch(savedProfileFailure(profileFieldErrors, [
        "Couldn't save profile.",
        "Please fill in missing fields"
      ], true))

      failureCallback()
    }

  }
}

export function tryAdvanceStudentProfilePage(currentPage, props, successCallback, failureCallback) {
  return function (dispatch) {

    /*
     * Sort each advance by page.
     * For page 1, we first need to validate each of the fields before trying to advance
     */

    if (currentPage == 1) {
      mobileProfileHelper.validateStudentProfilePage1(props, (errorExist, profileFieldErrors) => {

        /*
         * If there were errors on the page somewhere, then
         * we can't advance and we need to let the user know.
         */

        if(errorExist) {
          handleErrorsExist(profileFieldErrors)
    	  } 

        /*
         * If no errors were present on Page 1, we can advance to the next page.
         */

        else {
          dispatch(nextStudentProfilePage())
        }
      })
    }

    else if (currentPage == 2) {
      mobileProfileHelper.validateStudentProfilePage2(props, (errorExist, profileFieldErrors) => {

        /*
         * If there were errors on the page somewhere, then
         * we can't advance and we need to let the user know.
         */

        if(errorExist) {
          handleErrorsExist(profileFieldErrors)
    	  } 

        /*
         * If no errors were present on Page 2, we can advance to the next page.
         */

        else {
          dispatch(nextStudentProfilePage())
        }
      })
    }

    else if (currentPage == 3) {
      mobileProfileHelper.validateStudentProfilePage3(props, (errorExist, profileFieldErrors) => {

        /*
         * If there were errors on the page somewhere, then
         * we can't advance and we need to let the user know.
         */

        if(errorExist) {
          handleErrorsExist(profileFieldErrors)
    	  } 

        /*
         * If no errors were present on Page 2, we can advance to the next page.
         */

        else {
          dispatch(nextStudentProfilePage())
        }
      })
    }

    else if (currentPage == 4) {
      mobileProfileHelper.validateStudentProfilePage4(props, (errorExist, profileFieldErrors) => {

        /*
         * If there were errors on the page somewhere, then
         * we can't advance and we need to let the user know.
         */

        if(errorExist) {
          handleErrorsExist(profileFieldErrors)
    	  } 

        /*
         * If no errors were present on Page 2, we can advance to the next page.
         */

        else {
          dispatch(nextStudentProfilePage())
        }
      })
    }

    else if (currentPage == 5) {
      dispatch(nextStudentProfilePage())
    }

    else if (currentPage == 6) {
      dispatch(nextStudentProfilePage())
    }

    else if (currentPage == 7) {
      mobileProfileHelper.validateStudentProfilePage7(props, (errorExist, profileFieldErrors) => {

        /*
         * If there were errors on the page somewhere, then
         * we can't advance and we need to let the user know.
         */

        if(errorExist) {
          handleErrorsExist(profileFieldErrors)
    	  } 

        /*
         * If no errors were present, we can move towards submitting.
         */

        else {
          
          /*
           * Let redux know that we're submitting the student profile.
           */

          dispatch(savingProfileInfo(true))

          /*
           * Now we actually attempt to submit the profile first time.
           */
          var profileInfo = props;

          var putData = {
            "is_a_student": true,
            "is_profile_completed": true,
            // "email": user.email,
            "first_name": profileInfo.firstName,
            "last_name": profileInfo.lastName,
            "is_active": true,
            // "date_joined": user.dateJoined,
            // "mobile": user.mobile,
            "schoolName": profileInfo.school,
            languages: btoa(JSON.stringify(extractLanguageId(profileInfo.languages))),
            sports: btoa(JSON.stringify(extractSportsObject(profileInfo.sportsTeam, profileInfo))),
            clubs: btoa(JSON.stringify(extractClubsObject(profileInfo.schoolClub, profileInfo))),
            edu_level_id: profileInfo.educationLevel.id ? profileInfo.educationLevel.id : profileInfo.educationLevel,
            email_pref: profileInfo.emailPreferences.id ? profileInfo.emailPreferences.id : profileInfo.emailPreferences,
            status: profileInfo.studentStatus.id ? profileInfo.studentStatus.id : profileInfo.studentStatus,
            enroll_date: toISO(profileInfo.enrollmentDate),
            grad_date: toISO(profileInfo.graduationDate),
            major_id: profileInfo.major.id ? profileInfo.major.id : profileInfo.major,
            gpa: JSON.stringify(parseFloat(profileInfo.gpa)),
            personal_email: profileInfo.personalEmail,
            gender: profileInfo.gender.id ? profileInfo.gender.id : profileInfo.gender,
              /*Converts the value to num*/
            has_car: profileInfo.hasCar === true ? JSON.stringify(1) : JSON.stringify(0),
            recent_company_name: profileInfo.companyName,
            recent_company_position: profileInfo.position,
            fun_fact: profileInfo.funFacts,
            hometown: profileInfo.hometown,
            hobbies: profileInfo.hobbies,
            profilepicture: profileInfo.photo,
            resume: profileInfo.resume,
          }

           /*
            * Perform the HTTP put to /api/me to submit the profile for the first time.
            */

            studentProfilePUT(putData)

             /*
              * Successful PUT to /api/me.
              * In the successCallback, we should make sure that we 
              * reload the page (do this on every PUT or PATCH).
              */

              .then((res) => {
                // DISPATCH - SAVE_PROFILE_SUCCESS
                dispatch(savedProfileSuccess())

                successCallback()
              })

             /*
              * Something went wrong with updating the student profile.
              */
              
              .catch((err) => {
                console.log(err)
                dispatch(savedProfileFailure({}, [
                  'HTTP Error Occurred',
                  err
                ], true))

                failureCallback('HTTP ERROR')
              })

        }
      })
    }
    

    function handleErrorsExist (profileFieldErrors) {
      dispatch(savedProfileFailure(profileFieldErrors, [
        "Couldn't save profile.",
        "Please fill in missing fields"
      ], true))

      failureCallback()
    }
    
  }
}

function nextStudentProfilePage() {
  return {
    type: MOBILE_STUDENT_PROFILE_NEXT_PAGE
  }
}

function nextEmployerProfilePage () {
  return {
    type: MOBILE_EMPLOYER_PROFILE_NEXT_PAGE
  }
}

/*
 * ========= END OF MOBILE PROFILE ACTIONS ===
 */


export function presentProfileAdvice () {
  return {
    type: PROFILE_ADVICE_PRESENTED
  }
}

export function toggleButton(booleanState, buttonName) {
    return {
        type: TOGGLE_BUTTON,
        booleanState,
        buttonName
    }
}

export function updateTag(listName) {
    return {
        type: UPDATE_TAG,
        listName
    }
}

export function updateProfileField(fieldName, newValue, isAStudent) {
  return {
    type: UPDATE_PROFILE_FIELD,
    fieldName,
    newValue,
    isAStudent
 }
}

/*===============FETCHING PROFILE INFO==============*/
export function fetchingProfileInfo() {
    return {
        type: FETCHING_PROFILE_INFO
    }
}

export function fetchedProfileInfoSuccess (isProfileCompleted, isEmailVerified, profileInfo, isAStudent) {
  return {
    type: FETCHED_PROFILE_INFO_SUCCESS,
    isProfileCompleted,
    isEmailVerified,
    profileInfo,
    isAStudent
  }
}

export function fetchedProfileInfoFailure (error) {
  return {
    type: FETCHED_PROFILE_INFO_FAILURE,
    error
  }
}


export function savingProfileInfo(isAStudent) {
    return {
        type: SAVING_PROFILE_INFO
    }
}

/*NOTE: Should this have an input
 *
 * */
export function savedProfileSuccess(isAStudent, updateInfo, updateTags) {
  return {
    type: SAVED_PROFILE_INFO_SUCCESS,
    isAStudent,
    updateInfo,
    updateTags
  }
}
export function savedProfileFailure(profileErrorsObj, error, isAStudent) {
  return {
    type: SAVED_PROFILE_INFO_FAILURE,
    isAStudent,
    error,
    profileErrorsObj
  }
}

// =======================================================
// ===================== THUNK ===========================
// =======================================================
// REF: https://github.com/ReactjsProgram/Redux-Immutable/commit/c1b261b21150e472c6199dcda7bcb792a81678f8
// https://online.reacttraining.com/courses/redux-and-immutablejs/lectures/946352
//
//
//NOTE: Refer to signupform redux line 78, passing dispatch
export function handleToggleButton(booleanState, buttonName) {
    return function(dispatch) {
        //ACTION: FETCHING_USER_PROFILE 
        dispatch(toggleButton(booleanState, buttonName))
    }
}

export function handleSaveNewTag(newTagName, pickList, textField, updateProfileFieldName) {
    return function(dispatch) {
        //ACTION: FETCHING_USER_PROFILE 
        dispatch(saveNewTag())
        
        
        
        //Enter new tag into sportsTeam or clubsList
        dispatch(updateProfileField(updateProfileFieldName, newTagName, true))
    }
}

export function handleGetUserProfile(dispatch) {
    return function(dispatch) {
        //ACTION: FETCHING_USER_PROFILE 
        dispatch(fetchingProfileInfo())
        return getUserInfo()
            .then((resp) => 
                console.log(resp)
            )
            .catch((err) => 
                console.log(err)
            )
    }
}


/*
* submitProfileFirstTime
*
* This first submit to the profile will be done through the use of a PUT request.
* We change the isProfileCompleted flag to == true after this.
*
* @param userTypeInt (Number) - 0 if a student, 1 if employer
* @param profileInfo (Object) - data to PUT
* @param user (Object) - data to PUT
*
*/
export function submitProfileFirstTime(userTypeInt, profileInfo, user, successCallback, failureCallback, 
                                    promptUserCallback, userProfileAdvicePresented, doRedirect) {
  return function (dispatch) {
	console.log(userTypeInt, profileInfo, user)
    dispatch(savingProfileInfo())
    switch(userTypeInt) {
      case 0:
    	console.log("SUBMITTING STUDENT PROFILE FIRST TIME")

     /*
      * First, we need to validate the profile fields.
      * Ensure that any fields that needed to be filled out are filled out.
      */
    	validateStudentProfileFields(profileInfo, (errorExist, profileFieldErrors) => {

        /*
         * An error occured. Some fields that needed to be filled out were not properly
         * filled out.
         */

    	  if(errorExist) {

    	    // DISPATCH - SAVE_PROFILE_ERROR
    	    dispatch(savedProfileFailure(profileFieldErrors, [
            "Couldn't save profile.",
    	      "Please fill in missing fields"
    	    ], true))

          failureCallback('INVALID FIELDS')

    	  } 
        
        /*
         * Otherwise, all is well. We should go ahead and submit.
         * But we should also set default values for things if they are null.
         * 
         * Important: If we check the redux store, we'll see that there are a bunch
         * of fields that don't assume the default values that they should be assuming 
         * until the user actually interacts with that input field. This means that we
         * are going to have to set the default values in the object that we're using to
         * update the profile with, here.
         */
        
        else {

          /*
           * If the user isn't going to upload a photo AND resume, we should let them know 
           * that profiles with a photo and resume perform better. Lets trigger the flag that 
           * says that we've let them know this. Next time they submit this, we'll have the flag
           * to know that we should just go ahead and submit.
           */

          if ((profileInfo.photo == null || profileInfo.photo == "")
              && (profileInfo.resume == null || profileInfo.resume == "")
              && userProfileAdvicePresented === false) {
            dispatch(presentProfileAdvice())
            promptUserCallback()
          }

          else {

           /* 
            * No errors, proceed to /PUT on api/me
            * Let the app know that we're saving profile info so we should 
            * update the store.
            */

            dispatch(savingProfileInfo(true))

            var putData = {
                "is_a_student": true,
                "is_profile_completed": true,
                "email": user.email,
                "first_name": profileInfo.firstName,
                "last_name": profileInfo.lastName,
                "is_active": true,
                "date_joined": user.dateJoined,
                "mobile": user.mobile,
                "schoolName": profileInfo.school,
                languages: btoa(JSON.stringify(extractLanguageId(profileInfo.languages))),
                sports: btoa(JSON.stringify(extractSportsObject(profileInfo.sportsTeam, profileInfo))),
                clubs: btoa(JSON.stringify(extractClubsObject(profileInfo.schoolClub, profileInfo))),
                edu_level_id: profileInfo.educationLevel.id ? profileInfo.educationLevel.id : profileInfo.educationLevel,
                email_pref: profileInfo.emailPreferences.id ? profileInfo.emailPreferences.id : profileInfo.emailPreferences,
                status: profileInfo.studentStatus.id ? profileInfo.studentStatus.id : 1,
                enroll_date: toISO(profileInfo.enrollmentDate),
                grad_date: toISO(profileInfo.graduationDate),
                major_id: profileInfo.major.id ? profileInfo.major.id : profileInfo.major,
                gpa: JSON.stringify(parseFloat(profileInfo.gpa)),
                personal_email: profileInfo.personalEmail,
                gender: profileInfo.gender.id ? profileInfo.gender.id : profileInfo.gender,
                  /*Converts the value to num*/
                has_car: profileInfo.hasCar === true ? JSON.stringify(1) : JSON.stringify(0),
                recent_company_name: profileInfo.companyName,
                recent_company_position: profileInfo.position,
                fun_fact: profileInfo.funFacts,
                hometown: profileInfo.hometown,
                hobbies: profileInfo.hobbies,
                profilepicture: profileInfo.photo,
                resume: profileInfo.resume,
            }

           /*
            * Perform the HTTP put to /api/me to submit the profile for the first time.
            */

            studentProfilePUT(putData)

             /*
              * Successful PUT to /api/me.
              * In the successCallback, we should make sure that we 
              * reload the page (do this on every PUT or PATCH).
              */

              .then((res) => {
                // DISPATCH - SAVE_PROFILE_SUCCESS
                dispatch(savedProfileSuccess())

                successCallback()
              })

             /*
              * Something went wrong with updating the student profile.
              */
              
              .catch((err) => {
                console.log(err)
                dispatch(savedProfileFailure({}, [
                  'HTTP Error Occurred',
                  err
                ], true))

                failureCallback('HTTP ERROR')
              })
            
          }// Else that has no error

          
    	    } // upload photo & resume checker
    	  })// validateStudentFields
    	  return;//case0

      // ===================================================== //
      // ========== EMPLOYER ================================= //
      // ===================================================== //

      case 1:
        console.log("SUBMITTING EMPLOYER PROFILE FIRST TIME")

        validateEmployerProfileFields(profileInfo, (errorsExist, profileFieldErrors) => {
          if(errorsExist) {

            // DISPATCH - SAVE_PROFILE_ERROR
            dispatch(savedProfileFailure(profileFieldErrors, [
              "Couldn't save profile.",
              'Please fill in missing fields'
            ], false))

            failureCallback('INVALID FIELDS')

          } 
          else {
          /*
           * If the user isn't going to upload a photo we should let them know 
           * that profiles with a photo and resume perform better. Lets trigger the flag that 
           * says that we've let them know this. Next time they submit this, we'll have the flag
           * to know that we should just go ahead and submit.
           */

          if ((profileInfo.logoUrl == null || profileInfo.logoUrl == "")
              && userProfileAdvicePresented === false) {
            dispatch(presentProfileAdvice())
            promptUserCallback()
          }

          else {

           /*
            * Let the app know that we're saving profile info so we should 
            * update the store.
            */

            dispatch(savingProfileInfo(false))

              // No errors, proceed to /PUT on api/me
              var putData = {
                "user-is_a_student": false,
                "user-is_profile_completed": true,
                "user-email": user.email,
                "user-first_name": user.firstName,
                "user-last_name": user.lastName,
                "user-is_active": true,
                "user-date_joined": user.dateJoined,
                "user-mobile": user.mobile,
                is_a_student: false,
                is_profile_completed: true, // set this flag to true so we know for next time
                company_name: profileInfo.companyName,
                logo: profileInfo.logoUrl,
                office_address: profileInfo.officeAddress,
                office_city: profileInfo.officeCity,
                office_postal_code: profileInfo.officePostalCode,
                description: profileInfo.description,
                website: profileInfo.website,
                employee_count: profileInfo.employeeCount,
                industry: profileInfo.industry || profileInfo.industry.id,
                date_joined: user.dateJoined,
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email
              }

              employerProfilePUT(putData)
              .then((res) => {

                  // DISPATCH - SAVED_PROFILE_SUCCESS
                  dispatch(savedProfileSuccess())

                  successCallback()
                  //doRedirect()
                })
                .catch((err) => {
                  // DISPATCH - SAVED_PROFILE_ERROR
                  dispatch(savedProfileFailure({}, [
                      'HTTP Error Occurred.\n',
                      err.message
                  ], false))

                  failureCallback('HTTP ERROR')

                })
            }//else for saving profile

          }//else for uploading resume and picture
        })//validateEmployerProfile
        return;//case 1
      default:
        return;
    }
  }
}

export function updateProfile(userTypeInt, profileInfo, user, snapshot, successCallback, failureCallback) {
  return function (dispatch) {
    switch(userTypeInt) {

     /*
      * Case 0 is for students.
      * 
      * This section updates the user's profile with the required student
      * fields.
      */

      case 0:
        console.log("UPDATING STUDENT PROFILE")

       /*
        * First, we need to check and see if there are
        * any errors that exist on screen here.
        */
        
        validateStudentProfileFields(profileInfo, (errorExist, profileFieldErrors) => {

         /*
          * There are definitely some errors. We can't continue
          * with submitting the user's profile. Also, we should display a toastr because of this.
          */

          if(errorExist) {

            // DISPATCH - SAVE_PROFILE_ERROR
            dispatch(savedProfileFailure(profileFieldErrors, [    "Couldn't save profile.",
          "Please fill in missing fields"
            ], true))

            failureCallback("Ah man. Something's wrong in your profile.")

          } 

         /*
          * No errors occurred. Everything is as it should be, let's go ahead
          * and save the profile to the backend.
          */
          
          else {

          /*
           * Let the app know that we're saving profile info so we should 
           * update the store.
           */

          dispatch(savingProfileInfo(true))

            // No errors, proceed to /PUT on api/me
            var changedData = {
              user_firstname: profileInfo.firstName,
              user_lastname: profileInfo.lastName,
              edu_level: profileInfo.educationLevel ? profileInfo.educationLevel : profileInfo.educationLevel.id, 
              email_pref: profileInfo.emailPreferences ? profileInfo.emailPreferences : profileInfo.emailPreferences.id,
              status: profileInfo.studentStatus ? profileInfo.studentStatus : profileInfo.studentStatus.id, 
              enroll_date: toISO(profileInfo.enrollmentDate),
              grad_date: toISO(profileInfo.graduationDate),
              major: profileInfo.major.id  ? profileInfo.major.id : profileInfo.major,
              gpa: JSON.stringify(parseFloat(profileInfo.gpa)),
              personal_email: profileInfo.personalEmail,
              gender: profileInfo.gender ? profileInfo.gender : profileInfo.gender.id, 
              languages: btoa(JSON.stringify(extractLanguageId(profileInfo.languages))),
              sports: btoa(JSON.stringify(extractSportsObject(profileInfo.sportsTeam, profileInfo))),
              clubs: btoa(JSON.stringify(extractClubsObject(profileInfo.schoolClub, profileInfo))),
              /*Converts the value to num*/
              has_car: profileInfo.hasCar === false ? JSON.stringify(0) : JSON.stringify(1),
              recent_company_name: profileInfo.companyName,
              recent_company_position: profileInfo.position,
              fun_fact: profileInfo.funFacts,
              hometown: profileInfo.hometown,
              hobbies: profileInfo.hobbies,
              profilepicture: profileInfo.photo,
              resume: profileInfo.resume,
        	  }
            compareToSnapshot(snapshot, changedData, (result) => {

                //changed photo_url & resume_url to reflect backend data
                result.p
              studentProfilePATCH(result)
                .then((res) => {

                 /*
                  * Here, after successfully updating the profile, we should update
                  * the snapshot for any subsequent updates because the state will have changed.
                  * TODO:
                  */

                  
                  var updatedStudent = res.data.result.updatedStudent
                  var updatedTags = res.data.request.updateTags

                  // DISPATCH - SAVE_PROFILE_SUCCESS
                  dispatch(savedProfileSuccess(true, updatedStudent, updatedTags))

                  successCallback()

                })
                .catch((err) => {

                  // DISPATCH - SAVE_PROFILE_ERROR
                  dispatch(savedProfileFailure({}, [
                     'HTTP Error Occurred',
                     err
                  ], false))

                  failureCallback('Some error occurred trying to update!')
                })
             })
            }
          })
        return;

     /*
      * Case 1 is for employers.
      * 
      * This section updates the user's profile with the required employer
      * fields.
      */

      case 1:
        console.log("UPDATING EMPLOYER PROFILE")

        /* First, validate all of the employer fields.
        */

        validateEmployerProfileFields(profileInfo, (errorsExist, profileFieldErrors) => {

         /* After a pass through each of the fields, we will know if 
          * an error exists.
          */

          if(errorsExist) {

            /*
            * Display an error message using the ToastContainer
            * if an error occurred.
            *
            * TODO: Show a different error based on error types.
            */

            // DISPATCH - SAVE_PROFILE_ERROR
            dispatch(savedProfileFailure(profileFieldErrors, [
              "Couldn't save profile.\n",
              'Please fill in missing fields'
            ], false))

            failureCallback('INVALID FIELDS')

          } 

          else {

          /*
           * Let the app know that we're saving profile info so we should 
           * update the store.
           */

          dispatch(savingProfileInfo(true))

           /*
            * No errors, proceed to /PATCH on api/me.
            */
              

            var changedData = {
              company_name: profileInfo.companyName,
              logo: profileInfo.logoUrl,
              office_address: profileInfo.officeAddress,
              office_city: profileInfo.officeCity,
              office_postal_code: profileInfo.officePostalCode,
              description: profileInfo.description,
              website: profileInfo.website,
              employee_count: profileInfo.employeeCount,
              industry: profileInfo.industry.id ? profileInfo.industry.id : profileInfo.industry,
            }

           /*
            * Figure out what fields need to be updated.
            */

            compareToSnapshot(snapshot, changedData, (result) => {


            /*
             * If nothing to update- nothing changed, then we'll
             * just let them know that nothing has changed.
             */

              if (Object.keys(result).length === 0) {

                // DISPATCH - SAVE_PROFILE_SUCCESS
                dispatch(savedProfileSuccess())

                successCallback('Profile up to date.')
              }
              
             /*
              * Otherwise, there is stuff to update.
              * Lets make the HTTP call now.
              */ 

              else {

                employerProfilePATCH(result)
                  .then((res) => {

                    // DISPATCH - SAVE_PROFILE_SUCCESS
                    dispatch(savedProfileSuccess())

                    successCallback()
                  })
                  .catch((err) => {

                    // DISPATCH - SAVE_PROFILE_ERROR
                    dispatch(savedProfileFailure({}, [
                      'HTTP Error Occurred.\n',
                      err.message
                      ], false))

                    failureCallback('Some error occurred trying to update!')

                  })
              }
             
            })
          }
        })
        return;
      default:
        return;
    }
  }
}

// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialState = {
  employerProfile: {},
  studentProfile: {},
  snapshot: {},
  isSubmittingForm: false,
  isProfileCompleted: false,
  submitErrorsExist: false,
  submitSuccess: false,
  error: '',
  userProfileAdvicePresented: false,
  profileAdviceModal: {},
  mobileViewCurrentPage: 1,
}



// =======================================================
// ==================== REDUCERS =========================
// =======================================================

/* ===================================================================
*   PROFILE (MAIN, shared amount both employer and student)
*  ===================================================================
*/

export default function profile (state = initialState, action) {
  switch(action.type) {

    /*
     * === Mobile Profile Actions ===
     */

    case MOBILE_EMPLOYER_PROFILE_NEXT_PAGE:

      scrollToY(0, 1500, 'easeInOutQuint');

      return {
        ...state,
        mobileViewCurrentPage: state.mobileViewCurrentPage + 1
      }

    case MOBILE_STUDENT_PROFILE_PAGE_BACK:

      scrollToY(0, 1500, 'easeInOutQuint');

      return {
        ...state,
        mobileViewCurrentPage: state.mobileViewCurrentPage - 1
      }

    case MOBILE_STUDENT_PROFILE_NEXT_PAGE:
      
      scrollToY(0, 1500, 'easeInOutQuint');

      return {
        ...state,
        mobileViewCurrentPage: state.mobileViewCurrentPage + 1
      }

    /*
     * ==============================
     */
    case PROFILE_ADVICE_PRESENTED:
      return {
        ...state,
        userProfileAdvicePresented: true,
        isSubmittingForm: false,
        submitSuccess: false,
        error: ''
      }
    case SAVING_PROFILE_INFO:
      return {
        ...state,
        isSubmittingForm: true,
        submitSuccess: false
      }
    case UPDATE_PROFILE_FIELD:
      if(action.isAStudent) {
        return {
          ...state,
          studentProfile: studentProfile(state.studentProfile, action),
          userProfileAdvicePresented: false,
          submitSuccess: false,
          error: ''
        }
      } else {
        return {
          ...state,
          employerProfile: employerProfile(state.employerProfile, action),
          submitSuccess: false,
          userProfileAdvicePresented: false,
          error: ''
        }
      }
    case FETCHING_PROFILE_INFO:
        return {
            ...state,
        }
    case FETCHED_PROFILE_INFO_SUCCESS:
      if(action.isAStudent) {
        return {
          ...state,
          isProfileCompleted: action.isProfileCompleted,
          studentProfile: studentProfile(state.studentProfile, action),
          snapshot: action.profileInfo
        }
      } else {
        return {
          ...state,
          isProfileCompleted: action.isProfileCompleted,
          employerProfile: employerProfile(state.employerProfile, action),
          snapshot: action.profileInfo
         }
      }
    case FETCHED_PROFILE_INFO_FAILURE:
          return {
            ...state,
            error
          }
    case SAVED_PROFILE_INFO_FAILURE:
      if(action.isAStudent) {
        return {
          ...state,
          submitErrorsExist: true,
          isSubmittingForm: false,
          error: action.error,
          studentProfile: studentProfile(state.studentProfile, action)
        }
      } else {
        return {
          ...state,
          submitErrorsExist: true,
          isSubmittingForm: false,
          error: action.error,
          employerProfile: employerProfile(state.employerProfile, action)
        }
      }
    case SAVED_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        //snapshot: newSnapshot,
        submitSuccess: true,
        isSubmittingForm: false,
        error: ''
      }
    case TOGGLE_BUTTON: 
      return {
        ...state,
        studentProfile: studentProfile(state.studentProfile, action),
        userProfileAdvicePresented: false,
        submitSuccess: false,
        error: ''
      }
    case UPDATE_TAG:
      return {
        ...state,
        studentProfile: studentProfile(state.studentProfile, action),
        userProfileAdvicePresented: false,
        submitSuccess: false,
        error: ''
      }
    default :
      return state
  }
}

/* ===================================================================
*   EMPLOYER PROFILE REDUCERS
*  ===================================================================
*/

const initialEmployerProfileState = {
  companyName: '',
  industry: '',
  website: '',
  description: '',
  employeeCount: '',
  officeAddress: '',
  officeCity: '',
  officePostalCode: '',
  logoUrl: '',
  propsErrorMap: {}
}

function employerProfile(state = initialEmployerProfileState, action) {
  switch(action.type) {
    case UPDATE_PROFILE_FIELD:
      return {
        ...state,
        [action.fieldName]: action.newValue,
        propsErrorMap: employerProfileErrors(state.propsErrorMap, action)
      }
    case FETCHED_PROFILE_INFO_SUCCESS:
      return {
        ...state,
          companyName: action.profileInfo.company_name,
          industry: action.profileInfo.industry,
          website: action.profileInfo.website,
          description: action.profileInfo.description,
          employeeCount: action.profileInfo.employee_count,
          officeAddress: action.profileInfo.office_address,
          officeCity: action.profileInfo.office_city,
          officePostalCode: action.profileInfo.office_postal_code,
          logoUrl: action.profileInfo.logo_url
      }
    case SAVED_PROFILE_INFO_FAILURE:
      return {
        ...state,
        propsErrorMap: action.profileErrorsObj
      }
    default:
      return state
  }
}

const employerProfileErrorsInitialState = {
  companyName: false,
  industry: false,
  logoUrl: false,
  website: false,
  description: false,
  employeeCount: false,
  officeAddress: false,
  officeCity: false,
  officePostalCode: false
}

function employerProfileErrors(state = employerProfileErrorsInitialState, action) {
  switch(action.type) {
    case UPDATE_PROFILE_FIELD:
      return {
        ...state,
        [action.fieldName]: false // we do this because if the field was updated, we'll assume there isn't an error until
                                  // the next submit
      }
  }
}

/* ===================================================================
*   STUDENT PROFILE REDUCERS
*  ===================================================================
*/

const initialStudentProfileState = {
  emailPreferences: 2,
  firstName: '',
  lastName: '',
  studentStatus: '',
  educationLevel: 0,
  schoolName: '',
  enrollmentDate: '',
  graduationDate: '',
  major: '',
  gpa: '',
  personalEmail: '',
  gender: '',
  sportsTeam: [],
  schoolClub: [],
  languages: [],
  hasCar: '',
  companyName: '',
  position: '',
  funFacts: '',
  hometown: '',
  hobbies: '',
  photo: '',
  resume: '',
  sportsToggle: false,
  clubsToggle: false,
  languagesToggle: false,
  gpaToggle: false,
  emailToggle: false,
  propsErrorMap: {}
}

function studentProfile(state = initialStudentProfileState, action) {
  switch(action.type) {
    case TOGGLE_BUTTON:
        return {
            ...state,
            [action.buttonName]: action.booleanState
    }
    case UPDATE_TAG:
        return {
            ...state,
            listName: action.listName
    }
    case UPDATE_PROFILE_FIELD:
      return {
        ...state,
        [action.fieldName]: action.newValue,
        propsErrorMap: studentProfileErrors(state.propsErrorMap, action)
      }
    case SAVED_PROFILE_INFO_FAILURE:
      return {
        ...state,
        propsErrorMap: action.profileErrorsObj
      }
    case FETCHED_PROFILE_INFO_SUCCESS:
          return {
            ...state,
      		  emailPreferences: action.profileInfo.email_pref,
              firstName: action.profileInfo.user_firstname,
              lastName: action.profileInfo.user_lastname,
              studentStatus: action.profileInfo.status,
              enrollmentDate: action.profileInfo.enroll_date ? new Date(action.profileInfo.enroll_date) : null,
              graduationDate: action.profileInfo.grad_date ? new Date(action.profileInfo.grad_date) : null,
              major: action.profileInfo.major,
              educationLevel: action.profileInfo.edu_level,
              schoolName: action.profileInfo.name,
              gpa: action.profileInfo.gpa ? Number(action.profileInfo.gpa) : 0,
              personalEmail: action.profileInfo.personal_email,
        	  gender: action.profileInfo.gender,
              sportsTeam: action.profileInfo.tags ? action.profileInfo.tags.sports : [], //.map((sport) => sport.id),
      		  schoolClub: action.profileInfo.tags ? action.profileInfo.tags.clubs : [], //.map((club) => club.id),
              languages: action.profileInfo.tags ? action.profileInfo.tags.languages : [], //.map((language) => language.id),
              //TODO: convert to yes/no
              hasCar: hasCarBoolean(action.profileInfo.has_car),
      		  companyName: action.profileInfo.recent_company_name,
              position: action.profileInfo.recent_company_position,
              funFacts: action.profileInfo.fun_fact,
              hometown: action.profileInfo.hometown,
              hobbies: action.profileInfo.hobbies,
              photo: action.profileInfo.photo_url,
              resume: action.profileInfo.resume_url,

              //toggle if complex tags contain vars
              sportsToggle: action.profileInfo.tags ? action.profileInfo.tags.sports.length > 0 : false,
              clubsToggle: action.profileInfo.tags ? action.profileInfo.tags.clubs.length > 0 : false,
              languagesToggle: action.profileInfo.tags ? action.profileInfo.tags.languages.length > 0 : false,
              gpaToggle: action.profileInfo.gpa === 0 ,
              emailToggle: action.profileInfo.personal_email !== null,

              // Additional school details
              schoolAddress: action.profileInfo.school_address + ', ' + action.profileInfo.school_city + ' ' + action.profileInfo.school_postal_code
          }
    default:
      return state
  }
}


const initialStudentProfileErrorState = {
  emailPreferences: false,
  firstName: false,
  lastName: false,
  studentStatus: false,
  educationLevel: false,
  enrollmentDate: false,
  graduationDate: false,
  major: false,
  gpa: false,
  personalEmail: false,
  gender: false,
  sportsTeam: false,
  hasSports: false,
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
}

function studentProfileErrors(state = initialStudentProfileErrorState, action) {
  switch(action.type) {
    case UPDATE_PROFILE_FIELD:
      return {
        ...state,
        [action.fieldName]: false
      }
  }
}
