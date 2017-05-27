/*EmployerProfile
 *
 * This components is the form to create or update employers profile 
 *
 * */
// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { ProfileField } from 'modules/Profile'


// ==============THIRD PARTY IMPORTS========================= //
import MaskedTextInput from 'react-text-mask'
import Dropzone from 'react-dropzone'
import { Link } from 'react-router'
import { Combobox } from 'react-widgets'
import 'react-widgets/lib/less/react-widgets.less'
import _ from 'lodash'
import config from 'config'


// ================CSS IMPORTS============================== //
import { profileContainer, profileHeader, profileField, profileFieldName, profileFieldContent, input,
  textArea, dropzone, resetBtnContainer, dropzoneContent, photoIcon, saveBtnContainer, saveBtn,
  inlineDropzone, city, postalcode, citypostalcoderelative, dropPoint, error, industryMargin,
  profilePictureDragDropAlt, profilePictureDragDrop } from '../styles/EmployerProfileStyles.css'
import { btn } from 'sharedStyles/widgets.css'
import { title, comboBox } from 'sharedStyles/sharedComponentStyles.css'

/**
  * I'm including these as propTypes because I notice that there is some sort of inconsistency
  * when we want to update the Employer profile. Hopefully this will help us figure out exactly
  * what's going on here.
  *
  * - ks
  */

EmployerProfile.propTypes = {
  email: PropTypes.string.isRequired,
  dateJoined: PropTypes.object.isRequired,
  mobile: PropTypes.number.isRequired
}

