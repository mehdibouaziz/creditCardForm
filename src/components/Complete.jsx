import React from 'react'

import iconComplete from "../assets/icon-complete.svg";


const Complete = ({ buttonContinue }) => {
  return (
    <div className='flex flex-col h-full w-full items-center mt-[5.7rem] lg:w-[60%]'>
        <img
          alt="complete state logo"
          src={iconComplete}
          className="h-[80px] w-[80px]"
        ></img>
        <div className='text-[1.8rem] tracking-[.2rem] text-very-dark-violet mt-8'>THANK YOU!</div>
        <div className='text-[1.05rem] tracking-[.04rem] text-dark-grayish-violet mt-3'>We've added your card details</div>
        <button
          onClick={() => buttonContinue()}
          className="bg-very-dark-violet text-white rounded-lg py-[0.85rem] px-[7.8rem] mt-11 text-[1.1rem]"
        >Continue</button>
    </div>
  )
}

export default Complete