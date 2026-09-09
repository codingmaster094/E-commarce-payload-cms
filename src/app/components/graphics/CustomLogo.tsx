'use client'
import React from 'react'
import Image from 'next/image'

const CustomLogo = () => {
  return (
    <div>
      <Image
        className="h-20 object-contain dark:hidden"
        src="/images/favicon.png" // Use the path relative to the 'public' folder
        alt="My Custom Logo"
        width={140}
        height={63}
      />
      <Image
        className="h-20 object-contain hidden dark:block"
        src="/images/favicon.png" // Use the path relative to the 'public' folder
        alt="Your Logo"
        width={140}
        height={63}
      />
    </div>
  )
}

export default CustomLogo; 