import React from 'react'
import Hero from './components/Home/Hero'
import About from './components/Home/about'
import Services from './components/Home/services'
import Partners from './components/Home/significantpartners'
import ContactUs from './components/Home/contactus'

const HomePage = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Partners/>
      <ContactUs />
    </main>
  )
}

export default HomePage