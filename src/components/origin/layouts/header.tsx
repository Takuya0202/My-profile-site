import Link from "next/link"
import HeaderNav from "./header-nav"
import { BorderBeam } from "@/components/ui/border-beam"
import { ShineBorder } from "@/components/ui/shine-border"

export default function Header() {
  return (
    <header className="w-full py-4">
      <div className="flex items-center justify-between w-full py-2">
        <Link href={"/"} className="text-2xl font-bold">
          Takuya0202
        </Link>
        <HeaderNav />
      </div>

      {/* border */}
      <div className="relative w-full">
        <ShineBorder />
      </div>
    </header>
  )
}
