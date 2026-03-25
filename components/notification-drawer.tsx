
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bell, ExternalLink, Trash2, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Notification } from "@/lib/types"

interface NotificationDrawerProps {
    open: boolean
    onClose: () => void
    notifications: Notification[]
    onMarkAllAsRead: () => void
}

export function NotificationDrawer({ open, onClose, notifications, onMarkAllAsRead }: NotificationDrawerProps) {
    const [mounted, setMounted] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Close when clicking outside - Matches CartDrawer behavior
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose()
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [open, onClose])

    if (!mounted) return null

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Transparent Backdrop to capture clicks - Matches CartDrawer */}
                    <div className="fixed inset-0 z-[250]" onClick={onClose} />

                    {/* Dropdown Content - Matches CartDrawer Structure */}
                    <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed top-[70px] right-4 sm:right-8 w-[calc(100%-2rem)] sm:max-w-[420px] bg-black z-[300] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-t-[4px] border-lime overflow-hidden rounded-sm"
                    >
                        {/* Header Section */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border-lt bg-black">
                            <div className="flex flex-col">
                                <p className="font-syne font-bold text-[10px] tracking-[0.16em] uppercase text-text-dim mb-1">Style feed</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-text-mid font-syne font-black text-sm uppercase tracking-tight">Style Watch :</span>
                                    <span className="text-white font-syne font-black text-[10px] uppercase tracking-widest opacity-60">
                                        {notifications.length} New
                                    </span>
                                </div>
                            </div>
                            <button 
                                onClick={onClose}
                                className="w-10 h-10 rounded-full border border-border-lt flex items-center justify-center text-text-dim hover:text-white transition-all bg-white/5"
                                aria-label="Close drawer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>


                        {/* List Area - Matches CartDrawer Item Scroll List */}
                        <div className="max-h-[450px] overflow-y-auto custom-scrollbar bg-black/98">
                            {notifications.length === 0 ? (
                                <div className="py-20 px-10 text-center">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Bell className="w-8 h-8 text-text-dim" />
                                    </div>
                                    <p className="text-text-dim font-syne font-bold uppercase tracking-widest text-[10px]">No Style Updates At Present</p>
                                    <Link 
                                        href="/products" 
                                        onClick={onClose}
                                        className="inline-flex items-center gap-2 mt-6 text-white font-bold uppercase text-[10px] tracking-[0.2em] hover:text-lime transition-all"
                                    >
                                        Browse Catalog <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            ) : (
                                <div className="divide-y divide-border-lt">
                                    {notifications.map((notif, idx) => (
                                        <div key={notif.id} className="p-6 flex gap-5 group items-start hover:bg-white/[0.02] transition-colors">
                                            {/* Product Tiny Thumbnail */}
                                            {notif.image && (
                                                <div className="relative w-20 h-24 bg-white/5 overflow-hidden flex-shrink-0 border border-white/5">
                                                    <Image 
                                                        src={notif.image} 
                                                        alt={notif.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                    <div className="absolute top-2 right-2 w-5 h-5 bg-lime rounded-full flex items-center justify-center">
                                                        <span className="text-[8px] text-black font-bold">EC</span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-syne font-black text-[9px] text-lime uppercase tracking-widest bg-lime/[0.1] px-2 py-0.5 border border-lime/20">
                                                        {notif.badge || "NEW"}
                                                    </span>
                                                    <span className="text-[10px] text-text-dim uppercase font-bold">{notif.time || "JUST NOW"}</span>
                                                </div>
                                                <h3 className="text-[14px] leading-[1.3] text-white font-syne font-bold uppercase tracking-tight mb-2 group-hover:text-lime transition-colors">
                                                    {notif.title}
                                                </h3>
                                                <p className="text-[12px] text-text-dim font-inter leading-relaxed line-clamp-2 mb-4">
                                                    {notif.description}
                                                </p>
                                                
                                                <Link 
                                                    href={notif.link || "/products"} 
                                                    onClick={onClose}
                                                    className="inline-flex items-center gap-2 font-syne font-black text-[10px] text-white uppercase tracking-widest hover:gap-4 transition-all"
                                                >
                                                    View Collection <ArrowRight className="w-3 h-3 text-lime" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer - Matches CartDrawer Full-Width Action Button */}
                        {notifications.length > 0 && (
                            <div className="p-4 bg-white/5 border-t border-border-lt">
                                <button 
                                    onClick={onMarkAllAsRead}
                                    className="w-full h-12 bg-white/5 text-white border border-border-lt text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 transition-all duration-300"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear Style Feed
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
