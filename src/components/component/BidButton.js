import React from 'react'
import { Button } from '../ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import LoginForm from './LoginForm'
import { db } from '@/firebase'
import { doc, updateDoc } from 'firebase/firestore'

export default function BidButton({ user, artwork, bid, isSignedIn, artData }) {
  console.log(artData)
  async function handleBid(e) {
    e.preventDefault()
    console.log('Place Bid')
    await updateDoc(doc(db, 'artworks', artwork.id), {
      highest_bid: bid,
      bids_count: artData.bids_count + 1,
      [`bid${artData.bids_count + 1}`]: {
        amount: bid,
        bidder_id: user.id,
        bidder_name: user.name,
        time: Date.now(),
      },
    })
  }

  return isSignedIn ? (
    <AlertDialog>
      <AlertDialogTrigger
        className='w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-950 text-white hover:bg-gray-900/90 h-10 px-4 py-2'
        type='submit'
      >
        Place Bid
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleBid} className='w-full'>
          <AlertDialogHeader>
            <AlertDialogTitle>Place bid on {artwork.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              Confirm that <span className='font-semibold'>{user?.name}</span>{' '}
              would like to place a bid of{' '}
              <span className='font-semibold'>
                ₫{bid?.toLocaleString('en-US')}
              </span>{' '}
              on <span className='font-semibold'>{artwork.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={'mt-4'}>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type='submit'>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  ) : (
    <LoginForm>
      <span className='w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-950 text-white hover:bg-gray-900/90 h-10 px-4 py-2'>
        Place Bid
      </span>
    </LoginForm>
  )
}
