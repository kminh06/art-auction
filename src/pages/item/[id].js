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
  onSnapshot,
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
          name: artwork.name,
          artist: artwork.artist,
          image: artwork.image_url,
          bid0: {
            amount: artwork.starting_bid,
            user: null,
            time: Date.now(),
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
  const [artData, setArtData] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in')
        setIsSignedIn(true)
        getDoc(doc(db, 'users', user.uid)).then((doc) => {
          if (doc.exists()) {
            setUser({ ...doc.data(), id: doc.id })
          }
        })
      } else {
        console.log('User is signed out')
        setIsSignedIn(false)
      }
    })

    onSnapshot(doc(db, 'artworks', artwork.id), (doc) => {
      console.log('Current data: ', doc.data())
      setArtData({ ...doc.data(), id: doc.id })
    })
  }, [])

  return (
    <>
      <Head>
        <title>{artwork.name} | Concordia Art Auction 2024</title>
      </Head>
      <main className=''>
        {artData && (
          <BidPage
            isSignedIn={isSignedIn}
            artData={artData}
            artwork={artwork}
            user={user}
          />
        )}
      </main>
    </>
  )
}
