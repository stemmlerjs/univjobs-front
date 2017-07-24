// =============REACT BULTINS========================== //
import React, { PropTypes } from 'react'

// ==============THIRD-PARTY COMPONENTS================ //
import { DropdownList } from 'react-widgets'

// ==============CSS IMPORTS=========================== //
import { blackBackGround,flexContainer, flexRowContainer, flexRowItem,
         fontLighter, header, headerContactForm, input, 
         marginReduce, paragraphContainer, paragraphItem, img,
         regularFlexContainer, subHeader, topMarginReduce,
         card, threeColumn, grayBackGround, section }from '../styles/AboutPage.css'

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
                    <p className={marginReduce}>We're on a mission to build a platform</p>
                    <p className={marginReduce}>that connects employers with students and recent grads </p>
                    <p className={marginReduce}>on meaningful opportunities!</p>
                </div>
            </div>
            <div className={section + ' ' + grayBackGround}>
                    <h1 className={fontLighter}>Meet The Team</h1>
                    <div className={threeColumn}>
                        {/*FIRST CARD*/}
                        <div className={card}></div>
                        {/*SECOND CARD*/}
                        <div className={card}></div>
                        {/*THIRD CARD*/} 
                        <div className={card}></div>
                        {/*FOURTH CARD*/} 
                        <div className={card}></div>
                    </div>
            </div>
        </div>
)


/*AboutPage.propTypes
 * 
 * Insert all the typechecking variables
 *
 * */

AboutPage.propTypes = {


}


export default AboutPage
