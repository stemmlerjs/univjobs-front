import React, { PropTypes } from 'react'
import { ProfileField } from 'modules/Profile'
import { profileContainer, profileHeader, profileField, profileFieldName, profileFieldContent, input,
  textarea, btn, dropzone, resetBtnContainer, dropzoneContent, photoIcon, saveBtnContainer, saveBtn,
  inlineDropzone, comboBox, city, postalcode, citypostalcoderelative, dropPoint } from '../styles/EmployerProfileStyles.css'
import Dropzone from 'react-dropzone'
import { Link } from 'react-router'
import { Combobox } from 'react-widgets'
import 'react-widgets/lib/less/react-widgets.less'
import MaskedTextInput from 'react-text-mask'

export default function EmployerProfile (props) {
  console.log(props)

  // Filter messages for Comboboxes when not found
  const messages = {
    emptyFilter: "Can't find your industry? Let us know at theunivjobs@gmail.com."
  }

  // Display the profile new profile picture when the user drags and drops or selects one.
  function onDrop(files) {
    let dropPhotoDiv = document.getElementById('dropPhotoDiv')

    // Preview the image
    dropPhotoDiv.style.backgroundImage = `url('${files[0].preview}')` // blob
    dropPhotoDiv.style.backgroundSize = "cover"

    // Hide icon, text and border
    dropPhotoDiv.style.border = "0"
    document.getElementById('fa-camera').style.visibility = "hidden"
    document.getElementById('drag-drop').style.visibility = "hidden"
  }

  return (
    <div className={profileContainer}>
      <div className={profileHeader}>MY BUSINESS PROFILE</div>

      {/* COMPANY NAME */}
      <ProfileField title="Company Name">
        <input 
          className={input} 
          type="text" 
          placeholder="Pied Piper"
          value={props.companyName}
          onChange={(e) => props.updateProfileField('companyName', e.target.value, false)}
          ></input>
      </ProfileField>

    {/* INDUSTRY */}
      <ProfileField title="Industry">
        <Combobox
          className={comboBox}
          textField="industry"
          valueField="id"
          filter="contains"
          data={props.industryList} 
          messages={messages}
          onChange={value => props.updateProfileField('industry', value, false)}
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
          className={input} 
          type="number" 
          min="1"
          value={props.employeeCount}
          onChange={(e) => props.updateProfileField('employeeCount', e.target.value, false)}
          placeholder="5">
        </input>
      </ProfileField>

      {/* ADDRESS */}
      <ProfileField title="Address">
        <input className={input} 
          type="text" 
          placeholder="150 John St"
          onChange={(e) => props.updateProfileField('officeAddress', e.target.value, false)}>
        </input>
      </ProfileField>

      {/* CITY / POSTAL CODE*/}
      <ProfileField title="City / Postal Code">
        <input className={input + ' ' + city + ' ' + citypostalcoderelative} 
          type="text" 
          placeholder="Toronto"
          onChange={(e) => props.updateProfileField('officeCity', e.target.value, false)}>
        </input>
        <MaskedTextInput
          mask={[/[A-Z]/i, /\d/, /[A-Z]/i, ' ', /\d/, /[A-Z]/i, /\d/]}
          className={input + ' ' + postalcode + ' ' + citypostalcoderelative}
          placeholder="M5V 3E3"
          guide={false}
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
