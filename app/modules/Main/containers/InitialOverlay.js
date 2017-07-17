
/* 
 * InitialOverlay
 *
 * This components is to display the students who applied to the current job posting being viewed by the employer
 *
 * */

// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'


// ==============THIRD PARTY IMPORTS========================= //
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// =============REDUX STATE & IMPORTS========================= //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAccessToken } from 'helpers/auth'
import { hideOverlay } from 'redux/modules/rootApplication/rootApplication'
import { getAllStaticLists } from 'redux/modules/list/list'

// ================CSS IMPORTS============================== //
import animationStyles from '../styles/InitialOverlayStyles.css'

import { FeedbackForm } from 'modules/SharedComponents'
import * as feedbackFormActionCreators from 'redux/modules/feedback/feedback'

const styles = {
  main: {
    textAlign:'center'
  }
}

const InitialOverlay = React.createClass({
  contextTypes: {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  },

  closeOverlay() {
  /* InitialOverlay is being called every render: see at root folder config/routes.js
   * Which means that function getAllStaticLists() is checking for univjobs-token
   *
   * Users who do not have token will be stuck at InitialOverlay
   * 
   * QUESTION: In what way could we not use the hideOverlay when signupcontainer is called & users do not have token, to avoid being stuck
   *
   * OPTION: 1.) Check to see if user has token ? Yes, allow func to execute : No to token, hideoverlay & redirect to signupcontainer 
   * 
   * */
//    debugger
        console.log("[Univjobs]: v1.0 - Getting all application lists.")
        this.context.store.dispatch(getAllStaticLists())
        this.context.store.dispatch(hideOverlay())

  },

  /*Detects if the browser is mobile or not
   * */

  detectMobile() {
      if (/Mobi/i.test(navigator.userAgent) || /Anroid/i.test(navigator.userAgent) || 
          /Mobile/i.test(navigator.userAgent)) {
                console.log('TRUEEST')
          } else {
                console.log('NOT TRUESST')
          
          }

  },

  componentDidMount() {
    // TODO: we need to fix the main page so that it takes us to join but it doesnt mess
    // up our page routing and do this on every page.
    // 
    // I think for this to work, it just needs to be a part of the doRedirectionFilter method. It needs to be 
    // a part of that flow.

    // if(window.location.href.indexOf('/#/?')) {
    //   window.location.assign('/#/join')
    // }
  },

  render () {
    let elem = document.querySelector('div[data-reactroot]');   
    if(elem) elem.style.height= '100%'
    

    // Supply all child props with the closeOverlay() function
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       closeOverlay: this.closeOverlay
     })
    );
    console.log(this)
    debugger
    return (
      <div style={styles.main}>
        {this.props.location.pathname !== "/join"
          ? <FeedbackForm 
          isOpen={this.props.feedback.isOpen} 
          title={this.props.feedback.title}
          description={this.props.feedback.description}
          errorsMap={this.props.feedback.errorsMap}
          isSubmitting={this.props.feedback.isSubmitting}
          submitSuccess={this.props.feedback.submitSuccess}
          submitFailure={this.props.feedback.submitFailure}
          screenshot={this.props.feedback.screenshot}
          toggleFeedbackFormOpen={this.props.toggleFeedbackFormOpen} 
          checkForFormErrors={this.props.checkForFeedbackFormErrors}
          updateFeedbackForm={this.props.updateFeedbackForm}
          submitFeedbackForm={this.props.submitFeedbackForm}
        />
          :  ''
        }
        
        <ReactCSSTransitionGroup
          transitionName={animationStyles}
          transitionAppear={true}
          transitionLeave={true}
          transitionEnterTimeout={600}
          transitionAppearTimeout={600}
          transitionLeaveTimeout={300}>
          { this.props.isOverlayActive === true ? 
            <div style={{zIndex: '1000', position: 'fixed', backgroundColor:'white', left: 0, right: 0, top: 0, bottom: 0}}>
              <h1>Welcome to Univjobs!</h1>
            </div>
            : null
          }

         { this.detectMobile()
          
          }
        </ReactCSSTransitionGroup>
        {childrenWithProps}
      </div>
    )
  },
})
// We should have a new value on the user called 'isOverlayActive'
function mapStateToProps({rootApplication, feedback, mobileLoad}) {
  return {
    isOverlayActive: rootApplication.isOverlayActive ? true : false,
    feedback: feedback ? feedback : {},
    mobileLoad: mobileLoad.isMobileOverlayActive ? true : false,
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(feedbackFormActionCreators, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(InitialOverlay)


