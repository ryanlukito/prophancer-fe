import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BoxSonicBloom = ({children}) => {
  return (
        <div className="my-3">
          <Link href="/sonic-bloom">
            <div className="bg-white w-[200px] h-[200px] mx-5 drop-shadow-lg rounded-lg hover:bg-slate-50 align-text-bottom flex justify-center items-center">
              <div>
                <Image src="/assets/stomata.jpg" width={180} height={180} alt="image" className="ml-2"/>
                <h1 className="text-center align-text-bottom font-bold relative top-2">{children}</h1>
              </div>
            </div>
          </Link>
        </div>
  )
}

export default BoxSonicBloom