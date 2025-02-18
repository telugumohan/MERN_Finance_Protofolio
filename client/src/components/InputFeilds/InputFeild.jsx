import React from 'react'

const InputFeild = ({name, type, value, placeHolderText, onValueChange, readOnly, required}) => {
  return (
    <input type={type}
    name={name}
    value={value}
    placeholder={placeHolderText}
    onChange={(e) => onValueChange(e)}
    className='border-slate-400 border-1 w-full h-10'
    readOnly={readOnly}
    required={required}
    />
  )
}

export default InputFeild
