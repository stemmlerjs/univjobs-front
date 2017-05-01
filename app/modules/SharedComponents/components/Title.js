
// ================REACT BUILTIN============================== //
import React, { PropTypes } from 'react'

// ================CSS IMPORTS============================== //
import { marginBottom, title } from 'sharedStyles/sharedComponentStyles.css' 



const Title = ({titleName, subHeading, children}) => {
  return (
       <div className={marginBottom}>
           <div>
             <h1 className={title}>{titleName}</h1>
             <p>{subHeading}</p>
           </div>
           {children}

        </div>
  )
}

Title.propTypes = {
    titleName: PropTypes.string,
    subHeading: PropTypes.string
}

export default Title
