
import React, { PropTypes } from 'react'
import { container } from '../styles/JobQuestionsStyles.css'

import { box } from '../styles/MyPostingsStyles.css'

export default function JobQuestions ({questions}) {

  return (
    <div className={box}>
       {
         questions.length === 0
          ? 'No questions were posted for this job.'
          : <div>
            
              {
                questions.map((question, index) => {
                  return (
                    <div key={index}>{(index + 1) + ". " + question.text}</div>
                  )
                })
              }

          </div>
       }
    </div>
  )
}


