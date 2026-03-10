"use client"

import Link from "next/link"
import { X, Instagram, Facebook, Youtube } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        suppressHydrationWarning
        className={cn(
          "fixed inset-0 bg-black/40 z-50 transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        suppressHydrationWarning
        className={cn(
          "fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 transform transition-transform duration-300 wellness-theme",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full" suppressHydrationWarning>
          <div className="flex items-center justify-between p-6 border-b border-gray-100" suppressHydrationWarning>
            <span className="text-xl font-serif font-bold text-gray-900 tracking-tight">
              Epiccotn<span className="text-[var(--primary)]">™</span>
            </span>
            <button onClick={onClose} className="p-2 -mr-2" aria-label="Close menu">
              <X className="h-6 w-6 text-gray-900" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-6">
            <Link
              href="/"
              className="block text-lg font-serif font-medium text-gray-900"
              onClick={onClose}
            >
              Everyday Panty
            </Link>

            <Link
              href="/#science"
              className="block text-lg font-serif font-medium text-gray-900"
              onClick={() => {
                onClose();
                document.getElementById('science')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              The Science
            </Link>

            <Link
              href="/#story"
              className="block text-lg font-serif font-medium text-gray-900"
              onClick={() => {
                onClose();
                document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Our Story
            </Link>

            <div className="pt-6 border-t border-gray-100">
              <Link
                href="/account"
                className="block text-base font-medium text-gray-600 mb-4"
                onClick={onClose}
              >
                My Account
              </Link>
              <Link
                href="/checkout"
                className="block text-base font-medium text-[var(--primary)]"
                onClick={onClose}
              >
                Checkout
              </Link>
            </div>
          </nav>

          <div className="border-t border-gray-100 p-8" suppressHydrationWarning>
            <div className="flex items-center gap-6" suppressHydrationWarning>
              <a
                href="https://www.instagram.com/epiccotn1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[var(--primary)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61588227026428"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[var(--primary)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/@epiccotn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[var(--primary)] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

