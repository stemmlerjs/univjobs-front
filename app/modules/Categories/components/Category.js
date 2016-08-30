import React from 'react'

const Category = function({heading, subHeading, url}) {
  return (
    <Link to={url}>
      <div>
        <h3>{heading}</h3>
        <p>{subHeading}</p>
      </div>
    </Link>
  )
}

export default Category