"use client"

import { useState } from "react"
import { X } from "lucide-react"

export function ClaimGiftBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-3 w-3 text-gray-600" />
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg transition-colors">
          Claim Your Free Gift
        </button>
      </div>
    </div>
  )
}
