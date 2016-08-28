import React from 'react'
import { categories, category } from '../styles/CategoriesContainerStyles.css'

const Categories = function(props) {
  return (
    <div className={categories}>
      { categoryList.map(({key, heading, subHeadingForEmp, url}) => {
        return 
        <Category className={category}
          key={key} 
          heading={heading} 
          subHeading={subHeadingForEmp} 
          url={url}/>
      })}
    </div>
  )
}

export default Categories