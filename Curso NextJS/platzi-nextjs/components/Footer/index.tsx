import React from 'react'
import styles from './styles.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__textContainer}>
        <section className={styles.footer__section}>
          <h4>Nosotros</h4>
          <ul>
            <li>
              <a href=""> Conoce más</a>
            </li>
          </ul>
        </section>
        <section className={styles.footer__section}>
          <h4>Servicios</h4>
          <ul>
            <li>
              <a href="">Todos los productos</a>
            </li>
          </ul>
        </section>
        <section className={styles.footer__section}>
          <h4>Hecho para</h4>
          <ul>
            <li>
              <a href="">Platzi y su curso de Next.JS</a> de Platzi dictado por
              @jonalvarezz
            </li>
            <li className={styles.footer__socialLink}>Twitter</li>
            <li className={styles.footer__socialLink}>Github</li>
          </ul>
        </section>
      </div>
    </footer>
  )
}

export default Footer
