import React from "react";
import cardLogo from "../assets/card-logo.svg";

const CardFront = ({ info }) => {
  return (
    <div
      id="cardfront-container"
      className="w-[76%] aspect-[447/245] bg-cover max-w-card absolute z-10 top-[7.9rem] left-[1rem] sm:left-[15%] rounded-md lg:max-w-[35%] xl:max-w-[445px] lg:top-[187px] lg:left-[11.5%]"
      style={{ backgroundImage: `url(/bg-card-front.png)` }}
    >
      <div className="grid grid-cols-4 grid-rows-4 text-white font-card py-[1.15rem] px-[1.25rem] w-full h-full lg:py-[26px] lg:px-[30px]">
        <img
          alt="card logo"
          src={cardLogo}
          className="col-span-4 row-span-2 h-[1.85rem] lg:h-[45%] xl:h-[46px]"
        ></img>
        <div className="col-span-4 self-end text-[1.15rem] tracking-[.125rem] text-light-grayish-violet lg:text-[2vw] xl:text-[29px] lg:tracking-[2.8px] lg:self-end lg:leading-none">
          {info.number ? info.number : "0000 0000 0000 0000"}
        </div>
        <div className="col-span-3 self-end text-[0.65rem] tracking-wider text-light-grayish-violet lg:text-[1.3vw] xl:text-[16px] lg:leading-none lg:tracking-[.85px]">
          {info.name ? info.name : "JANE APPLESEED"}
        </div>
        <div className="col-span-1 self-end justify-self-end text-[0.65rem] tracking-wider text-light-grayish-violet lg:text-[1.3vw] xl:text-[16px] lg:leading-none lg:tracking-[.85px]">
          {info.month ? info.month : "00"}/{info.year ? info.year : "00"}
        </div>
      </div>
    </div>
  );
};

CardFront.defaultProps = {
  info: {
    name: "JANE APPLESEED",
    number: "0000 0000 0000 0000",
    month: "00",
    year: "00",
  },
};

export default CardFront;
