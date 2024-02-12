import React from "react";

const HamburgerButton = ({ isOpen }:{isOpen:boolean}) => {
  return (
    <div className="w-[24px]  flex flex-col gap-1.5 absolute">
      <div
        className={`bg-inkredible-black h-[2px] rounded-full w-1/2 transform origin-center transition-transform ${
          isOpen ? "rotate-45 translate-y-1.5 w-full" : ""
        }`}
      ></div>
      <div
        className={`bg-inkredible-black h-[2px] rounded-full transform origin-center transition-opacity ${
          isOpen ? "opacity-0" : ""
        }`}
      ></div>
      <div
        className={`bg-inkredible-black h-[2px] rounded-full w-2/3 transform origin-center transition-transform ${
          isOpen ? "-rotate-45 -translate-y-2.5 w-full" : ""
        }`}
      ></div>
    </div>
  );
};

export default HamburgerButton;
