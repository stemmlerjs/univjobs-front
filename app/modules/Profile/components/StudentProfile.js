/*StudentProfile
 *
 * This components is to display the form to create the student profile 
 *
 * */

// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { ProfileField, StudentProfileField } from 'modules/Profile'
import { Combobox, DropdownList, DateTimePicker, Calendar, Multiselect, SelectList} from 'react-widgets'
import Dropzone from 'react-dropzone'

// ==============THIRD PARTY IMPORTS========================= //
import ReactTooltip from 'react-tooltip'
import MaskedTextInput from 'react-text-mask'

// ================CSS IMPORTS============================== //
import { pageContainer, profileField, profileHeader, 
        container, shortInput, nameField,  
        emailField, dropDown, shortDropDown, 
        mediumDropDown, longDropDown, dropzone, 
        dropzoneContent, inlineDropzone, btn, 
        saveBtnContainer, saveBtnList, saveBtnClicked, 
        saveBtn, space, hideInput, showInput} from '../styles/StudentProfileContainerStyles.css'
import { error } from 'sharedStyles/error.css' 
import { input } from 'sharedStyles/widgets.css'


/*NOTE: moment is to format the time 
 *
 * */
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
			<StudentProfileField title="My email notification preferences:"> 
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
			</StudentProfileField>

			{/*FIRST NAME, LAST NAME*, STATUS */}
			<StudentProfileField title="My name is">
			 <li>
			    <input
			     className={props.propsErrorMap.firstName ? input + ' ' + error : input}
                 name="student[firstname]"
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
                 name="student[lastname]"
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
			</StudentProfileField>

			{/* DEGREE */}

			<StudentProfileField title="I am pursuing a " 
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
			</StudentProfileField>

			{/* START DATE & END DATE*/}
			<StudentProfileField title="I enrolled in " 
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
			</StudentProfileField>

			{/* MAJOR */}
			<StudentProfileField title="I am studying"
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
			</StudentProfileField>

			{/* GPA 
			   Validation must be a number

			*/}
			<StudentProfileField title="My GPA is" 
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
			</StudentProfileField>

			{/* PERSONAL EMAIL
			  Can be empty
			*/}
			<StudentProfileField title="My personal email is" 
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
			</StudentProfileField>

			{/* GENDER */}
			<StudentProfileField title="I am " 
			 styles={nameField}>
			 <DropdownList
			  className={props.propsErrorMap.gender ? shortDropDown + ' ' + error : shortDropDown}
			  valueField="id" textField="gender_description"
			  messages={messages}
			  data={props.gendersList}
			  value={props.gender}
			  onChange={value => props.updateProfileField('gender', value, true)}
			/>	
			</StudentProfileField>

			{/* SPORTS
			  Can be empty
			*/}
			<StudentProfileField title="I"
			 styles={nameField}>
			 <li className={saveBtnList}>
               <button className={props.sportsToggle ? saveBtnClicked : saveBtn} onClick={() => props.onHandleButtonToggle(true, 'sportsToggle') }>play</button>
			   <button className={props.sportsToggle ? saveBtn : saveBtnClicked} onClick={() => props.onHandleButtonToggle(false, 'sportsToggle') }>do not play</button>
			 </li>
			 <li className={space}>
			 	<p>on a sports team</p>
			 </li>
             <li className={props.sportsToggle ? showInput : hideInput}>
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
			</StudentProfileField>

			{/* CLUB 
		    Can be empty
			*/} 
			<StudentProfileField title="I " 
			 styles={nameField}>
			 <li className={saveBtnList}>
			   <button className={props.clubsToggle ? saveBtnClicked : saveBtn} onClick={() => props.onHandleButtonToggle(true, 'clubsToggle') }>am</button>
			   <button className={props.clubsToggle ? saveBtn : saveBtnClicked} onClick={() => props.onHandleButtonToggle(false, 'clubsToggle') }>am not</button>
			 </li>
			 <li className={space}>
			 	<p>on a school club</p>
			 </li>
            <li className={props.clubsToggle ? showInput : hideInput}>
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
			</StudentProfileField>

			{/* LANGUAGE
			  Can be empty
			*/}
			<StudentProfileField title="I" 
			 styles={nameField}>
			 <li className={saveBtnList}>
			   <button className={props.languagesToggle ? saveBtnClicked : saveBtn} onClick={() => props.onHandleButtonToggle(true, 'languagesToggle') }>speak</button>
			   <button className={props.languagesToggle ? saveBtn : saveBtnClicked} onClick={() => props.onHandleButtonToggle(false, 'languagesToggle') }>do not speak</button>
			 </li>
			 <li className={space}>
			 	<p>other languages</p>
			 </li>
            <li className={props.languagesToggle ? showInput : hideInput}>
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
            </li>
			</StudentProfileField>

			{/* CAR */}
			<StudentProfileField title="I " styles={nameField}>
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
			</StudentProfileField>
			
			{/* EXPERIENCE
			  Can be empty
			*/} 
			<StudentProfileField title="I recently worked at "      styles={nameField}>
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
			</StudentProfileField>

			{/* FUN FACTS */}
			<StudentProfileField title="A fun fact about me is ">
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
			  <li>
			    <i className="fa fa-info-circle fa-2x" aria-hidden="true" data-tip="No experience? Use this as a way to tell employers how great you are!"></i>
			    <ReactTooltip place="bottom"
			    	type="warning"
				effect="float"
			    />
			  </li>
			</StudentProfileField>

			{/* CITY */}
			<StudentProfileField title="My hometown is">
			 <input
			   className={props.propsErrorMap.hometown ? input + ' ' + error : input}
			   type="text"
			   placeholder="City"
			   value={props.hometown}
			   onChange={(e) => props.updateProfileField('hometown', e.target.value, true)}
			   >
			 </input>
			</StudentProfileField>

			{/* HOBBIES */}
			<StudentProfileField title="My favourite hobbies are"> 
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
			</StudentProfileField>

			{/* PHOTO & RESUME */}
			<StudentProfileField title="Take a business selfie">
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
      </StudentProfileField>
    {/* ======== SAVE BUTTON ======== */}
      <div>
        <div className={saveBtnContainer}>
          <button onClick={(e) => props.onSubmit(props)} className={saveBtn}>Save</button>
        </div>
      </div>
   </div>
  )
}
