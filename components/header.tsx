"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, ShoppingBag, Bell, User, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Notification } from "@/lib/types"
import { MobileMenu } from "./mobile-menu"
import { CartDrawer } from "./cart-drawer"

interface HeaderProps {
  notifications: Notification[]
}

export function Header({ notifications = [] }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  // Listen for custom event to open cart
  useEffect(() => {
    const handleOpenCart = () => setCartOpen(true)
    window.addEventListener('openCart', handleOpenCart)
    return () => window.removeEventListener('openCart', handleOpenCart)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300 wellness-theme" suppressHydrationWarning>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6" suppressHydrationWarning>
          <div className="flex items-center justify-between h-20" suppressHydrationWarning>
            {/* Mobile menu button */}
            <button className="lg:hidden p-2 -ml-2" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
              <Menu className="h-6 w-6 text-gray-900" />
            </button>

            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
                Epiccotn<span className="text-[var(--primary)]">™</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10 h-full" suppressHydrationWarning>
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-[var(--primary)] tracking-wide transition-colors"
              >
                Everyday Panty
              </Link>
              <Link
                href="/#science"
                className="text-sm font-medium text-gray-700 hover:text-[var(--primary)] tracking-wide transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('science')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                The Science
              </Link>
              <Link
                href="/#story"
                className="text-sm font-medium text-gray-700 hover:text-[var(--primary)] tracking-wide transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Our Story
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-5" suppressHydrationWarning>
              <div className="relative" suppressHydrationWarning>
                <button
                  className="hidden sm:flex hover:text-[var(--primary)] transition-colors"
                  aria-label="Notifications"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <Bell className="h-5 w-5" />
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-4 w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 font-serif">Notifications</h3>
                      <button onClick={() => setNotificationsOpen(false)} className="text-gray-400 hover:text-gray-900">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {notifications.slice(0, 3).map((notification) => (
                        <div
                          key={notification.id}
                          className="group flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-100">
                            <img
                              src={notification.image}
                              alt=""
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm mb-1">{notification.title}</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">{notification.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/account" className="hidden sm:flex hover:text-[var(--primary)] transition-colors" aria-label="Account">
                <User className="h-5 w-5" />
              </Link>

              <button
                className="hover:text-[var(--primary)] transition-colors relative"
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Click outside to close notifications */}
      {notificationsOpen && <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />}
    </>
  )
}

