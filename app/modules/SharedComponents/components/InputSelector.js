
import React, { PropTypes } from 'react'

import { inputSelectorContainer, selectorItem, selectorItemStart, selectorItemEnd, selectorRow,
  topLeft, topMiddle, topRight, middleLeft, middleMiddle, middleRight, bottomLeft,
  bottomMiddle, bottomRight, bottomSingleElement, selected } from '../styles/InputSelector.css'

/*
 * data - the raw array of data
 * valueField - attribute in the data object that contains the text that you want to show
 * maxCol - max number of columns you want for this data set 
 * idField - attribute in the data object that contains the id
 * onSelect - returns the id of the selected element 
 * selectedId - pass this prop in so that we know which id is always selected
 */

export default function InputSelector({ data, valueField, maxCol, idField, onSelect, selectedId }) { 

  const noConfigRender = () => {
    return data.map((item, index) => {

      /*
        * Rendering the first element.
        */

      if (index == 0) {
        return (
          <div data-item-id={item[idField]} className={selectorItemStart} key={`selector-component-start-s${index}`}>{item[valueField]}</div>
        )
      }

      /*
        * Rendering the last element.
        */

      else if (index == data.length - 1) {
          return (
          <div data-item-id={item[idField]} className={selectorItemEnd} key={`selector-component-end-s${index}`}>{item[valueField]}</div>
        )
      }

      /*
        * Rendering the middle element.
        */
      
      else {
        return (
          <div data-item-id={item[idField]} className={selectorItem} key={`selector-component-s${index}`}>{item[valueField]}</div>
        )
      }

      
    })
  }

  const configRender = () => {

    /*
     * Because we're using JSX, we can't just for loop over
     * all of the rows that we want so we need to actually
     * need to chunk our data.
     * 
     * if we have this array [1,2,3,4,5,6] and we want a max column 
     * size of 3, we can do:
     * 
     * [1,2,3,4,5,6].chunk(3)
     * 
     * and we'll get [[1,2,3], [4,5,6]]
     */

    Array.prototype.chunk = function ( n ) {
      if ( !this.length ) {
          return [];
      }
      return [ this.slice( 0, n ) ].concat( this.slice(n).chunk(n) );
    };

    var rows = data.chunk(maxCol) // the rows we're chunking over, each containing column data.
    var itemIndex = 0;            // running total number items we've indexed
    var hash  = new Date().getUTCMilliseconds();

   /*
    * There are three different categories of rows.
    * 
    * Top-left, top-middle, top-right, (1 many)
    * Middle-left, middle-middle, middle-right, (0-n many)
    * Bottom-left, bottom-middle, bottom-right (1 many)
    * 
    * We need to render accordingly.
    */

    return rows.map((row, rowIndex) => {

      /*
       * ============ [TOP ROW] ================
       */

      if (rowIndex == 0) {

        /*
         * Slice the array of items so we can build a single JSX component for this
         * row.
         */

        return (
          <div className={selectorRow}>
            {
              row.map((item, colIndex) => {

               /*
                * Top-left
                */

                if (colIndex == 0) {
                  return (
                    <div onClick={(value) => onSelect(value.target.getAttribute('data-item-id'))} 
                      data-item-id={item[idField]} 
                      className={item[idField] == selectedId ? `${topLeft} ${selected}` : topLeft} key={`selector-component-${hash}-${rowIndex}-${colIndex}`}>{item[valueField]}</div>
                  )
                }

               /*
                * Top-right
                */

                else if (colIndex == maxCol - 1) {
                  return (
                    <div onClick={(value) => onSelect(value.target.getAttribute('data-item-id'))} 
                      data-item-id={item[idField]} 
                      className={item[idField] == selectedId ? `${topRight} ${selected}` : topRight} key={`selector-component-${hash}-${rowIndex}-${colIndex}`}>{item[valueField]}</div>
                  )
                }

               /*
                * Top-middle
                */

                else {
                  return (
                    <div onClick={(value) => onSelect(value.target.getAttribute('data-item-id'))} 
                      data-item-id={item[idField]} 
                      className={item[idField] == selectedId ? `${topMiddle} ${selected}` : topMiddle} key={`selector-component-${hash}-${rowIndex}-${colIndex}`}>{item[valueField]}</div>
                  )
                }
              })
            }
          </div>
        )

      }

      /*
       * ============ [BOTTOM ROW] ================
       */

      else if (rowIndex == rows.length - 1) {

        /*
         * Slice the array of items so we can build a single JSX component for this
         * row.
         */

        return (
          <div className={selectorRow}>
            {
              row.map((item, colIndex) => {

               /*
                * Single-final-element
                */

                if (row.length == 1) {
                  return (
                    <div onClick={(value) => onSelect(value.target.getAttribute('data-item-id'))}
                     data-item-id={item[idField]} 
                     className={item[idField] == selectedId ? `${bottomSingleElement} ${selected}` : bottomSingleElement} 
                     id={`selector-component-${rowIndex}-${colIndex}`}>{item[valueField]}</div>
                  )
                }

               /*
                * Bottom-left
                */

                if (colIndex == 0) {
                  return (
                    <div onClick={(value) => onSelect(value.target.getAttribute('data-item-id'))}
                     data-item-id={item[idField]} 
                     className={item[idField] == selectedId ? `${bottomLeft} ${selected}` : bottomLeft} key={`selector-component-${hash}-${rowIndex}-${colIndex}`}>{item[valueField]}</div>
                  )
                }

               /*
                * Bottom-right
                */

                else if (colIndex == row.length - 1) {
                  return (
                    <div onClick={(value) => onSelect(value.target.getAttribute('data-item-id'))}
                     data-item-id={item[idField]} 
                     className={item[idField] == selectedId ? `${bottomRight} ${selected}` : bottomRight} key={`selector-component-${hash}-${rowIndex}-${colIndex}`}>{item[valueField]}</div>
                  )
                }

               /*
                * Bottom-middle
                */

                else {
                  return (
                    <div onClick={(value) => onSelect(value.target.getAttribute('data-item-id'))}
                     data-item-id={item[idField]} 
                     className={item[idField] == selectedId ? `${bottomMiddle} ${selected}` : bottomMiddle} key={`selector-component-${hash}-${rowIndex}-${colIndex}`}>{item[valueField]}</div>
                  )
                }
              })
            }
          </div>
        )

      }

      /*
       * ============ [MIDDLE ROW] ================
       */

      else {
        return (
          <div className={selectorRow}>
            {
              row.map((item, colIndex) => {

               /*
                * Bottom-left
                */

                if (colIndex == 0) {
                  return (
                    <div onClick={(value) => onSelect(value.target.getAttribute('data-item-id'))}
                     data-item-id={item[idField]} 
                     className={item[idField] == selectedId ? `${middleLeft} ${selected}` : middleLeft} key={`selector-component-${hash}-${rowIndex}-${colIndex}`}>{item[valueField]}</div>
                  )
                }

               /*
                * Bottom-right
                */

                else if (colIndex == maxCol - 1) {
                  return (
                    <div onClick={(value) => onSelect(value.target.getAttribute('data-item-id'))}
                     data-item-id={item[idField]} 
                     className={item[idField] == selectedId ? `${middleRight} ${selected}` : middleRight} key={`selector-component-${hash}-${rowIndex}-${colIndex}`}>{item[valueField]}</div>
                  )
                }

               /*
                * Bottom-middle
                */

                else {
                  return (
                    <div onClick={(value) => onSelect(value.target.getAttribute('data-item-id'))}
                     data-item-id={item[idField]} 
                     className={item[idField] == selectedId ? `${middleMiddle} ${selected}` : middleMiddle} key={`selector-component-${hash}-${rowIndex}-${colIndex}`}>{item[valueField]}</div>
                  )
                }
              })
            }
          </div>
        )
      }


    })

      

    }

  return (
    <div className={inputSelectorContainer}>
      
      {
        Array.isArray(data)
          ? maxCol === undefined
            ? noConfigRender()
            : configRender()
          : ''
      }

    </div> 
  )
}
