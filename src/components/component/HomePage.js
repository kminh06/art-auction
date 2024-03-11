import Link from 'next/link'
import Header from './Header'
import QRCode from 'react-qr-code'

export function HomePage({ artworks, isSignedIn, user }) {
  return (
    <div className='w-full max-w-xl mx-auto'>
      <div className='p-4 md:p-6'>
        <div className='grid gap-4'>
          <Header isSignedIn={isSignedIn} user={user} />
          <div className='text-center flex flex-col gap-2 mb-4'>
            <h1 className='text-3xl font-bold'>Concordia Art Auction 2024</h1>
            <p className='text-sm text-gray-500'>
              Welcome to the 2024 Concordia Art Auction! We're excited to
              present our collection of art pieces from Concordia Hanoi student
              artists.
            </p>
          </div>
          <div>
            <div className='grid gap-8'>
              {artworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className='grid gap-4 border border-gray-200 p-4 rounded-lg'
                >
                  <div className='flex flex-row'>
                    <div className='grid'>
                      <Link
                        href={`/item/${artwork.id}`}
                        className='text-lg flex flex-row gap-1 items-center font-bold hover:underline underline-offset-2'
                      >
                        {artwork.name}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 16 16'
                          fill='currentColor'
                          className='w-4 h-4'
                        >
                          <path d='M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z' />
                          <path d='M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z' />
                        </svg>
                      </Link>
                      <p className='text-sm font-medium leading-none text-gray-500'>
                        by {artwork.artist}
                      </p>
                    </div>
                    <div className='flex-grow'></div>
                    <div>
                      <QRCode
                        className='h-10 w-10'
                        value={`https://cish-art-auction.vercel.app/item/${artwork.id}`}
                      />
                    </div>
                  </div>
                  <img
                    alt='Artwork'
                    className='aspect-[2/1] rounded-lg object-cover border border-gray-200 w-full'
                    height={200}
                    src={artwork.image_url}
                    width={400}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
