// ===============REACT BUILTIN======================//
import React, { PropTypes } from 'react'

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
        backgroundImage: `https://cloud.githubusercontent.com/assets/6892666/25756967/c09784b8-3196-11e7-96d4-6342ef016bb2.jpg`,
        backgroundRepeat:`no-repeat`,
        backgroundSize:`contain`,
        backgroundPosition:`center`,
    },
    summer: {
        backgroundImage: `https://cloud.githubusercontent.com/assets/6892666/25756970/c098cd0a-3196-11e7-9216-06826ac6aa46.jpg`,
        backgroundRepeat:`no-repeat`,
        backgroundSize:`contain`,
        backgroundPosition:`center`,
    },
    winter: {
        backgroundImage: `https://cloud.githubusercontent.com/assets/6892666/25756971/c09abd68-3196-11e7-8e1a-035e2106ae86.jpg`,
        backgroundRepeat:`no-repeat`,
        backgroundSize:`contain`,
        backgroundPosition:`center`,
    },
    freelance: {
        backgroundImage: `https://cloud.githubusercontent.com/assets/6892666/25756968/c0983fe8-3196-11e7-8bc6-1ccc40ee200d.jpg`,
        backgroundRepeat:`no-repeat`,
        backgroundSize:`contain`,
        backgroundPosition:`center`,
    },
    rep: {
        backgroundImage: `https://cloud.githubusercontent.com/assets/6892666/25756972/c0b007cc-3196-11e7-94ba-68c246fde92b.jpg`,
        backgroundRepeat:`no-repeat`,
        backgroundSize:`contain`,
        backgroundPosition:`center`,
    },
    partTime: {
        backgroundImage: `https://cloud.githubusercontent.com/assets/6892666/25756969/c0985cb2-3196-11e7-8c13-0435e14adff1.jpg`,
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
  subHeadingForEmp: 'Jobs/Internships for students during school',
  divStyle,
  type: 'pt'
}]


const CategoriesContainer = React.createClass({
  propTypes: {
      //Insert propTypes for typeChecking
  },

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
            titleName="I want to post a job for..."
            subHeading=""
        />
        <Categories 
            categoryObject={categoryList}
        />
      </div>
    )
  },
})

export default CategoriesContainer
