"use client"
import Button from '@/components/Button'
import React from 'react'

const Error = () => {
  const handleClick = () => {
    window.location.reload()
  }
  return (
    <section className='h-screen w-full flex flex-col items-center justify-center gap-3'>
      <p>Sorry, Something went wrong. Plz try again</p>
      <Button text={'Try again'} handleClick={handleClick} />
    </section>
  )
}

export default Error