import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Timeline from './components/Timeline'
import CEOs from './components/CEOs'
import Categories from './components/Categories'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('all')

  const selectCategory = (id) => {
    setActiveCategory(id)
    const section = document.getElementById('timeline')
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Timeline
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <CEOs />
        <Categories onSelect={selectCategory} />
      </main>
      <Footer />
    </>
  )
}

export default App
