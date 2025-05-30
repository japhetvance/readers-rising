'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Heart, MessageCircle, Send, MoreHorizontal, Volume2, VolumeX, Play, Home, Search, Film, User, Music, Plus, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence, useAnimation, PanInfo } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Video data
const reelsData = [
  {
    id: 1,
    videoSrc: '/videos/meow.mp4',
    username: 'kittyminaj',
    userAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9KTL0bZEmbWhR-2ORvse9yvbj52KbU_hJhw&s',
    caption: 'wiwiwi uyaya wawawe 🐱 #catofreels',
    likes: '15.2K',
    comments: '421',
    music: 'Original Audio',
    isFollowing: false
  },
  {
    id: 2,
    videoSrc: '/videos/mwehehe.mp4',
    username: 'aldenricharge',
    userAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREnDhGr2pnhpeWBPyRqrPKON5W3PGpMUwF1Q&s',
    caption: 'God gave me you 🎵🙏 #blessed',
    likes: '10.5K',
    comments: '342',
    music: 'muhehehe - cat remix',
    isFollowing: true,
  },
  {
    id: 3,
    videoSrc: '/videos/realnareel.mp4',
    username: 'sigbinenjoyer',
    userAvatar: 'https://i.pinimg.com/474x/48/3b/16/483b1646321fa65ab7343aff3f05313b.jpg',
    caption: 'Escape into thrilling worlds while I play 🎮 #booklovers #subwaysurfers',
    likes: '24.7K',
    comments: '873',
    music: 'Epic Storytelling - Audiobook Mix',
    isFollowing: false,
    isAd: true,
    adLabel: 'Sponsored Partnership',
    adButtonText: 'Explore Book',
    adRedirectUrl: '/books'
    },
]

