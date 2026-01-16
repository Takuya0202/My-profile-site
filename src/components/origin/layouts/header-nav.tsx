import { BookOpen, Github } from "lucide-react"
import LinkButton from "../elements/linkButton"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export default function HeaderNav() {
  return (
    <nav className="flex items-center space-x-4">
      <LinkButton
        href="https://github.com/Takuya0202"
        text="GitHub"
        icon={<Github className="h-5 w-5" />}
      />
      <LinkButton
        href="https://zenn.dev/amethyst"
        text="Zenn"
        icon={<BookOpen className="h-5 w-5" />}
      />
      <AnimatedThemeToggler />
    </nav>
  )
}
