"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  Heart,
  X,
  Star,
  Rewind,
  Send,
  Zap,
  Briefcase,
  Shield,
  Plus,
  ChevronLeft,
  ChevronRight,
  Menu,
  User,
  MessageSquare,
  Check,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function SwipeableDatingApp() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentProfile, setCurrentProfile] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("matches")

  // Swipe state
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [offsetX, setOffsetX] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [swipeComplete, setSwipeComplete] = useState(false)
  const [profileStatus, setProfileStatus] = useState({})

  const cardRef = useRef(null)
  const swipeThreshold = 100 // Amount of pixels to swipe to trigger action

  // Sample profiles data
  const profiles = [
    {
      id: 1,
      name: "Nidhi",
      age: 35,
      interests: ["Foodie", "Walking", "Movies", "Singing", "Stand up Comedy"],
      images: [
        "/nidhi1.jpg",
        "/nidhi2.jpg",
        "/nidhi3.jpg",
      ],
    },
    {
      id: 2,
      name: "Sarah",
      age: 28,
      interests: ["Hiking", "Photography", "Travel", "Cooking"],
      images: ["/sarah1.jpg", "/sarah2.jpg"],
    },
    {
      id: 3,
      name: "Emma",
      age: 31,
      interests: ["Yoga", "Reading", "Art", "Coffee"],
      images: [
        "/emma3.jpg",
        "/emma2.jpg",
        "/emma1.jpg",
      ],
    },
  ]

  const nextSlide = () => {
    if (!isDragging) {
      setCurrentSlide((prev) => (prev === profiles[currentProfile].images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevSlide = () => {
    if (!isDragging) {
      setCurrentSlide((prev) => (prev === 0 ? profiles[currentProfile].images.length - 1 : prev - 1))
    }
  }

  const goToNextProfile = () => {
    setCurrentProfile((prev) => (prev + 1) % profiles.length)
    setCurrentSlide(0)
    setOffsetX(0)
    setSwipeDirection(null)
    setSwipeComplete(false)
  }

  const handleLike = () => {
    setSwipeDirection("right")
    setProfileStatus((prev) => ({ ...prev, [currentProfile]: "liked" }))
    setSwipeComplete(true)

    // Animate card off screen to the right
    setOffsetX(window.innerWidth)

    // Move to next profile after animation
    setTimeout(goToNextProfile, 300)
  }

  const handleReject = () => {
    setSwipeDirection("left")
    setProfileStatus((prev) => ({ ...prev, [currentProfile]: "rejected" }))
    setSwipeComplete(true)

    // Animate card off screen to the left
    setOffsetX(-window.innerWidth)

    // Move to next profile after animation
    setTimeout(goToNextProfile, 300)
  }

  // Touch/mouse event handlers for swiping
  const handleDragStart = (clientX) => {
    if (swipeComplete) return
    setIsDragging(true)
    setStartX(clientX)
  }

  const handleDragMove = (clientX) => {
    if (!isDragging || swipeComplete) return

    const deltaX = clientX - startX
    setOffsetX(deltaX)

    // Determine swipe direction for visual feedback
    if (deltaX > 30) {
      setSwipeDirection("right")
    } else if (deltaX < -30) {
      setSwipeDirection("left")
    } else {
      setSwipeDirection(null)
    }
  }

  const handleDragEnd = () => {
    if (!isDragging || swipeComplete) return
    setIsDragging(false)

    // If swiped far enough, trigger the appropriate action
    if (offsetX > swipeThreshold) {
      handleLike()
    } else if (offsetX < -swipeThreshold) {
      handleReject()
    } else {
      // Reset if not swiped far enough
      setOffsetX(0)
      setSwipeDirection(null)
    }
  }

  // Mouse event handlers
  const handleMouseDown = (e) => {
    handleDragStart(e.clientX)
  }

  const handleMouseMove = (e) => {
    handleDragMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd()
    }
  }

  // Touch event handlers
  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  // Clean up event listeners
  useEffect(() => {
    const handleMouseUpGlobal = () => {
      if (isDragging) {
        handleDragEnd()
      }
    }

    window.addEventListener("mouseup", handleMouseUpGlobal)
    return () => {
      window.removeEventListener("mouseup", handleMouseUpGlobal)
    }
  }, [isDragging])

  const currentProfileData = profiles[currentProfile]
  const currentStatus = profileStatus[currentProfile]

  // Sidebar content component to reuse in both desktop sidebar and mobile drawer
  const SidebarContent = () => (
    <>
      <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <Image
              src="/profile.jpg"
              alt="Your profile"
              width={40}
              height={40}
              className="rounded-full border-2 border-white "
            />
          </div>
          <span className="font-medium">You</span>
        </div>
        <div className="flex gap-3 ml-auto">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
            <Zap className="h-5 w-5 text-white" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
            <div className="relative text-white">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full" />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="4" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="13" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="13" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
            <Briefcase className="h-5 w-5 text-white" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
            <Shield className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>

      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab("matches")}
          className={cn(
            "flex-1 text-center py-4 text-white",
            activeTab === "matches" ? "border-b-2 border-rose-500 font-medium" : "text-white",
          )}
        >
          Matches
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          className={cn(
            "flex-1 text-center py-4 text-white",
            activeTab === "messages" ? "border-b-2 border-rose-500 font-medium" : "text-white",
          )}
        >
          Messages
        </button>
      </div>

      {activeTab === "matches" && (
        <div className="p-4">
          <div className="relative w-[180px] h-[180px] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-rose-400 rounded-lg opacity-70" />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <div className="bg-yellow-400 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="mt-2 font-medium">3 Likes</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "messages" && (
        <div className="p-4">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
                <div className="relative">
                  <Image
                    src={`/nidhi1.jpg`}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-black"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="font-medium text-white">User {i}</p>
                    <span className="text-xs text-gray-400">2h</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">Hey there! How are you?</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )

  return (
    <div className="flex h-screen bg-black overflow-scroll text-white">
      {/* Desktop Sidebar */}
      <div className="w-full max-w-[360px] hidden lg:flex flex-col border-r border-gray-800">
        <SidebarContent />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-10 bg-gradient-to-r from-rose-500 to-rose-600 p-3 flex items-center">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-full bg-black border-r border-gray-800">
            <div className="h-full overflow-auto">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1 flex justify-center">
          <div className="flex gap-6">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full flex flex-col items-center justify-center gap-1",
                activeTab === "matches" ? "text-white" : "text-white/60",
              )}
              onClick={() => {
                setActiveTab("matches")
                setSidebarOpen(true)
              }}
            >
              <Heart className="h-5 w-5" />
              <span className="text-[10px]">Matches</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full flex flex-col items-center justify-center gap-1",
                activeTab === "messages" ? "text-white" : "text-white/60",
              )}
              onClick={() => {
                setActiveTab("messages")
                setSidebarOpen(true)
              }}
            >
              <MessageSquare className="h-5 w-5" />
              <span className="text-[10px]">Messages</span>
            </Button>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
          <User className="h-5 w-5" />
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col relative lg:pt-0 pt-16">
        {/* Profile card */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div
            ref={cardRef}
            className={cn(
              "relative w-full max-w-md h-[66vh] bg-gray-900 rounded-xl overflow-hidden",
              isDragging ? "cursor-grabbing" : "cursor-grab",
              swipeComplete
                ? "transition-transform duration-300 ease-out"
                : isDragging
                  ? ""
                  : "transition-transform duration-200 ease-out",
            )}
            style={{
              transform: `translateX(${offsetX}px) rotate(${offsetX * 0.05}deg)`,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Swipe indicators */}
            <div
              className={cn(
                "absolute top-8 left-8 z-10 bg-green-500 text-white p-3 rounded-full transform transition-opacity duration-200",
                swipeDirection === "right" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90",
              )}
            >
              <Heart className="h-8 w-8" />
            </div>
            <div
              className={cn(
                "absolute top-8 right-8 z-10 bg-rose-500 text-white p-3 rounded-full transform transition-opacity duration-200",
                swipeDirection === "left" ? "opacity-100 rotate-0" : "opacity-0 rotate-90",
              )}
            >
              <X className="h-8 w-8" />
            </div>

            {/* Image slider */}
            <div className="relative h-full">
              <div
                className="absolute inset-0 flex transition-transform duration-300"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {currentProfileData.images.map((image, index) => (
                  <div key={index} className="min-w-full h-full relative">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${currentProfileData.name}'s photo ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Slider controls */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 rounded-full p-1"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 rounded-full p-1"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Slide indicators */}
              <div className="absolute top-2 left-0 right-0 flex justify-center gap-1">
                {currentProfileData.images.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-1 rounded-full transition-all",
                      index === currentSlide ? "bg-white w-6" : "bg-white/50 w-4",
                    )}
                  />
                ))}
              </div>

              {/* Profile info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-20">
                <div className="flex items-center">
                  <h2 className="text-3xl font-bold">
                    {currentProfileData.name} <span className="text-2xl font-normal">{currentProfileData.age}</span>
                  </h2>
                  <Button variant="ghost" size="icon" className="ml-auto rounded-full bg-white/10">
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-300">Interests</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {currentProfileData.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-800 hover:bg-gray-700">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Profile status indicator */}
                {currentStatus && (
                  <div
                    className={cn(
                      "absolute top-4 right-4 rounded-full px-3 py-1 flex items-center gap-1.5 text-sm font-medium",
                      currentStatus === "liked" ? "bg-green-500/80 text-white" : "bg-rose-500/80 text-white",
                    )}
                  >
                    {currentStatus === "liked" ? (
                      <>
                        <Check className="h-4 w-4" />
                        Liked
                      </>
                    ) : (
                      <>
                        <X className="h-4 w-4" />
                        Rejected
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="p-4 flex justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full sm:h-14 sm:w-14 w-10 h-10 border-gray-700 bg-gray-800 hover:bg-gray-700"
          >
            <Rewind className="h-6 w-6 text-gray-400" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full sm:h-14 sm:w-14 w-10 h-10 border-rose-500 bg-gray-800 hover:bg-rose-500/20"
            onClick={handleReject}
          >
            <X className="h-8 w-8 text-rose-500" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full sm:h-14 sm:w-14 w-10 h-10 border-blue-500 bg-gray-800 hover:bg-blue-500/20"
          >
            <Star className="h-6 w-6 text-blue-500" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full sm:h-14 sm:w-14 w-10 h-10 border-green-500 bg-gray-800 hover:bg-green-500/20"
            onClick={handleLike}
          >
            <Heart className="h-6 w-6 text-green-500" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full sm:h-14 sm:w-14 w-10 h-10 border-cyan-500 bg-gray-800 hover:bg-cyan-500/20"
          >
            <Send className="h-6 w-6 text-cyan-500" />
          </Button>
        </div>

        {/* Bottom controls */}
        <div className="p-2 flex justify-between items-center border-t  border-gray-800 w-full flex-wrap gap-2">
          <Button variant="outline" className="text-xs border-gray-700  text-gray-900">
            Hide
          </Button>
          <div className="flex gap-2 flex-wrap justify-center ">
            <Button
              variant="outline"
              className="text-xs w-fit border-gray-700 flex items-center gap-1 text-gray-900"
              onClick={handleReject}
            >
              <X className="h-3 w-3" /> Nope
            </Button>
            <Button
              variant="outline"
              className="text-xs border-gray-700 flex items-center gap-1 text-gray-900"
              onClick={handleLike}
            >
              <Heart className="h-3 w-3" /> Like
            </Button>
            <Button variant="outline" className="text-xs border-gray-700 flex items-center gap-1 text-gray-900">
              <Plus className="h-3 w-3" /> Open Profile
            </Button>
            <Button variant="outline" className="text-xs border-gray-700 flex items-center gap-1 text-gray-900">
              <X className="h-3 w-3" /> Close Profile
            </Button>
            <Button variant="outline" className="text-xs border-gray-700 flex items-center gap-1 text-gray-900">
              <Star className="h-3 w-3" /> Super Like
            </Button>
          </div>
          <Button variant="outline" className="text-xs border-gray-700 text-gray-900" onClick={goToNextProfile}>
            Next Photo
          </Button>
        </div>
      </div>
    </div>
  )
}

