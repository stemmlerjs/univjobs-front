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

        const data = {
            senderType: this.state.senderType,
            senderName: this.state.senderName,
            senderEmail: this.state.senderEmail,
            senderMessage: this.state.senderMessage
        }
        sendMessage(data)
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
             </div>
        )
    }
}

ContactPageContainer.propTypes = {
    router: React.PropTypes.string
}
        
export default ContactPageContainer
