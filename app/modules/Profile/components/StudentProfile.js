import React, { PropTypes } from 'react'
import { ProfileField } from 'modules/Profile'
import { Combobox, DropdownList, DateTimePicker } from 'react-widgets'
import Dropzone from 'react-dropzone'
import { pageContainer, profileField, profileHeader, input, nameField,  emailField, dropDown, dropzone, dropzoneContent, inlineDropzone, btn, saveBtnContainer, saveBtn} from '../styles/StudentProfileContainerStyles.css'

export default function StudentProfile (props) {
 console.log(props)
 const messages = {
    emptyFilter: "Can't find your industry? Let us know at theunivjobs@gmail.com."
 }

 const data = [ 'Once a week if new jobs are posted' ,'Everytime a new job is posted', 'Once a day if new jobs are posted'
  ];

 const stat = ['Full-time student', 'Part-time student', 'Recent graduate'];

 const degree = ['Diploma', 'Associates', 'Bachelors', 'Masters', 'PHD'];

 const major = ['Software', 'Makeup'];

 const gender = ['Male', 'Female'];

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
	<ProfileField title="My email notification:" styles={emailField}>
	 <DropdownList
	  className={dropDown}
	  defaultValue={'Once a week if new jobs are posted'}
	  data={data}
	  messages={messages}
	/>	
	</ProfileField>

	{/*FIRST NAME, LAST NAME*/}
	<ProfileField title="My name is" 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="First name">
	 </input>

	 <input
	   className={input}
	   type="text"
	   placeholder="Last Name">
	 </input>
	</ProfileField>

	{/* STATUS */}
	<ProfileField title="I am a" 
	 styles={nameField}>
	 <DropdownList
	  className={dropDown}
	  defaultValue={'Full-time student'}
	  data={stat}
	  messages={messages}
	/>	
	</ProfileField>

	{/* DEGREE */}
	<ProfileField title="I am pursuing a " 
	 styles={nameField}>
	 <DropdownList
	  className={dropDown}
	  defaultValue={'Diploma'}
	  data={degree}
	  messages={messages}
	/>	
	</ProfileField>

	{/* START DATE */}
	<ProfileField title="I enrolled in " 
	 styles={nameField}>
	 <DateTimePicker
	  className={dropDown}
	  format='mm YY'
	/>	
	 <DateTimePicker
	  className={dropDown}
	  format='mm YY'
	/>	
	</ProfileField>

	{/* END DATE */}
	<ProfileField title="I will graduate in" 
	 styles={nameField}>
	 <DateTimePicker
	  className={dropDown}
	  format='mm YY'
	/>	
	 <DateTimePicker
	  className={dropDown}
	  format='mm YY'
	/>	
	</ProfileField>

	{/* MAJOR */}
	<ProfileField title="I am a" 
	 styles={nameField}>
	 <DropdownList
	  className={dropDown}
	  defaultValue={'MAJOR'}
	  data={major}
	  messages={messages}
	/>	
	</ProfileField>

	{/* GPA */}
	<ProfileField title="My GPA is" 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="GPA">
	 </input>
	</ProfileField>

	{/* PERSONAL EMAIL */}
	<ProfileField title="My personal email is" 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="Email">
	 </input>
	</ProfileField>

	{/* GENDER */}
	<ProfileField title="I am " 
	 styles={nameField}>
	 <DropdownList
	  className={dropDown}
	  defaultValue={'Gender'}
	  data={gender}
	  messages={messages}
	/>	
	</ProfileField>

	{/* SPORTS */}
	<ProfileField title="I play " 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="Sports team">
	 </input>
	</ProfileField>

	{/* CLUB */}
	<ProfileField title="I attend " 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="School club">
	 </input>
	</ProfileField>

	{/* LANGUAGE */}
	<ProfileField title="I speak " 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="languages">
	 </input>
	</ProfileField>

	{/* CAR */}
	<ProfileField title="I drive a car " 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="yes or no">
	 </input>
	</ProfileField>

	{/* EXPERIENCE */}
	<ProfileField title="I recently worked at " 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="Company Name">
	 </input>
	 <p>working as</p>
	 <input
	   className={input}
	   type="text"
	   placeholder="Position">
	 </input>
	</ProfileField>

	{/* FUN FACTS */}
	<ProfileField title="A fun fact about me is " 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="Example: I can juggles chainsaws">
	 </input>
	</ProfileField>

	{/* CITY */}
	<ProfileField title="My hometown is" 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="City">
	 </input>
	</ProfileField>

	{/* HOBBIES */}
	<ProfileField title="My favourite hobbies are" 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="Playing guitar, Making movies, etc..">
	 </input>
	</ProfileField>

      {/* PHOTO & RESUME */}
      <ProfileField title="Take a business selfie">
        <Dropzone id="dropPhotoDiv" className={dropzone} onDrop={onDrop} accept='image/*' multiple={false}>
          <div className={dropzoneContent}>
            <i id="fa-camera" className={"fa fa-camera "} aria-hidden="true"></i>
            <div id="drag-drop"></div>
          </div>
        </Dropzone>

        <Dropzone id="dropPhotoDiv" className={dropzone} onDrop={onDrop} accept='image/*' multiple={false}>
          <div className={dropzoneContent}>
            <i id="fa-camera" className={"fa fa-camera "} aria-hidden="true"></i>
            <div id="drag-drop"></div>
          </div>
        </Dropzone>
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
