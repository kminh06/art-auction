import React from 'react'
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

export default function LoginForm() {
  return (
    <Dialog>
      <DialogTrigger>
        <span className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 border border-input bg-background hover:bg-gray-50/90 hover:text-accent-foreground'>
          Login
        </span>
      </DialogTrigger>
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
            <form className='mt-6 grid gap-4'>
              <div className='grid gap-1'>
                <Label className='text-sm text-gray-950' htmlFor='name'>
                  Full Name
                </Label>
                <Input required id='name' placeholder='Full Name' />
              </div>
              <div className='grid gap-1'>
                <Label className='text-sm text-gray-950' htmlFor='email'>
                  Email
                </Label>
                <Input required id='email' placeholder='Email' type='email' />
              </div>
              <div className='mt-4'>
                <Button
                  type='submit'
                  size='sm'
                  variant='default'
                  className='w-full'
                >
                  Sign up
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
