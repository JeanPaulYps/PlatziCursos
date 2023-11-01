import React, { ComponentProps, ReactNode } from 'react'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import styles from './styles.module.css'
import { useShoppingCart } from 'store/shoppingCart'

function Layout({ children }: { children: ReactNode }) {
  const totalItems = useShoppingCart((state) => state.totalItems)

  return (
    <div className={styles.container}>
      <Navbar shoppingCartItems={totalItems} />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
