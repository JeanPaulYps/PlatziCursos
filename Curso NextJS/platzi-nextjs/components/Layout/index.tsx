import React, { ComponentProps, ReactNode } from 'react'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import styles from './styles.module.css'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
