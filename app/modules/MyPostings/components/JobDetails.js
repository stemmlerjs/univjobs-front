
import React, { PropTypes } from 'react'

import { ApplicantCount, StartDateComponent, PaidJobComponent, LocationComponent }  from 'modules/SharedComponents'

import { textDetailsTitle, textDetailsField, title, jobTypeText } from '../styles/JobDetailsStyles.css'
import { box } from '../styles/MyPostingsStyles.css'

export default function JobDetails ({}) {

  return (
    <div className={box}>
      
      <div className={title}>Marketing Street Team</div>
      <div className={jobTypeText}>Part-time</div>
      
      <StartDateComponent date={new Date()}/>
      <LocationComponent location={'12 Echo Villa Avenue, Brantford ON'} remoteWork={false}/>
      <PaidJobComponent paid={true}/>

      <div className={textDetailsTitle}>Responsibilities</div>
      <div className={textDetailsField}>The Boys Next Door's best known song, "Shivers", written by Howard, 
        and first performed and recorded by his band The Young Charlatans, was banned by radio stations because of a reference to suicide. 
        After recordings and moderate success in Australia (including hundreds of live shows) they headed for London in 1980, changed their name to The Birthday Party and launched into a period of innovative and aggressive music-making. Some sources say the band took its new name from the Harold Pinter play The Birthday Party;[8] others (including Ian Johnston's Cave biography) state it was prompted by Cave misremembering, or intentionally misattributing, the name to a non-existent birthday party scene in the Dostoyevsky novel Crime and Punishment. In a 2008 interview, Rowland S. Howard gave his own recollection: "The name The Birthday Party came up in conversation between Nick and myself. There's this apocryphal story about it coming from a Dostoyevsky novel. It may have had various connotations, but what he and I spoke about was a sense of celebration and making things into more an occasion and ritual".[9] They resided in London, with trips back to Australia and tours through Europe and the U.S. before relocating to West Berlin in 1982.</div>

      <div className={textDetailsTitle}>Qualifications</div>
      <div className={textDetailsField}>Band members
Nick Cave – vocals, saxophone (1976–1983)
Mick Harvey – guitar, drums, keyboards (1976–1983)
Rowland S. Howard – guitar, vocals (1978–1983; died 2009)
Tracy Pew – bass, clarinet (1976–1982, 1982–1983; died 1986)
Phill Calvert – drums (1976–1982)</div>

      <div className={textDetailsTitle}>Desired Skills</div>
      <div className={textDetailsField}>HTML, CSS, JavaScript, other</div>

      <div className={textDetailsTitle}>Compensation</div>
      <div className={textDetailsField}>20/hr every single day</div>
    </div>
  )
}


