export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-army-primary/60 bg-army-dark/95">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-9">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 text-[13px] text-gray-300">
          {/* Brand */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-army-olive/50 bg-army-primary/30">
                <span className="text-[11px] font-semibold tracking-wide text-army-sand">
                  AN
                </span>
              </div>
              <div>
                <p className="text-[13px] font-semibold tracking-wide text-army-sand">
                  ARMYNEXUS
                </p>
                <p className="text-[11px] text-gray-400">Central Command Portal</p>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed max-w-xs">
              Army Nexus unifies personnel, missions, and operations into a secure, always‑ready
              digital command network.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-gray-500 uppercase">
              Quick Links
            </p>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="/"
                  className="text-[13px] text-gray-300 hover:text-army-sandLight transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-[13px] text-gray-300 hover:text-army-sandLight transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-[13px] text-gray-300 hover:text-army-sandLight transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="text-[13px] text-gray-300 hover:text-army-sandLight transition-colors"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-gray-500 uppercase">
              Contact
            </p>
            <ul className="space-y-1.5 text-[13px] text-gray-300">
              <li>Ops Desk: support@armynexus.app</li>
              <li>Priority Line: +1 (800) 555‑0132</li>
              <li>Availability: 24 / 7 / 365</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-army-primary/40 bg-[#050b07]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <p className="text-[10px] text-gray-600">
            © {year} Army Nexus. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-600 text-center sm:text-right">
            “In unity there is strength. In technology, there is capability.”
          </p>
        </div>
      </div>
    </footer>
  )
}

