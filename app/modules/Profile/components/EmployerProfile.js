import React, { PropTypes } from 'react'
import { ProfileField } from 'modules/Profile'
import { profileContainer, profileHeader, profileField, profileFieldName, profileFieldContent, input,
  textarea, btn, dropzone, resetBtnContainer, dropzoneContent, photoIcon, saveBtnContainer, saveBtn,
  inlineDropzone, comboBox, city, postalcode, citypostalcoderelative, dropPoint, error, industryMargin } from '../styles/EmployerProfileStyles.css'
import Dropzone from 'react-dropzone'
import { Link } from 'react-router'
import { Combobox } from 'react-widgets'
import 'react-widgets/lib/less/react-widgets.less'
import MaskedTextInput from 'react-text-mask'
import _ from 'lodash'
import config from 'config'

export default function EmployerProfile (props) {
  console.log(props)
  const messages = {
    emptyFilter: "Can't find your industry? Let us know at theunivjobs@gmail.com."
  }

  // let photoDiv = document.getElementById('dropPhotoDiv')
  // if(photoDiv && props.logoUrl) {
  //   //photoDiv.style.backgroundImage = `url('${config.mediaUrl + props.logoUrl.substring(props.logoUrl.indexOf("/media/") + 7)}')` // blob
  // } 
  

  /* 
  *   Display the profile new profile picture when the user drags and drops or selects one.
  */
  function onDrop(files) {
    let dropPhotoDiv = document.getElementById('dropPhotoDiv')

    // Preview the image
    dropPhotoDiv.style.backgroundImage = `url('${files[0].preview}')` // blob
    dropPhotoDiv.style.backgroundSize = "cover"

    // Hide icon, text and border
    dropPhotoDiv.style.border = "0"
    document.getElementById('fa-camera').style.visibility = "hidden"
    document.getElementById('drag-drop').style.visibility = "hidden"

    props.updateProfileField('logoUrl', files[0], false)
  }


  return (
    <div className={profileContainer}>
      <div className={profileHeader}>MY BUSINESS PROFILE</div>

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
          textField="industry"
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
        <Dropzone id="dropPhotoDiv" className={dropzone} onDrop={onDrop} accept='image/*' multiple={false}>
          <div className={dropzoneContent}>
            <i id="fa-camera" className={"fa fa-camera " + photoIcon} aria-hidden="true"></i>
            <div id="drag-drop">Drag and drop</div>
          </div>
        </Dropzone>
        <Dropzone className={inlineDropzone} onDrop={onDrop} accept='image/*' multiple={false}>
          <button className={btn}>Change your picture</button>
        </Dropzone>
      </ProfileField>

    {/* BUSINESS WEBSITE */}
      <ProfileField title="Business Website">
        <input 
          className={input} 
          value={props.website}
          onChange={(e) => props.updateProfileField('website', e.target.value, false)}
          type="text">
        </input>
      </ProfileField>

    {/* DESCRIPTION */}
      <ProfileField title="Who we are">
        <textarea rows="6" className={textarea}
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
