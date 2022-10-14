import React from 'react'

export default function SelectPattern(props) {
  return (
    <div>
        <select className='selectOptions' name={props.data.name} id={props.data.id}>
            {props.data.options.map((option) => {
                return <option value={option.value}>{option.text}</option>
            })}
        </select>
    </div>
  )
}
