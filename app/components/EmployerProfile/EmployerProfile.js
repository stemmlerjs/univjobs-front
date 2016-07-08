import React, { PropTypes } from 'react'
import { ProfileField } from 'components'
import { profileContainer, profileHeader, profileField, profileFieldName, profileFieldContent, input,
  textarea, btn, dropzone, resetBtnContainer, dropzoneContent, photoIcon, saveBtnContainer, saveBtn } from './styles.css'
import Dropzone from 'react-dropzone'
import { Link } from 'react-router'

export default function EmployerProfile (props) {
  function onDrop(files) {
    console.log('Files:', files)
  }

  return (
    <div className={profileContainer}>
      <div className={profileHeader}>MY BUSINESS PROFILE</div>
      <ProfileField title="Company Name">
        <input className={input} type="text" placeholder="Pied Piper"></input>
      </ProfileField>
      <ProfileField title="Industry">
        <input className={input} type="text" placeholder="Telecommunications"></input>
      </ProfileField>
      <ProfileField title="Logo">
        <Dropzone className={dropzone} onDrop={onDrop}>
            <div className={dropzoneContent}>
              <i className={"fa fa-camera " + photoIcon} aria-hidden="true"></i>
              <div>Drag and drop</div>
            </div>
          </Dropzone>
          <button className={btn}>Change your picture</button>
      </ProfileField>
      <ProfileField title="Business Website">
        <input className={input} type="text"></input>
      </ProfileField>
      <ProfileField title="Who we are">
        <textarea rows="6" className={textarea}></textarea>
      </ProfileField>
      <ProfileField title="# of employees">
        <input className={input} type="text" placeholder="You can say 50+"></input>
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