import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { nav, logoText, noDeco, btn, 
        btnBlue, pseudoBtn, loginIcon} from '../styles/NavigationStyles.css'

/*
 *  * NOTE: Testing ES6 stateless function
 *   * Ref: https://toddmotto.com/stateless-react-components/
*/
const RegularNav = () => (
        <div className={nav}>
            <div>
                <Link to="/join" className={noDeco}>
                    <span className={logoText}>UNIVJOBS</span>
                </Link>
            </div>
            <div>
                <Link to="/join" className={`${btn} ${noDeco}` }>
                    <span>SIGNUP</span>
                </Link>
                <Link to="/join" className={`${btnBlue} ${noDeco}` }>
                    <span>LOGIN</span>
                </Link>
            </div>
        </div>
)

export default RegularNav