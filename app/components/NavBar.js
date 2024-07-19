import React from "react";
import Link from "next/link";

const NavBar = ({children}) => {
  return (
    <div className="w-full h-full text-center text-white font-semibold bg-green-500 text-4xl p-5">
      <Link href="..">
        {children}
      </Link>
    </div>
  );
};

export default NavBar;
