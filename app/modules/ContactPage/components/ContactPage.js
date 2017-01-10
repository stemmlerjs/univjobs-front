import React from 'react'
import { DropdownList } from 'react-widgets'

import { btn, centeredContainer, contactForm, dropdown,
         flexContainer, header, headerContactForm,
         input, subHeader, userInfoContainer, 
        userInfoItem, textAreaContainer, textAreaItem } from '../styles/ContactPage.css'

/*
 *  * NOTE: Testing ES6 stateless function
 *   * Ref: https://toddmotto.com/stateless-react-components/
 *
 *   NOTE: Maybe use scroll http://stackoverflow.com/questions/30495062/how-can-i-scroll-a-div-to-be-visible-in-reactjs
 *  
*/
const userInfo = ['I am an employer', 'I am a student', 'I work at a college', 'I have a general inquiry']

const ContactPage = ({onHandleSendMessage}) => (

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
                        />
                    </div>
                    <div className={userInfoItem}>
                        <input 
                            className={input}
                            type="text"
                            placeholder="What do your friends call you?"
                        />
                    </div>
                    <div className={userInfoItem}>
                        <input
                            className={input}
                            type="text"
                            placeholder="Where can we email you back?"
                        />
                    </div>
                </div>
                <div className={textAreaContainer}>
                    <div className={textAreaItem}>
                        <textarea placeholder="What's on your mind?"/>
                    </div>
                    <button 
                        className={btn}
                        type="submit"
                        onClick={onHandleSendMessage}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>

)

export default ContactPage
