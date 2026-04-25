import Link from 'next/link'

import { ModeToggle } from '@/components/mode-toggle'

export function Header() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold">
          Starter Kit
        </Link>
        <nav aria-label="주 메뉴" className="flex items-center gap-2">
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
