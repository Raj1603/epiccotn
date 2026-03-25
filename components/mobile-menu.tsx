"use client"

import NextLink from "next/link"
import { Instagram, Facebook, Youtube, Menu } from "lucide-react"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button 
          className="lg:hidden flex w-9 h-9 border border-border-lt items-center justify-center text-text-dim hover:border-white/25 hover:text-white transition-all bg-transparent"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black border-white/10 p-0 w-full max-w-[300px]">
        <SheetHeader className="p-6 border-b border-white/5 text-left">
          <SheetTitle className="font-syne text-[20px] font-extrabold text-white tracking-tight flex items-center">
            Epiccotn<span className="w-1.5 h-1.5 bg-lime ml-0.5 mt-1" />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col p-6 space-y-8">
          <NextLink
            href="/#about-us"
            className="text-[20px] font-syne font-bold text-white uppercase tracking-tight hover:text-lime transition-colors"
          >
            About Us
          </NextLink>

          <NextLink
            href="/products"
            className="text-[20px] font-syne font-bold text-white uppercase tracking-tight hover:text-lime transition-colors"
          >
            Shop Now
          </NextLink>

          <NextLink
            href="/contact"
            className="text-[20px] font-syne font-bold text-white uppercase tracking-tight hover:text-lime transition-colors"
          >
            Contact
          </NextLink>

          <div className="pt-8 border-t border-white/5 flex flex-col space-y-6">
            <NextLink
              href="/account"
              className="text-[14px] font-inter font-medium text-white/40 hover:text-white transition-colors"
            >
              My Account
            </NextLink>
            
            <div className="flex items-center gap-6 pt-4">
              <a href="https://instagram.com/epiccotn1" target="_blank" rel="noreferrer" className="text-white/20 hover:text-lime transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white/20 hover:text-lime transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-white/20 hover:text-lime transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

