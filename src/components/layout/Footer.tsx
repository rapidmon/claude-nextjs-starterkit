export function Footer() {
  return (
    <footer className="border-border bg-background border-t">
      <div className="text-muted-foreground mx-auto max-w-screen-xl px-4 py-6 text-center text-sm">
        © {new Date().getFullYear()} Next.js Starter Kit
      </div>
    </footer>
  )
}
