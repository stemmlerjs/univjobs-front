
// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

// ==============THIRD PARTY IMPORTS========================= //
import SkyLight from 'react-skylight'

// ==============MADE COMPONENTS========================= //
import { Footer } from 'modules/SharedComponents'

// ================CSS IMPORTS============================== //
import { employerCenteredContainer, header, subHeader, 
        modalContent, errorMessage, btn, input,
        overlayStyles, dialogStyles, flexInputs } from '../styles/EmployerSignupStyles.css'

import { legalEmployer, gray, backgroundStyleFallback } from '../styles/SignupContainerStyles.css'

import { ValidPasswordVerifier } from 'modules/SharedComponents'

import { material_1 } from 'sharedStyles/material.css'
import { shine } from 'sharedStyles/animations.css'

import { detectEnterPress } from 'helpers/utils'

const styles = {
  overlayStyles: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    zIndex: '89',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  dialogStyles: {
    height: '400px',
    fontSize:'30px',
    backgroundColor: '#fff',
    borderRadius: '2px',
    zIndex: '90',
    padding: '15px',
    boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)',
    position: 'absolute',
    top: 'none',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '537px',
    marginLeft: '0px',
    textAlign: 'center'
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
    onSubmitSignup: PropTypes.func.isRequired,
    updateEmployerSignupForm: PropTypes.func.isRequired
  },

  render() {
    // Props
    const {onSubmitSignup, updateEmployerSignupForm, firstNameText, lastNameText, companyNameText, phoneText, 
      emailText, passwordText, error, router, isCreatingAccount } = this.props

    return (
        <div className={backgroundStyleFallback}>
            <div id="employer-hero" className={employerCenteredContainer}>
                <div className={header}>
                    HIRE STUDENTS
                </div>
                <div className={subHeader}>
                    Post jobs for students in Canadian Universities and Colleges
                </div>
                <button 
                    className={`${btn} ${material_1}`} 
                    onClick={() => this.refs.employerModal.show()}
                >
                    Post a job for free
                </button>
                <div id="employer-signup-modal-wrapper">
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
                                    name="employer[email]"
                                    value={companyNameText}
                                    value={emailText}
                                    onChange={(e) => updateEmployerSignupForm('email', e.target.value)}
                                    type="email" 
                                    placeholder="Email"
                                    onKeyUp={(e) => detectEnterPress(e, onSubmitSignup)}
                            />
                            <div className={flexInputs}>
                                <input className={input} 
                                        name="employer[firstname]"
                                        value={firstNameText}
                                        onChange={(e) => updateEmployerSignupForm('firstName', e.target.value)}
                                        type="text" 
                                        placeholder="First Name"
                                        onKeyUp={(e) => detectEnterPress(e, onSubmitSignup)}
                                />
                                <input className={input} 
                                        name="employer[lastname]"
                                        value={lastNameText}
                                        onChange={(e) => updateEmployerSignupForm('lastName', e.target.value)}
                                        type="text" 
                                        placeholder="Last Name"
                                        onKeyUp={(e) => detectEnterPress(e, onSubmitSignup)}
                                />
                            </div>

                            <div className={flexInputs}>
                                <input className={input} 
                                        name="employer[companyName]"
                                        value={companyNameText}
                                        onChange={(e) => updateEmployerSignupForm('companyName', e.target.value)}
                                        type="text" 
                                        placeholder="Company"
                                        onKeyUp={(e) => detectEnterPress(e, onSubmitSignup)}
                                />
                                <input className={input} 
                                        name="employer[phone]"
                                        value={companyNameText}
                                        value={phoneText}
                                        onChange={(e) => updateEmployerSignupForm('phone', e.target.value)}
                                        type="text" 
                                        placeholder="Phone #"
                                        onKeyUp={(e) => detectEnterPress(e, onSubmitSignup)}
                                />
                            </div>
                               <input className={input} 
                                        name="employer[password]"
                                        value={companyNameText}
                                        value={passwordText}
                                        onChange={(e) => updateEmployerSignupForm('password', e.target.value)}
                                        type="password" 
                                        placeholder="Password"
                                        onKeyUp={(e) => detectEnterPress(e, onSubmitSignup)}
                                />
                            <ValidPasswordVerifier passwordText={passwordText}/>
                            <p className={legalEmployer}>By registering you agree to our 
                                <Link to="/terms" className={gray}> Terms & Services </Link> 
                                 and 
                                <Link to="/privacy" className={gray}> Private Policy</Link>
                            </p>
                        </div>
                        <div className={errorMessage}>
                        { error }
                        </div>
                        <button 
                            className={isCreatingAccount ? `${btn} ${shine}` : btn} 
                            onClick={onSubmitSignup}>
                            Sign up
                        </button>
                    </SkyLight>
                </div>
              </div>

              
            </div>
    )
  }
})

export default EmployerSignup

