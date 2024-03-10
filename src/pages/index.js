import Image from 'next/image'
import { BidPage } from '@/components/component/BidPage'
import Header from '@/components/component/Header'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Concordia Art Auction 2024</title>
      </Head>
      <main className=''>
        <BidPage currentBid={1500000} />
      </main>
    </>
  )
}
