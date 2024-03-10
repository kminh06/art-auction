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
                        className='text-lg font-bold hover:underline underline-offset-2'
                      >
                        {artwork.name}
                      </Link>
                      <p className='text-sm font-medium leading-none text-gray-500'>
                        by {artwork.artist}
                      </p>
                    </div>
                    <div className='flex-grow'></div>
                    <div>
                      <QRCode
                        className='h-10 w-10'
                        value={`/item/${artwork.id}`}
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
