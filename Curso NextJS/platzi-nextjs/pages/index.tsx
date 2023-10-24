import Card from '@components/Card'
import React, { useEffect, useState } from 'react'
import styles from './index.module.css'

export default function Home() {
  const [productList, setProductList] = useState<TProduct[]>([])
  useEffect(() => {
    window
      .fetch('/api/avo')
      .then((response) => response.json())
      .then(({ data, length }) => setProductList(data))
  }, [])

  return (
    <main className={styles.home} id="main">
      <h1 className={styles.home__title}>Welcome to your avocado store</h1>
      <section className={styles.home__avocadoList}>
        {productList.map((product) => (
          <Card
            key={product.id}
            avocadoType={product.name}
            price={`$ ${product.price}`}
            imageUrl={product.image}
            id={product.id}
          />
        ))}
      </section>
    </main>
  )
}
