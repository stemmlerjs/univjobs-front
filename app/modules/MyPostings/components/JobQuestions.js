
import React, { PropTypes } from 'react'
import { container, questionHeader, questionBody } from '../styles/JobQuestionsStyles.css'

import { box } from '../styles/MyPostingsStyles.css'

export default function JobQuestions ({ questions }) {
  return (
    <div className={box}>
       {
         questions.length === 0
          ? 'No questions were posted for this job.'
          : <div className={container}>
            
              {
                questions.map((question, index) => {
                  return (
                    <div key={index}>
                      <div className={questionHeader}>{"Question #" + (index + 1)}</div>
                      <div className={questionBody}>{question.text}</div>
                    </div>
                  )
                })
              }

          </div>
       }
    </div>
  )
}


