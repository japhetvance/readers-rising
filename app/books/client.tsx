'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const Client = () => {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showBackCover, setShowBackCover] = useState(false)

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
        {/* Mobile Hero Section */}
        <div className="md:hidden">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[300px] aspect-[2/3] mb-6">
              <Image
                src={showBackCover ? '/pictures/main-book/back.webp' : '/pictures/main-book/front.webp'}
                alt="Trese: Murder on Balete Drive"
                fill
                className="object-cover rounded-lg shadow-lg"
                priority
              />
              <button 
                onClick={() => setShowBackCover(!showBackCover)}
                className="absolute bottom-3 right-3 bg-black/70 text-white p-2 rounded-full"
                aria-label={showBackCover ? "Show front cover" : "Show back cover"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
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
            <div className="relative aspect-[2/3] max-w-[400px] mx-auto">
              <Image
                src={showBackCover ? '/pictures/main-book/back.webp' : '/pictures/main-book/front.webp'}
                alt="Trese: Murder on Balete Drive"
                fill
                className="object-cover rounded-lg shadow-lg"
                priority
              />
              <button 
                onClick={() => setShowBackCover(!showBackCover)}
                className="absolute bottom-4 right-4 bg-black/70 text-white p-2 rounded-full"
                aria-label={showBackCover ? "Show front cover" : "Show back cover"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
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
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4">
                  When the sun sets in the city of Manila, don&apos;t you dare make a wrong turn and end up on that dimly-lit side of the metro, where aswang run the most-wanted kidnapping rings, where kapre are the kingpins of crime, and engkanto slip through the cracks and steal your most precious possessions.
                </p>
                <p className="mb-4">
                  When crime takes a turn for the weird, the police call Alexandra Trese.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Description - only shown on mobile */}
        <div className="md:hidden prose dark:prose-invert max-w-none mb-8">
          <p className="mb-4">
            When the sun sets in the city of Manila, don&apos;t you dare make a wrong turn and end up on that dimly-lit side of the metro, where aswang run the most-wanted kidnapping rings, where kapre are the kingpins of crime, and engkanto slip through the cracks and steal your most precious possessions.
          </p>
          <p className="mb-4">
            When crime takes a turn for the weird, the police call Alexandra Trese.
          </p>
        </div>
        
        {/* Cases Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Trese: Murder on Balete Drive cases:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Case 1: At the Intersection of Balete and 13th Street</li>
            <li>Case 2: Rules of the Race</li>
            <li>Case 3: The Tragic Case of Dr. Burgos</li>
            <li>Case 4: Our Secret Constellation</li>
          </ul>
          <p className="mt-4 text-sm">
            This 2021 edition contains magnificently remastered artwork as seen in the US edition. It has 16 additional comic book pages showing extended action scenes and features concept sketches from 2005 when TRESE was created. The release of this book marks the 13th publication anniversary of &quot;Murder on Balete Drive.&quot;
          </p>
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
