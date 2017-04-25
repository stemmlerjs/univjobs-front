import React, { PropTypes } from 'react'
import { pageHeaderSection, pageTitle, title } from 'sharedStyles/styles.css' 

const Title = ({titleName, subHeading, children}) => {
  return (
       <div className={pageHeaderSection}>
           <div className={pageTitle}>
             <h1 className={title}>{titleName}</h1>
             <p>{subHeading}</p>
           </div>
           {children}

        </div>
  )
}

export default Title
