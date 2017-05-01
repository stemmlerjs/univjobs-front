/*Applicants
 *
 * Students who applied to a particular job
 * */
// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { GenericCard, ApplicationModal, APPLICATIONS_CARD_TYPE, StudentCard, Title } from '../../SharedComponents'

// ==============THIRD PARTY IMPORTS========================= //
import { SkyLightStateless } from 'react-skylight'
import { Combobox } from 'react-widgets'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


// ================CSS IMPORTS============================== //
import { rootComponentContainer, margins, title, } from 'sharedStyles/sharedComponentStyles.css'
import { pageFiltersAndSearch } from 'sharedStyles/widgets.css'
import { flexibleCardContainer } from 'sharedStyles/cardContainer.css'

const data = ['Job1', 'Job2', 'Job3']

Applicants.propTypes = {
    //Insert typechecking variables

}


export default function Applicants ({}) {
  return (
  <div className={rootComponentContainer}>
    <div className={margins}>

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

      <div className={flexibleCardContainer}>
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

