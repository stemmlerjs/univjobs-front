import React from 'react'
import { Sidebar } from 'components/'
const SidebarContainer = React.createClass({
  // <Provider> implicitly does .childContextTypes and passes down the store object to all components.
  // We can grab this by specifying the context types we want
  contextTypes: {
    store: React.PropTypes.object
  },
  render () {
    const { store } = this.context;
    console.log(store);
    return (
      <Sidebar/>
    )
  },
})



export default SidebarContainer