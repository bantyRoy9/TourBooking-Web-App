import React from 'react'

const Button=({
    title,
    onClick,
    className,
    type
})=> {
  return (
    <button type={type?type:'button'} onClick={onClick} className={`${className}`}>{title}</button>
  )
}

export default Button