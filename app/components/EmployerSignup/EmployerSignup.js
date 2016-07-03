import React, { PropTypes } from 'react'
import SkyLight from 'react-skylight'

import { centeredContainer, header, subHeader, modalContent, errorMessage, btn, input } from './styles.css'

const styles = {
  overlayStyles: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    zIndex: 99,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  dialogStyles: {
    height: '400px',
    fontSize:'30px',
    backgroundColor: '#fff',
    borderRadius: '2px',
    zIndex: 100,
    padding: '15px',
    boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)',
    position: 'absolute',
    top: 'none',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '537px',
    marginLeft: '0px',
    textAlign: 'center'
  },
  title: {
    marginTop: '0'
  },
  closeButtonStyle: {
    cursor: 'pointer',
    position: 'absolute',
    fontSize: '1.8em',
    right: '10px',
    top: '0px'
  }
};

const EmployerSignup = React.createClass({
  propTypes: {
    firstNameText: PropTypes.string.isRequired,
    lastNameText: PropTypes.string.isRequired,
    companyNameText: PropTypes.string.isRequired,
    phoneText: PropTypes.string.isRequired,
    emailText: PropTypes.string.isRequired,
    passwordText: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    router: PropTypes.object.isRequired,
    submitSignupForm: PropTypes.func.isRequired,
    updateEmployerSignupForm: PropTypes.func.isRequired
  },

  render() {
    // Props
    const {submitSignupForm, updateEmployerSignupForm, firstNameText, lastNameText, companyNameText, phoneText, 
      emailText, passwordText, error, router} = this.props

    function handleUserSubmit(e) {
      e.preventDefault();
      submitSignupForm(firstNameText, lastNameText, companyNameText, phoneText, emailText, passwordText)
        .then((actionResult) => {
          if(actionResult) {
            router.push('/createaccount/em')
          } 
        }).catch((err) => console.log(err))
    } 

    return (
      <div className={centeredContainer}>
        <div className={header}>
          HIRE STUDENTS
        </div>
        <div className={subHeader}>
          Post jobs for students at any Canadian college/university
        </div>
          <button className={btn} onClick={() => this.refs.employerModal.show()}>Employers - Post a job now</button>
          <SkyLight 
            overlayStyles={styles.overlayStyles} 
            dialogStyles={styles.dialogStyles}
            closeButtonStyle={styles.closeButtonStyle}
            hideOnOverlayClicked 
            ref="employerModal" 
            title="Hey there!">
            <div className={modalContent}>
              <h3>Sign up below to get started</h3>
              <input className={input} 
                value={firstNameText}
                onChange={(e) => updateEmployerSignupForm('firstName', e.target.value)}
                type="text" 
                placeholder="First Name"/>
              <input className={input} 
                value={lastNameText}
                onChange={(e) => updateEmployerSignupForm('lastName', e.target.value)}
                type="text" 
                placeholder="Last Name"/>
              <input className={input} 
                value={companyNameText}
                onChange={(e) => updateEmployerSignupForm('companyName', e.target.value)}
                type="text" 
                placeholder="Company"/>
              <input className={input} 
                value={phoneText}
                onChange={(e) => updateEmployerSignupForm('phone', e.target.value)}
                type="text" 
                placeholder="Phone #"/>
              <input className={input} 
                value={emailText}
                onChange={(e) => updateEmployerSignupForm('email', e.target.value)}
                type="email" 
                placeholder="Email"/>
              <input className={input} 
                value={passwordText}
                onChange={(e) => updateEmployerSignupForm('password', e.target.value)}
                type="password" 
                placeholder="Password"/>
            </div>
            <div className={errorMessage}>
              { error }
            </div>
          <button className={btn} onClick={handleUserSubmit}>Sign up</button>
        </SkyLight>
      </div>
    )
  }
})

export default EmployerSignup

