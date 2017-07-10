
/*
 * Profile Picture component.
 * An editable component. We can delete and we can edit.
 * 
 * Also, we're probably going to need to integrate this with some sort of cropping
 * in the future.
 */

import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'

const ProfilePicture = ({ url, onDrop }) => (
  <div>
    { url === "" || url === null || url === undefined
      ? <div>
        {
          /*
           * Basic view. This is what it will look like if we haven't uploaded
           * a picture yet.
           */
        }
        <Dropzone id="dropPhotoDiv" style={profilePic} className={props.propsErrorMap.photo ? dropzone + ' ' + error 
					: props.photo == "" 
						? dropzone 
						: dropzone + " " + profilePictureDragDropAlt} onDrop={onDrop} accept='image/*' multiple={false}>
					<div className={dropzoneContent} className={props.photo == "" ? "" : "gone"}>
						<i id="fa-user" className={props.photo == "" ? "fa fa-user fa-3x" : "gone"} aria-hidden="true"></i>
						<div className={props.photo == "" ? "" : "gone"} id="drag-dropPhoto" >Upload a photo</div>
					</div>
					</Dropzone>
        </div>
      : <div>
        {
          /*
           * Edit/delete view. This is what it will look like after we've uploaded 
           * a picture.
           */
        }
        </div>
    }
  </div>
)

export default ProfilePicture
