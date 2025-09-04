"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  links: {
    href: string
    label: string
  }[]
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest("[data-mobile-menu]")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <div data-mobile-menu className="md:hidden">
      <button onClick={() => setIsOpen(true)} aria-label="Open menu" className="text-white p-2">
        <Menu className="w-6 h-6" />
      </button>

      <div
        className={cn(
          "fixed inset-0 bg-black/90 z-50 transition-transform duration-300 transform",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} aria-label="Close menu" className="text-white p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center h-[80vh]">
          <ul className="space-y-6 text-center">
            {links.map((link, index) => (
              <li key={index} className="text-xl">
                <Link
                  href={link.href}
                  className="text-white hover:text-gold-400 transition-colors py-2 px-4 block"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <Link
                href="#sponsor"
                className="bg-[#D4AF37] text-black px-6 py-3 rounded-sm inline-flex items-center hover:bg-[#C4A030] transition"
                onClick={() => setIsOpen(false)}
              >
                Become a sponsor
              </Link>
            </li>
            <li className="pt-4">
              <Link
                href="#nominees-section"
                className="bg-white text-black px-6 py-3 rounded-sm inline-flex items-center gap-1 hover:bg-gray-200 transition"
                onClick={() => setIsOpen(false)}
              >
                See Nominee List
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
