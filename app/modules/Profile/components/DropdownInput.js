/* 
  react-widgets
  https://jquense.github.io/react-widgets/docs/#/dropdownlist/placeholder?_k=hc0j84
*/
import React, { PropTypes } from 'react'
import { DropdownList } from 'react-widgets'
import { dropdownInput } from '../styles/DropdownInputStyles.css'

const colors = ['orange', 'blue', 'red']

export default function DropdownInput(props) {
  return (
    <DropdownList 
      defaultValue={"orange"} 
      textField="name"
      filter='contains'
      data={colors} 
      className={dropdownInput}/>
  )
}