import React from 'react'
import { Link } from 'react-router'
import { SidebarContainer } from 'containers'
import { title, mainContainer, container, categories, category } from './styles.css'

const categoryList = [{
  key: 1,
  heading: 'One-Time Gig',
  subHeadingForEmp: 'Tasks that can be done within a 24-hour period',
  imgUrl: '',
  url: 'post/otg'
}, {
  key: 2,
  heading: 'Summer 2016',
  subHeadingForEmp: 'Jobs/Internships from May - Apr',
  imgUrl: '',
  url: 'post/summer'
}, {
  key: 3,
  heading: 'Winter Breaks',
  subHeadingForEmp: 'Jobs/Internships between school semesters',
  imgUrl: '',
  url: 'post/winter'
}, {
  key: 4,
  heading: 'Freelancing',
  subHeadingForEmp: 'Partner up with a student for a project',
  imgUrl: '',
  url: 'post/freelance'
}, {
  key: 5,
  heading: 'Campus Rep & Brand Ambassador',
  subHeadingForEmp: 'Let students promote your product and brand',
  imgUrl: '',
  url: 'post/rep'
}, {
  key: 6,
  heading: 'Part-time work',
  subHeadingForEmp: 'Jobs/Internships while in school',
  imgUrl: '',
  url: 'post/pt'
}]

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

const Title = function({subHeading}) {
  return (
    <div className={title}>
      <h1>PICK A JOB TYPE YOU WANT</h1>
      <p>{subHeading}</p>
    </div>
  )
}

const CategoriesContainer = React.createClass({
  render () {
    return (
      <div className={mainContainer}>
        <SidebarContainer />
        <Title subHeading="I want to post a job for..."/>
        <Categories/>
      </div>
    )
  },
})
export default CategoriesContainer