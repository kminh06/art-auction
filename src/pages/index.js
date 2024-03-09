import Image from 'next/image'
import { BidPage } from '@/components/component/BidPage'
import Header from '@/components/component/Header'

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <main className=''>
        <BidPage currentBid={1500000} />
      </main>
    </>
  )
}
