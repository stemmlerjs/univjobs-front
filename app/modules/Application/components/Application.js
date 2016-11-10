import React, { PropTypes } from 'react'
import { SkyLightStateless } from 'react-skylight'



export default function Application ({user, jobs, questions, answers}) {
				
   console.log("******* APPLICATION COMPONENT **********")
   console.log(user)
   console.log(jobs)
   console.log(questions)
   console.log(answers)
   return (
	  <div>
	   <h1>HELLO WORLD</h1>
	  </div>
   )
}

