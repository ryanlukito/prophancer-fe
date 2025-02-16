import React from "react";
import Image from "next/image";

const BoxTikus = ({ children, handler }) => {
  return (
    <div
      className="bg-white w-[200px] h-[200px] mx-5 drop-shadow-lg rounded-lg hover:bg-slate-50 cursor-pointer flex justify-center items-center"
      onClick={handler}
    >
      <div>
        <Image src="/assets/rat.jpg" width={180} height={180} alt="image"/>
        <h1 className="relative top-4 text-center align-text-bottom font-bold">{children}</h1>
      </div>
    </div>
  );
};

export default BoxTikus;
