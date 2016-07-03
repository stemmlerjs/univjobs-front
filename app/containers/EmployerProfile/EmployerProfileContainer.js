import React from 'react'
import { SidebarContainer } from 'containers'
import { EmployerProfile } from 'components'
import { pageContainer } from './styles.css'

const EmployerProfileContainer = React.createClass({
  render () {
    return (
      <div className={pageContainer}>
        <SidebarContainer/>
        <EmployerProfile/>
      </div>
    )
  }
})
export default EmployerProfileContainer

