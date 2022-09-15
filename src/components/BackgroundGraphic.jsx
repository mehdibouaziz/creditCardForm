import React from 'react'

const BackgroundGraphic = () => {
  return (
    <>
    <div
        className="h-[15rem] w-screen bg-cover lg:hidden"
        style={{
          backgroundImage: `url(/bg-main-mobile.png)`,
        }}
      ></div>
    <div
      className="h-screen w-[485px] bg-cover hidden lg:block"
      style={{
        backgroundImage: `url(/bg-main-desktop.png)`,
      }}
    ></div>
    </>
  )
}

export default BackgroundGraphic