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
        charlesImg, khalilImg, georgeImg, julioImg, aboutUsTitle, cardDetailsContainerClosed, cardDetailsContainerOpen, seeMoreButton }from '../styles/AboutPage.css'

/*
 *  * NOTE: Testing ES6 stateless function
 *   * Ref: https://toddmotto.com/stateless-react-components/
 *
 *   NOTE: Maybe use scroll http://stackoverflow.com/questions/30495062/how-can-i-scroll-a-div-to-be-visible-in-reactjs
 */

const AboutPage = ( { toggleCardOpen, cardsState }) => (
        <div>
            <div id="about-us-hero" className={flexContainer}>
              <div className={header}>
                <div className={aboutUsTitle}>Our Mission</div>
                <p className={marginReduce}>To build a platform</p>
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

                        <div className={!cardsState.charles ? cardDetailsContainerClosed : cardDetailsContainerOpen}>
                          <p className={paragraph}>
                              Originally from the Philippines, Charles previously worked at Scotiabank Innovation Factory.  In his role, he specialized in Fintech analysis and blockchain development.  
                                </p>
                          <p className={paragraph}>An aspiring entrepreneur, Charles has an impressive track record for innovation and making the impossible happen. From starting a Toastmasters Club in Oakville and having recognized a need for improved communication capabilities among students to braving the world of entrepreneurship, Charles simply views obstacles as challenges to be overcome.  </p>
                          <p className={paragraph}>Relentless in his pursuit of excellence, Charles is continuously looking for ways to increase Univjob’s value to both Employers & Students.  As the founder of Univjobs, Charles’ unbridled passion is contagious and the driving force behind the company’s success.</p>
                        </div>
                        <button className={seeMoreButton} onClick={() => toggleCardOpen('charles')}>{!cardsState.charles ? "See More" : "See Less"}</button>
                    </div>
                    {/*SECOND CARD*/}
                    <div className={card}> 
                        <div className={picture}>
                            <img className={khalilImg}/>              
                        </div>
                        <h3 className={personsName}>Khalil Stemmler</h3>
                        <h4 className={title}>CTO, Founder</h4>

                        <div className={!cardsState.khalil ? cardDetailsContainerClosed : cardDetailsContainerOpen}>
                          <p className={paragraph}>
                              Prior to becoming a founding member of the Univjobs team, Khalil worked in software development at IBM and Pinnaca while attending school at both Brock University and Sheridan College.   </p>
                          <p className={paragraph}>As a Software Architect, Khalil works diligently to ensure that the platform is scalable, secure, and mobile friendly for employers and students.  </p>
                          <p className={paragraph}>His software knowledge and implementation expertise consistently amazing his teammates and serves to bolster the confidence and commitment of the entire team. Outside of work, Khalil is equally passionate to his hobbies which include: robotics, cats, and collecting music. </p>
                        </div>

                      <button className={seeMoreButton} onClick={() => toggleCardOpen('khalil')}>{!cardsState.khalil ? "See More" : "See Less"}</button>
                    </div>
                    {/*THIRD CARD*/} 
                    <div className={card}> 
                        <div className={picture}>
                            <img className={georgeImg}/>              
                        </div>
   
                        <h3 className={personsName}>George Kavuma</h3>
                        <h4 className={title}>Chief Design Officer, Founder</h4>

                        <div className={!cardsState.george ? cardDetailsContainerClosed : cardDetailsContainerOpen}>
                          <p className={paragraph}>
                              George is an Interaction Designer who has honed his skills by working with a variety of small companies where his work was deemed essential to their success. </p>
                          <p className={paragraph}>Driven by his passion for design, George obsesses over ensuring that both students and employers utilizing Univjobs enjoy the best user experience possible.  </p>
                          <p className={paragraph}>Outside of work, when he is not preparing for a marathon race, you will find George working on instrumental beats or honing his photography skills.  </p>
                        </div>

                        <button className={seeMoreButton} onClick={() => toggleCardOpen('george')}>{!cardsState.george ? "See More" : "See Less"}</button>
                    </div>
                    {/*FOURTH CARD*/} 
                    <div className={card}> 
                        <div className={picture}>
                            <img className={julioImg}/>              
                        </div>
                        <h3 className={personsName}>Julio Sueiras</h3>
                        <h4 className={title}>DevOps, Founder</h4>

                        <div className={!cardsState.julio ? cardDetailsContainerClosed : cardDetailsContainerOpen}>
                          <p className={paragraph}>
                              Quite simply, Julio loves automation and has helped numerous companies streamline their IT infrastructure.  
                          </p>
                          <p className={paragraph}>As a DevOps Engineer, his passion is automating infrastructure, however he consistently demonstrates his willingness to pitch in anywhere necessary to ensure other team members can remained focussed on helping students and employers.  </p>
                          <p className={paragraph}>To say that Julio is multi-cultural is an understatement.  Julio was born in Cuba, raised in China and speaks 3 languages fluently (Mandarin, Spanish and English).  He is a phenomenon in more ways than one to be sure!
                          </p>
                        </div>

                        <button className={seeMoreButton} onClick={() => toggleCardOpen('julio')}>{!cardsState.julio ? "See More" : "See Less"}</button>
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
