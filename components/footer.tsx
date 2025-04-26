import Link from "next/link"
import { Github, Twitter, DiscIcon as Discord } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Bless API Book</h3>
            <p className="text-sm text-muted-foreground">
              A comprehensive collection of API integration tutorials and examples.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Created by{" "}
              <a
                href="https://bless.network"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bless.network
              </a>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Resources</h3>
            <nav className="flex flex-col gap-2" aria-label="Resources">
              <Link href="/apis" className="text-sm text-muted-foreground hover:text-foreground">
                API Catalog
              </Link>
              <Link href="/guides" className="text-sm text-muted-foreground hover:text-foreground">
                Integration Guides
              </Link>
              <Link href="/best-practices" className="text-sm text-muted-foreground hover:text-foreground">
                Best Practices
              </Link>
              <a
                href="https://docs.bless.network/build-on-bless/"
                className="text-sm text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bless Network CLI
              </a>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Community</h3>
            <nav className="flex flex-col gap-2" aria-label="Community">
              <Link href="/contribute" className="text-sm text-muted-foreground hover:text-foreground">
                Contribute
              </Link>
              <a
                href="https://github.com/blessnetwork"
                className="text-sm text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <Link href="/discord" className="text-sm text-muted-foreground hover:text-foreground">
                Discord
              </Link>
              <a
                href="https://bless.network"
                className="text-sm text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bless Network
              </a>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Legal</h3>
            <nav className="flex flex-col gap-2" aria-label="Legal">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Bless API Book by{" "}
            <a
              href="https://bless.network"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bless.network
            </a>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/blessnetwork"
              className="text-muted-foreground hover:text-foreground"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/blessnetwork"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://discord.gg/yXUWUzQU"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Discord"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Discord className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
