import React, { PropTypes } from 'react'
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
    console.log(this.context.store)
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
          { this.state.overlayVisible === true ? 
            <div style={{zIndex: '1000', position: 'fixed', backgroundColor:'white', left: '0', right: '0', top: '0'}}>
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
export default InitialOverlay