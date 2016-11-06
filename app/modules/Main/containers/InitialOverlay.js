import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { hideOverlay } from 'redux/modules/rootApplication/rootApplication'
import animationStyles from '../styles/InitialOverlayStyles.css'

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
    this.context.store.dispatch(hideOverlay())
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
    return (
      <div style={styles.main}>
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
        </ReactCSSTransitionGroup>
        {childrenWithProps}
      </div>
    )
  },
})
// We should have a new value on the user called 'isOverlayActive'
function mapStateToProps({rootApplication}) {
  return {
    isOverlayActive: rootApplication.isOverlayActive ? true : false,
  }
}

export default connect(mapStateToProps)(InitialOverlay)

