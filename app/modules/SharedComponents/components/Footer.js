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
         icon, link, spacer, knowUs, withLoveSection, socialMediaCTA } from '../styles/Footer.css'

/*
 *  * NOTE: Testing ES6 stateless function
 *   * Ref: https://toddmotto.com/stateless-react-components/
*/
const Footer = () => (
    <footer className={flexFooter}>
        <div className={header}>
            <p className={knowUs}>
                Want to get to know more about us? &nbsp;
            </p>
            <p className={socialMediaCTA}>Keep up with us on social media</p>
        </div>
        <div className={flexFooterRow}>
            <div className={flexMediaItems}>
              <i className="fa fa-instagram fa-4x" onClick={() => {
                  var win = window.open("https://instagram.com/univjobs", '_blank');
                  win.focus();
              }} aria-hidden="true"></i>
            </div>
            <div className={flexMediaItems}>
              <i className="fa fa-facebook fa-4x" onClick={() => {
                  var win = window.open("https://www.facebook.com/univjobs", '_blank');
                  win.focus();
              }} aria-hidden="true"></i>
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
        <div className={`${flexFooterRow} ${withLoveSection}`}> 
          <div>
            <p>
                Made with &hearts; in the town of Oakville • Product of DCommons, Inc. © 2017
            </p>
          </div>
        </div>

    </footer>
)

export default Footer
