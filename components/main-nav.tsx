"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/workflow"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/workflow") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Workflow
        </Link>
        <Link
          href="/settings"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/settings") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Settings
        </Link>
      </nav>
    </div>
  )
}
