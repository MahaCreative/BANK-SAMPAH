import React from 'react'
import CurrencyFormat from 'react-currency-format'

export default function InputCurency({...props}) {
  
    return (
    <>
        <CurrencyFormat className='text-[8pt] border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-md shadow-sm w-full mt-1' {...props} />
    </>
  )
}
