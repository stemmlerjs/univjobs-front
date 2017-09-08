
import React, { PropTypes } from 'react'

import { experienceHobbiesEtc, listItemContainer, itemIcon, itemIconGPA, languagesItemIcon } from '../styles/StudentProfileIconsStyles.css'

import config from 'config'
import ReactTooltip from 'react-tooltip'

import { attrExists } from 'helpers/utils'

export default function StudentProfileIcons ({ hasCar, sportsString, clubsString, gpa, languagesString, renderTooltips }) {
  return (
    <div className={experienceHobbiesEtc}>
      { hasCar == 1
          ? <div className={listItemContainer}>

              {
                attrExists(renderTooltips) && renderTooltips == true
                  ? <ReactTooltip delayHide={100} delayShow={100} place="top" effect="float"/>
                  : ''
              }
              
              <img data-tip={'Transportation availability'} className={itemIcon} src={`${config.assetUrl}components/cards/student/actions/a/has_car_active_24px.svg`}/>
              <div>Daily access to a vehicle</div>
            </div>
          : ''
      }
      { sportsString !== ""
          ? <div className={listItemContainer}>
              {
                attrExists(renderTooltips) && renderTooltips == true
                  ? <ReactTooltip delayHide={100} delayShow={100} place="top" effect="float"/>
                  : ''
              }
              <img data-tip={'Sports'} className={itemIcon} src={`${config.assetUrl}components/cards/student/actions/a/sports_active_24px.svg`}/>
              <div>{sportsString}</div>
            </div>
          : ''
      }
      { clubsString !== ""
          ? <div className={listItemContainer}>
              {
                attrExists(renderTooltips) && renderTooltips == true
                  ? <ReactTooltip delayHide={100} delayShow={100} place="top" effect="float"/>
                  : ''
              }
              <img data-tip={'Clubs'} className={itemIcon} src={`${config.assetUrl}components/cards/student/actions/a/clubs_active_24px.svg`}/>
              <div>{clubsString}</div>
            </div>
          : ''
      }
      { gpa 
          ? <div className={listItemContainer}>
              {
                attrExists(renderTooltips) && renderTooltips == true
                  ? <ReactTooltip delayHide={100} delayShow={100} place="top" effect="float"/>
                  : ''
              }
              <div data-tip={'GPA'} className={`${itemIcon} ${itemIconGPA}`}>{Number(gpa).toFixed(2)}</div>
              <div>GPA of {Number(gpa).toFixed(2)}</div>
            </div>
          : ''
      }
      { languagesString !== ""
          ? <div className={listItemContainer}>
              {
                attrExists(renderTooltips) && renderTooltips == true
                  ? <ReactTooltip delayHide={100} delayShow={100} place="top" effect="float"/>
                  : ''
              }
              <i data-tip={'Languages'} aria-hidden="true" className={`fa fa-language ${languagesItemIcon}`}></i>
              <div>{languagesString}</div>
            </div>
          : ''
      }
    </div>
  )
}



