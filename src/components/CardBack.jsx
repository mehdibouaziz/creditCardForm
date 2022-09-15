import React from "react";

const CardBack = ({ cvc }) => {
  return (
    <div
      id="cardback-container"
      className="w-[76%] aspect-[447/245] bg-contain max-w-card absolute z-0 top-[2rem] right-[1rem] sm:left-[30%] rounded-md lg:max-w-[35%] xl:max-w-[445px] lg:top-[470px] lg:left-[18%]"
      style={{ backgroundImage: `url(/bg-card-back.png)` }}
    >
      <div className="grid grid-cols-6 grid-rows-3 text-white font-card p-5 w-full h-full">
        <div className="col-start-6 row-start-2 self-center justify-self-start text-[0.55rem] tracking-widest lg:text-[1.1vw] xl:text-[14px]">
          {cvc ? cvc : '000'}
        </div>
      </div>
    </div>
  );
};

CardBack.defaultProps = {
  cvc: '000'
}

export default CardBack;
