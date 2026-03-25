"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, User, Bell, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { createClient } from "@/lib/supabase/client"
import { motion } from "framer-motion"

import { CartDrawer } from "./cart-drawer"
import { SearchModal } from "./search-modal"
import { NotificationDrawer } from "./notification-drawer"
import { toast } from "sonner"

interface HeaderProps {
  notifications?: any[]
}

export function Header({ notifications = [] }: HeaderProps) {
  const supabase = createClient()
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  
  const [visibleNotifications, setVisibleNotifications] = useState<any[]>([])
  const cart = useCart()


  useEffect(() => {
    setMounted(true)
    const initializeNotifications = async () => {
      // 1. Check local storage for guests (fallback)
      const locallyCleared = localStorage.getItem("epiccotn_notif_cleared_at")
      let clearedAt = locallyCleared ? parseInt(locallyCleared) : 0

      // 2. Check Supabase for account holders (primary)
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user?.user_metadata?.last_notif_cleared_at) {
        clearedAt = Math.max(clearedAt, session.user.user_metadata.last_notif_cleared_at)
      }

      // 3. Only show notifications that are actually newer than the last clear action
      const filtered = notifications.filter((notif: any) => {
        if (!notif.created_at) return true // Show by default if no date
        const notifTime = new Date(notif.created_at).getTime()
        return notifTime > clearedAt
      })


      setVisibleNotifications(filtered)

    }

    initializeNotifications()
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [notifications])


  const handleClearNotifications = async () => {
    const now = Date.now()
    setVisibleNotifications([])
    setIsNotificationsOpen(false)
    
    try {
        localStorage.setItem("epiccotn_notif_cleared_at", now.toString())
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
            await supabase.auth.updateUser({
                data: { last_notif_cleared_at: now }
            })
        }
        toast.success("Style feed updated", { duration: 2000 })
    } catch (err) {
        console.error("Failed to sync clear status", err)
    }
  }

  return (
    <header 
      suppressHydrationWarning
      className={cn(
      "fixed top-0 left-0 right-0 z-[300] h-[60px] flex items-center bg-black/95 backdrop-blur-xl border-b transition-colors duration-300",
      isScrolled ? "border-lime/20" : "border-border-lt"
    )}>
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="font-syne text-[24px] font-extrabold text-white tracking-[-0.02em] flex items-center">
          Epiccotn<span className="w-2 h-2 bg-lime ml-0.5 mt-1.5" />
        </Link>

        {/* Desktop Nav Links & Custom Button */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {[
              { name: "About Us", href: "/#about-us" },
              { name: "Contact", href: "/contact" }
            ].map((item) => (
              <Link key={item.name} href={item.href} className="font-inter text-[13px] font-normal text-text-dim hover:text-white tracking-[0.02em] transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>
          
          <Link href="/products" className="bg-lime text-black font-syne text-[12px] font-bold tracking-[0.06em] uppercase px-[22px] py-[9px] hover:bg-lime-dk transition-all hover:-translate-y-[1px]">
            Shop Now
          </Link>
        </div>


        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex w-9 h-9 border border-border-lt items-center justify-center text-text-dim hover:border-white/25 hover:text-white transition-all cursor-pointer bg-transparent"
          >
            <Search className="w-4 h-4" strokeWidth={1.5} />
          </button>

          <button 
            onClick={() => setIsNotificationsOpen(true)}
            className="flex w-9 h-9 border border-border-lt items-center justify-center text-text-dim hover:border-white/25 hover:text-white transition-all cursor-pointer bg-transparent relative"
          >
            <Bell className="w-4 h-4" strokeWidth={1.5} />
            {(mounted && visibleNotifications.length > 0) && (
              <>
                <motion.span 
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-lime rounded-full"
                />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-lime text-black font-syne font-bold text-[9px] flex items-center justify-center rounded-full leading-none z-10">
                  {visibleNotifications.length}
                </span>
              </>
            )}
          </button>

          <Link href="/account" className="flex w-9 h-9 border border-border-lt items-center justify-center text-text-dim hover:border-white/25 hover:text-white transition-all cursor-pointer bg-transparent">
            <User className="w-4 h-4" strokeWidth={1.5} />
          </Link>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex w-9 h-9 border border-border-lt items-center justify-center text-text-dim hover:border-white/25 hover:text-white transition-all cursor-pointer bg-transparent relative"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
            {(mounted && cart.items.length > 0) && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-lime text-black font-syne font-bold text-[9px] flex items-center justify-center rounded-full leading-none">
                {cart.items.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <NotificationDrawer 
        open={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
        notifications={visibleNotifications}
        onMarkAllAsRead={handleClearNotifications}
      />
    </header>


  )
}
