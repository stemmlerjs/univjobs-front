// ===============REACT BUILTINS======================//
import React, { PropTypes } from 'react'
import { Link } from 'react-router'


// ===============CSS IMPORTS======================//
import { category, categoryText, images, headingStyle, subHeadingStyle, campusSpacing } from '../styles/CategoriesContainerStyles.css'

/*Category
 *
 * This component is for each job type that will be displayed
 * */
const Category = function({heading, subHeading, divStyle, type}) {
      if(type == 'otg') {
          return (
          <Link to={`/job/create/${type}`}>
                  <div className={category}>
                    <img className={images} src={divStyle.oneTimeGig.backgroundImage}></img>
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
                    <img className={images} src={divStyle.summer.backgroundImage}></img>
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
                    <img className={images} src={divStyle.winter.backgroundImage}></img>
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
                    <img className={images} src={divStyle.freelance.backgroundImage}></img>
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
                    <img className={images} src={divStyle.rep.backgroundImage}></img>
                        <div className={categoryText + " " + campusSpacing}>
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
                    <img className={images} src={divStyle.partTime.backgroundImage}></img>
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
Category.propTypes = {
    heading: PropTypes.string.isRequired,
    subHeading: PropTypes.string.isRequired,
    divStyle: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
} 

export default Category
