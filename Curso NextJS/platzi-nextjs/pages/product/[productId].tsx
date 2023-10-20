import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

function ProductItem() {
  const { query } = useRouter()
  useEffect(() => {
    window
      .fetch(`/api/avo/${query.productId}`)
      .then((response) => response.json())
      .then(console.log)
  })

  console.log(query)

  return <div>Esta es la página de producto: {query.productId}</div>
}

export default ProductItem
