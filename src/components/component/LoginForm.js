import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { auth, db } from '@/firebase'
import { signInAnonymously } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export default function LoginForm({ children, live }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function handleSignIn(e) {
    e.preventDefault()

    const cred = await signInAnonymously(auth)
    const user = cred.user
    console.log(user)

    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
    })
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign up for Concordia Art Auction</DialogTitle>
          <div className='h-1'></div>
          <DialogDescription>
            <p>
              We use anonymous authentication provided by Google. Your account
              is attached to your device signature.
            </p>
            <p className='mt-4'>
              Please enter your <b>full name</b> to let us know who's bidding!
            </p>
            <form className='mt-6 grid gap-4' onSubmit={handleSignIn}>
              <div className='grid gap-1'>
                <Label className='text-sm text-gray-950' htmlFor='name'>
                  Full Name
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  id='name'
                  placeholder='Full Name'
                />
              </div>
              <div className='grid gap-1'>
                <Label className='text-sm text-gray-950' htmlFor='email'>
                  Email
                </Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  id='email'
                  placeholder='Email'
                  type='email'
                />
              </div>
              <div className='mt-4'>
                <Button
                  type='submit'
                  size='sm'
                  variant='default'
                  className='w-full'
                >
                  Authenticate
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
