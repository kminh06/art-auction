import React, { useEffect, useState } from 'react'
import data from '@/data.json'
import Head from 'next/head'
import { BidPage } from '@/components/component/BidPage'
import { auth, db } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  writeBatch,
} from 'firebase/firestore'

export async function getStaticPaths() {
  try {
    const batch = writeBatch(db)

    const snapshot = await getDocs(collection(db, 'artworks'))
    const existingArtworks = snapshot.docs.map((doc) => doc.id)

    snapshot.docs.forEach((doc) => {
      console.log(doc.id, '=>', doc.data())
      existingArtworks.push(doc.id)
    })

    data.artworks.forEach((artwork) => {
      if (!existingArtworks.includes(artwork.id)) {
        batch.set(doc(db, 'artworks', artwork.id), {
          id: artwork.id,
          name: artwork.name,
          artist: artwork.artist,
          image: artwork.image_url,
          bid0: {
            amount: artwork.starting_bid,
            user: null,
          },
          highest_bid: artwork.starting_bid,
          bids_count: 0,
        })
      }
    })

    await batch.commit()

    const paths = data.artworks.map((item) => ({
      params: { id: item.id },
    }))

    return {
      paths: paths,
      fallback: false,
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getStaticProps(context) {
  const { id } = context.params
  const artwork = data.artworks.find((item) => item.id === id)

  return {
    props: {
      artwork,
    },
  }
}

export default function Page({ artwork }) {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in')
        setIsSignedIn(true)
        getDoc(doc(db, 'users', user.uid)).then((doc) => {
          if (doc.exists()) {
            setUser(doc.data())
          }
        })
      } else {
        console.log('User is signed out')
        setIsSignedIn(false)
      }
    })
  }, [])

  return (
    <>
      <Head>
        <title>{artwork.name} | Concordia Art Auction 2024</title>
      </Head>
      <main className=''>
        <BidPage
          isSignedIn={isSignedIn}
          currentBid={1500000}
          artwork={artwork}
          user={user}
        />
      </main>
    </>
  )
}
