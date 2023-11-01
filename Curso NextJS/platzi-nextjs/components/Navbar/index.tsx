import React from 'react'
import Link from 'next/link'
import styles from './style.module.css'
import Image from 'next/image'

function Navbar({ shoppingCartItems }: { shoppingCartItems: number }) {
  return (
    <nav className={styles.navigation__container}>
      <ul className={styles.navigation__list}>
        <li>
          <Image
            src={'/icons/avocado.svg'}
            alt="Avocado Icon"
            width={64}
            height={64}
          />
          <Link href="/" className={styles.navigation__link}>
            Avo Store
          </Link>
        </li>
        <li>
          <Image
            src={'/icons/basket.svg'}
            alt="Avocado Icon"
            width={64}
            height={64}
          />
          <Link
            href="/about"
            className={styles.navigation__link}
            id="shoppingLink"
          >
            Shopping cart ({shoppingCartItems})
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
