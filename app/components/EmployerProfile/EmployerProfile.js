import React, { PropTypes } from 'react'
import { profileContainer, profileHeader, profileField, profileFieldName, profileFieldContent, input,
  textarea } from './styles.css'

export default function EmployerProfile (props) {
  return (
    <div className={profileContainer}>
      <div className={profileHeader}>MY BUSINESS PROFILE</div>
      <div className={profileField}>
        <div className={profileFieldName}>Company Name</div>
        <div className={profileFieldContent}>
          <input className={input} type="text" placeholder="Pied Piper"></input>
        </div>
      </div>
      <div className={profileField}>
        <div className={profileFieldName}>Industry</div>
        <div className={profileFieldContent}>
          <input className={input} type="text" placeholder="Telecommunications"></input>
        </div>
      </div>
      <div className={profileField}>
        <div className={profileFieldName}>Logo</div>
        <div className={profileFieldContent}></div>
      </div>
      <div className={profileField}>
        <div className={profileFieldName}>Business Website</div>
        <div className={profileFieldContent}>
          <input className={input} type="text"></input>
        </div>
      </div>
      <div className={profileField}>
        <div className={profileFieldName}>Who we are</div>
        <div className={profileFieldContent}>
          <textarea rows="6" className={textarea}></textarea>
        </div>
      </div>
      <div className={profileField}>
        <div className={profileFieldName}># of employees</div>
        <div className={profileFieldContent}>
          <input className={input} type="text" placeholder="You can say 50+"></input>
        </div>
      </div>
      <div className={profileField}>
        <div className={profileFieldName}>Office location</div>
        <div className={profileFieldContent}>
          <input className={input} type="text" placeholder="Silicon Valley, California"></input>
        </div>
      </div>
      <div className={profileField}>
        <div className={profileFieldName}>Password reset</div>
        <div className={profileFieldContent}></div>
      </div>
    </div>
  )
}