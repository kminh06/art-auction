import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { HomePage } from '@/components/component/HomePage'
import data from '@/data.json'
import { auth, db } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'

export async function getStaticProps(context) {
  return {
    props: {
      artworks: data.artworks,
    },
  }
}

export default function Home({ artworks }) {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [live, setLive] = useState(true)

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

    onSnapshot(doc(db, 'auction', 'current'), (doc) => {
      setLive(doc.data().live)
    })

    // getDoc(doc(db, 'auction', 'current')).then((doc) => {
    //   setLive(doc.data().live)
    // })
  }, [])

  return (
    <>
      <Head>
        <title>Concordia Art Auction 2024</title>
      </Head>
      <main className=''>
        <HomePage
          live={live}
          artworks={artworks}
          isSignedIn={isSignedIn}
          user={user}
        />
      </main>
    </>
  )
}
