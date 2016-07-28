import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const InitialOverlay = React.createClass({
  contextTypes: {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  },

  componentWillMount() {

  },
  componentDidMount() {

  },

  closeOverlay() {
    console.log("Now, we close the overlay!!!")
  },

  render () {
    console.log(this.props, "my props");
    // Supply all child props with the closeOverlay() function
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       closeOverlay: this.closeOverlay
     })
    );
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="appear"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          { this.props.isAuthenticated === true ? 
            <div style={{zIndex: '1000', position: 'fixed', backgroundColor:'white', left: 0, right: 0, top: 0}}>
              Overlay Test
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
function mapStateToProps({user}) {
  return {
    isAuthenticated: user.isAuthenticated ? user.isAuthenticated : false,
  }
}

export default connect(mapStateToProps)(InitialOverlay)

