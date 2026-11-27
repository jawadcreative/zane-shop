import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CartIcon from './CartIcon'

const Navbar = () => {
  return (
    <header className='sticky top-0 z-50 flex w-full items-center justify-between bg-background/90 px-4 py-4 backdrop-blur sm:px-6'>
      <Link href={'/'} className='flex items-center gap-2'>
        <Image src={'/images/z-mark.png'} height={30} width={30} alt='z-mark' />
        <span>Zane Shop</span>
      </Link>
      <nav className='flex items-center gap-4 sm:gap-5'>
        {['Home', 'Products'].map((item, i) => (
          <Link href={i === 0 ? '/' : `/${item.toLocaleLowerCase()}`} key={i} className='hover:text-foreground/70'>{item}</Link>
        ))}
        <CartIcon />
      </nav>
    </header>
  )
}

export default Navbar