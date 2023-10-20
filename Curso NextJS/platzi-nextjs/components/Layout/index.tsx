import React, { ComponentProps, ReactNode } from 'react'
import Navbar from '@components/Navbar'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <footer>This is the footer</footer>
    </div>
  )
}

export default Layout
