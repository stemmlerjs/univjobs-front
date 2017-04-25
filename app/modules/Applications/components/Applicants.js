import React, { PropTypes } from 'react'
import { SkyLightStateless } from 'react-skylight'
import { Combobox } from 'react-widgets'
import { NavTab } from 'modules/Applications'
import { GenericCard, ApplicationModal, APPLICATIONS_CARD_TYPE, StudentCard, Title } from '../../SharedComponents'
import { rootComponentContainer, margin, pageHeaderSection,
  pageTitle, title, crossHair } from 'sharedStyles/styles.css'
import { pageMainJobCards, pageFiltersAndSearch } from '../styles/index.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const data = ['Job1', 'Job2', 'Job3']

export default function Applicants ({}) {
  return (
  <div className={rootComponentContainer}>
    <div className={margin}>

    {/* TITLE */}
     <Title
          titleName='MY APPLICANTS'
          subHeading='Click on a student to get more in-depth look at their profile and view their application.'>
     </Title>
     <div className={pageFiltersAndSearch}>
        <Combobox
            data={data}
            defaultValue={data[0]}
        />
     </div>

     {/*MAIN (Cards List)
       NOTE: Reference for iterating using map
            https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
     */}

      <div className={pageMainJobCards}>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
          <StudentCard/>
      </div>

      </div>
    </div>
   )
}

