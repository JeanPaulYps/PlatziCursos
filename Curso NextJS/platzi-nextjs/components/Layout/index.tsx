import React, { ComponentProps, ReactNode } from 'react'
import Navbar from '@components/Navbar'
// import styles from './style.module.css'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <Navbar />
      {children}
      <footer>This is the footer</footer>
    </div>
  )
}

export default Layout
