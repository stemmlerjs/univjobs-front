import React, { PropTypes } from 'react'
import { ProfileField } from 'modules/Profile'
import { profileContainer, profileHeader, profileField, profileFieldName, profileFieldContent, input,
  textarea, btn, dropzone, resetBtnContainer, dropzoneContent, photoIcon, saveBtnContainer, saveBtn,
  inlineDropzone, comboBox } from '../styles/EmployerProfileStyles.css'
import Dropzone from 'react-dropzone'
import { Link } from 'react-router'
import { Combobox } from 'react-widgets'
import 'react-widgets/lib/less/react-widgets.less'

export default function EmployerProfile (props) {
  console.log(props)

  const messages = {
    emptyFilter: "Press ENTER to add a new industry."
  }

  function onDrop(files) {
    console.log('Files:', files)
  }


  let isOpen = undefined;
  function enterPressCheck(event) {
    let keyCode = event.keyCode || event.charCode;
    if(keyCode === 13) {
      isOpen = false;
      isOpen = undefined
    }
  }

  return (
    <div className={profileContainer}>
      <div className={profileHeader}>MY BUSINESS PROFILE</div>
      <ProfileField title="Company Name">
        <input 
          className={input} 
          type="text" 
          placeholder="Pied Piper"
          value={props.companyName}
          onChange={(e) => props.updateProfileField('companyName', e.target.value, false)}
          ></input>
      </ProfileField>
      <ProfileField title="Industry">
        <Combobox
          className={comboBox}
          textField="industry"
          valueField="id"
          filter="startsWith"
          data={props.industryList} 
          onKeyUp={enterPressCheck}
          messages={messages}
          open={isOpen}
          onChange={value => props.updateProfileField('industry', value, false)}
        />
      </ProfileField>
      <ProfileField title="Logo">
        <Dropzone className={dropzone} onDrop={onDrop}>
            <div className={dropzoneContent}>
              <i className={"fa fa-camera " + photoIcon} aria-hidden="true"></i>
              <div>Drag and drop</div>
            </div>
          </Dropzone>
          <Dropzone className={inlineDropzone} onDrop={onDrop}>
            <button className={btn}>Change your picture</button>
          </Dropzone>
      </ProfileField>
      <ProfileField title="Business Website">
        <input 
          className={input} 
          value={props.website}
          onChange={(e) => props.updateProfileField('website', e.target.value, false)}
          type="text">
        </input>
      </ProfileField>
      <ProfileField title="Who we are">
        <textarea rows="6" className={textarea}
          value={props.description}
          onChange={(e) => props.updateProfileField('description', e.target.value, false)}>
        </textarea>
      </ProfileField>
      <ProfileField title="# of employees">
        <input 
          className={input} 
          type="text" 
          value={props.employeeCount}
          onChange={(e) => props.updateProfileField('employeeCount', e.target.value, false)}
          placeholder="You can say 50+">
        </input>
      </ProfileField>
      <ProfileField title="Office location">
        <input className={input} type="text" placeholder="Silicon Valley, California"></input>
      </ProfileField>
      <ProfileField title="Password reset">
        <div className={resetBtnContainer}>
          <button className={btn}>Reset Password</button>
        </div>
      </ProfileField>
      <div className={profileField}>
        <div className={saveBtnContainer}>
          <Link to="/categories"><button className={saveBtn}>Save</button></Link>
        </div>
      </div>
    </div>
  )
}
