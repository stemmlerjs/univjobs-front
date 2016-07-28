import React, { PropTypes } from 'react'

const InitialOverlay = React.createClass({

  render () {
      console.log("overlay though")
      console.log(this.props)
    return (
      <div >
        <h1 style={{zIndex: '1000', position: 'absolute'}}>React Router Tutorial</h1>
        {this.props.children}
      </div>
    )
  },
})
export default InitialOverlay