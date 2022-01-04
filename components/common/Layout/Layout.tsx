import React, { FC } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Page } from '../../../types/page'

interface Props {
  pageProps: {
    pages?: Page[]
  }
}

const Layout: FC<Props> = ({
  children,
  pageProps: { ...pageProps },
}) => {
  return (
      <div>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
  )
}


export default Layout
