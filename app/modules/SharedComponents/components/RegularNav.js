
/*RegularNav
 *
 * This components is to display the Nav bar for anything that does not need a token 
 *
 * */
// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============THIRD PARTY IMPORTS========================= //
import { Link } from 'react-router'

// ================CSS IMPORTS============================== //
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
