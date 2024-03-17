import React, { useState, useEffect } from 'react'
import LoginForm from './LoginForm'
import { Button } from '../ui/button'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import Link from 'next/link'
import Countdown from 'react-countdown'

export default function Header({ isSignedIn, user, live }) {
  async function handleSignOut(e) {
    e.preventDefault()
    await signOut(auth)
  }

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className='grid gap-1 mb-2 relative'>
      <h4 className='font-bold text-sm text-center'>Auction Ends In</h4>
      <div className='flex items-center gap-2 justify-center'>
        <div className='font-semibold text-red-500 text-lg'>
          {isClient && live ? (
            <Countdown date={'2024-03-20T12:00:00'} />
          ) : (
            '00:00:00:00'
          )}
        </div>
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
      <Link href={'/'} className='absolute left-0'>
        <img src={'/logo.png'} height={36} width={36} />
      </Link>
    </div>
  )
}
