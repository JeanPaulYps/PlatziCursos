import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './style.module.css'

interface Props {
  imageUrl: string
  avocadoType: string
  price: string
  id: string
}

function Card({ imageUrl, avocadoType, price, id }: Props) {
  return (
    <Link className={styles.card__container} href={`/product/${id}`}>
      <Image
        src={imageUrl}
        alt={`Avocado photo`}
        width={333}
        height={333}
        className={styles.card__avocadoImage}
        tabIndex={-1}
      />
      <div className={styles.card__avocadoInformation}>
        <p className={styles.card__avocadoName}>{avocadoType}</p>
        <p className={styles.card__avocadoPrice}>{price}</p>
      </div>
    </Link>
  )
}

export default Card
