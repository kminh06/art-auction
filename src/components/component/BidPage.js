import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import LoginForm from './LoginForm'
import BidButton from './BidButton'
import { Button } from '../ui/button'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'

export function BidPage({ currentBid, artwork, user, isSignedIn }) {
  const [bid, setBid] = useState(currentBid + 100000)
  console.log(user, isSignedIn)

  async function handleSignOut(e) {
    e.preventDefault()
    await signOut(auth)
  }

  return (
    <div className='w-full max-w-xl mx-auto'>
      <div className='p-4 md:p-6'>
        <div className='grid gap-4'>
          <div className='grid gap-1 mb-2 relative'>
            <h4 className='font-bold text-sm text-center'>Auction Ends In</h4>
            <div className='flex items-center gap-2 justify-center'>
              <div className='font-semibold text-red-500 text-lg'>02:30:45</div>
            </div>
            <div className='absolute right-0'>
              {isSignedIn ? (
                <Button size='sm' variant='outline' onClick={handleSignOut}>
                  Logout
                </Button>
              ) : (
                <LoginForm>
                  <span className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 border border-input bg-background hover:bg-gray-50/90 hover:text-accent-foreground'>
                    Login
                  </span>
                </LoginForm>
              )}
            </div>
            <div className='absolute left-0'>
              <img src={'/logo.png'} height={36} width={36} />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='grid gap-1'>
              <h3 className='text-xl font-bold sm:text-2xl'>{artwork.name}</h3>
              <p className='text-sm font-medium leading-none text-gray-500 dark:text-gray-400'>
                by {artwork.artist}
              </p>
            </div>
            <div className='text-2xl font-semibold'>
              ₫{currentBid.toLocaleString('en-US')}
            </div>
          </div>
          <div className='grid gap-4'>
            <img
              alt='Artwork'
              className='aspect-[2/1] rounded-lg object-cover border border-gray-200 w-full'
              height={200}
              src='/placeholder.svg'
              width={400}
            />
            <form className='grid gap-4' onSubmit={(e) => e.preventDefault()}>
              <div className='grid gap-1'>
                <Label className='text-sm' htmlFor='bid'>
                  Your Bid
                </Label>
                <Input
                  id='bid'
                  type='number'
                  min={currentBid + 100000}
                  placeholder='Enter your bid'
                  value={bid}
                  onChange={(e) => {
                    setBid(e.target.vaclue)
                  }}
                />
              </div>
              <BidButton
                isSignedIn={isSignedIn}
                user={user?.name}
                bid={bid}
                artName={artwork.name}
              />
            </form>
          </div>
          <div className='grid gap-2 my-4'>
            <h4 className='font-bold'>Description</h4>
            <p className='text-sm leading-relaxed md:text-base'>
              {artwork.description}
            </p>
          </div>
          <div className='grid gap-2'>
            <h4 className='font-bold'>Artist Details</h4>
            <p className='text-sm leading-relaxed md:text-base'>
              {artwork.artist_details}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
