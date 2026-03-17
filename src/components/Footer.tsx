// Compliance footer — required on every page (FINRA/SIPC)
import { SITE_NAME, SITE_AUTHOR, FOOTER_LINKS, COMPLIANCE_DISCLOSURE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="px-6 py-12 md:px-16 border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <p className="font-serif text-lg font-bold text-crimson">
              {SITE_NAME}
            </p>
            <p className="font-sans text-xs text-royal-300">
              by {SITE_AUTHOR}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="font-sans text-xs text-royal-300 hover:text-ivory transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mandatory compliance disclosure */}
        <div className="rounded-lg border border-white/[0.05] p-4 mb-6">
          <p className="font-sans text-[10px] leading-relaxed text-royal-300">
            {COMPLIANCE_DISCLOSURE}
          </p>
        </div>

        <p className="font-sans text-[10px] text-royal-300 text-center">
          &copy; {new Date().getFullYear()} {SITE_AUTHOR}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
