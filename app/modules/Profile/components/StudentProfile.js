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

import config from 'config'

// ==============THIRD PARTY IMPORTS========================= //
import ReactTooltip from 'react-tooltip'
import MaskedTextInput from 'react-text-mask'

// ================CSS IMPORTS============================== //
import { pageContainer, profileField, profileHeader, 
        container, shortInput, nameField,  
        emailField, dropDown, shortDropDown, 
        mediumDropDown, longDropDown, dropzone, 
        dropzoneContent, inlineDropzone, btn, 
        saveBtnContainer, saveBtnList, saveBtnClicked,  notActive, personalEmailStyle,
        saveBtn, space, hideInput, showInput, textArea, unselectedButton,
				profilePictureDragDropAlt, savedResumeView, actualSaveBtn, pageItemsContainer, materialStyle } from '../styles/StudentProfileContainerStyles.css'
import { error } from 'sharedStyles/error.css' 
import { input } from 'sharedStyles/widgets.css'


/*NOTE: moment is to format the time 
 *
 * */
var Moment = require('moment')
var momentLocalizer = require('react-widgets/lib/localizers/moment')

momentLocalizer(Moment)

export default function StudentProfile (props) {
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


	/*
  * Place the logo from props onto the Profile Picture field.
  */

  var profilePic = {}

  if (typeof props.photo == "string") {
    profilePic = {
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "104%"
    }

   /* 
    * We add this attribute separately to the style object because
    * initially in the React lifecycle, this prop will be "".
    * This results in a garbage request to "/" which obviously will
    * send back a 404. To stop these garbage 404s, we do this.
    */

    if (props.photo != "") {
      profilePic.backgroundImage = `url(${config.mediaUrl}/avatar/${props.photo.replace("\\", "/")})`
    }
  }

  if(typeof props.photo == "object") {

    profilePic = {
      backgroundImage: `url('${props.photo.preview}')`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "104%"
    }
  }

  return (
    <div id="st_profile" className={pageItemsContainer}>
    	<div className={profileHeader}>Complete your profile so we can find you a job today!</div>

			{/* EMAIL NOTIFICATIONS */}
			<StudentProfileField title="My email notification preferences:"> 
			<li>
			  <DropdownList
			   className={props.propsErrorMap.emailPreferences ? `${mediumDropDown} ${error} ${materialStyle}` : `${mediumDropDown} ${materialStyle}`}
			   valueField="id" textField="description"
			   data={props.emailPrefList}
			   value={props.emailPreferences}
			   messages={messages}
			   onChange={value => props.updateProfileField('emailPreferences', value.id, true)}
			 />
			</li>
			</StudentProfileField>

			{/*FIRST NAME, LAST NAME*, STATUS */}
			<StudentProfileField title="My name is">
			 <li>
			    <input
			     className={props.propsErrorMap.firstName ? `${input} ${error} ${materialStyle}` : `${input} ${materialStyle}`}
           name="student[firstname]"
			     type="text"
			     placeholder="First name"
			     onBlur={(e)=> props.updateProfileField('firstName', e.target.value, true)}
			     id="student_firstName"
			     >
			    </input>
			 </li>
		 
			 <li>
			   <input
			    className={props.propsErrorMap.lastName ? `${input} ${materialStyle} ${error}` : `${input} ${materialStyle}`}
          name="student[lastname]"
			    type="text"
			    placeholder="Last Name"
			    onBlur={(e)=> props.updateProfileField('lastName', e.target.value, true)}
			    id="student_lastName"
			    >
			    </input>
			 </li> 
			</StudentProfileField>

			<StudentProfileField title="I am a ">
			 
			 {/* STATUS */}
			 <li>
			  <DropdownList
			     className={props.propsErrorMap.studentStatus ? `${shortDropDown} ${error} ${materialStyle}` : `${shortDropDown} ${materialStyle}`}
			     valueField="id" textField="status_text"
			     messages={messages}
			     data={props.studentStatusList}
			     value={props.studentStatus}
                 defaultValue={1}
			     onChange={value => props.updateProfileField('studentStatus', value.id, true)}
		 	    />
			 </li> 
			 <li>
			    <p>student.</p>
			 </li>
			</StudentProfileField>

			{/* DEGREE */}

			<StudentProfileField title={props.studentStatus == 3 ? 'I have a ' : "I am pursuing a " }
			 styles={nameField}>
			 <li>
			   <DropdownList
			    className={props.propsErrorMap.educationLevel ? `${shortDropDown}  ${error} ${materialStyle}` : `${shortDropDown} ${materialStyle}`}
			    valueField="id" textField="description"
			    messages={messages}
			    data={props.educationLevelList}
			    value={props.educationLevel}
                defaultValue={1}
			    onChange={value => props.updateProfileField('educationLevel', value.id, true)}
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
			  className={props.propsErrorMap.enrollmentDate ? `${dropDown} ${error} ${materialStyle}` :  `${dropDown} ${materialStyle}`}
			  time={false}
			  format='LL'
			  onChange={value => props.updateProfileField('enrollmentDate', value, true)}
			  value={props.enrollmentDate}
			 />	
			 <p> and I will graduate in</p>
			 <DateTimePicker
			  className={props.propsErrorMap.graduationDate ? `${dropDown} ${error} ${materialStyle}` : `${dropDown} ${materialStyle}`}
			  time={false}
			  format='LL'
			  onChange={value => props.updateProfileField('graduationDate', value, true)}
			  value={props.graduationDate}
			/>	
			</StudentProfileField>

			{/* MAJOR */}
			<StudentProfileField title={props.studentStatus == 3 ? 'I studied ' : "I am studying " }
			  styles={nameField}>
			  <li>
			    <DropdownList
			      className={props.propsErrorMap.map ? `${longDropDown} ${error} ${materialStyle}` : `${longDropDown} ${materialStyle}`}
			      valueField="id" textField="major_text"
			      messages={messages}
			      data={props.majorsList}
			      value={props.major}
                  defaultValue={1}
			      onChange={value => props.updateProfileField('major', value.id, true)}
			     />
			  </li>
			  <li>
			    <i className="fa fa-info-circle fa-2x" aria-hidden="true" data-tip="Major not there? Please email us at univjobscanada@gmail.com and we will help you out"></i>
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
			     
			     className={props.propsErrorMap.gpa ? `${input} ${error} ${materialStyle}` 
					 	: props.gpa == null || props.gpa == 0 || props.gpa == "0.00" ? `${input} ${notActive}  ${materialStyle}` : `${input} ${materialStyle}`}
			     type="number"
			     step="0.01"
			     max="4"
			     placeholder="GPA(0.00 - 4.00)" 
			     onChange={(e) => {props.updateProfileField('gpa', e.target.value, true); props.onHandleButtonToggle(false, 'gpaToggle')}} 
			     value={props.gpa}
			     />
			 </li>
			 <li>
			   <p>or</p>
			 </li>
			 <li className={saveBtnList}>
               <button className={props.gpa == null || props.gpa == 0 || props.gpa == "0.00" ? `${saveBtnClicked} ${materialStyle}` : `${unselectedButton} ${materialStyle}`} 
                                onClick={(e) => {props.onHandleButtonToggle(true, 'gpaToggle'); props.updateProfileField('gpa', '0.00', true)}}>
                    I do not have a GPA
                </button>
			 </li>
			</StudentProfileField>

			{/* PERSONAL EMAIL
			  Can be empty
			*/}
			<StudentProfileField title="My personal email is" 
			 styles={nameField}>
			 <li>
			  <input
			    className={props.propsErrorMap.personalEmail 
						? `${materialStyle} ${input} ${error}` 
						: props.personalEmail != "" 
							? `${materialStyle} ${input} ${personalEmailStyle}` 
							: `${materialStyle} ${input} ${personalEmailStyle} ${notActive}`}
			    type="text"
			    placeholder="Email"
			    id="student_personalEmail"
			    onChange={(e) => {props.updateProfileField('personalEmail', e.target.value, true); props.onHandleButtonToggle(false, 'emailToggle')}}
			    >
			  </input>
			 </li> 
			 <li>
			   <p>or</p>
			 </li>
			 <li className={saveBtnList}>
               <button className={props.personalEmail == "" || props.personalEmail == null 
							 		? `${materialStyle} ${saveBtnClicked}` 
									: `${materialStyle} ${unselectedButton}`} 
							 	onClick={() => props.updateProfileField('personalEmail', "", true) }>I prefer school email</button>
			 </li>
			</StudentProfileField>

			{/* GENDER */}
			<StudentProfileField title="I am " 
			 styles={nameField}>
			 <DropdownList
			  className={props.propsErrorMap.gender ? `${shortDropDown} ${materialStyle} ${error}` : `${shortDropDown} ${materialStyle}`}
			  valueField="id" textField="gender_description"
			  messages={messages}
			  data={props.gendersList}
              defaultValue={1}
			  value={props.gender}
			  onChange={value => props.updateProfileField('gender', value.id, true)}
			/>	
			</StudentProfileField>

			{/* SPORTS
			  Can be empty
			*/}
			<StudentProfileField title="I"
			 styles={nameField}>
			 <li className={saveBtnList}>
          <button className={props.sportsToggle ? `${materialStyle} ${saveBtnClicked}` : `${materialStyle} ${saveBtn}`} 
						onClick={() => props.onHandleButtonToggle(true, 'sportsToggle') }>play</button>
			   <button className={props.sportsToggle ? `${materialStyle} ${saveBtn}` : `${materialStyle} ${saveBtnClicked}`} 
				 		onClick={() => props.onHandleButtonToggle(false, 'sportsToggle') }>do not play</button>
			 </li>
			 <li className={space}>
			 	<p>on a sports team</p>
			 </li>
             <li className={props.sportsToggle ? showInput : hideInput}>
			    <Multiselect
                   className={props.propsErrorMap.sportsTeam? `${materialStyle} ${shortInput} ${error}` : `${materialStyle} ${shortInput}`}
                   valueField='id' textField='sport'
                   placeholder='Basketball, Hockey'
                   messages={messages}
                   data={props.sportsList}
                   value={props.sportsTeam}
                   onChange={ value => props.updateProfileField('sportsTeam', value, true)}
                   onCreate={ value => props.onCreateNewTag(value, 'sportsList', 'sport', 'sportsTeam')}
                   />
             </li>
			</StudentProfileField>

			{/* CLUB 
		    Can be empty
			*/} 
			<StudentProfileField title="I " 
			 styles={nameField}>
			 <li className={saveBtnList}>
			   <button className={props.clubsToggle ? `${saveBtnClicked} ${materialStyle}` : `${saveBtn} ${materialStyle}`} 
				 		onClick={() => props.onHandleButtonToggle(true, 'clubsToggle') }>am</button>
			   <button className={props.clubsToggle ? `${saveBtn} ${materialStyle}` : `${saveBtnClicked} ${materialStyle}`} 
				 		onClick={() => props.onHandleButtonToggle(false, 'clubsToggle') }>am not</button>
			 </li>
			 <li className={space}>
			 	<p>on a school club</p>
			 </li>
        <li className={props.clubsToggle ? `${showInput}` : `${hideInput}`}>
			 <Multiselect
			   className={props.propsErrorMap.schoolClub? `${materialStyle} ${shortInput} ${error}` : `${materialStyle} ${shortInput}`}
			   valueField='id' textField='club_name'
               placeholder='Toastmaster, Enactus'
			   messages={messages}
			   data={props.schoolClubList}
			   value={props.schoolClub}
               onCreate={ value => props.onCreateNewTag(value, 'schoolClubList', 'club_name', 'schoolClub')}
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
			   <button className={props.languagesToggle ? `${materialStyle} ${saveBtnClicked}` : `${materialStyle} ${saveBtn}`} 
				 		onClick={() => props.onHandleButtonToggle(true, 'languagesToggle') }>speak</button>
			   <button className={props.languagesToggle ? `${materialStyle} ${saveBtn}` : `${materialStyle} ${saveBtnClicked}`} 
				 		onClick={() => props.onHandleButtonToggle(false, 'languagesToggle') }>do not speak</button>
			 </li>
			 <li className={space}>
			 	<p>other languages</p>
			 </li>
            <li className={props.languagesToggle ? showInput : hideInput}>
			 <Multiselect
			   className={props.propsErrorMap.languages ? `${materialStyle} ${shortInput}  ${error}` : `${materialStyle} ${shortInput}`}
			   textField='language'
			   valueField='id'
               placeholder='French, Spanish'
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
			   <button className={props.hasCar == true ? `${materialStyle} ${saveBtnClicked}` : `${materialStyle} ${saveBtn}`} 
				   data-selection="0"
				   data-field-name="hasCar"
				   onClick={() => props.updateProfileField('hasCar', true, true)}
			    >
				    have
			    </button>
			   <button className={props.hasCar === false ? `${materialStyle} ${saveBtnClicked}` : `${materialStyle} ${saveBtn}`} 
				   data-selection="1"
				   data-field-name="hasCar"
				   onClick={() => props.updateProfileField('hasCar', false, true)}
					 >
				    {'do not have'}
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
			   className={props.propsErrorMap.companyName ? `${materialStyle} ${input} ${error}` : `${materialStyle} ${input}` }
			   type="text"
			   placeholder="Company Name"
			   id="student_companyName"
			   onBlur={(e) => props.updateProfileField('companyName', e.target.value, true)}
			   >
			  </input>
			 </li>
			  <li>
			    <p>working as</p>
			  </li>
			  <li>
			   <input
			    className={props.propsErrorMap.position ? `${materialStyle} ${input} ${error}` : `${materialStyle} ${input}`}
			    type="text"
			    placeholder="Position"
			    id="student_position"
			    onBlur={(e) => props.updateProfileField('position', e.target.value, true)} 
			   >
			 </input>
			 </li>
			</StudentProfileField>

			{/* FUN FACTS */}
			<StudentProfileField title="A fun fact about me is ">
			<li>
			 <textarea
			   className={props.propsErrorMap.funFacts ? `${materialStyle} ${textArea} ${error}` : `${materialStyle} ${textArea}`}
			   type="text"
			   placeholder="Example: I backpacked to Europe by myself last summer"
         maxLength="140"
			   onBlur={(e) => props.updateProfileField('funFacts', e.target.value, true)}
			  //  defaultValue={props.funFacts}
				 id="student_funFact"
			  >
			 </textarea>

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
			   className={props.propsErrorMap.hometown ? `${materialStyle} ${input} ${error}` : `${materialStyle} ${input}`}
			   type="text"
			   placeholder="City"
			   id="student_hometown"
			   onBlur={(e) => props.updateProfileField('hometown', e.target.value, true)}
			   >
			 </input>
			</StudentProfileField>

			{/* HOBBIES */}
			<StudentProfileField title="My favourite hobbies are"> 
			 <li>
			  <input
			   className={props.propsErrorMap.hobbies ? `${materialStyle} ${shortInput} ${error}` : `${materialStyle} ${shortInput}`}
			   type="text"
			   placeholder="Playing guitar, Making movies, etc.."
			   onBlur={(e) => props.updateProfileField('hobbies', e.target.value, true)}
			   id="student_hobbies"
			   >
			  </input>
			 </li>
			</StudentProfileField>

			{/* PHOTO & RESUME */}

			<StudentProfileField title="Take a business selfie">
				<Dropzone id="dropPhotoDiv" style={profilePic} className={props.propsErrorMap.photo ? dropzone + ' ' + error 
					: props.photo == "" 
						? dropzone 
						: dropzone + " " + profilePictureDragDropAlt} onDrop={onDrop} accept='image/*' multiple={false}>
					<div className={dropzoneContent} className={props.photo == "" ? "" : "gone"}>
						<i id="fa-user" className={props.photo == "" ? "fa fa-user fa-3x" : "gone"} aria-hidden="true"></i>
						<div className={props.photo == "" ? "" : "gone"} id="drag-dropPhoto" >Upload a photo</div>
					</div>
					</Dropzone>

					<p className={space}> here is my resume</p>

					<Dropzone id="dropResumeDiv" className={props.propsErrorMap.resume ? dropzone + ' ' + error 
						: props.resume == ""
							? dropzone
							: savedResumeView} onDrop={onDropResume} accept='application/pdf' multiple={false}>
						<div className={dropzoneContent}>
							<i id="fa-pdf" className={"fa fa-file-pdf-o fa-3x"} aria-hidden="true"></i>
							<div id="drag-dropResume">{props.resume == ""
								? 'Upload your resume'
								: 'Resume on file! Click to change.'}</div>
						</div>
					</Dropzone>

      </StudentProfileField>
    {/* ======== SAVE BUTTON ======== */}
        <div className={saveBtnContainer}>
          <button onClick={(e) => props.onSubmit(props)} className={actualSaveBtn}>Save</button>
        </div>
   </div>
  )
}
