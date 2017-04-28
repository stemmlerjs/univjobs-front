// ===============REACT BUILTINS======================//
import React, { PropTypes } from 'react'
import { Link } from 'react-router'


// ===============CSS IMPORTS======================//
import { category, categoryText, headingStyle, subHeadingStyle} from '../styles/CategoriesContainerStyles.css'

/*Category
 *
 * This component is for each job type that will be displayed
 * */
const Category = function({heading, subHeading, divStyle, type}) {
      if(type == 'otg') {
          return (
          <Link to={`/job/create/${type}`}>
                  <div className={category} style={divStyle.oneTimeGig}>
                        <div className={categoryText}>
                            <h3 className={headingStyle}>{heading}</h3>
                            <p className={subHeadingStyle}>{subHeading}</p>
                        </div>
                  </div>
                </Link>
          )
     } else if(type == 'summer') {
         return (
            <Link to={`/job/create/${type}`}>
                  <div className={category} style={divStyle.summer}>
                        <div className={categoryText}>
                            <h3 className={headingStyle}>{heading}</h3>
                            <p className={subHeadingStyle}>{subHeading}</p>
                        </div>
                  </div>
                </Link>
         )
     } else if(type == 'winter') {
         return (
            <Link to={`/job/create/${type}`}>
                  <div className={category} style={divStyle.winter}>
                        <div className={categoryText}>
                            <h3 className={headingStyle}>{heading}</h3>
                            <p className={subHeadingStyle}>{subHeading}</p>
                        </div>
                  </div>
                </Link>
         )
     } else if(type == 'freelance') {
         return (
            <Link to={`/job/create/${type}`}>
                  <div className={category} style={divStyle.freelance}>
                        <div className={categoryText}>
                            <h3 className={headingStyle}>{heading}</h3>
                            <p className={subHeadingStyle}>{subHeading}</p>
                        </div>
                  </div>
                </Link>
         )
     } else if(type == 'rep') {
         return (
            <Link to={`/job/create/${type}`}>
                  <div className={category} style={divStyle.rep}>
                        <div className={categoryText}>
                            <h3 className={headingStyle}>{heading}</h3>
                            <p className={subHeadingStyle}>{subHeading}</p>
                        </div>
                  </div>
                </Link>
         )
     } else if(type == 'pt') {
         return (
            <Link to={`/job/create/${type}`}>
                  <div className={category} style={divStyle.partTime}>
                        <div className={categoryText}>
                            <h3 className={headingStyle}>{heading}</h3>
                            <p className={subHeadingStyle}>{subHeading}</p>
                        </div>
                  </div>
                </Link>
         )
    } else {
        return (
            <div>Error</div>
        )
    }
}

/*Insert typechecking variables
 *
 * */
const Category = function({heading, subHeading, divStyle, type}) {
Category.propTypes = {
    heading: PropTypes.string.isRequired,
    subHeading: PropTypes.string.isRequired,
    divStyle: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
} 

export default Category
