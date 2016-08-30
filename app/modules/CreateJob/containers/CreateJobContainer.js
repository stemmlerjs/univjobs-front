import React from 'react'

const CreateJobContainer = React.createClass({
  componentWillMount() {
    
  },
  render () {
    const jobType = this.props.params.jobtype;
    return (
      <div>{"HELLO YES, LET'S CREATE A JOB OF TYPE " + jobType }</div>
    )
  },
})
export default CreateJobContainer