import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className='px-6 py-4 flex justify-between items-center fixed top-0 w-full z-50'>
      <Link href={'/'} className='flex items-center gap-2'>
        <Image src={'/images/z-mark.png'} height={30} width={30} alt='z-mark' />
        <span>Zane Shop</span>
      </Link>
      <nav className='flex gap-5 items-center'>
        {['Home', 'Products', 'Cart'].map((item, i) => (
          <Link href={i === 0 ? '/' : `/${item.toLocaleLowerCase()}`} key={i} className='hover:text-foreground/70'>{item}</Link>
        ))}
      </nav>
    </header>
  )
}

export default Navbar