"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DatingApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProfile, setCurrentProfile] = useState(0);

  // Sample profiles data
  const profiles = [
    {
      id: 1,
      name: "Nidhi",
      age: 35,
      interests: ["Foodie", "Walking", "Movies", "Singing", "Stand up Comedy"],
      images: ["/nidhi4.jpg", "/nidhi2.jpg", "/nidhi3.jpg"],
    },
    {
      id: 2,
      name: "Sarah",
      age: 28,
      interests: ["Hiking", "Photography", "Travel", "Cooking"],
      images: [
        "/placeholder.svg?height=600&width=400",
        "/placeholder.svg?height=600&width=400",
      ],
    },
    {
      id: 3,
      name: "Emma",
      age: 31,
      interests: ["Yoga", "Reading", "Art", "Coffee"],
      images: [
        "/placeholder.svg?height=600&width=400",
        "/placeholder.svg?height=600&width=400",
        "/placeholder.svg?height=600&width=400",
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === profiles[currentProfile].images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? profiles[currentProfile].images.length - 1 : prev - 1
    );
  };

  const nextProfile = () => {
    setCurrentProfile((prev) => (prev + 1) % profiles.length);
    setCurrentSlide(0);
  };

  const currentProfileData = profiles[currentProfile];

  return (
    <div className="flex h-screen w-full bg-black overflow-scroll text-white">
      {/* Sidebar */}
      <div className="w-full max-w-[320px] md:flex flex-col border-r border-gray-800 hidden lg:block">
        {/* Top bar */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Image
                src="/profile.jpg"
                alt="Your profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-white"
              />
            </div>
            <span className="font-medium">You</span>
          </div>
          <div className="flex gap-3 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 hover:bg-white/20"
            >
              <Zap className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 hover:bg-white/20"
            >
              <div className="relative">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full" />
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4"
                    y="4"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="4"
                    y="13"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="13"
                    y="4"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="13"
                    y="13"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 hover:bg-white/20"
            >
              <Briefcase className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 hover:bg-white/20"
            >
              <Shield className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <Link
            href="#"
            className="flex-1 text-center py-4 border-b-2 border-rose-500 font-medium"
          >
            Matches
          </Link>
          <Link href="#" className="flex-1 text-center py-4 text-gray-400">
            Messages
          </Link>
        </div>

        {/* Likes */}
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
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col relative">
        {/* Profile card */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md h-[66vh] bg-gray-900 rounded-xl overflow-hidden">
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
                      index === currentSlide
                        ? "bg-white w-6"
                        : "bg-white/50 w-4"
                    )}
                  />
                ))}
              </div>

              {/* Profile info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-20">
                <div className="flex items-center">
                  <h2 className="text-3xl font-bold">
                    {currentProfileData.name}{" "}
                    <span className="text-2xl font-normal">
                      {currentProfileData.age}
                    </span>
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto rounded-full bg-white/10"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-300">Interests</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {currentProfileData.interests.map((interest, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-800 hover:bg-gray-700"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
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
        <div className="p-2 flex justify-between items-center border-t border-gray-800 w-full flex-wrap h-full gap-2">
          <Button variant="outline" className="text-xs border-gray-700 text-gray-950 ">
            Hide
          </Button>
          <div className="flex gap-2  flex-wrap">
            <Button
              variant="outline"
              className="text-xs w-fit border-gray-700 flex items-center gap-1 text-gray-950"
            >
              <X className="h-3 w-3" /> Nope
            </Button>
            <Button
              variant="outline"
              className="text-xs border-gray-700 flex items-center gap-1 text-gray-950"
            >
              <Heart className="h-3 w-3" /> Like
            </Button>
            <Button
              variant="outline"
              className="text-xs border-gray-700 flex items-center gap-1 text-gray-950"
            >
              <Plus className="h-3 w-3 text-gray-950" /> Open Profile
            </Button>
            <Button
              variant="outline"
              className="text-xs border-gray-700 flex items-center gap-1 text-gray-950"
            >
              <X className="h-3 w-3 text-gray-950" /> Close Profile
            </Button>
            <Button
              variant="outline"
              className="text-xs border-gray-700 text-gray-950 flex items-center gap-1"
            >
              <Star className="h-3 w-3 text-gray-950" /> Super Like
            </Button>
          </div>
          <Button
            variant="outline"
            className="text-xs border-gray-700 text-gray-950"
            onClick={nextProfile}
          >
            Next Photo
          </Button>
        </div>
      </div>
    </div>
  );
}
