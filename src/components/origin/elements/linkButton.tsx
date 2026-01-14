"use client"
import { BorderBeam } from "@/components/ui/border-beam"
import { cn } from "@/lib/utils"

interface props {
  href?: string
  text?: string
  icon?: React.ReactNode
  className?: string
}

export default function LinkButton({ href, text, icon, className }: props) {
  const handleClick = () => {
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer")
    }
    return
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!href}
      className={cn(
        "relative overflow-hidden inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
        "bg-muted/40 dark:bg-muted/20 border border-border/50 backdrop-blur-sm",
        className
      )}
    >
      {icon ? <span className="shrink-0 leading-none">{icon}</span> : null}
      {text ? <span className="leading-none">{text}</span> : null}
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
    </button>
  )
}
