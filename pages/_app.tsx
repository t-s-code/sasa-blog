import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import GlobalStyles from '../styles/GlobalStyles'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  )
}
