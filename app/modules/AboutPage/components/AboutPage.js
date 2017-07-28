// =============REACT BULTINS========================== //
import React, { PropTypes } from 'react'

// ==============THIRD-PARTY COMPONENTS================ //
import { DropdownList } from 'react-widgets'

// ==============CSS IMPORTS=========================== //
import { blackBackGround,flexContainer, flexRowContainer, flexRowItem,
         fontLighter, header, headerContactForm, input, 
         marginReduce, paragraphContainer, paragraphItem, img,
         regularFlexContainer, subHeader, topMarginReduce,
         card, threeColumn, grayBackGround, section, picture,
         personsName, title, paragraph, 
        charlesImg, khalilImg, georgeImg, julioImg }from '../styles/AboutPage.css'

/*
 *  * NOTE: Testing ES6 stateless function
 *   * Ref: https://toddmotto.com/stateless-react-components/
 *
 *   NOTE: Maybe use scroll http://stackoverflow.com/questions/30495062/how-can-i-scroll-a-div-to-be-visible-in-reactjs
 */

const AboutPage = () => (
        <div>
            <div className={flexContainer}>
                <div className={header}>
                  <p className={marginReduce}>We're on a mission to build a platform</p>
                  <p className={marginReduce}>that connects employers to students and recent grads </p>
                  <p className={marginReduce}>for meaningful opportunities!</p>
                </div>
            </div>
            <div className={section + ' ' + grayBackGround}>
                    <h1 className={fontLighter}>Meet The Team</h1>
                    <div className={threeColumn}>
                        {/*FIRST CARD*/}
                        <div className={card}>
                            <div className={picture}>
                                <img className={charlesImg}/>              
                            </div>
                            <h3 className={personsName}>Charles Javelona</h3>
                            <h4 className={title}>CEO, Founder</h4>
                            <p className={paragraph}>
                                Charles previously worked at Scotiabank Innovation Factory, delving into Fintech analysis and blockchain development. He is originally from the Philippines.
                            </p>
                        </div>
                        {/*SECOND CARD*/}
                        <div className={card}> 
                            <div className={picture}>
                                <img className={khalilImg}/>              
                            </div>
                            <h3 className={personsName}>Khalil Stemmler</h3>
                            <h4 className={title}>CTO, Founder</h4>
                            <p className={paragraph}>
                                Prior to Univjobs, Khalil worked in software development at IBM and Pinnaca in between his schooling at Brock University and Sheridan College.
                                His favourite things include cats, tinkering with robotics and collecting music; though not necessarily in that order.
                            </p>
                        </div>
                        {/*THIRD CARD*/} 
                        <div className={card}> 
                            <div className={picture}>
                                <img className={georgeImg}/>              
                            </div>
                            <h3 className={personsName}>George Kavuma</h3>
                            <h4 className={title}>Chief Design Officer, Founder</h4>
                            <p className={paragraph}>
                                George is an interaction designer who has previously worked with small companies. If he's not preparing for a marathon race, you'll find George working on instrumentals beats or improving his photography skills.
                            </p>
                        </div>
                        {/*FOURTH CARD*/} 
                        <div className={card}> 
                            <div classNme={picture}>
                                <img className={julioImg}/>              
                            </div>
                            <h3 className={personsName}>Julio Sueiras</h3>
                            <h4 className={title}>DevOps, Founder</h4>
                            <p className={paragraph}>
                                Julio loves automation. He's helped companies streamline their IT infrastructure. Fun fact: Julio was born in China, raised in Cuba and speaks 3 languages (Mandarin, Spanish and English).
                            </p>
                        </div>
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
