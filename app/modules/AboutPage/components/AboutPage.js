import React from 'react'
import { DropdownList } from 'react-widgets'

import { btn, centeredContainer, contactForm, dropdown,
         flexContainer, header, headerContactForm,
         input, marginReduce, subHeader, userInfoContainer, 
        userInfoItem, textAreaContainer, textAreaItem } from '../styles/AboutPage.css'

/*
 *  * NOTE: Testing ES6 stateless function
 *   * Ref: https://toddmotto.com/stateless-react-components/
 *
 *   NOTE: Maybe use scroll http://stackoverflow.com/questions/30495062/how-can-i-scroll-a-div-to-be-visible-in-reactjs
 *  
*/

const AboutPage = () => (
        <div>
            <div className={flexContainer}>
                <div className={header}>
                    <p className={marginReduce}>All students should be able to find an</p>
                    <p className={marginReduce}>awesome job or internship.</p>
                </div>
                <br></br>
                <div className={header}>
                    Now, they can.
                </div>
            </div>
        </div>

)

export default AboutPage
