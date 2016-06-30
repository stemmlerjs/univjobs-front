import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { centeredContainer, header, subHeader, btn } from './styles.css'
import showEmployerSignupForm from 'redux/modules/employerSignup/employerSignup'
import { bindActionCreators } from 'redux'
import * as empSignupActionCreators from 'redux/modules/employerSignup/employerSignup'

const EmployerSignup = React.createClass({
  propTypes: {
    showEmployerSignupForm: PropTypes.func.isRequired,
    empFormVisible: PropTypes.bool.isRequired
  },
  showEmpSignupForm(e) {
    e.preventDefault()
    this.context.dispatch(showEmployerSignupForm())
  },
  render() {
    return (
      <div className={centeredContainer}>
        <div className={header}>
          HIRE STUDENTS
        </div>
        <div className={subHeader}>
          Post jobs for students at any Canadian college/university
        </div>
        { this.props.empFormVisible === false ?
          <button onClick={this.showEmpSignupForm} className={btn}>Employers - Post a job now</button>
        : <div>suck me ass</div>
        }
        
      </div>
    )
  }
})

function mapStateToProps({employerSignup}) {
  return {
    empFormVisible: employerSignup.empFormVisible
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(empSignupActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerSignup)

