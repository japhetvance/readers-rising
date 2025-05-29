'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Heart, MessageCircle, Send, MoreHorizontal, Volume2, VolumeX, Play } from 'lucide-react'

// Video data
const reelsData = [
    {
    id: 1,
    videoSrc: '/videos/meow.mp4',
    username: '@catuser',
    caption: 'Meow meow! 🐱 #cat #adorable',
    likes: '15.2K',
    comments: '421',
    music: 'Original Audio'
  },
  {
    id: 2,
    videoSrc: '/videos/arf.mp4',
    username: '@doggouser',
    caption: 'Just a happy doggo saying arf! 🐶 #doggo #cute',
    likes: '10.5K',
    comments: '342',
    music: 'Original Audio'
  }
]

const Client = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true) // Set to true by default to allow autoplay
  
  // Handle swipe to next/previous reel
  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentReelIndex < reelsData.length - 1) {
      setCurrentReelIndex(prev => prev + 1)
    } else if (direction === 'down' && currentReelIndex > 0) {
      setCurrentReelIndex(prev => prev - 1)
    }
  }

  // Touch handling for swipe
  const touchStartY = useRef<number | null>(null)
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return
    
    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY.current - touchEndY
    
    // Determine swipe direction based on difference
    if (Math.abs(diff) > 50) { // Threshold for swipe
      if (diff > 0) {
        handleSwipe('up')
      } else {
        handleSwipe('down')
      }
    }
    
    touchStartY.current = null
  }

  return (
    <div 
      className="fixed inset-0 bg-black overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Reels container */}
      <div className="h-full w-full">
        {reelsData.map((reel, index) => (
          <ReelsVideo 
            key={reel.id}
            reel={reel}
            isActive={index === currentReelIndex}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
          />
        ))}
      </div>
      
      {/* Navigation hints */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/50 text-xs">
        Swipe up for next video
      </div>
    </div>
  )
}

// Individual Reel Video Component
interface ReelsVideoProps {
  reel: typeof reelsData[0]
  isActive: boolean
  isMuted: boolean
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>
}

const ReelsVideo: React.FC<ReelsVideoProps> = ({ reel, isActive, isMuted, setIsMuted }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPaused, setIsPaused] = useState(true)
  
  // Handle video playback based on active state
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.currentTime = 0
        videoRef.current.play()
          .then(() => setIsPaused(false))
          .catch(err => {
            console.error('Error playing video:', err)
            setIsPaused(true)
          })
      } else {
        videoRef.current.pause()
        setIsPaused(true)
      }
    }
  }, [isActive])
  
  // Update muted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])
  
  // Toggle play/pause on video click
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
          .then(() => setIsPaused(false))
          .catch(err => {
            console.error('Error playing video:', err)
            setIsPaused(true)
          })
      } else {
        videoRef.current.pause()
        setIsPaused(true)
      }
    }
  }
  
  // Toggle mute/unmute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering play/pause
    setIsMuted(prev => !prev)
  }

  return (
    <div 
      className={cn(
        "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={reel.videoSrc}
        className="h-full w-full object-cover"
        loop
        playsInline
        muted={isMuted}
        onClick={togglePlayPause}
      />
      
      {/* Play button overlay - only shown when video is paused */}
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/30 rounded-full p-4">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
      )}
      
      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
        
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      
      {/* User info and caption */}
      <div className="absolute bottom-6 left-4 right-16 text-white pointer-events-none">
        <div className="font-bold text-sm">{reel.username}</div>
        <div className="text-sm mt-1 line-clamp-2">{reel.caption}</div>
        <div className="flex items-center mt-2 text-xs">
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-white/80 mr-2" />
            {reel.music}
          </span>
        </div>
      </div>
      
      {/* Right side action buttons */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 text-white">
        {/* Like button */}
        <div className="flex flex-col items-center pointer-events-auto">
          <button className="w-10 h-10 flex items-center justify-center">
            <Heart className="w-7 h-7" />
          </button>
          <span className="text-xs mt-1">{reel.likes}</span>
        </div>
        
        {/* Comment button */}
        <div className="flex flex-col items-center pointer-events-auto">
          <button className="w-10 h-10 flex items-center justify-center">
            <MessageCircle className="w-7 h-7" />
          </button>
          <span className="text-xs mt-1">{reel.comments}</span>
        </div>
        
        {/* Share button */}
        <div className="flex flex-col items-center pointer-events-auto">
          <button className="w-10 h-10 flex items-center justify-center">
            <Send className="w-7 h-7" />
          </button>
          <span className="text-xs mt-1">Share</span>
        </div>
        
        {/* More options button */}
        <div className="flex flex-col items-center pointer-events-auto">
          <button className="w-10 h-10 flex items-center justify-center">
            <MoreHorizontal className="w-7 h-7" />
          </button>
        </div>
      </div>
      
      {/* Volume control - make this clickable */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <button 
          className="w-10 h-10 flex items-center justify-center text-white bg-black/30 rounded-full"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  )
}

export default Client
