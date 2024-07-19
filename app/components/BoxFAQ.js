import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BoxFAQ = ({children}) => {
  return (
    <div className="my-3">
      <Link href="/description-page">
        <div className="bg-white w-[200px] h-[200px] mx-5 drop-shadow-lg rounded-lg hover:bg-slate-50 align-text-bottom flex justify-center items-center">
          <div>
            <Image src="/assets/confuse.jpg" width={150} height={150} alt="image" className="ml-3"/>
            <h1 className="text-center align-text-bottom font-bold">{children}</h1>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BoxFAQ