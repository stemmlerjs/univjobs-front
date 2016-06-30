import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { centeredContainer, header, subHeader, btn } from './styles.css'
import SkyLight from 'react-skylight';
//http://marcio.github.io/react-skylight/

const EmployerSignup = React.createClass({
  propTypes: {
    showEmployerSignupForm: PropTypes.func.isRequired,
    empFormVisible: PropTypes.bool.isRequired 
  },

/** 
  * showEmpSignupForm
  * 
  * @param (event) e
  * Private method. Invokes the SHOW_EMPLOYER_SIGNUP_FORM action through the showEmployerSignupForm prop.
  */

  showEmpSignupForm(e) {
    e.preventDefault()
    this.props.showEmployerSignupForm()
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

              <section>
                <h1>React SkyLight</h1>
                <button onClick={() => this.refs.simpleDialog.show()}>Open Modal</button>
              </section>
              <SkyLight hideOnOverlayClicked ref="simpleDialog" title="Welcome!">
                We can configure callbacks and stuff on this to validate text I believe
              </SkyLight>

        { this.props.empFormVisible === false ?
          <button onClick={this.showEmpSignupForm} className={btn}>Employers - Post a job now</button>
        : <div>FORM GOES HERE</div>

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

export default connect(mapStateToProps, )(EmployerSignup)

