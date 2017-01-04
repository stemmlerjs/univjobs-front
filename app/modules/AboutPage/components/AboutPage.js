import React from 'react'
import { DropdownList } from 'react-widgets'

import { blackBackGround,flexContainer, flexRowContainer, flexRowItem,
         fontLighter, header, headerContactForm, input, 
         marginReduce, paragraphContainer, paragraphItem,
         regularFlexContainer, subHeader, topMarginReduce }from '../styles/AboutPage.css'

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
            <div className={regularFlexContainer + ' ' + blackBackGround}>
                <div className={subHeader}>
                    <h1 className={fontLighter + ' ' + topMarginReduce}>How It Works</h1>
                </div>
                <div className={flexRowContainer}>
                    <div className={flexRowItem}>
                        <img src="https://cloud.githubusercontent.com/assets/7959179/21650060/c9dd4744-d271-11e6-8c02-3c22b330dbbc.png" alt="step1"/>
                        <h3 className={fontLighter}>Step 1</h3>
                        <div className={paragraphContainer}>
                            <p className={paragraphItem}>
                                Students sign up for Univjobs (always free!) and fill out their online profile. While, employers create a profile and post a job (it’s free to post). Employers can be as specific or vague as they want with targeting students, so that only qualified students can see the job listing.
                            </p>
                        </div>
                    </div>
                    <div className={flexRowItem}>
                        <img src="https://cloud.githubusercontent.com/assets/7959179/21650355/a603d4a4-d272-11e6-9dea-a33dfee933f9.png" alt="step2"/>
                        <h3 className={fontLighter}>Step 2</h3>
                        <div className={paragraphContainer}>
                            <p className={paragraphItem}>
                                If the job is approved, qualified students will be notified, and the matching can begin. Students can apply to the job (often through just one click, like a Common App but for job applications), and businesses can also search through our student database and invite specific students to apply.
                            </p>
                        </div>
                    </div>
                    <div className={flexRowItem}>
                        <img src="https://cloud.githubusercontent.com/assets/7959179/21650531/3446c9d8-d273-11e6-9d87-688a053e3cee.jpg" alt="step3"/>
                        <h3 className={fontLighter}>Step 3</h3>
                        <div className={paragraphContainer}>
                            <p className={paragraphItem}>
                              Once the students apply to a job. Employers will get the applicant's full contact information, and can then contact the student directly to interview or hire.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={regularFlexContainer}>
                <div className={subHeader}>
                    <h1 className={fontLighter + ' ' + topMarginReduce}>Meet the team</h1>
                </div>
                <div className={flexRowContainer}>
                    <div className={flexRowItem}>
                        <img src="https://cloud.githubusercontent.com/assets/7959179/21650060/c9dd4744-d271-11e6-8c02-3c22b330dbbc.png" alt="step1"/>
                        <h3 className={fontLighter}>Step 1</h3>
                    </div>
                    <div className={flexRowItem}>
                        <img src="https://cloud.githubusercontent.com/assets/7959179/21650355/a603d4a4-d272-11e6-9dea-a33dfee933f9.png" alt="step2"/>
                        <h3 className={fontLighter}>Step 2</h3>
                    </div>
                    <div className={flexRowItem}>
                        <img src="https://cloud.githubusercontent.com/assets/7959179/21650531/3446c9d8-d273-11e6-9d87-688a053e3cee.jpg" alt="step3"/>
                        <h3 className={fontLighter}>Step 3</h3>
                    </div>
                </div>
            </div>
        </div>

)

export default AboutPage
