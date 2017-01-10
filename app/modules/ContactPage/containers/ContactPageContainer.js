import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

// ============= OTHER IMPORTS========================== //
import { ContactPage } from 'modules/ContactPage'
import { Footer, RegularNav } from 'modules/Main'
import { contactPage } from '../styles/ContactPage.css'
import { sendMessage } from 'helpers/contact'

/*NOTE: Using ES6 class, please see:
 *  https://toddmotto.com/react-create-class-versus-component/
 *
 *  This uses 'class expressions', please see:
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class
 *
 * */
class ContactPageContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    handleSendMessage(e) {
        e.preventDefault()
        console.log('Yo')
        sendMessage()
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
                    onHandleSendMessage={(e) => this.handleSendMessage(e)}      
                /> 
               <Footer />
             </div>
        )
    }
}

ContactPageContainer.propTypes = {
    router: React.PropTypes.string
}
        
export default ContactPageContainer
