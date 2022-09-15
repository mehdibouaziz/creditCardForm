import React from 'react'

const FormError = ({message, addClass}) => {
  return (
    <span className={'text-error-red text-xs ' + addClass}>{message}</span>
  )
}

export default FormError