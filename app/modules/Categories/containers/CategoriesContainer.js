// ===============REACT BUILTIN======================//
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

// ===============MADE COMPONENTS======================//
import { Title } from 'modules/SharedComponents'
import { SidebarContainer } from 'modules/Main'
import { Categories } from 'modules/Categories'

// ==============REDUX & OTHER IMPORTS================//
import { authRedirectFilter } from 'config/routes'

// ===============CSS IMPORTS======================//
import { mainContainer } from '../styles/CategoriesContainerStyles.css'

/*TODO: Refactor if needed
 *
 *NOTE:
 * Inline styles and categoryList are defined here to follow the convention of containers are the source of data and business logic, any suggestions?*/
const divStyle = {
    oneTimeGig: {
        backgroundImage: `url(https://cloud.githubusercontent.com/assets/7959179/25368698/68f216e4-294c-11e7-9d76-a410cdf59610.jpg)`,
        backgroundRepeat:`no-repeat`,
        backgroundSize:`contain`,
        backgroundPosition:`center`,
    },
    summer: {
        backgroundImage: `url(https://cloud.githubusercontent.com/assets/7959179/25403039/e4e5ed4e-29c8-11e7-85c1-ccba51fc5db6.jpg)`,
        backgroundRepeat:`no-repeat`,
        backgroundSize:`contain`,
        backgroundPosition:`center`,
    },
    winter: {
        backgroundImage: `url(https://cloud.githubusercontent.com/assets/7959179/25409431/e2d66fda-29df-11e7-97b5-0745e5d542dc.jpg)`,
        backgroundRepeat:`no-repeat`,
        backgroundSize:`contain`,
        backgroundPosition:`center`,
    },
    freelance: {
        backgroundImage: `url(https://cloud.githubusercontent.com/assets/7959179/25409744/37557c94-29e1-11e7-982a-a67070e2a0fa.jpg)`,
        backgroundRepeat:`no-repeat`,
        backgroundSize:`contain`,
        backgroundPosition:`center`,
    },
    rep: {
        backgroundImage: `url(https://cloud.githubusercontent.com/assets/7959179/25410028/9366af84-29e2-11e7-8010-adb462e85ce3.jpg)`,
        backgroundRepeat:`no-repeat`,
        backgroundSize:`contain`,
        backgroundPosition:`center`,
    },
    partTime: {
        backgroundImage: `url(https://cloud.githubusercontent.com/assets/7959179/25410140/13010ac8-29e3-11e7-9df3-953d304e5359.jpg)`,
        backgroundRepeat:`no-repeat`,
        backgroundSize:`contain`,
        backgroundPosition:`center`,
    },
}

/*categoryList
 *
 * An array object that per each element contains data for the job categories
 *
 * */
const categoryList = [{
  key: 1,
  heading: 'One-Time Gig',
  subHeadingForEmp: 'Tasks that can be done within a 24-hour period',
  divStyle,
  type: 'otg'
}, {
  key: 2,
  heading: 'Summer 2018',
  subHeadingForEmp: 'Jobs/Internships from May - Apr',
  divStyle,
  type: 'summer'
}, {
  key: 3,
  heading: 'Winter Breaks',
  subHeadingForEmp: 'Jobs/Internships between school semesters',
  divStyle,
  type: 'winter'
}, {
  key: 4,
  heading: 'Freelancing',
  subHeadingForEmp: 'Partner up with a student for a project',
  divStyle,
  type: 'freelance'
}, {
  key: 5,
  heading: 'Campus Rep & Brand Ambassador',
  subHeadingForEmp: 'Let students promote your product and brand',
  divStyle,
  type: 'rep'
}, {
  key: 6,
  heading: 'Part-time work',
  subHeadingForEmp: 'Jobs/Internships while in school',
  divStyle,
  type: 'pt'
}]


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
        <SidebarContainer 
            isAStudent={false} 
        />
        <Title 
            titleName="PICK A JOB TYPE YOU WANT"
            subHeading="I want to post a job for..."
        />
        <Categories 
            categoryObject={categoryList}
        />
      </div>
    )
  },
})
export default CategoriesContainer
