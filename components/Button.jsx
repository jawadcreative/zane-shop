import Link from 'next/link'
import React from 'react'

const Button = ({ text }) => {
    return (
        <Link href="/products" className="relative inline-block px-12 py-2 bg-foreground text-background cursor-pointer before:absolute before:inset-0 before:bg-background before:transition-transform before:duration-300 before:scale-x-0 before:origin-left hover:before:scale-x-100 hover:text-foreground before:z-10 border border-foreground">
            <span className="relative z-10">{text}</span>
        </Link>
    )
}

export default Button