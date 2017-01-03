import React, { PropTypes } from 'react'
import { Link } from 'react-router'

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import { authRedirectFilter } from 'config/routes'

// ============= OTHER IMPORTS========================== //
import { ContactPage } from 'modules/ContactPage'
import { Footer, RegularNav } from 'modules/Main'

import { contactPage } from '../styles/ContactPage.css'

const actionCreators = {
      ...userActionCreators,
}


const ContactPageContainer = React.createClass({
    contextTypes: {
        router: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired
    },
    componentWillMount() {
        // Hide the overlay on mount if coming from direct URL
        this.props.closeOverlay()
    },
    render () {
        return (
            <div>
               <RegularNav />
               <ContactPage /> 
               <Footer />
             </div>
        )
    },
})
    function mapStateToProps({user}) {
        return {
            user: user ? user : {},
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
        
export default connect(mapStateToProps, mapActionCreatorsToProps)(ContactPageContainer)
