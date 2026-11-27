import Link from 'next/link'
import React from 'react'

const Button = ({ text, handleClick }) => {
    return (
        <button onClick={handleClick} className="relative inline-block border border-foreground bg-foreground px-8 py-2 text-background cursor-pointer before:absolute before:inset-0 before:z-10 before:origin-left before:scale-x-0 before:bg-background before:transition-transform before:duration-300 hover:text-foreground hover:before:scale-x-100 sm:px-12">
            <span className="relative z-10">{text}</span>
        </button>
    )
}

export default Button