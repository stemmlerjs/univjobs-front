import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// ============================================================ //

// ============= OTHER IMPORTS========================== //
import { ContactPage } from 'modules/ContactPage'
import { Footer, RegularNav } from 'modules/Main'
import { contactPage } from '../styles/ContactPage.css'
import { sendMessage } from 'helpers/contact'
// ==================MESSAGES============================== //
import ReduxToastr from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'

// ====================================== //

const actionCreators = {
}

/*NOTE: Using ES6 class, please see:
 *  https://toddmotto.com/react-create-class-versus-component/
 *
 *  This uses 'class expressions', please see:
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class
 *
 *
 * FIXME: Add security measure before going to production. Maybe sanitize the data?
 * */
class ContactPageContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            senderType: 'I am an employer',
            senderName: '',
            senderEmail: '',
            senderMessage: ''
        }
    }
    handleSenderType(e) {
        this.setState({senderType: e})
    }
    handleSenderName(e) {
        e.preventDefault()
        console.log(e) 
        this.setState({senderName: e.target.value})
    }
    handleSenderEmail(e) {
        e.preventDefault()
        console.log(e) 
        this.setState({senderEmail: e.target.value})
    }
    handleSenderMessage(e) {
        e.preventDefault()
        console.log(e) 
        this.setState({senderMessage: e.target.value})
    }
    handleSendMessage(e) {
        e.preventDefault()
        
        //TODO: Refactor into a util function. 
        //          Append into an object or array 
        //          where it checks each key's value empty or not
        //          return true or false
        //
        //      Add a checker for all inputs
        //          Must have proper email
        //          Must sanitize all inputs to prevent any bad injections. 
        //
        //      NOTE: Should we even sanitize this? 
        //
        if(this.state.senderName.length > 0 && this.state.senderEmail.length > 0 && this.state.senderMessage.length > 0) {
            const data = {
                senderType: this.state.senderType,
                senderName: this.state.senderName,
                senderEmail: this.state.senderEmail,
                senderMessage: this.state.senderMessage
            }
            sendMessage(data)
            .then((response) => {
                if(response.success) {
                    toastr.success(response.message)
                } else {
                    toastr.error(response.error)
                }
            })
            .catch((err) => {
                toastr.error(err)
            })
        } else {
            toastr.error('Please fill out everything before sending')
        }

    }
    componentWillMount() {
        // Hide the overlay on mount if coming from direct URL
        this.props.closeOverlay()
    }
    render () {
        return (
            <div>
               <RegularNav />
               <ContactPage
                    senderType={this.state.senderType}
                    senderName={this.state.senderName}
                    senderEmail={this.state.senderEmail}
                    senderMessage={this.state.senderMessage}
                    onHandleSenderType={(e) => this.handleSenderType(e)}
                    onHandleSenderName={(e) => this.handleSenderName(e)}
                    onHandleSenderEmail={(e) => this.handleSenderEmail(e)}
                    onHandleSenderMessage={(e) => this.handleSenderMessage(e)}
                    onHandleSendMessage={(e) => this.handleSendMessage(e)}      
                /> 
               <Footer />
               <ReduxToastr
                 timeOut={4000}
                 newestOnTop={false}
                 position="top-right"
                />
             </div>
        )
    }
}

ContactPageContainer.propTypes = {
    router: React.PropTypes.string
}
/* The entire redux store is passed in here,
// Return an object defining which values you want to bind to props
//
// @params ({user}) contains BaseUser & Employer attributes
// */
        
function mapStateToProps({}) {
  return {
  }
}

/**
  * mapActionCreatorsToProps
  *
  * This function grabs all of the Action Creators on the object of the first parameter in the bindActionCreators function
  * and makes them available to us through THIS component's props (SignupContainer, this.props). We can then pass these to our child
  * components to use. DON'T MAKE A HABIT of doing this too deeply (drilling prop holes).
  *
  **/

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

// connect(specify_what_keys_you_want_from_store, wraps_dispatch_around_action_creators)(container)
//
export default connect(mapStateToProps, mapActionCreatorsToProps)(ContactPageContainer)
