import type { AppProps } from 'next/app'
import Layout from '@components/Layout'
import './global.css'
import '@fontsource/lato'
import { useShoppingCart } from 'store/shoppingCart'

// export const reportWebVitals = (metrics: any) => {
//   console.log(metrics)
// }

export default function MyApp({ Component, pageProps }: AppProps) {
  // const shoppingCart = useShoppingCart((state) => state.shoppingCart)
  // console.log('total', shoppingCart.length)
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
