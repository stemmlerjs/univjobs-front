
import React, { PropTypes } from 'react'

import { timelineItem, animatedBackground, backgroundMasker, headerTop, headerLeft, 
  headerRight, headerBottom, subheaderLeft, subheaderRight, subheaderBottom,
  contentTop, contentFirstEnd, contentSecondLine, contentSecondEnd, contentThirdLine, contentThirdEnd
} from '../styles/LoadingCard.css'


const LoadingCard = () => (
  <div className={timelineItem}>
    <div className={animatedBackground}>
      <div className={`${backgroundMasker} ${headerTop}`}></div>
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
    </div>
  </div>
)

export default LoadingCard
