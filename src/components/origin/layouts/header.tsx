"use client"

import { useState, useEffect, useCallback } from "react"
import { Github, BookOpen, Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import Link from "next/link"
import { Dock, DockIcon } from "@/components/ui/dock"

export default function Header() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = useCallback(async (event: React.MouseEvent) => {
    const buttonElement = event.currentTarget as HTMLElement

    await document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark
        setIsDark(newTheme)
        document.documentElement.classList.toggle("dark")
        localStorage.setItem("theme", newTheme ? "dark" : "light")
      })
    }).ready

    const { top, left, width, height } = buttonElement.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 400,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [isDark])

  return (
    <header className="w-full py-4 flex items-center justify-between">
      <Link href={"/"} className="text-2xl font-bold">
        Takuya0202
      </Link>
      <nav className="flex items-center">
        <Dock
          className="mt-0 h-auto bg-muted/40 dark:bg-muted/20 border border-border/50 backdrop-blur-sm px-3 py-2 rounded-xl"
          iconSize={44}
          iconMagnification={50}
          iconDistance={140}
        >
          <DockIcon
            onClick={() => window.open("https://github.com/Takuya0202", "_blank", "noopener,noreferrer")}
            className="hover:bg-white/5 dark:hover:bg-black/5 transition-colors"
          >
            <Github className="h-5 w-5 text-foreground" />
          </DockIcon>
          <DockIcon
            onClick={() => window.open("https://zenn.dev/amethyst", "_blank", "noopener,noreferrer")}
            className="hover:bg-white/5 dark:hover:bg-black/5 transition-colors"
          >
            <BookOpen className="h-5 w-5 text-foreground" />
          </DockIcon>
          <DockIcon
            onClick={toggleTheme}
            className="hover:bg-white/5 dark:hover:bg-black/5 transition-colors"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-foreground" />
            )}
          </DockIcon>
        </Dock>
      </nav>
    </header>
  )
}