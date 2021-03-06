

import React, { PropTypes } from 'react'

import config from 'config'
import Dropzone from 'react-dropzone'

import { feedbackFormClosed, feedbackFormOpen, formOpen_topBar, formOpen_body,
  formOpen_intro, formOpen_heading, formOpen_input, formOpen_textarea,
  formOpen_checkboxContainer, formOpen_checkbox, formOpen_submitButton,
  formOpen_heading_span, error, submitting, submitMessageSuccess, submitMessageError,
  screenshotDropzone, screenshotDropzoneUploaded, longReqMessage } from '../styles/FeedbackForm.css'

export default function FeedbackForm ({ isOpen, isSubmitting, submitSuccess, submitFailure,
    title,
    description,
    screenshot,
    errorsMap,

    showLongRequestMessage,

    toggleFeedbackFormOpen,
    checkForFormErrors,
    updateFeedbackForm,
    submitFeedbackForm
}) {
  return (
    <div>
      { !isOpen
        ? <div className={feedbackFormClosed} onClick={toggleFeedbackFormOpen}>
            <div>Feedback</div>
            <div><i className={"fa fa-plus"} aria-hidden="true"></i></div>
          </div>
        : <div className={feedbackFormOpen}>
            <div className={formOpen_topBar} onClick={toggleFeedbackFormOpen}>
              <div>Feedback</div>
              <div><i className={"fa fa-minus"} aria-hidden="true"></i></div>
            </div>
            {
              /*
               * The feedback form body
               */
            }
            <div className={formOpen_body}>

              <div className={formOpen_intro}>Hi! Thanks for testing out our app. Please let us know how we can make it better.</div>

              <div className={formOpen_heading}>Title <span className={formOpen_heading_span}>
                [{title.length} of 40 characters used]</span></div>
              <input 
                onChange={(e) => updateFeedbackForm('title', e.target.value)}
                value={title}
                onBlur={() => checkForFormErrors(title, description)} 
                className={errorsMap.title ? formOpen_input + ' ' + error : formOpen_input} 
                type="text"/>

              <div className={formOpen_heading}>Description <span className={formOpen_heading_span}>
                [{description.length} of 500 characters used]</span></div>
              <textarea 
                onChange={(e) => updateFeedbackForm('description', e.target.value)}
                value={description}
                onBlur={() => checkForFormErrors(title, description)} 
                className={errorsMap.description ? formOpen_textarea + ' ' + error : formOpen_textarea}/>
              {/* 
              <div className={formOpen_checkboxContainer}>
                <input checked={includeScreenshot} onChange={(e) => updateFeedbackForm('includeScreenshot')} className={formOpen_checkbox} type="checkbox"/>
                <div>Include screenshot?</div>
              </div>
              */}

              <div className={formOpen_heading}>Upload screenshot <span className={formOpen_heading_span}>
                [Optional]</span></div>
              <Dropzone className={screenshot !== null ? screenshotDropzoneUploaded : screenshotDropzone}
                onDragOver={() => {
                  console.log("currently being dragged over")
                }} 
                onDragLeave={() => {
                  console.log("done being dragged over")
                }} 
                onDropAccepted={(files) => {
                  // file[0]
                  console.log("accepted drop", files)
                  updateFeedbackForm('screenshot', files[0])
                }}
                accept='image/*' 
                multiple={false}>
                {screenshot === null ? 'Drop screenshot here!' : 'Thanks :) Ready to upload.'}
              </Dropzone>

              {
                submitSuccess
                  ? <div className={submitMessageSuccess}>Feedback received. Thank you!</div>
                  : ''
              }

              {
                submitFailure
                  ? <div className={submitMessageError}>Couldn't send. Please try again.</div>
                  : ''
              }

                <button 
                  onClick={() => {
                    if (!isSubmitting) {
                      submitFeedbackForm(title, description, screenshot)
                    }
                  }} 
                  className={!isSubmitting ? formOpen_submitButton : submitting + ' ' + formOpen_submitButton}>Submit feedback</button>
              
              {
                showLongRequestMessage
                  ? <div className={longReqMessage}>While it seems a little slow, don't worry- it's still sending! Thank you!</div>
                  : ''
              }
              
            </div>
          </div>
      }
    </div>
  )
}