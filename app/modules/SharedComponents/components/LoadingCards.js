
import React, { PropTypes } from 'react'

import { timelineItem, animatedBackground, backgroundMasker, headerLeft, 
  headerRight, headerBottom, subheaderLeft, subheaderRight, subheaderBottom,
  contentTop, contentFirstEnd, contentSecondLine, contentSecondEnd, contentThirdLine, contentThirdEnd,


   headerTop, headerTopHelp, leftSide, picHorizontal, picHorizontalUnder, picCutthrough, besideCompany,
   underPicture, besideTitle, underTitle, thingsBeside, companySide, thiccpart

} from '../styles/LoadingCard.css'


const LoadingCards = ({count}) => (
  <div className={timelineItem}>
    <div className={animatedBackground}>
      <div className={`${backgroundMasker} ${headerTop}`}></div>
      <div className={`${backgroundMasker} ${headerTopHelp}`}></div>
      <div className={`${backgroundMasker} ${leftSide}`}></div>
      <div className={`${backgroundMasker} ${picHorizontal}`}></div>
      <div className={`${backgroundMasker} ${picHorizontalUnder}`}></div>
      <div className={`${backgroundMasker} ${picCutthrough}`}></div>
      <div className={`${backgroundMasker} ${besideCompany}`}></div>
      <div className={`${backgroundMasker} ${underPicture}`}></div>
      <div className={`${backgroundMasker} ${besideTitle}`}></div>
      <div className={`${backgroundMasker} ${underTitle}`}></div>
      <div className={`${backgroundMasker} ${thingsBeside}`}></div>
      <div className={`${backgroundMasker} ${companySide}`}></div>
      <div className={`${backgroundMasker} ${thiccpart}`}></div>
    </div>
  </div>
)

export default LoadingCards
/*

      <div className={`${backgroundMasker} ${headerLeft}`}></div>
      <div className={`${backgroundMasker} ${headerRight}`}></div>
      <div className={`${backgroundMasker} ${headerBottom}`}></div>
      <div className={`${backgroundMasker} ${subheaderLeft}`}></div>
      <div className={`${backgroundMasker} ${subheaderRight}`}></div>
      <div className={`${backgroundMasker} ${subheaderBottom}`}></div>
      <div className={`${backgroundMasker} ${contentTop}`}></div>
      <div className={`${backgroundMasker} ${contentFirstEnd}`}></div>
      <div className={`${backgroundMasker} ${contentSecondLine}`}></div>
      <div className={`${backgroundMasker} ${contentSecondEnd}`}></div>
      <div className={`${backgroundMasker} ${contentThirdLine}`}></div>
      <div className={`${backgroundMasker} ${contentThirdEnd}`}></div>

*/
