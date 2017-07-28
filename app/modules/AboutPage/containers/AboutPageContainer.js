// =============REACT BULTINS========================== //
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

// ============= MADE COMPONENTS========================== //
import { AboutPage } from 'modules/AboutPage'
import { Footer, RegularNav } from 'modules/SharedComponents'

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authRedirectFilter } from 'config/routes'

import * as userActionCreators from 'redux/modules/user/user'
import * as signupFormActionCreators from 'redux/modules/signupForm/signupForm'
import * as loginFormActionCreators from 'redux/modules/loginForm/loginForm'

const actionCreators = {
      ...userActionCreators,
      ...signupFormActionCreators,
      ...loginFormActionCreators
}


const AboutPageContainer = React.createClass({
    propTypes: {
        //Insert variables with data types for typechecking  
    
    },
    contextTypes: {
        router: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired
    },
    componentWillMount() {
        // Hide the overlay on mount if coming from direct URL
        this.props.closeOverlay()
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    render () {
      console.log(this.props, "props yo")
        return (
            <div>
               <RegularNav 
                  dropDownActive={this.props.dropDownActive}
                  toggleDropdownMenu={this.props.toggleDropdownMenu}
                  router={this.context.router}
                  closeNavDropDown={this.props.closeNavDropDown}/>
               <AboutPage/> 
               <Footer/>
             </div>
        )
    },
})
    function mapStateToProps({user, signupForm}) {
        return {
            user: user ? user : {},
            dropDownActive: signupForm.dropDownActive ? signupForm.dropDownActive : false
        }
    }
    
    /**
     *   * mapActionCreatorsToProps
     *     *
     *      * This function grabs all of the Action Creators on the object of the first parameter in the bindActionCreators function
     *         * and makes them available to us through THIS component's props (SignupContainer, this.props). We can then pass these to our child
     *           * components to use. DON'T MAKE A HABIT of doing this too deeply (drilling prop holes).
     *             *
     *               **/

    function mapActionCreatorsToProps(dispatch) {
          return bindActionCreators(actionCreators, dispatch)
    }

    // connect(specify_what_keys_you_want_from_store, wraps_dispatch_around_action_creators)(container)
    //
        
export default connect(mapStateToProps, mapActionCreatorsToProps)(AboutPageContainer)
