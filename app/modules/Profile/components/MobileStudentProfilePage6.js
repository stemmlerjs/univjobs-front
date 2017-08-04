
import React, { PropTypes } from 'react'

import MobileStudentProfileBreadCrumbs from './MobileStudentProfileBreadCrumbs'
import { Combobox, DropdownList, DateTimePicker, Calendar, Multiselect, SelectList} from 'react-widgets'
import { scrollToY, compressPicture } from 'helpers/utils'

import { mobileStudentProfilePageContainer, largeHeader, profileItemsContainer, label,
  profileItem, textInput, dropdownInput, navigationButtonsContainer, nextButton, 
  longDropDown, backButton, multiselectDropdown, smallHeader, dropzoneContent, dropzoneBaseStyle, 
  dropzoneResumeStyle, linkForSite } from '../styles/MobileStudentProfilePage.css'
import { error } from 'sharedStyles/error.css' 

import Dropzone from 'react-dropzone'


function isUploadSupported() {
  if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
      return false;
  }
  
  else {
    return true;
  }
  // var elem = document.createElement('input');
  // elem.type = 'file';
  // return !elem.disabled;
};

export default function MobileStudentProfilePage6 (
  { 
    photo,
    resume,
    propsErrorMap, 
    updateProfileField,
    onCreateNewTag,
    handleOpenPictureCropper,
    handleShowImageSizeTooLargeError,
    handleShowResumeSizeTooLargeError,
    next,
    back
  }) {

  /*
  * onDrop
  * 
  * @param File[]
  * Handle profile picture drop event.
  */
    
    function onDrop(files) {

	 /*
		* If the photo is not over 1MB, then we'll move forward and use it.
		*
		* 54173  bytes (52.9 KB) OK
		* 7577067 bytes (7.5 MB) NOT OK
		*/

		var fileSizeBytes = files[0].size
		var maxSizeBytes = 3000000; // 3MB

	 /*
		* Too large, present error.
		*/

		if (fileSizeBytes >= maxSizeBytes) {
			console.log("way too large", fileSizeBytes, maxSizeBytes)
      compressPicture(files[0], (newCroppedPictureFile) => {

        handleOpenPictureCropper(newCroppedPictureFile)

      })
		} 

	 /*
		* Size OK, continue to open the cropper.
		*/

		else {

			handleOpenPictureCropper(files[0])
			
		}
  }

   /*
	* onDropResume
	* 
	* @param File[]
	* Handle resume drop event.
	*/

  function onDropResume(files) {

		/*
		* If the resume is not over 2MB, then we'll move forward and use it.
		*
		* 54173  bytes (52.9 KB) OK
		* 7577067 bytes (7.5 MB) NOT OK
		*/

		var fileSizeBytes = files[0].size
		var maxSizeBytes = 2000000; // 2MB

	 /*
		* Too large, present error.
		*/

		if (fileSizeBytes >= maxSizeBytes) {
			console.log("way too large", fileSizeBytes, maxSizeBytes)

      compressPicture()
			handleShowResumeSizeTooLargeError()
		} 

	 /*
		* Size OK, continue.
		*/

		else {
			let dropResumeDiv = document.getElementById('dropResumeDiv')
			updateProfileField('resume', files[0], true)
			// Preview the image

			// Preview the image
			dropResumeDiv.style.borderStyle = "solid" // blob
			dropResumeDiv.style.borderColor = "	#00BFFF" // blob
			dropResumeDiv.style.backgroundSize = "cover"

			document.getElementById('drag-dropResume').innerHTML = "Resume Attached ◕‿‿◕"
			document.getElementById('drag-dropResume').style.color = '#00BFFF'
		}
  }
  
  scrollToY(0, 1500, 'easeInOutQuint');
  return (
    <div className={mobileStudentProfilePageContainer}>

      <MobileStudentProfileBreadCrumbs totalStates={8} currentState={6} />

      {
        isUploadSupported()
          ? <div>
              <div className={largeHeader}>Almost there! Upload a profile picture and resume (if you have one).</div>
              <div className={smallHeader}>Recommended, although you can skip this section for now</div>

              <div className={profileItemsContainer}>

                <div className={profileItem}>
                   <Dropzone id="dropPhotoDiv" className={dropzoneBaseStyle} onDrop={onDrop} accept='image/*' multiple={false}>
                      { photo == "" ? 'Double-tap to select a photo' : ''}
                    </Dropzone>
                </div>

                <div className={profileItem}>
                   <Dropzone data-maxwidth="300" data-maxheight="300" id="dropResumeDiv" className={`${dropzoneBaseStyle} ${dropzoneResumeStyle}`} onDrop={onDropResume} accept='application/pdf' multiple={false}>
                      { resume == "" ? 'Double-tap to upload your resume' : 'Got it! Ready to upload.'}
                    </Dropzone>

                    <div className={linkForSite}>No resume? Check out <a target="_blank" href="http://ineedaresu.me/#/">ineedaresume.me</a>. {'They can help you make one super quick.'}</div>
                </div>

        
                <div className={navigationButtonsContainer}>
                  <div onClick={back} className={backButton}>Back</div>
                  <div onClick={next} className={nextButton}>Next</div>
                </div>
              </div> 
            </div>




          : <div>
              <div className={largeHeader}>Doesn't look like your device supports file uploads</div>
              <div className={smallHeader}>We wanted you to upload a photo and a resume. You can always do that from the desktop later.
                <br/><br/>
                Continue to complete your profile!
              </div>
               <div className={profileItemsContainer}>
                <div className={navigationButtonsContainer}>
                  <div onClick={back} className={backButton}>Back</div>
                  <div onClick={next} className={nextButton}>Next</div>
                </div>
              </div>
            </div>
      }
    </div>
  )
}
