import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from './styles.module.css'
import Link from 'next/link'

function ProductItem() {
  const { query } = useRouter()
  const [avocado, setAvocado] = useState<TProduct>()
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    window
      .fetch(`/api/avo/${query.productId}`)
      .then((response) => response.json())
      .then(setAvocado)
      .then(() => setLoading(false))
  })

  console.log(query)

  if (!loading && !avocado) {
    return (
      <main className={styles.main}>
        <p className={styles.product__error}>This avocado doesn't exist :'(</p>
        <Link href="/" className={styles.product__error}>
          Come back to home to see more
        </Link>
      </main>
    )
  }

  if (!loading && avocado) {
    return (
      <main className={styles.main}>
        <div className={styles.product__basicInformation}>
          <Image
            src={avocado?.image ?? ''}
            alt="Avocado photo"
            width={300}
            height={300}
          />
          <div className={styles.product__information}>
            <p className={styles.product__name}>{avocado?.name}</p>
            <p className={styles.product__price}>$ {avocado?.price}</p>
            <p className={styles.product__sku}>SKU: {avocado?.sku}</p>
            <form>
              <input
                type={'number'}
                name="Avocado number"
                defaultValue={1}
                min={0}
              />
              <button>Add to cart</button>
            </form>
          </div>
        </div>
        <h2 className={styles.product__aboutHeading}>About this avocado</h2>
        <p className={styles.product__information}>
          {avocado?.attributes.description}
        </p>
        <hr className={styles.product__divider} />
        <table className={styles.table}>
          <thead>
            <th colSpan={2}>Attributes</th>
          </thead>
          <tbody>
            <tr>
              <td>Shape</td>
              <td>{avocado?.attributes.shape}</td>
            </tr>
            <tr>
              <td>Hardiness</td>
              <td>{avocado?.attributes.hardiness}</td>
            </tr>
            <tr>
              <td>Taste</td>
              <td>{avocado?.attributes.taste}</td>
            </tr>
          </tbody>
        </table>
      </main>
    )
  }
}

export default ProductItem
