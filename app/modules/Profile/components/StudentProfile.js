import React, { PropTypes } from 'react'
import { ProfileField, StudentContainer } from 'modules/Profile'
import { Combobox, DropdownList, DateTimePicker } from 'react-widgets'
import Dropzone from 'react-dropzone'
import { pageContainer, profileField, profileHeader, container, input, nameField,  emailField, dropDown, dropzone, dropzoneContent, inlineDropzone, btn, saveBtnContainer, saveBtn} from '../styles/StudentProfileContainerStyles.css'

export default function StudentProfile (props) {
 console.log(props)
 const messages = {
    emptyFilter: "Can't find your industry? Let us know at theunivjobs@gmail.com."
 }

 const data = [ 'Once a week if new jobs are posted' ,'Everytime a new job is posted', 'Once a day if new jobs are posted'
  ];

 const stat = ['Full-time student', 'Part-time student', 'Recent graduate'];

 const degree = ['Diploma', 'Associates', 'Bachelors', 'Masters', 'PHD'];

 const major = ['Software Development & Network Engineering', 'Makeup'];

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
	<StudentContainer title="My email notification preferences:"> 
	<li>
	  <DropdownList
	   className = {dropDown}
	   defaultValue={'Once a week if new jobs are posted'}
	   data={data}
	   messages={messages}
	 />
	</li>
	</StudentContainer>

	{/*FIRST NAME, LAST NAME*, STATUS */}
	<StudentContainer title="My name is">
	 <li>
	    <input
	     className={input}
	     type="text"
	     placeholder="First name">
	    </input>
	 </li>
 
	 <li>
	   <input
	    className={input}
	    type="text"
	    placeholder="Last Name">
	   </input>
	 </li> 

	 <li>
	   <p>, and I am a</p>
	 </li>
	 {/* STATUS */}
	 <li>
	   <DropdownList
	     className={dropDown}
	     defaultValue={'Full-time student'}
	     data={stat}
	      messages={messages}
 	    />	
	 </li> 
	 <li>
	   <p>student.</p>
	 </li>
	</StudentContainer>

	{/* DEGREE */}
	<StudentContainer title="I am pursuing a " 
	 styles={nameField}>
	 <li>
	   <DropdownList
	    className={dropDown}
	    defaultValue={'Diploma'}
	    data={degree}
	    messages={messages}
	   />
         </li>
	</StudentContainer>

	{/* START DATE */}
	<StudentContainer title="I enrolled in " 
	 styles={nameField}>
	 <DateTimePicker
	  className={dropDown}
	  format='mm YY'
	/>	
	 <DateTimePicker
	  className={dropDown}
	  format='mm YY'
	/>	
	</StudentContainer>

	{/* END DATE */}
	<StudentContainer title="And I will graduate in" 
	 styles={nameField}>
	 <DateTimePicker
	  className={dropDown}
	  format='mm YY'
	/>	
	 <DateTimePicker
	  className={dropDown}
	  format='mm YY'
	/>	
	</StudentContainer>

	{/* MAJOR */}
	<StudentContainer title="I am a"
	  styles={nameField}>
	  <li>
	    <DropdownList
	      className={dropDown}
	      defaultValue={'MAJOR'}
	      data={major}
	      messages={messages}
	     />
	  </li>
	</StudentContainer>

	{/* GPA */}
	<StudentContainer title="My GPA is" 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="GPA">
	 </input>
	</StudentContainer>

	{/* PERSONAL EMAIL */}
	<StudentContainer title="My personal email is" 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="Email">
	 </input>
	</StudentContainer>

	{/* GENDER */}
	<StudentContainer title="I am " 
	 styles={nameField}>
	 <DropdownList
	  className={dropDown}
	  defaultValue={'Gender'}
	  data={gender}
	  messages={messages}
	/>	
	</StudentContainer>

	{/* SPORTS */}
	<StudentContainer title="I play " 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="Sports team">
	 </input>
	</StudentContainer>

	{/* CLUB */}
	<StudentContainer title="I attend " 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="School club">
	 </input>
	</StudentContainer>

	{/* LANGUAGE */}
	<StudentContainer title="I speak " 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="languages">
	 </input>
	</StudentContainer>

	{/* CAR */}
	<StudentContainer title="I drive a car " 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="yes or no">
	 </input>
	</StudentContainer>
	
	{/* EXPERIENCE */}
	<StudentContainer title="I recently worked at " 
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
	</StudentContainer>

	{/* FUN FACTS */}
	<StudentContainer title="A fun fact about me is " 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="Example: I can juggles chainsaws">
	 </input>
	</StudentContainer>

	{/* CITY */}
	<StudentContainer title="My hometown is" 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="City">
	 </input>
	</StudentContainer>

	{/* HOBBIES */}
	<StudentContainer title="My favourite hobbies are" 
	 styles={nameField}>
	 <input
	   className={input}
	   type="text"
	   placeholder="Playing guitar, Making movies, etc..">
	 </input>
	</StudentContainer>

      {/* PHOTO & RESUME */}
      <StudentContainer title="Take a business selfie">
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
