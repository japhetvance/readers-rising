'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

const Client = () => {
  const router = useRouter()
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showBackCover, setShowBackCover] = useState(false)
  
  const handleBackClick = () => {
    router.push('/')
  }

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1500)
  }

  const relatedBooks = [
    {
      id: 1,
      title: 'Trese: Mass Murders',
      image: '/pictures/trese-mass_murders.webp',
    },
    {
      id: 2,
      title: 'Trese: Midnight Tribunal',
      image: '/pictures/trese-midnight_tribunal.webp',
    },
    {
      id: 3,
      title: 'Trese: Last Seen After Midnight',
      image: '/pictures/trese-last_seen_after_midnight.webp',
    },
    {
      id: 4,
      title: 'Trese: Unreported Murders',
      image: '/pictures/trese-unreported_murders.webp',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBackClick} 
          className="mb-4 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        
        {/* Mobile Hero Section */}
        <div className="md:hidden">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[300px] aspect-[2/3] mb-3">
              <Image
                src={showBackCover ? '/pictures/main-book/back.webp' : '/pictures/main-book/front.webp'}
                alt="Trese: Murder on Balete Drive"
                fill
                className="object-cover rounded-lg shadow-lg"
                priority
              />
            </div>
            
            {/* Thumbnails for mobile */}
            <div className="flex gap-2 mb-6">
              <button 
                onClick={() => setShowBackCover(false)}
                className={`relative w-16 h-24 rounded-md overflow-hidden border-2 transition-all ${!showBackCover ? 'border-primary' : 'border-transparent opacity-70'}`}
                aria-label="Show front cover"
              >
                <Image
                  src="/pictures/main-book/front.webp"
                  alt="Front cover thumbnail"
                  fill
                  className="object-cover"
                />
              </button>
              <button 
                onClick={() => setShowBackCover(true)}
                className={`relative w-16 h-24 rounded-md overflow-hidden border-2 transition-all ${showBackCover ? 'border-primary' : 'border-transparent opacity-70'}`}
                aria-label="Show back cover"
              >
                <Image
                  src="/pictures/main-book/back.webp"
                  alt="Back cover thumbnail"
                  fill
                  className="object-cover"
                />
              </button>
            </div>
            
            <h1 className="text-2xl font-bold text-center mb-2">Trese: Murder on Balete Drive</h1>
            <p className="text-muted-foreground text-center mb-4">Budjette Tan, KaJO Baldisimo</p>
            
            <Button 
              onClick={handleAddToCart} 
              className="w-full max-w-[300px] mb-6"
              disabled={isAddingToCart}
            >
              {isAddingToCart ? 'Adding to cart...' : 'Buy Now'}
            </Button>
          </div>
        </div>
        
        {/* Desktop Hero Section */}
        <div className="hidden md:block mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col items-center">
              <div className="relative aspect-[2/3] w-full max-w-[400px] mb-4">
                <Image
                  src={showBackCover ? '/pictures/main-book/back.webp' : '/pictures/main-book/front.webp'}
                  alt="Trese: Murder on Balete Drive"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  priority
                />
              </div>
              
              {/* Thumbnails for desktop */}
              <div className="flex gap-3 mb-4">
                <button 
                  onClick={() => setShowBackCover(false)}
                  className={`relative w-20 h-28 rounded-md overflow-hidden border-2 transition-all ${!showBackCover ? 'border-primary' : 'border-transparent opacity-70'}`}
                  aria-label="Show front cover"
                >
                  <Image
                    src="/pictures/main-book/front.webp"
                    alt="Front cover thumbnail"
                    fill
                    className="object-cover"
                  />
                </button>
                <button 
                  onClick={() => setShowBackCover(true)}
                  className={`relative w-20 h-28 rounded-md overflow-hidden border-2 transition-all ${showBackCover ? 'border-primary' : 'border-transparent opacity-70'}`}
                  aria-label="Show back cover"
                >
                  <Image
                    src="/pictures/main-book/back.webp"
                    alt="Back cover thumbnail"
                    fill
                    className="object-cover"
                  />
                </button>
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">Trese: Murder on Balete Drive</h1>
              <p className="text-xl text-muted-foreground mb-4">Budjette Tan, KaJO Baldisimo</p>
              
              <Button 
                onClick={handleAddToCart} 
                className="mb-8"
                size="lg"
                disabled={isAddingToCart}
              >
                {isAddingToCart ? 'Adding to cart...' : 'Buy Now'}
              </Button>
              
              <div className="bg-muted/40 rounded-lg p-5 border border-muted shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-primary">Synopsis</h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="mb-4 leading-relaxed">
                    When the sun sets in the city of Manila, don&apos;t you dare make a wrong turn and end up on that dimly-lit side of the metro, where <span className="font-medium text-primary-foreground">aswang</span> run the most-wanted kidnapping rings, where <span className="font-medium text-primary-foreground">kapre</span> are the kingpins of crime, and <span className="font-medium text-primary-foreground">engkanto</span> slip through the cracks and steal your most precious possessions.
                  </p>
                  <p className="text-base italic border-l-2 border-primary pl-4 py-2">
                    When crime takes a turn for the weird, the police call Alexandra Trese.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Description - only shown on mobile */}
        <div className="md:hidden mb-8">
          <div className="bg-muted/40 rounded-lg p-4 border border-muted shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-primary">Synopsis</h3>
            <div className="prose dark:prose-invert max-w-none">
              <p className="mb-4 text-sm leading-relaxed">
                When the sun sets in the city of Manila, don&apos;t you dare make a wrong turn and end up on that dimly-lit side of the metro, where <span className="font-medium text-primary-foreground">aswang</span> run the most-wanted kidnapping rings, where <span className="font-medium text-primary-foreground">kapre</span> are the kingpins of crime, and <span className="font-medium text-primary-foreground">engkanto</span> slip through the cracks and steal your most precious possessions.
              </p>
              <p className="text-sm italic border-l-2 border-primary pl-3 py-1">
                When crime takes a turn for the weird, the police call Alexandra Trese.
              </p>
            </div>
          </div>
        </div>
        
        {/* Cases Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-md mr-2">Cases</span>
            <span>Featured in this Volume</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Case 1 */}
            <div className="bg-muted/30 rounded-lg p-3 border border-muted hover:shadow-md transition-shadow group">
              <div className="flex items-start">
                <div className="bg-primary/20 text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mr-3">
                  1
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">At the Intersection of Balete and 13th Street</h3>
                  <p className="text-sm text-muted-foreground mt-1">A mysterious death at a haunted intersection leads Trese to uncover an ancient pact.</p>
                </div>
              </div>
            </div>
            
            {/* Case 2 */}
            <div className="bg-muted/30 rounded-lg p-3 border border-muted hover:shadow-md transition-shadow group">
              <div className="flex items-start">
                <div className="bg-primary/20 text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mr-3">
                  2
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Rules of the Race</h3>
                  <p className="text-sm text-muted-foreground mt-1">Street racers encounter supernatural competitors in a high-stakes midnight competition.</p>
                </div>
              </div>
            </div>
            
            {/* Case 3 */}
            <div className="bg-muted/30 rounded-lg p-3 border border-muted hover:shadow-md transition-shadow group">
              <div className="flex items-start">
                <div className="bg-primary/20 text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mr-3">
                  3
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">The Tragic Case of Dr. Burgos</h3>
                  <p className="text-sm text-muted-foreground mt-1">A respected doctor&apos;s mysterious disappearance reveals dark secrets and forbidden rituals.</p>
                </div>
              </div>
            </div>
            
            {/* Case 4 */}
            <div className="bg-muted/30 rounded-lg p-3 border border-muted hover:shadow-md transition-shadow group">
              <div className="flex items-start">
                <div className="bg-primary/20 text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mr-3">
                  4
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Our Secret Constellation</h3>
                  <p className="text-sm text-muted-foreground mt-1">Trese investigates a series of deaths connected to an ancient celestial pattern.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-5 bg-primary/5 p-3 rounded-lg border border-primary/10 text-sm">
            <p className="leading-relaxed">
              This 2021 edition contains magnificently remastered artwork as seen in the US edition. It has 16 additional comic book pages showing extended action scenes and features concept sketches from 2005 when TRESE was created. The release of this book marks the 13th publication anniversary of &quot;Murder on Balete Drive.&quot;
            </p>
          </div>
        </div>
        
        {/* Book Details */}
        <div className="bg-muted/30 p-4 rounded-lg mb-12">
          <h2 className="text-xl font-bold mb-4">Book Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-muted-foreground">Size</p>
              <p className="font-medium">6&quot;x9&quot;</p>
            </div>
            <div>
              <p className="text-muted-foreground">Weight</p>
              <p className="font-medium">0.3 kg</p>
            </div>
            <div>
              <p className="text-muted-foreground">Pages</p>
              <p className="font-medium">116</p>
            </div>
            <div>
              <p className="text-muted-foreground">ISBN</p>
              <p className="font-medium">978-62196223-6-3</p>
            </div>
          </div>
        </div>
        
        {/* You May Also Like Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedBooks.map((book) => (
              <div key={book.id} className="group cursor-pointer">
                <div className="relative aspect-[2/3] mb-2 overflow-hidden rounded-lg">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-medium group-hover:text-primary transition-colors">{book.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Client
