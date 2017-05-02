// ===============REACT BUILTINS======================//
import React, { PropTypes } from 'react'

// ===============MADE COMPONENTS======================//
import { Category } from 'modules/Categories' 

// ===============CSS IMPORTS======================//
import { categories, category } from '../styles/CategoriesContainerStyles.css'



/*Categories
 *
 * The page that will be rendered to the page to show all the job types
 *
 *
 * TODO: Fixed flexible layout, texts are not changing with the category images
 * */
const Categories = function(categoryObject) {
  return (
    <div className={categories}>
      { categoryObject.categoryObject.map(({key, heading, subHeadingForEmp, divStyle, type}) => {
         return  <Category
          key={key} 
          heading={heading} 
          subHeading={subHeadingForEmp}
          divStyle={divStyle} 
          type={type}>
        </Category>
      })}
    </div>
  )
}

export default Categories
