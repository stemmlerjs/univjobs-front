import React, { PropTypes } from 'react'
import { ProfileField, StudentContainer } from 'modules/Profile'
import { Combobox, DropdownList, DateTimePicker, Calendar} from 'react-widgets'
import Dropzone from 'react-dropzone'
import { pageContainer, profileField, profileHeader, container, input, nameField,  emailField, dropDown, dropzone, dropzoneContent, inlineDropzone, btn, saveBtnContainer, saveBtnList, saveBtn, space} from '../styles/StudentProfileContainerStyles.css'

var Moment = require('moment')
var momentLocalizer = require('react-widgets/lib/localizers/moment')

momentLocalizer(Moment)

export default function StudentProfile (props) {
 console.log(props)
 const messages = {
    emptyFilter: "Can't find your industry? Let us know at theunivjobs@gmail.com."
 }

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
  }

    return (
      <div className={pageContainer}>
      	<div className={profileHeader}>Complete your profile so we can find you a job today!</div>

	{/* EMAIL NOTIFICATIONS */}
	<StudentContainer title="My email notification preferences:"> 
	<li>
	  <DropdownList
	   className = {dropDown}
	   defaultValue={props.emailPrefList[2]}
	   textField="email_pref"
	   valueField="id"
	   messages={messages}
	   data={props.emailPrefList}
	   onChange={value => props.updateProfileField('emailPreference',value ,true)}
	   value={props.emailPreferences}
	 />
	</li>
	</StudentContainer>

	{/*FIRST NAME, LAST NAME*, STATUS */}
	<StudentContainer title="My name is">
	 <li>
	    <input
	     className={input}
	     type="text"
	     placeholder="First name"
	     onChange={(e)=> props.updateProfileField('firstName', e.target.value, true)}
	     value={props.firstName}
	     >
	    </input>
	 </li>
 
	 <li>
	   <input
	    className={input}
	    type="text"
	    placeholder="Last Name"
	    onChange={(e)=> props.updateProfileField('lastName', e.target.value, true)}
	    value={props.lastName}
	    >
	    </input>
	 </li> 

	 <li>
	   <p>, and I am a</p>
	 </li>
	 
	 {/* STATUS */}
	 <li>
	   <DropdownList
	     className={dropDown}
	     defaultValue={props.studentStatusList[0]}
	     textField="status"
	     valueField="id"
	     messages={messages}
	     data={props.studentStatusList}
	     onChange={value => props.updateProfileField('studentStatus', value, false)}
	     value={props.studentStatus}
 	    />
	 </li> 
	</StudentContainer>
/*
	{/* DEGREE *

	<StudentContainer title="I am pursuing a " 
	 styles={nameField}>
	 <li>
	   <DropdownList
	    className={dropDown}
	    defaultValue={'Diploma'}
	    messages={messages}
	    //data={props.degreeName}
	     onChange={value => props.updateProfileField('degreeName', value, false)}
	   />
         </li>
	</StudentContainer>

	{/* START DATE & END DATE 
	<StudentContainer title="I enrolled in " 
	 styles={nameField}>
	 <DateTimePicker
	  className={dropDown}
	  time={false}
	  format='LL'	
	  value={props.enrollmentDate}
	  onChange={value => props.updateProfileField('enrollmentDate', value, false)}
	 />	
	 <p>,and I will graduate in</p>
	 <DateTimePicker
	  className={dropDown}
	  time={false}
	  format='LL'
	  value={props.graduationDate}
	  onChange={value => props.updateProfileField('graduationDate', value, false)}
	/>	
	</StudentContainer>

	{/* MAJOR *
	<StudentContainer title="I am a"
	  styles={nameField}>
	  <li>
	    <DropdownList
	      className={dropDown}
	      defaultValue={'MAJOR'}
	      //data={props.major}
	      messages={messages}
	      onChange={value => props.updateProfileField('major', value, false)}
	     />
	  </li>
	</StudentContainer>

	{/* GPA *
	<StudentContainer title="My GPA is" 
	 styles={nameField}>
	 <li>
	    <input
	     className={input}
	     type="text"
	     placeholder="GPA" 
	     value={props.gpa}
	     onChange={value => props.updateProfileField('gpa', value, false)} 
	     >
	    </input>
	 </li>
	 <li>
	   <p>or</p>
	 </li>
	 <li className={saveBtnList}>
	   <button className={saveBtn}>I do not have a GPA</button>
	 </li>
	</StudentContainer>

	{/* PERSONAL EMAIL
	<StudentContainer title="My personal email is" 
	 styles={nameField}>
	 <li>
	  <input
	    className={input}
	    type="text"
	    placeholder="Email"
	    value={props.personalEmail}
	    onChange={value => props.updateProfileField('personalEmail', value, false)}
	    >
	  </input>
	 </li> 
	 <li>
	   <p>or</p>
	 </li>
	 <li className={saveBtnList}>
	   <button className={saveBtn}>I prefer school email</button>
	 </li>
	</StudentContainer>

	{/* GENDER 
	<StudentContainer title="I am " 
	 styles={nameField}>
	 <DropdownList
	  className={dropDown}
	  defaultValue={'Gender'}
	  //data={props.gender}
	  messages={messages}
	  onChange={value => props.updateProfileField('gender', value, false)}
	/>	
	</StudentContainer>

	{/* SPORTS
	<StudentContainer title="I"
	 styles={nameField}>
	 <li className={saveBtnList}>
	   <button className={saveBtn}>play</button>
	   <button className={saveBtn}>do not play</button>
	 </li>
	 <li className={space}>
	 	<p>on a sports team</p>
	 </li>
	 <input
	   className={input}
	   type="text"
	   placeholder="Type the schools sports team"
	   value={props.sportsTeam}
	   onChange={value => props.updateProfileField('sportsTeam', value, false)}
	   >
	 </input>
	</StudentContainer>

	{/* CLUB 
	<StudentContainer title="I " 
	 styles={nameField}>
	 <li className={saveBtnList}>
	   <button className={saveBtn}>am</button>
	   <button className={saveBtn}>am not</button>
	 </li>
	 <li className={space}>
	 	<p>on a school club</p>
	 </li>
	 <input
	   className={input}
	   type="text"
	   placeholder="Type the school clubs names"
	   value={props.schoolClub}
	   onChange={value => props.updateProfileField('schoolClub', value, false)}
	   >
	 </input>
	</StudentContainer>

	{/* LANGUAGE
	<StudentContainer title="I" 
	 styles={nameField}>
	 <li className={saveBtnList}>
	   <button className={saveBtn}>speak</button>
	   <button className={saveBtn}>do not speak</button>
	 </li>
	 <li className={space}>
	 	<p>other languages</p>
	 </li>
	 <input
	   className={input}
	   type="text"
	   placeholder="Type the languages you speak "
	   value={props.language}
	   onChange={value => props.updateProfileField('language', value, false)}
	   >
	 </input>
	</StudentContainer>

	{/* CAR 
	<StudentContainer title="I " 
	 styles={nameField}>
	 <li className={saveBtnList}>
	   <button className={saveBtn}>drive</button>
	   <button className={saveBtn}>do not drive</button>
	 </li>
	 <li className={space}>
	 	<p>a car on campus.</p>
	 </li>
	</StudentContainer>
	
	{/* EXPERIENCE 
	<StudentContainer title="I recently worked at " 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="Company Name"
	   value={props.companyName}
	   onChange={value => props.updateProfileField('companyName', value, false)}
	   >
	 </input>
	 <p>working as</p>
	 <input
	   className={input}
	   type="text"
	   placeholder="Position"
	   value={props.position}
	   onChange={value => props.updateProfileField('position', value, false)}
	   
	   >
	 </input>
	</StudentContainer>

	{/* FUN FACTS 
	<StudentContainer title="A fun fact about me is " 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="Example: I can juggles chainsaws">
	 </input>
	</StudentContainer>

	{/* CITY 
	<StudentContainer title="My hometown is" 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="City"
	   value={props.hometown}
	   onChange={value => props.updateProfileField('hometown', value, false)}
	   >
	 </input>
	</StudentContainer>

	{/* HOBBIES 
	<StudentContainer title="My favourite hobbies are" 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="Playing guitar, Making movies, etc.."
	   value={props.hobbies}
	   onChange={value => props.updateProfileField('firstName', value, false)}
	   >
	 </input>
	</StudentContainer>

      {/* PHOTO & RESUME 
      <StudentContainer title="Take a business selfie">
        <Dropzone id="dropPhotoDiv" className={dropzone} onDrop={onDrop} accept='image/*' multiple={false}>
          <div className={dropzoneContent}>
            <i id="fa-camera" className={"fa fa-camera "} aria-hidden="true"></i>
            <div id="drag-drop"></div>
          </div>
        </Dropzone>
	<p>,here is my resume</p>
        <Dropzone id="dropPhotoDiv" className={dropzone} onDrop={onDrop} accept='image/*' multiple={false}>
          <div className={dropzoneContent}>
            <i id="fa-camera" className={"fa fa-camera "} aria-hidden="true"></i>
            <div id="drag-drop"></div>
          </div>
        </Dropzone>
      </StudentContainer>

    {/* ======== SAVE BUTTON ======== */}
      <div className={profileField}>
        <div className={saveBtnContainer}>
          <button onClick={(e) => props.onSubmit(props)} className={saveBtn}>Save</button>
        </div>
      </div>
   </div>
  )
}
