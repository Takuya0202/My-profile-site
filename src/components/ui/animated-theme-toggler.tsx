"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"
import { BorderBeam } from "@/components/ui/border-beam"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

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

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    await document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark
        setIsDark(newTheme)
        document.documentElement.classList.toggle("dark")
        localStorage.setItem("theme", newTheme ? "dark" : "light")
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
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
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [isDark, duration])

  const Icon = isDark ? Sun : Moon

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
      className={cn(
        "relative overflow-hidden inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
        "bg-muted/40 dark:bg-muted/20 border border-border/50 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <span className="shrink-0 leading-none">
        <Icon className="h-5 w-5" />
      </span>
      <span className="leading-none">Theme</span>
      <BorderBeam
        size={100}
        duration={6}
        delay={0}
        colorFrom="#ffaa40"
        colorTo="#9c40ff"
        transition={{
          repeat: Infinity,
        }}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
