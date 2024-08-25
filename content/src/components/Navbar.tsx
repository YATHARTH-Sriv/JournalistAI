import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-50">
    <div className="navbar-start">
      <Link href={"/"} className="text-xl font-bold">Journalist AI</Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li>
        <Link className=' hover:bg-black hover:text-white font-semibold' href={""}>
            Features
            </Link>
        </li>
        <li>
          <details>
            <summary className='  hover:bg-black hover:text-white font-semibold'>Learn</summary>
            <ul className="p-2">
              <li>
              <Link className=' font-medium' href={""}>
                Help Docs
            </Link>
              </li>
              <li>
                <Link className=' font-medium' href={""}>
                   Case Studies
               </Link>
              </li>
            </ul>
          </details>
        </li>
        <li><Link className='  hover:bg-black hover:text-white font-semibold' href={""}>
            Pricing
            </Link></li>
      </ul>
    </div>
    <div className="navbar-end">
      <Link href={"/sign-in"} className="btn hover:bg-blue-800 bg-blue-600 text-white font-bold">Get 3 Free Articles</Link>
    </div>
  </div>
  )
}

export default Navbar