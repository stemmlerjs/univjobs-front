
import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'
import SkyLight from 'react-skylight'

import config from 'config'

import { cropper, cropButton } from 'modules/SharedComponents/styles/Cropper.css'

const PictureCropper = ({ onDoneCrop, rotate }) => (
  <div>
      <div className={cropper} id="cropper"></div>
      <div>Drag and zoom to crop your new profile picture</div>
      <button className={cropButton} onClick={rotate}>Rotate</button>
      <button className={cropButton} onClick={onDoneCrop}>Done cropping</button>
  </div>
)

export default PictureCropper
