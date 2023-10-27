import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import styles from './styles.module.css'

export const getStaticPaths = async () => {
  const { data: productList }: { data: TProduct[] } = await fetch(
    `${process.env.BASE_URL}/api/avo`
  ).then((response) => response.json())

  const productListIds = productList.map(({ id }) => ({
    params: {
      productId: id,
    },
  }))

  return {
    paths: productListIds,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = params?.productId ?? ''

  const avocado: TProduct = await fetch(
    `${process.env.BASE_URL}/api/avo/${productId}`
  )
    .then((response) => response.json())
    .catch((err) => console.error(err))

  return {
    props: {
      avocado: avocado,
    },
  }
}

function ProductItem({ avocado }: { avocado: TProduct }) {
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
          <tr>
            <th colSpan={2}>Attributes</th>
          </tr>
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

export default ProductItem
