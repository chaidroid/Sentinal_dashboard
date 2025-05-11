"use client"

import Link from "next/link"
import { Shield } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6" />
          <span className="inline-block font-bold">SentinelOne Alert Manager</span>
        </Link>
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
