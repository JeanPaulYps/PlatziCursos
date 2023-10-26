import type { AppProps } from 'next/app'
import Layout from '@components/Layout'
import './global.css'
import '@fontsource/lato'

export const reportWebVitals = (metrics: any) => {
  console.log(metrics)
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
