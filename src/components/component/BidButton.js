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

export default function BidButton({ user, artName, bid, isSignedIn }) {
  async function handleBid(e) {
    e.preventDefault()
    console.log('Place Bid')
  }

  return isSignedIn ? (
    <AlertDialog>
      <AlertDialogTrigger className='w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-950 text-white hover:bg-gray-900/90 h-10 px-4 py-2'>
        Place Bid
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleBid} className='w-full'>
          <AlertDialogHeader>
            <AlertDialogTitle>Place bid on {artName}?</AlertDialogTitle>
            <AlertDialogDescription>
              Confirm that <b>{user}</b> would like to place a bid of{' '}
              <b>₫{bid?.toLocaleString('en-US')}</b> on <b>{artName}</b>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
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