const Client = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true) // Set to true by default to allow autoplay
  const [isDragging, setIsDragging] = useState(false)
  const [direction, setDirection] = useState<'up' | 'down' | null>(null)
  const controls = useAnimation()
  const [progress, setProgress] = useState(0)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
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
  
  // Reset and start progress when reel changes
  useEffect(() => {
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    
    // Reset progress
    setProgress(0)
    
    // Start new progress interval
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressIntervalRef.current as NodeJS.Timeout)
          return 100
        }
        return prev + 0.1
      })
    }, 30) // Adjust timing based on video length
    
    // Cleanup on unmount
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
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
      {/* Instagram-style progress bar */}
      <div className="absolute top-0 left-0 right-0 z-30 px-2 pt-2">
        <div className="h-0.5 bg-gray-500/30 rounded-full w-full">
          <motion.div 
            className="h-full bg-white rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>
      
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
      
      {/* Instagram-style header */}
      <div className="fixed top-4 left-0 right-0 flex items-center justify-between px-4 z-20 mt-3">
        <div className="flex items-center">
          <span className="text-white font-semibold text-lg">Reels</span>
        </div>
        <button className="p-2 text-white">
          <Camera className="w-6 h-6" />
        </button>
      </div>
      
      {/* Instagram-style footer navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-black border-t border-gray-800/50 flex items-center justify-around px-2 z-20">
        <button className="p-2 text-white">
          <Home className="w-6 h-6" />
        </button>
        <button className="p-2 text-white">
          <Search className="w-6 h-6" />
        </button>
        <button className="p-2 text-white">
          <Plus className="w-6 h-6 bg-gray-800 rounded-md p-0.5" />
        </button>
        <button className="p-2 text-white/90">
          <Film className="w-6 h-6" strokeWidth={2.5} />
        </button>
        <button className="p-2 text-white">
          <User className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

// Instagram Camera Icon
const Camera = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

// Individual Reel Video Component
interface ReelsVideoProps {
  reel: typeof reelsData[0] & {
    isAd?: boolean;
    adLabel?: string;
    adButtonText?: string;
    adRedirectUrl?: string;
  }
  isActive: boolean
  isMuted: boolean
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>
  isDragging?: boolean
}

const ReelsVideo: React.FC<ReelsVideoProps> = ({ reel, isActive, isMuted, setIsMuted, isDragging = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPaused, setIsPaused] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [musicRotation, setMusicRotation] = useState(0)
  
  // Rotate music icon
  useEffect(() => {
    let animationFrame: number;
    
    const rotateMusicIcon = () => {
      setMusicRotation(prev => (prev + 1) % 360);
      animationFrame = requestAnimationFrame(rotateMusicIcon);
    };
    
    if (isActive && !isPaused) {
      animationFrame = requestAnimationFrame(rotateMusicIcon);
    }
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isActive, isPaused]);
  
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
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
        
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      
      {/* Subtle ad indicator overlay for ads */}
      {reel.isAd && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
      
      {/* Content container - moved higher to avoid overlap with audio */}
      <div className="absolute bottom-28 left-4 right-16 flex flex-col text-white">
        {/* Sponsored label - only for ads */}
        {reel.isAd && (
          <div className="flex items-center text-xs text-gray-300 mb-1.5 opacity-90">
            {reel.adLabel} <span className="mx-1.5 text-gray-400">•</span> <span className="text-gray-400">Instagram Ad</span>
          </div>
        )}
        
        {/* Username with avatar and follow button - always shown */}
        <div className="flex items-center mb-3">
          <Avatar className="h-9 w-9 border border-gray-500/30">
            <AvatarImage src={reel.userAvatar} alt={reel.username} />
            <AvatarFallback>{reel.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="ml-2 flex items-center">
            <span className="font-semibold text-sm">@{reel.username}</span>
            <span className="mx-1.5 text-gray-400">•</span>
            {!reel.isFollowing ? (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs font-semibold text-blue-500 hover:text-blue-400 p-0"
              >
                Follow
              </Button>
            ) : (
              <span className="text-xs text-gray-400">Following</span>
            )}
          </div>
        </div>
        
        {/* Advertisement button and brand - only for ads */}
        {reel.isAd && (
          <div className="pointer-events-auto mb-2.5 z-10 relative">
            {/* Pointing hand animation - positioned at 65% from left */}
            <div className="absolute left-[75%] -top-16 -translate-x-1/2">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: 5 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <motion.div
                  className="absolute -inset-2 rounded-full bg-white/30"
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ scale: 1.4, opacity: 0.3 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                />
                <div className="text-5xl relative z-10 filter drop-shadow-lg">⬇️</div>
              </motion.div>
            </div>
            
            <Button 
              variant="default" 
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-md px-4 py-1.5 shadow-md w-full"
              onClick={() => window.location.href = reel.adRedirectUrl}
            >
              <div className="flex items-center justify-between w-full">
                {reel.adButtonText}
                <ChevronRight className="inline-block ml-1 w-4 h-4" />
              </div>
            </Button>
            
            {/* Learn more text */}
            <div className="mt-1.5 text-xs text-gray-300">
              <span className="cursor-pointer hover:underline">Learn More</span>
            </div>
          </div>
        )}
        
        {/* Caption - always shown */}
        <div className="text-sm line-clamp-2 pointer-events-none">{reel.caption}</div>
        
      {/* Music info - removed from here and moved to bottom */}
      </div>
      
      {/* Right side action buttons */}
      <div className="absolute right-2 bottom-36 flex flex-col items-center gap-6 text-white">
        {/* Like button */}
        <div className="flex flex-col items-center pointer-events-auto">
          <button 
            className="w-10 h-10 flex items-center justify-center"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart 
              className={`w-7 h-7 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
              fill={isLiked ? 'currentColor' : 'none'}
            />
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
      
      {/* Audio button with rotating animation - repositioned below content */}
      <div className="absolute bottom-16 left-4 pointer-events-auto">
        <button className="flex items-center justify-center h-8 px-3 bg-black/40 border border-white/20 rounded-full">
          <motion.div
            style={{ rotate: `${musicRotation}deg` }}
            className="mr-2"
          >
            <Music className="w-3 h-3 text-white" />
          </motion.div>
          <span className="text-xs text-white font-medium">{reel.music}</span>
        </button>
      </div>
      
      {/* Volume control - make this clickable */}
      <div className="absolute top-14 right-4 pointer-events-auto z-30">
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
