'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Heart, MessageCircle, Send, MoreHorizontal, Volume2, VolumeX, Play, Home, Search, Film, ShoppingBag, User } from 'lucide-react'
import { motion, AnimatePresence, useAnimation, PanInfo } from 'framer-motion'

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
  const [isDragging, setIsDragging] = useState(false)
  const [direction, setDirection] = useState<'up' | 'down' | null>(null)
  const controls = useAnimation()
  
  // For keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentReelIndex > 0) {
        setDirection('down')
        setCurrentReelIndex(prev => prev - 1)
      } else if (e.key === 'ArrowDown' && currentReelIndex < reelsData.length - 1) {
        setDirection('up')
        setCurrentReelIndex(prev => prev + 1)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentReelIndex])
  
  // Handle drag gestures
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    const threshold = 100 // Minimum distance to trigger a swipe
    
    if (Math.abs(info.offset.y) > threshold) {
      if (info.offset.y < 0 && currentReelIndex < reelsData.length - 1) {
        // Swiped up - go to next video
        setDirection('up')
        setCurrentReelIndex(prev => prev + 1)
      } else if (info.offset.y > 0 && currentReelIndex > 0) {
        // Swiped down - go to previous video
        setDirection('down')
        setCurrentReelIndex(prev => prev - 1)
      } else {
        // Bounce back if at the end or beginning
        controls.start({ y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } })
      }
    } else {
      // Not enough distance to trigger a swipe, bounce back
      controls.start({ y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } })
    }
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Reels container */}
      <motion.div 
        className="h-full w-full relative"
        animate={controls}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentReelIndex}
            initial={{ 
              opacity: 0,
              y: direction === 'up' ? 300 : -300 
            }}
            animate={{ 
              opacity: 1,
              y: 0,
              transition: { 
                opacity: { duration: 0.3 },
                y: { type: "spring", stiffness: 300, damping: 30 }
              }
            }}
            exit={{ 
              opacity: 0,
              y: direction === 'up' ? -300 : 300,
              transition: { duration: 0.3 }
            }}
            className="h-full w-full absolute inset-0"
          >
            <ReelsVideo 
              reel={reelsData[currentReelIndex]}
              isActive={true}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              isDragging={isDragging}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      
      {/* Instagram-style footer navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-black border-t border-gray-800 flex items-center justify-around px-2 z-20">
        <button className="p-2 text-white">
          <Home className="w-6 h-6" />
        </button>
        <button className="p-2 text-white">
          <Search className="w-6 h-6" />
        </button>
        <button className="p-2 text-white/90">
          <Film className="w-6 h-6" strokeWidth={2.5} />
        </button>
        <button className="p-2 text-white">
          <ShoppingBag className="w-6 h-6" />
        </button>
        <button className="p-2 text-white">
          <User className="w-6 h-6" />
        </button>
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
  isDragging?: boolean
}

const ReelsVideo: React.FC<ReelsVideoProps> = ({ reel, isActive, isMuted, setIsMuted, isDragging = false }) => {
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
    <motion.div 
      className="absolute inset-0 flex items-center justify-center"
      animate={{
        scale: isDragging ? 0.95 : 1,
        transition: { duration: 0.2 }
      }}
    >
      {/* Video */}
      <motion.video
        ref={videoRef}
        src={reel.videoSrc}
        className="h-full w-full object-cover"
        loop
        playsInline
        muted={isMuted}
        onClick={togglePlayPause}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
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
      <div className="absolute bottom-20 left-4 right-16 text-white pointer-events-none">
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
      <div className="absolute right-4 bottom-36 flex flex-col items-center gap-6 text-white">
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
    </motion.div>
  )
}

export default Client
