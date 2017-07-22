
import React, { PropTypes } from 'react'

import { linksFlex, fbShareButton, twitterShareButton, linkedInShareButton, emailShareButton } from '../styles/SocialLinks.css'

import config from 'config'
import moment from 'moment'

export default function SocialLinks ({ jobTitle, responsibilities }) { 
  return (
    <div className={linksFlex}>
      {/* FACEBOOK */}
      <button className={`${fbShareButton}`} 
        data-href="https://univjobs.ca" 
        data-layout="button_count" onClick={() => {
            FB.ui({
            method: 'share',
            display: 'popup',
            href: window.location.href,
            }, function(response){});

      }}>
      </button>

      { /* TWITTER */}
      <button className={twitterShareButton} onClick={() => {

        var url = window.location.href;
        var text = `Check out this "${jobTitle}" job posting on Univjobs!`;
        window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');

      }}></button>

      { /* LINKEDIN */}
      <button className={linkedInShareButton} onClick={() => {

        var url = window.location.href;
        var title = 'Job Posting - "' + jobTitle + '" on Univjobs '
        window.open('https://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title)+'&summary='+encodeURIComponent(responsibilities)+'&source='+encodeURIComponent(window.location.host))

      }}></button>

      { /* EMAIL */}
      <button className={emailShareButton} onClick={() => {
        var subject = 'Job Posting - "' + jobTitle + '" on Univjobs '
        var body = `Check out this "${jobTitle}" job posting on Univjobs via ${window.location.href}.`;
        window.location.href = (`mailto:?subject=${subject}&body=${body}`)
      }}></button>

    </div>
  )
}

