import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { SidebarContainer } from 'modules/Main'
import { authRedirectFilter } from 'config/routes'
import { title, mainContainer, container, categories, category, categoryText, headingStyle, subHeadingStyle } from '../styles/CategoriesContainerStyles.css'

const categoryList = [{
  key: 1,
  heading: 'One-Time Gig',
  subHeadingForEmp: 'Tasks that can be done within a 24-hour period',
  imgUrl: '',
  type: 'otg'
}, {
  key: 2,
  heading: 'Summer 2016',
  subHeadingForEmp: 'Jobs/Internships from May - Apr',
  imgUrl: '',
  type: 'summer'
}, {
  key: 3,
  heading: 'Winter Breaks',
  subHeadingForEmp: 'Jobs/Internships between school semesters',
  imgUrl: '',
  type: 'winter'
}, {
  key: 4,
  heading: 'Freelancing',
  subHeadingForEmp: 'Partner up with a student for a project',
  imgUrl: '',
  type: 'freelance'
}, {
  key: 5,
  heading: 'Campus Rep & Brand Ambassador',
  subHeadingForEmp: 'Let students promote your product and brand',
  imgUrl: '',
  type: 'rep'
}, {
  key: 6,
  heading: 'Part-time work',
  subHeadingForEmp: 'Jobs/Internships while in school',
  imgUrl: '',
  type: 'pt'
}]

const Category = function({heading, subHeading, type}) {
  return (
    <Link to={`/job/create/${type}`}>
      <div className={category}>
        <div className={categoryText}>
          <h3 className={headingStyle}>{heading}</h3>
          <p className={subHeadingStyle}>{subHeading}</p>
        </div>
      </div>
    </Link>
  )
}

const Categories = function(props) {
  return (
    <div className={categories}>
      { categoryList.map(({key, heading, subHeadingForEmp, type}) => {
        return <Category
          key={key} 
          heading={heading} 
          subHeading={subHeadingForEmp} 
          type={type}>
        </Category>
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
  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  },

  componentWillMount() {
    // Hide the overlay on mount if coming from direct URL
    this.doRedirectionFilter()
      .then(this.props.closeOverlay())
  },

  /** doRedirectionFilter
  *
  * The redirection filter is the process that occurs each time we enter this container.
  * Used in every higher order component and supplied with a config, it ensures that the
  * user is redirected to the appropriate page based on their authentication status and 
  * user type.
  *
  * @return (Promise)
  *
  */

  doRedirectionFilter(){
    const config = {
      failureRedirect: {
        student: '/join',         // if not logged in, go here (student)
        employer: '/join'         // if not logged in, go here (employer)
      },
      restricted: {
        to: 'EMPLOYERS',          // employers only on this route
        redirectTo: '/profile/st' // if not an employer, redirect to the student equivalent
      },
      profileIncompleteRedirect: true
    }

    return authRedirectFilter(config, this.context.store, this.context.router)
  },

  render () {
    return (
      <div className={mainContainer}>
        <SidebarContainer isAStudent={false} />
        <Title subHeading="I want to post a job for..."/>
        <Categories/>
      </div>
    )
  },
})
export default CategoriesContainer