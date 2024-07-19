import React from "react";
import Link from "next/link";

const NavBar = ({title}) => {
  return (
    <div className=" flex w-full h-full text-center text-white font-semibold bg-green-500 text-4xl p-5">
      <div className="flex flex-grow items-center">
        <Link href="..">
            <div className="w-0 h-0 
                border-t-[20px] border-t-transparent
                border-r-[32.5px] border-r-white
                border-b-[20px] border-b-transparent">
            </div>
        </Link>
      </div>
      <div className="flex flex-grow justify-center items-center">
        {title}
      </div>
      <div className="flex flex-grow"></div>
    </div>
  );
};

export default NavBar;
