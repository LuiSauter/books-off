import React from 'react'
import Head from 'next/head'

import Footer from 'src/components/Footer'
import Posts from 'src/components/Post'
import ClientOnly from 'src/components/ClientOnly'
import IsNewProfile from 'src/components/ProfileForm/IsNewProfile'
import SearchBook from 'src/components/SearchBook'

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Bookend 📚 | Libros Gratis ✨, Física, Universo 🌌, investigaciones científicas 🚀 y semi red social</title>
      </Head>
      <ClientOnly>
        <IsNewProfile />
      </ClientOnly>
      <section className='px-4 sm:pb-4 sm:pt-0 sm:px-0 pt-4'>
        <ClientOnly>
          <SearchBook />
        </ClientOnly>
      </section>
      <ClientOnly>
        <Posts />
      </ClientOnly>
      <footer className='w-full py-4 mb-2 sm:mb-0 flex justify-center lg:hidden'>
        <Footer />
      </footer>
    </>
  )
}
export default Home
