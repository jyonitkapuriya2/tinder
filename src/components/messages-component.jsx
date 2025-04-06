"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Zap, Briefcase, Shield, Search, Send, ChevronLeft, MoreHorizontal, Phone, Video, Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Sample data for conversations
const conversations = [
  {
    id: 1,
    name: "Nidhi",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "Hey, how's it going?",
    timestamp: "2:30 PM",
    unread: true,
    online: true,
    messages: [
      { id: 1, text: "Hi there!", sender: "them", time: "2:25 PM" },
      { id: 2, text: "Hey, how's it going?", sender: "them", time: "2:30 PM" },
    ],
  },
  {
    id: 2,
    name: "Sarah",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "Would love to meet up sometime!",
    timestamp: "Yesterday",
    unread: false,
    online: false,
    messages: [
      { id: 1, text: "Hi Sarah, I liked your profile!", sender: "me", time: "Yesterday" },
      { id: 2, text: "Thanks! I liked yours too 😊", sender: "them", time: "Yesterday" },
      { id: 3, text: "Would love to meet up sometime!", sender: "them", time: "Yesterday" },
    ],
  },
  {
    id: 3,
    name: "Emma",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "That sounds fun! When are you free?",
    timestamp: "Wed",
    unread: false,
    online: true,
    messages: [
      { id: 1, text: "Hey Emma, do you like hiking?", sender: "me", time: "Wed" },
      { id: 2, text: "Yes, I love it! I go every weekend", sender: "them", time: "Wed" },
      { id: 3, text: "We should go together sometime", sender: "me", time: "Wed" },
      { id: 4, text: "That sounds fun! When are you free?", sender: "them", time: "Wed" },
    ],
  },
  {
    id: 4,
    name: "Jessica",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "I'm a big fan of that restaurant too!",
    timestamp: "Mon",
    unread: false,
    online: false,
    messages: [
      { id: 1, text: "What's your favorite restaurant in town?", sender: "them", time: "Mon" },
      { id: 2, text: "I really like that new Italian place downtown", sender: "me", time: "Mon" },
      { id: 3, text: "I'm a big fan of that restaurant too!", sender: "them", time: "Mon" },
    ],
  },
  {
    id: 5,
    name: "Olivia",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "Just matched! Say hello!",
    timestamp: "Just now",
    unread: true,
    online: true,
    messages: [],
  },
]

export default function MessagesComponent() {
  const [activeConversation, setActiveConversation] = useState(1)
  const [messageText, setMessageText] = useState("")
  const [conversationList, setConversationList] = useState(conversations)

  const selectedConversation = conversationList.find((conv) => conv.id === activeConversation)

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeConversation) return

    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: "me",
      time: "Just now",
    }

    setConversationList((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversation) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: messageText,
            timestamp: "Just now",
          }
        }
        return conv
      }),
    )

    setMessageText("")
  }

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-full max-w-[320px] flex flex-col border-r border-gray-800">
        {/* Top bar */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Your profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-white"
              />
            </div>
            <span className="font-medium">You</span>
          </div>
          <div className="flex gap-3 ml-auto">
            <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
              <Zap className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
              <div className="relative">
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
              <Briefcase className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
              <Shield className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <Link href="#" className="flex-1 text-center py-4 text-gray-400">
            Matches
          </Link>
          <Link href="#" className="flex-1 text-center py-4 border-b-2 border-rose-500 font-medium">
            Messages
          </Link>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search messages"
              className="pl-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {conversationList.map((conversation) => (
            <button
              key={conversation.id}
              className={cn(
                "w-full flex items-start gap-3 p-3 hover:bg-gray-900 transition-colors text-left",
                activeConversation === conversation.id && "bg-gray-900",
              )}
              onClick={() => setActiveConversation(conversation.id)}
            >
              <div className="relative flex-shrink-0">
                <Avatar className="h-12 w-12 border border-gray-700">
                  <AvatarImage src={conversation.avatar} alt={conversation.name} />
                  <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {conversation.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium truncate">{conversation.name}</h3>
                  <span className={cn("text-xs", conversation.unread ? "text-rose-500 font-medium" : "text-gray-400")}>
                    {conversation.timestamp}
                  </span>
                </div>
                <p
                  className={cn(
                    "text-sm truncate mt-1",
                    conversation.unread ? "text-white font-medium" : "text-gray-400",
                  )}
                >
                  {conversation.messages.length === 0 ? "Just matched! Say hello!" : conversation.lastMessage}
                </p>
              </div>
              {conversation.unread && (
                <Badge className="bg-rose-500 text-white h-5 w-5 flex items-center justify-center p-0 rounded-full">
                  •
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-gray-800 flex items-center">
              <Button variant="ghost" size="icon" className="md:hidden mr-2">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-gray-700">
                  <AvatarImage src={selectedConversation?.avatar} alt={selectedConversation?.name} />
                  <AvatarFallback>{selectedConversation?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium">{selectedConversation?.name}</h2>
                  {selectedConversation?.online && <p className="text-xs text-green-500">Online</p>}
                </div>
              </div>
              <div className="ml-auto flex gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Info className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {selectedConversation?.messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 4L3 9.31372L10.5 13.5M20 4L14.5 21L10.5 13.5M20 4L10.5 13.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">You matched with {selectedConversation?.name}!</h3>
                  <p className="text-gray-400 mb-6">Say hello and start the conversation</p>
                  <Button className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700">
                    Send a message
                  </Button>
                </div>
              ) : (
                <>
                  {selectedConversation?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "max-w-[75%] rounded-2xl p-3 pb-2",
                        message.sender === "me"
                          ? "bg-rose-500 text-white ml-auto rounded-br-none"
                          : "bg-gray-800 text-white rounded-bl-none",
                      )}
                    >
                      <p>{message.text}</p>
                      <p
                        className={cn(
                          "text-xs mt-1 text-right",
                          message.sender === "me" ? "text-rose-200" : "text-gray-400",
                        )}
                      >
                        {message.time}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Message input */}
            <div className="p-3 border-t border-gray-800 flex gap-2">
              <Input
                placeholder="Type a message..."
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
              />
              <Button className="bg-rose-500 hover:bg-rose-600" size="icon" onClick={handleSendMessage}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H14L9 21V16Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Your messages</h3>
            <p className="text-gray-400">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}

