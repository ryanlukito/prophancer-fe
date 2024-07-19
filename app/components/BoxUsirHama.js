import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const BoxUsirHama = ({title}) => {
  return (
        <div className="my-3">
          <Link href="/usir-hama">
            <div className="bg-white w-[200px] h-[200px] mx-5 drop-shadow-lg rounded-lg hover:bg-slate-50 flex justify-center items-center">
              <div>
                <Image src="/assets/rat.jpg" width={180} height={180} alt="image"/>
                <h1 className="relative top-5 text-center align-text-bottom font-bold">{title}</h1>
              </div>
            </div>
          </Link>
        </div>
  )
}

export default BoxUsirHama