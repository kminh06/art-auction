import React from 'react'
import { Button } from '../ui/button'

export default function BidButton() {
  return (
    <Button
      onClick={(e) => {
        e.preventDefault()
        console.log('Place Bid')
      }}
      variant='default'
      className='w-full'
    >
      Place Bid
    </Button>
  )
}
