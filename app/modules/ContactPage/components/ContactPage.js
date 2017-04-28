// ==============REACT BUILTINS================ //
import React from 'react'

// ==============THIRD PARTY IMPORTS========== //
import { DropdownList } from 'react-widgets'

// ==============CSS IMPORTS========== //
import { btn, centeredContainer, contactForm, dropdown,
         flexContainer, header, headerContactForm,
         input, subHeader, userInfoContainer, 
        userInfoItem, textArea, textAreaContainer, textAreaItem } from '../styles/ContactPage.css'

/*
 *  * NOTE: Testing ES6 stateless function
 *   * Ref: https://toddmotto.com/stateless-react-components/
 *
 *   NOTE: Maybe use scroll http://stackoverflow.com/questions/30495062/how-can-i-scroll-a-div-to-be-visible-in-reactjs
 *  
*/
const userInfo = ['I am an employer', 'I am a student', 'I work at a college', 'I have a general inquiry']

const ContactPage = (props) => (

        <div>
            <div className={flexContainer}>
                <div className={header}>
                    You Had Us At Hello
                </div>
                <br></br>
                <div className={subHeader}>
                    Tell Us, What Can We Do For You Below
                </div>
            </div>
            <div className={contactForm}>
                <br></br>
                <div className={headerContactForm}>
                    Let's Chat
                </div>        
                <div className={userInfoContainer}>
                    <div className={userInfoItem}>
                        <DropdownList 
                            className={dropdown}
                            defaultValue={'I am an employer'}
                            data={userInfo}
                            value={props.senderType}
                            onChange={props.onHandleSenderType}
                        />
                    </div>
                    <div className={userInfoItem}>
                        <input 
                            className={input}
                            type="text"
                            placeholder="What do your friends call you?"
                            value={props.senderName}
                            onChange={props.onHandleSenderName}
                        />
                    </div>
                    <div className={userInfoItem}>
                        <input
                            className={input}
                            type="text"
                            placeholder="Where can we email you back?"
                            value={props.senderEmail}
                            onChange={props.onHandleSenderEmail}
                        />
                    </div>
                </div>
                <div className={textAreaContainer}>
                    <div className={textAreaItem}>
                        <textarea 
                            className={textArea}
                            placeholder="What's on your mind?"
                            value={props.senderMessage}
                            onChange={props.onHandleSenderMessage}
                        />
                    </div>
                    <button 
                        className={btn}
                        type="submit"
                        onClick={props.onHandleSendMessage}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>

)

export default ContactPage