export default function EmployerProfile (props) {
  console.log(props)

  /*
  * Miscellaneous messages.
  * emptyFilter - used in the dropdown for Industry
  */

  const messages = {
    emptyFilter: "Can't find your industry? Let us know at theunivjobs@gmail.com."
  }

  /*
  *  placePhoto()
  *
  *  Actually places the photo from the url specified onto the element.
  *  @param <element> - element
  *  @param String - url
  *  @return void
  */
function placePhoto(element, url) {
    // Update the LOGO div with the profile picture
    element.style.backgroundImage = url
    element.style.backgroundRepeat= "no-repeat";
    element.style.backgroundPosition= "center center";
    element.style.backgroundSize = "125%";

    // Hide icon, text and border
    element.style.border = "0"
    document.getElementById('fa-camera').style.visibility = "hidden"
    document.getElementById('drag-drop').style.visibility = "hidden"
  }

  /*
  *  onDrop()
  *
  *  Display the profile new profile picture when the user drags and drops or selects one.
  *  @param [] - files
  *  @return void
  */
  function onDrop(files) {
    // Update props with the File object (profile picture)
    props.updateProfileField('logoUrl', files[0], false)
  }


  /*
  * Place the logo from props onto the Profile Picture field.
  */

  var profilePic = {}

  if (typeof props.logoUrl == "string") {
    profilePic = {
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "104%"
    }

   /* 
    * We add this attribute separately to the style object because
    * initially in the React lifecycle, this prop will be "".
    * This results in a garbage request to "/" which obviously will
    * send back a 404. To stop these garbage 404s, we do this.
    */

    if (props.logoUrl != "") {
      profilePic.backgroundImage = `url(http://localhost:8000/${props.logoUrl.replace("\\", "/")})`
    }
  }

  if(typeof props.logoUrl == "object") {

    profilePic = {
      backgroundImage: `url('${props.logoUrl.preview}')`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "104%"
    }
  }

  return (
    <div className={profileContainer}>

      {/* COMPANY NAME */}
      <ProfileField title="Company Name">
        <input
          className={props.profileErrorsMap.companyName ? input + ' ' + error : input}
          type="text"
          placeholder="Pied Piper"
          value={props.companyName}
          onChange={(e) => props.updateProfileField('companyName', e.target.value, false)}
          ></input>
      </ProfileField>

    {/* INDUSTRY */}
      <ProfileField title="Industry" styles={industryMargin}>
        <Combobox
          className={props.profileErrorsMap.industry ? comboBox + ' ' + error : comboBox}
          textField="industry_text"
          valueField="id"
          filter="contains"
          data={props.industryList}
          messages={messages}
          onChange={value => props.updateProfileField('industry', value, false)}
          value={props.industry}
        />
      </ProfileField>

    {/* LOGO */}
      <ProfileField title="Logo">
        <Dropzone id="dropPhotoDiv" style={profilePic} className={props.profileErrorsMap.logoUrl ? dropzone + ' ' + error : 
          props.logoUrl == "" ? dropzone : dropzone + " " + profilePictureDragDropAlt} onDrop={onDrop} accept='image/*' multiple={false}>
          <div onDragOver={props.onDragOver} onDragLeave={props.onDragLeave} className={dropzoneContent}>
            <i id="fa-camera" className={"fa fa-camera " + photoIcon + props.logoUrl == "" ? " " : "gone"} aria-hidden="true"></i>
            <div id="drag-drop" className={props.logoUrl == "" ? "" : "gone"}>Drag and drop</div>
          </div>
        </Dropzone>
        <Dropzone className={inlineDropzone} onDrop={onDrop} accept='image/*' multiple={false}>
          <button className={btn}>Change your picture</button>
        </Dropzone>
      </ProfileField>

    {/* BUSINESS WEBSITE */}
      <ProfileField title="Business Website">
        <input
          className={props.profileErrorsMap.website ? input + ' ' + error : input}
          value={props.website}
          onChange={(e) => props.updateProfileField('website', e.target.value, false)}
          placeholder="https://example.com"          
          type="text">
        </input>
      </ProfileField>

    {/* DESCRIPTION */}
      <ProfileField title="Who we are">
        <textarea rows="4" cols="50" className={textArea}
          placeholder="Explain the company mission and what it does in a nice brief summary"
          value={props.description}
          onChange={(e) => props.updateProfileField('description', e.target.value, false)}>
        </textarea>
      </ProfileField>

    {/* EMPLOYEE COUNT */}
      <ProfileField title="# of employees">
        <input
          className={props.profileErrorsMap.employeeCount ? input + ' ' + error : input}
          type="number"
          min="1"
          value={props.employeeCount}
          onChange={(e) => props.updateProfileField('employeeCount', e.target.value, false)}
          placeholder="5">
        </input>
      </ProfileField>

      {/* ADDRESS */}
      <ProfileField title="Address">
        <input className={props.profileErrorsMap.officeAddress ? input + ' ' + error : input}
          type="text"
          placeholder="150 John St"
          value={props.officeAddress}
          onChange={(e) => props.updateProfileField('officeAddress', e.target.value, false)}>
        </input>
      </ProfileField>

      {/* CITY / POSTAL CODE*/}
      <ProfileField title="City / Postal Code">
        <input className={props.profileErrorsMap.officeCity ? input + ' ' + city + ' ' + citypostalcoderelative + ' ' + error : input + ' ' + city + ' ' + citypostalcoderelative}
          type="text"
          placeholder="Toronto"
          value={props.officeCity}
          onChange={(e) => props.updateProfileField('officeCity', e.target.value, false)}>
        </input>
        <MaskedTextInput
          mask={[/[A-Z]/i, /\d/, /[A-Z]/i, ' ', /\d/, /[A-Z]/i, /\d/]}
          className={props.profileErrorsMap.officePostalCode ? input + ' ' + postalcode + ' ' + citypostalcoderelative + ' ' + error : input + ' ' + postalcode + ' ' + citypostalcoderelative}
          placeholder="M5V 3E3"
          guide={false}
          value={props.officePostalCode}
          onChange={(e) => props.updateProfileField('officePostalCode', e.target.value, false)}
        />
      </ProfileField>

      {/* ======== PASSWORD RESET BUTTON ======== */}
      <ProfileField title="Password reset">
        <div className={resetBtnContainer}>
          <button className={btn}>Reset Password</button>
        </div>
      </ProfileField>

    {/* ======== SAVE BUTTON ======== */}
      <div className={profileField}>
        <div className={saveBtnContainer}>
          <button onClick={(e) => props.onSubmit(props)} className={saveBtn}>Save</button>
        </div>
      </div>
    </div>
  )
}
