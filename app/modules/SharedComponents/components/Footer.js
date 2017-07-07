/*Footer
 *
 * This components is to display the Footer bar for anything that does not need a token 
 *
 * */

// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============THIRD PARTY IMPORTS========================= //
import { Link } from 'react-router'

// ================CSS IMPORTS============================== //
import { flexFooter, flexFooterRow, flexMediaItems, header, 
         icon, link, spacer } from '../styles/Footer.css'

/*
 *  * NOTE: Testing ES6 stateless function
 *   * Ref: https://toddmotto.com/stateless-react-components/
*/
const Footer = () => (
    <footer className={flexFooter}>
        <div className={header}>
            <p>
                Want to get know more about us? &nbsp;
                <Link className={link} to={`join`}>
                    Check us out
                </Link>
            </p>
        </div>
        <div className={flexFooterRow}>
            <div className={flexMediaItems}>
                <i className="fa fa-instagram fa-4x" aria-hidden="true"></i>
            </div>
            <div className={flexMediaItems}>
                <i className="fa fa-facebook fa-4x" aria-hidden="true"></i>
            </div>
            <div className={flexMediaItems}>
                <i className="fa fa-twitter fa-4x" aria-hidden="true"></i>
            </div>
            <div className={flexMediaItems}>
                <i className="fa fa-linkedin fa-4x" aria-hidden="true"></i>
            </div>
        </div>
        <div className={spacer}></div>
        <div className={flexFooterRow}> 
            <Link className={link} to={`about-us`}>
                About
            </Link>
            &nbsp;
            &nbsp;
            &nbsp;
            <Link className={link}to={`contact-us`}>
                Contact
            </Link>
        </div>
        <div className={flexFooterRow}> 
            <p>
                Made with &hearts; in the town of Oakville • Product of DCommons, Inc. © 2017
            </p>
        </div>

    </footer>
)

export default Footer
