import React, { PropTypes } from 'react'
import { ProfileField, StudentContainer } from 'modules/Profile'
import { Combobox, DropdownList, DateTimePicker, Calendar, Multiselect, SelectList} from 'react-widgets'
import Dropzone from 'react-dropzone'
import { pageContainer, profileField, profileHeader, error, container, input, shortInput, nameField,  emailField, dropDown, shortDropDown, mediumDropDown, longDropDown, dropzone, dropzoneContent, inlineDropzone, btn, saveBtnContainer, saveBtnList, saveBtnClicked, saveBtn, space} from '../styles/StudentProfileContainerStyles.css'
import ReactTooltip from 'react-tooltip'
import MaskedTextInput from 'react-text-mask'

var Moment = require('moment')
var momentLocalizer = require('react-widgets/lib/localizers/moment')

momentLocalizer(Moment)

export default function StudentProfile (props) {
 console.log(props)
 const messages = {
    emptyFilter: "Can't find your industry? Let us know at theunivjobs@gmail.com."
 }

  /** optionHighlightClick
   *  
   *  This selects the hasCar attribute and binds to the redux store
   *
   **/

  function optionHighlightClick(e) {
  	let fieldName = e.target.getAttribute('data-field-name')

	  switch(e.target.getAttribute('data-selection')) {
			case "0":
			  props.updateProfileField(fieldName, true, true)
			  return;
			case "1":
		    props.updateProfileField(fieldName, false, true)
		    return
			default:
			  return;
	  }
  }
  

  /* 
  *   Display the profile new profile picture when the user drags and drops or selects one.
  */
  function onDrop(files) {
    let dropPhotoDiv = document.getElementById('dropPhotoDiv')
    props.updateProfileField('photo', files[0], true)
    // Preview the image
    dropPhotoDiv.style.backgroundImage = `url('${files[0].preview}')` // blob
    dropPhotoDiv.style.backgroundSize = "cover"

    // Hide icon, text and border
    dropPhotoDiv.style.border = "0"
    document.getElementById('fa-user').style.visibility = "hidden"
    document.getElementById('drag-dropPhoto').style.visibility = "hidden"
  }

  function onDropResume(files) {
    let dropResumeDiv = document.getElementById('dropResumeDiv')
    props.updateProfileField('resume', files[0], true)
    // Preview the image

    // Preview the image
    dropResumeDiv.style.borderStyle = "solid" // blob
    dropResumeDiv.style.borderColor = "	#00BFFF" // blob
    dropResumeDiv.style.backgroundSize = "cover"

    document.getElementById('fa-pdf').style.color = "#00BFFF"
    document.getElementById('drag-dropResume').innerHTML = "Resume Uploaded ◕‿‿◕"
    document.getElementById('drag-dropResume').style.color = '#00BFFF'
  }

  return (
    <div className={pageContainer}>
    	<div className={profileHeader}>Complete your profile so we can find you a job today!</div>

			{/* EMAIL NOTIFICATIONS */}
			<StudentContainer title="My email notification preferences:"> 
			<li>
			  <DropdownList
			   className={props.propsErrorMap.emailPreferences ? mediumDropDown + ' ' + error : mediumDropDown}
			   valueField="id" textField="description"
			   data={props.emailPrefList}
			   value={props.emailPreferences}
               defaultValue={1}
			   messages={messages}
			   onChange={value => props.updateProfileField('emailPreferences', value, true)}
			 />
			</li>
			</StudentContainer>

			{/*FIRST NAME, LAST NAME*, STATUS */}
			<StudentContainer title="My name is">
			 <li>
			    <input
			     className={props.propsErrorMap.firstName ? input + ' ' + error : input}
			     type="text"
			     placeholder="First name"
			     onChange={(e)=> props.updateProfileField('firstName', e.target.value, true)}
			     value={props.firstName}
			     >
			    </input>
			 </li>
		 
			 <li>
			   <input
			    className={props.propsErrorMap.lastName ? input + ' ' + error : input}
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
			     className={props.propsErrorMap.studentStatus ? shortDropDown + ' ' + error : shortDropDown}
			     valueField="id" textField="status_text"
			     messages={messages}
			     data={props.studentStatusList}
			     value={props.studentStatus}
                 defaultValue={1}
			     onChange={value => props.updateProfileField('studentStatus', value, true)}
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
			    className={props.propsErrorMap.educationLevel ? shortDropDown + ' ' + error : shortDropDown}
			    valueField="id" textField="description"
			    messages={messages}
			    data={props.educationLevelList}
			    value={props.educationLevel}
                defaultValue={1}
			    onChange={value => props.updateProfileField('educationLevel', value, true)}
			   />
		         </li>
			 <li>
			   <p>from {props.school}</p>
			 </li>
			</StudentContainer>

			{/* START DATE & END DATE*/}
			<StudentContainer title="I enrolled in " 
			 styles={nameField}>
			 <DateTimePicker
			  className={props.propsErrorMap.enrollmentDate ? dropDown + ' ' + error :  dropDown}
			  time={false}
			  format='LL'
			  onChange={value => props.updateProfileField('enrollmentDate', value, true)}
			  value={props.enrollmentDate}
			 />	
			 <p>,and I will graduate in</p>
			 <DateTimePicker
			  className={props.propsErrorMap.graduationDate ? dropDown + ' ' + error : dropDown}
			  time={false}
			  format='LL'
			  onChange={value => props.updateProfileField('graduationDate', value, true)}
			  value={props.graduationDate}
			/>	
			</StudentContainer>

			{/* MAJOR */}
			<StudentContainer title="I am studying"
			  styles={nameField}>
			  <li>
			    <DropdownList
			      className={props.propsErrorMap.map ? longDropDown + ' ' +  error : longDropDown}
			      valueField="id" textField="major_text"
			      messages={messages}
			      data={props.majorsList}
			      value={props.major}
                  defaultValue={1}
			      onChange={value => props.updateProfileField('major', value, true)}
			     />
			  </li>
			  <li>
			    <i className="fa fa-info-circle fa-2x" aria-hidden="true" data-tip="Major not there? Please email us at univjobs@gmail.com and we will help you out"></i>
			    <ReactTooltip place="bottom"
			    	type="warning"
				effect="float"
			    />
			  </li>
			</StudentContainer>

			{/* GPA 
			   Validation must be a number

			*/}
			<StudentContainer title="My GPA is" 
			 styles={nameField}>
			 <li>
			    <input
			     
			     className={props.propsErrorMap.gpa ? input + ' ' + error : input}
			     type="number"
			     step="0.1"
			     max="100"
			     placeholder="GPA" 
			     onChange={(e) => props.updateProfileField('gpa', e.target.value, true)} 
			     value={props.gpa}
			     />
			 </li>
			 <li>
			   <p>or</p>
			 </li>
			 <li className={saveBtnList}>
			   <button className={saveBtn}>I do not have a GPA</button>
			 </li>
			</StudentContainer>

			{/* PERSONAL EMAIL
			  Can be empty
			*/}
			<StudentContainer title="My personal email is" 
			 styles={nameField}>
			 <li>
			  <input
			    className={props.propsErrorMap.personalEmail ? input + ' ' + error : input}
			    type="text"
			    placeholder="Email"
			    value={props.personalEmail}
			    onChange={(e) => props.updateProfileField('personalEmail', e.target.value, true)}
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

			{/* GENDER */}
			<StudentContainer title="I am " 
			 styles={nameField}>
			 <DropdownList
			  className={props.propsErrorMap.gender ? shortDropDown + ' ' + error : shortDropDown}
			  valueField="id" textField="gender_description"
			  messages={messages}
			  data={props.gendersList}
			  value={props.gender}
			  onChange={value => props.updateProfileField('gender', value, true)}
			/>	
			</StudentContainer>

			{/* SPORTS
			  Can be empty
			*/}
			<StudentContainer title="I"
			 styles={nameField}>
			 <li className={saveBtnList}>
			   <button className={saveBtn}>play</button>
			   <button className={saveBtn}>do not play</button>
			 </li>
			 <li className={space}>
			 	<p>on a sports team</p>
			 </li>
             <li>
			    <Multiselect
                   className={props.propsErrorMap.sportsTeam? shortInput + ' ' +  error : shortInput}
                   valueField='id' textField='sport'
                   placeholder='Basketball, Hockey'
                   messages={messages}
                   data={props.sportsList}
                   value={props.sportsTeam}
                   onChange={ value => props.updateProfileField('sportsTeam', value, true)}
                   />
             </li>
			</StudentContainer>

			{/* CLUB 
		    Can be empty
			*/} 
			<StudentContainer title="I " 
			 styles={nameField}>
			 <li className={saveBtnList}>
			   <button className={props.schoolClub != "" ? saveBtnClicked : saveBtn}>am</button>
			   <button className={props.schoolClub == "" ? saveBtnClicked : saveBtn}>am not</button>
			 </li>
			 <li className={space}>
			 	<p>on a school club</p>
			 </li>
            <li>
			 <Multiselect
			   className={props.propsErrorMap.schoolClub? shortInput + ' ' +  error : shortInput}
			   valueField='id' textField='club_name'
               placeholder='Toastmaster, Enactus'
			   messages={messages}
			   data={props.schoolClubList}
			   value={props.schoolClub}
			   onChange={ value => props.updateProfileField('schoolClub', value, true)}
			   />
            </li>
			</StudentContainer>

			{/* LANGUAGE
			  Can be empty
			*/}
			<StudentContainer title="I" 
			 styles={nameField}>
			 <li className={saveBtnList}>

			   <button className={props.languages.length >= 1 ? saveBtnClicked : saveBtn}
			   	data-selection="0"
				  data-field-name="languages">
				   	speak
				  </button>

			   <button className={props.languages.length == 0 ? saveBtnClicked : saveBtn}
			   	data-selection="1"
				  data-field-name="languages">
			   		do not speak
			   </button>

			 </li>
			 <li className={space}>
			 	<p>other languages</p>
			 </li>
			 <Multiselect
			   className={props.propsErrorMap.languages ? shortInput + ' ' +  error : shortInput}
			   textField='language'
			   valueField='id'
               placeholder='English, French'
			   messages={messages}
			   data={props.languagesList}
			   onChange={ value => props.updateProfileField('languages', value, true)}
			   value={props.languages}
			   />
			</StudentContainer>

			{/* CAR */}
			<StudentContainer title="I " styles={nameField}>
			 <li className={saveBtnList}>
			   <button className={props.hasCar ? saveBtnClicked : saveBtn} 
				   data-selection="0"
				   data-field-name="hasCar"
				   onClick={optionHighlightClick}
			    >
				    have
			    </button>
			   <button className={props.hasCar === false ? saveBtnClicked : saveBtn} 
				   data-selection="1"
				   data-field-name="hasCar"
				   onClick={optionHighlightClick}
			    >
				    do not have
			    </button>
			 </li>
			 <li className={space}>
			 	<p>a car on campus.</p>
			 </li>
			</StudentContainer>
			
			{/* EXPERIENCE
			  Can be empty
			*/} 
			<StudentContainer title="I recently worked at "      styles={nameField}>
			<li> 
		        <input
			   className={props.propsErrorMap.companyName ? input + ' ' + error : input }
			   type="text"
			   placeholder="Company Name"
			   value={props.companyName}
			   onChange={(e) => props.updateProfileField('companyName', e.target.value, true)}
			   >
			  </input>
			 </li>
			  <li>
			    <p>working as</p>
			  </li>
			  <li>
			   <input
			    className={props.propsErrorMap.position ? input + ' ' + error : input}
			    type="text"
			    placeholder="Position"
			    value={props.position}
			    onChange={(e) => props.updateProfileField('position', e.target.value, true)} 
			   >
			 </input>
			 </li>
			</StudentContainer>

			{/* FUN FACTS */}
			<StudentContainer title="A fun fact about me is ">
			<li>
			 <input
			   className={props.propsErrorMap.funFacts ? input + ' ' + error : input}
			   type="text"
			   placeholder="Example: I can juggles chainsaws, I can eat 60 hot dogs in 30 minutes"
			   onChange={(e) => props.updateProfileField('funFacts', e.target.value, true)}
			   value={props.funFacts}
			  >
			 </input>
			 </li>
			</StudentContainer>

			{/* CITY */}
			<StudentContainer title="My hometown is">
			 <input
			   className={props.propsErrorMap.hometown ? input + ' ' + error : input}
			   type="text"
			   placeholder="City"
			   value={props.hometown}
			   onChange={(e) => props.updateProfileField('hometown', e.target.value, true)}
			   >
			 </input>
			</StudentContainer>

			{/* HOBBIES */}
			<StudentContainer title="My favourite hobbies are"> 
			 <li>
			  <input
			   className={props.propsErrorMap.hobbies ? shortInput + ' ' + error : shortInput}
			   type="text"
			   placeholder="Playing guitar, Making movies, etc.."
			   onChange={(e) => props.updateProfileField('hobbies', e.target.value, true)}
			   value={props.hobbies}
			   >
			  </input>
			 </li>
			</StudentContainer>

		      {/* PHOTO & RESUME */}
		      <StudentContainer title="Take a business selfie">
		        <Dropzone id="dropPhotoDiv" className={props.propsErrorMap.photo ? dropzone + ' ' + error: dropzone} onDrop={onDrop} accept='image/*' multiple={false}>
		          <div className={dropzoneContent}>
		            <i id="fa-user" className={"fa fa-user fa-3x"} aria-hidden="true"></i>
		            <div id="drag-dropPhoto">Upload a photo</div>
		          </div>
		         </Dropzone>
			<p className={space}>,here is my resume</p>
        <Dropzone id="dropResumeDiv" className={props.propsErrorMap.resume ? dropzone + ' ' + error : dropzone} onDrop={onDropResume} accept='application/pdf' multiple={false}>
          <div className={dropzoneContent}>
            <i id="fa-pdf" className={"fa fa-file-pdf-o fa-3x"} aria-hidden="true"></i>
            <div id="drag-dropResume">Upload your resume</div>
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
